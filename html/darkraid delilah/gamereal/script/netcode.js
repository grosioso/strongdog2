var Net = new Object();
Net.online = false;
Net.isServer = false;
Net.isClient = false;
Net.now = 0;
Net.tickrate = 4;
Net.multiplexer = 0;
Net.lastPacket  = null;
Net.maxTimeout = 300;
Net.debug_delay = 0;
Net.client_timeout_callback = null;
Net.my_server_connId = 0;

Net.localIP = "127.0.0.1";
Net.serverIP = "192.168.0.0";
Net.serverPort = 3000;

//Net.tick_wait_count = 5;//if tick queue is longer than this, freeze //bad idea
Net.orderDelay = 15;
Net.orderDelay_min = 14;
Net.orderDelay_max = 33;
Net.next_unit_id = 0;
Net.TickOrders = [];
Net.TickEvents = [];
Net.TickTransferAcks = [];
Net.lobbyState = null;
Net.lastResyncState = null;
Net.lastResyncJSON  = null;
Net.TickMapImport = null;
Net.OrderQueue = [];
Net.TickQueue = [];
Net.TickChats = [];
Net.myLastId = 0;
Net.myLastIdEcho = 0;
Net.Units = [];
Net.Connections = [];
Net.otherLastMoment = 0;
Net.userName = "Noname";
Net.TickUserName = null;

Net.event_map_entered = 0;
//Net.event_lobby_team_change = 1;
//Net.event_lobby_role_change = 2;
Net.waiting_for_sync = 0;
Net.resync_needed = false;
Net.resync_cooldown = 0;
Net.resync_wait_period = 240;
//we can reuse selections if they didn't change
Net.last_selection_arrays = [];

function NetConnection( id ){
	this.id = id; //the server gives a unique id
	this.resync_needed = false;
	this.userName = NetConnection.userName_default;
	this.wait_for_my_loading = true;
	this.FileOutTransfers = [];
	this.FileInTransfers = [];
	this.nextOutFileFrag = null;
	this.nextOutTransferId = 1;
	this.incomingTransferHistory = [];
	this.lastId_uninterrupted = -1;
	this.lastMoment = 0;
	this.lastPacketGot = null;
	this.packetInCount = 0;
	this.lastPacketOut = null;
	this.packetOutCount = 0;
	this.lastIncomingTimeout = 0;
	this.lastTimeEcho = 0;
	this.lastIdEcho = 0;
	this.lastTime = 0;
	this.latency = 0;
	this.raddr = null;
	this.rport = null;
	this.rinfo_broadcast_tick = false;
	
	this.levelStart = function(){
		//this.lastTimeEcho = 0;
		//this.lastTime = 0;
		this.resync_needed = false;
	}
	this.makePacket = function(){
		var pack = new Object;
		pack.moment = Date.now();
		//mapTime MT
		pack.MT = Gamestats.mapTime;
		//mapTimeEcho MTE
		pack.MTE = this.lastPacketGot?this.lastPacketGot.MT:0;
		if(this.wait_for_my_loading){
			pack.MTE = 0;
		}
		pack.halt = Net.waiting_for_sync;
		//lastIdEcho LIE
		pack.LIE = this.lastId_uninterrupted ;
		if(Net.isServer){
			pack.connId = this.id;
			if(M.isMenu && GUI.SkirmishPanel){
				pack.lobby = Net.lobbyState;
			}
		}
		
		FileTransfer.prepareAnyOutFrag(this);
		if(this.nextOutFileFrag){
			pack.ftf = this.nextOutFileFrag;
		}
		
		if(Net.TickChats.length > 0){
			pack.chats = Net.TickChats;
		}
		if(Net.TickUserName || this.packetOutCount < 5){
			pack.uname = Net.TickUserName;
		}
		pack.arr = Net.TickQueue;
		
		if(Net.isServer){ //broadcast a new connection to the other peers
			for(var i=0;i<Net.Connections.length;++i){
				if(Net.Connections[i].rinfo_broadcast_tick == true && this!=Net.Connections[i]){
					if(!pack.rinfoArr){
						pack.rinfoArr = [];
					}
					pack.rinfoArr.push([ Net.Connections[i].raddr, Net.Connections[i].rport ])
				}
			}
		}
		
		if(Net.resync_needed || NetConnection.anyone_needs_resync() ){
			if(Net.resync_needed){
				pack.resync_needed = 1;
			}
			if(Net.isServer){
				if(Net.resync_cooldown <= 0 && this.FileOutTransfers.length==0){
					var resyncData = Net.get_resync_data();
					FileTransfer.CreateOut(this, resyncData);
				}
			}
		}
		
		return JSON.stringify(pack);
	}
	
	this.timeout = function(){
		Net.Connections.splice(Net.Connections.indexOf(this), 1);
		ipcRenderer.send('voor-client-lost', this.id);
		if(M.isMenu){
			GUI.Alert("Peer lost");
		}else{
			SoundObject.chat.play(0,0);
			GUI.Alert(this.userName+" has left the game!");
		}
		if(Net.isClient && Net.Connections.length <= 0){
			Net.quit();
		}else{
			console.log("client lost");
		}
	}
}
NetConnection.userName_default = "Noname";
NetConnection.checkTimeouts = function(){
	for(var i=Net.Connections.length-1;i>=0;--i){
		var c = Net.Connections[i];
		c.lastIncomingTimeout ++;
		if(c.lastIncomingTimeout > Net.maxTimeout && c.lastPacketGot){
			c.timeout();
		}
	}
}
NetConnection.anyone_else_loading = function(){
	for(var i=0;i<Net.Connections.length;++i){
		if(Net.Connections[i].wait_for_my_loading){
			return true;
		}
	}
	return false;
}
NetConnection.anyone_needs_resync = function(){
	for(var i=0;i<Net.Connections.length;++i){
		if(Net.Connections[i].resync_needed){
			return true;
		}
	}
	return false;
}
NetConnection.get_most_ahead = function(){
	var mt = 0;
	for(var i=0;i<Net.Connections.length;++i){
		if(Net.Connections[i].lastPacketGot && !Net.Connections[i].wait_for_my_loading){
			mt = Math.max(mt, Net.Connections[i].mapTime);
		}
	}
	return mt;
}
NetConnection.getMaxLatency = function(){
	var lat = 0;
	for(var i=0;i<Net.Connections.length;++i){
		lat = Math.max( Gamestats.mapTime - Net.Connections[i].lastTimeEcho, lat );
	}
	return lat;
}
NetConnection.getById = function(id){
	for(var i=0;i<Net.Connections.length;++i){
		if(Net.Connections[i].id == id){
			return Net.Connections[i];
		}
	}
	return null;
}
NetConnection.getByRinfo = function(addr, port){
	for(var i=0;i<Net.Connections.length;++i){
		if(Net.Connections[i].raddr == addr && Net.Connections[i].rport == port){
			return Net.Connections[i];
		}
	}
	return null;
}
NetConnection.Create = function(connId, addr, port){
	if(NetConnection.getById(connId)){
		return; //already exists
	}
	console.log("Create",connId);
	var conn = new NetConnection(connId);
	conn.raddr = addr;
	conn.rport = port;
	Net.Connections.push(conn);
}

Net.init = function(){
	ipcRenderer.send('voor-get-localip');
}
Net.levelStart = function(){
	Net.next_unit_id = 0;
	Net.lastOtherTime = 0;
	Net.resync_needed = false;
	for(var i=0;i<Net.Connections.length;++i){
		Net.Connections[i].levelStart();
	}
	Net.TickEvents.push(Net.event_map_entered);
	Net.Units = [];
	Net.OrderQueue = [];
	for(var i=0;i<Players.length;++i){
		Net.OrderQueue[i] = [];
	}
	
	Net.last_selection_arrays = [];
	for(var i=0;i<Players.length;++i){
		Net.last_selection_arrays[i] = [];
	}
	Net.orderDelay = 20;
	Net.lastResyncState = null;
	Net.lastResyncJSON  = null;
}

Net.makeServer = function(port){
	Net.serverPort = port||Net.serverPort;
	ipcRenderer.send('voor-server', Net.serverPort );
	this.isServer = true;
	Net.online = true;
	this.isClient = false;
	this.lastPacket = null;
	this.lastPacketGot = null;

	Net.myLastId = -1;
	Net.myLastIdEcho = -1;
	Net.multiplexer = 0;
	Net.Connections = [];
	Net.lastResyncState = null;
	Net.lastResyncJSON  = null;
}

Net.makeClient = function(address, server_port){
	address = address || "localhost";
	Net.serverPort = server_port || Net.serverPort;
	ipcRenderer.send('voor-client', address, Net.serverPort );
	this.isClient = true;
	Net.online = true;
	this.isServer = false;
	this.lastPacket = null;
	this.lastPacketGot = null;
	Net.myLastId = -1;
	Net.myLastIdEcho = -1;
	Net.multiplexer = 0;
	Net.Connections = [];
	Net.lastResyncState = null;
	Net.lastResyncJSON  = null;

	Net.client_timeout_callback = setTimeout(function(){
		if(Net.isClient && (!Net.Connections[0] || !Net.Connections[0].lastPacketGot)){
			Net.quit();
			GUI.Alert("Timeout. Could not connect");
	}}, 8000);
}

Net.quit = function(){
	if(Net.client_timeout_callback){
		clearTimeout(Net.client_timeout_callback);
		Net.client_timeout_callback = null;
	}
	Net.lastPacket = null;
	if(Net.isClient){
		ipcRenderer.send('connection-close');
		Net.online = false;
	}else if(Net.isServer){
		//Net.serverLostClient();
		Net.isServer = false;
		Net.online = false;
		ipcRenderer.send('connection-close');
		Control.UnlockGame();
	}
	Net.isClient = false;
	Net.isServer = false;
	//Gamestats.updateMonsterLevel();
}

Net.serverMade = function(){
	GUI.Alert("Server ready!");
	GUI.set_gui_skirmish();
}
Net.serverFound = function(){
	GUI.Alert("Server found!");
	GUI.set_gui_skirmish();
}

Net.createUnit = function(u){
	u.net_id = this.next_unit_id;
	this.next_unit_id ++;
	this.Units[u.net_id]=u;
}


Net.serverTick = function(){
	if(!Net.Connections[0] || !Net.Connections[0].lastPacketGot){
		Net.TickQueue = [];
	}else{
		Net.addTick();
	}
	if( GUI.SkirmishPanel ){
		Net.lobbyState = GUI.SkirmishPanel.getNetState(); //at the moment only server has to send this
	}
	
	Net.resync_cooldown = Math.max(0, Net.resync_cooldown-1);
	
	for(var i=0;i<Net.Connections.length;++i){
		if(Net.Connections[i].packetInCount < 5){
			Net.Connections[i].rinfo_broadcast_tick = true;
		}else{
			Net.Connections[i].rinfo_broadcast_tick = false;
		}
	}
			
	for(var i=0;i<Net.Connections.length;++i){
		var conn = Net.Connections[i];
		var pack = conn.makePacket();
		conn.lastPacketOut = pack;
		conn.packetOutCount++;
		if(Net.debug_delay>0){
			setTimeout(function(){ipcRenderer.send('voor-net-send',  pack, conn.id)},Net.debug_delay);
		}else{
			ipcRenderer.send('voor-net-send',  pack, conn.id);
		}
	}
	
	if((Net.resync_needed || NetConnection.anyone_needs_resync()) && Net.resync_cooldown <= 0){
		Net.resync_cooldown = Net.resync_wait_period;
		Net.resync( Net.get_resync_data() );
	}
	
	Net.TickOrders = [];
	Net.TickEvents = [];
	Net.TickChats = [];
	Net.TickTransferAcks = [];
	Net.nextOutFileFrag = null;
	Net.TickMapImport = null;
	Net.TickUserName = null;
}

Net.clientTick = function(){
	if(!Net.Connections[0] || !Net.Connections[0].lastPacketGot){
		Net.TickQueue = [];
	}else{
		Net.addTick();
	}
	
	Net.resync_cooldown = Math.max(0, Net.resync_cooldown-1);
	
	if(Net.Connections.length <= 0){
		//before we have any connection, we just broadcast trash
		ipcRenderer.send('voor-net-send',  "" , -1);
	}else{
		for(var i=0;i<Net.Connections.length;++i){
			var conn = Net.Connections[i];
			var pack = conn.makePacket();
			conn.lastPacketOut = pack;
			conn.packetOutCount++;
			if(Net.debug_delay>0){
				setTimeout(function(){ipcRenderer.send('voor-net-send',  pack, conn.id)},Net.debug_delay);
			}else{
				ipcRenderer.send('voor-net-send',  pack, conn.id);
			}
		}	
	}
	
	Net.TickOrders = [];
	Net.TickEvents = [];
	Net.TickChats = [];
	Net.TickTransferAcks = [];
	Net.nextOutFileFrag = null;
	Net.TickMapImport = null;
	Net.TickUserName = null;
}

//a single packet can have an entire queue of ticks
Net.addTick = function(){
	var tick = new Object;
	Net.lastPacket = tick;
	
	if(NetConnection.anyone_else_loading()){
		if(!M.isMenu&&!Control.gameLocked){
			//signal that we have already entered the map as long as other side is loading
			Net.TickEvents.push(Net.event_map_entered);
		}
	}
	
	tick.id = Net.myLastId;
	Net.myLastId ++;
	
	if(Net.TickOrders.length){
		tick.orders = Net.TickOrders;
	}
	if(Net.TickEvents.length){
		tick.events = Net.TickEvents;
	}
	if(Net.TickMapImport){
		console.log("tickMap",Net.TickMapImport);
		tick.mapImport = Net.TickMapImport;
	}
	if(Net.TickTransferAcks){
		tick.acks = Net.TickTransferAcks;
	}

	Net.TickQueue.push(tick);
}

Net.receivePacket = function(data, connId){
	var pack = JSON.parse(data);
	
	var conn = NetConnection.getById(connId);
	if(conn){ //we didn't yet get a message from this connection, so let's set it up
		Net.decodePacket(pack, conn);
	}else{
		console.log("noconn", connId, Net.Connections[0].id);
	}
}

Net.decodePacket = function(pack, conn){
	if(!Net.isServer && !Net.isClient){
		return;
	}
	conn.packetInCount ++;
	conn.lastIncomingTimeout = 0;
	var tickArr = pack.arr;
	if(conn.lastMoment < pack.moment){
		conn.lastMoment = pack.moment;
	}else{
		console.log("Obsolete")
	}
	
	if(!conn.lastPacketGot){
		//GUI.Alert("First packet received");
		//this is the first packet
		/*if(!pack.lobby && this.isClient){
			GUI.Alert("Game is already in progress");
			Net.quit();
			return;
		}*/
	}
	if(pack.connId){
		Net.my_server_connId = pack.connId;
	}
	
	conn.lastPacketGot = pack;
	conn.lastTime = Math.max(pack.MT, conn.lastTime );
	conn.lastTimeEcho = Math.min(Gamestats.mapTime, Math.max(pack.MTE, conn.lastTimeEcho));
	conn.lastIdEcho = Math.max(pack.LIE, conn.lastIdEcho);
	
	if(pack.ftf){
		FileTransfer.receiveAnyFrag(conn, pack.ftf);
	}
	
	if(conn.lastId_uninterrupted < 0 && tickArr.length){
		//when the first connection happens, the tick ids start from 0 on boths sides
		//but when a third party joins, it needs to get the current tickIds
		conn.lastId_uninterrupted = Utils.lastElem(tickArr).id;
	}
	
	for(var i=0;i<tickArr.length;++i){
		if(tickArr[i].id <= conn.lastId_uninterrupted + 1){
			if(tickArr[i].id == conn.lastId_uninterrupted + 1){
				//we have all ticks up to this point
				conn.lastId_uninterrupted++;
				Net.decodeSingleTick(conn, tickArr[i]);
			}
			//otherwise we have a tick that's already been executed
		}else{
			//we have missed a tick in between
			break;
		}
	}
	
	for(var i=Net.TickQueue.length-1;i>=0;--i){
		//clean out those packets from the queue that we know have been received
		if(Net.TickQueue[i].id <= conn.lastIdEcho ){
			Net.TickQueue.splice(i,1);
		}
	}
	if(pack.lobby && M.isMenu && GUI.SkirmishPanel){
		GUI.SkirmishPanel.loadNetState(pack.lobby);
	}
	
	if(pack.uname){
		if(conn.userName == NetConnection.userName_default){
			SoundObject.chat.play(0,0);
			GUI.Alert("New player: "+pack.uname);
		}
		conn.userName = pack.uname;
	}
	if(pack.chats){
		for(var i=0;i<pack.chats.length;++i){
			Net.receiveChat( conn.userName + ":" + pack.chats[i]);
		}
	}
	if(pack.rinfoArr){
		//this can only be recieved from a server that just got a new connection from yet another peer
		for(var i=0;i<pack.rinfoArr.length;++i){
			var peerAddr = pack.rinfoArr[i][0];
			var peerPort = pack.rinfoArr[i][1];
			var peerConn = NetConnection.getByRinfo(peerAddr, peerPort);
			//if connection does not exits, we're dealing with a new peer
			//whose rinfo was just broadcast by the server
			if(!peerConn ){
				console.log("New peer from server:" + peerAddr + ":" + peerPort)
				ipcRenderer.send("peer-from-server", peerAddr, peerPort);
			}
		}
	}
	
	if(pack.resync_needed){
		conn.resync_needed = true;
	}else{
		conn.resync_needed = false;
	}
}

Net.decodeSingleTick = function(conn, tick){
	if(tick.mapImport){
		console.log(tick.mapImport);
		Asset.importMap(tick.mapImport);
	}
	if(tick.orders){
		for(var i=0;i<tick.orders.length;++i){
			var order = tick.orders[i];
			this.addOrderQueue(order)
		}
	}
	if(tick.events&&tick.events.length>0){
		Net.decodeEvents(conn, tick);
	}
	if(tick.acks){
		FileTransfer.decodeAcks(conn, tick.acks);
	}
}

Net.mapImport = function(filename){
	if(Net.isServer){
		for(var i = 0;i<Net.Connections.length;++i){
			Net.Connections[i].wait_for_my_loading = true;
		}
		Net.TickMapImport = filename;
	}
}

Net.request_resync = function(){
	if(Net.resync_cooldown <= 0){
		Net.resync_needed = true;
	}
}

Net.get_resync_data = function(){
	if(!Net.lastResyncState || Net.lastResyncState.mapTime > Gamestats.mapTime-10){
		Net.lastResyncState = Gamestats.get_MapSaveState();
		Net.lastResyncJSON = JSON.stringify( Net.lastResyncState );
	}
	return Net.lastResyncJSON;
}

Net.resync = function(saveState){
	saveState=JSON.parse(saveState);
	Gamestats.saveState = saveState;
	Asset.importMap(saveState.mapName);
	Net.resync_needed = false;
	GUI.Alert("Attempting re-sync");
	console.log("Resync Attempt");
}

Net.decodeEvents = function(conn, packet){
	for(var i=0;i<packet.events.length;++i){
		switch (packet.events[i]){
			case Net.event_map_entered: //other side has entered the map
				conn.wait_for_my_loading =false ;
				conn.lastTimeEcho = 0;
				conn.lastTime = 0;
				break;
		}
	}
}

Net.repeatOrders = function(){
	for(var i=1;i<Net.OrderQueue.length;++i){
		var orderArr = Net.OrderQueue[i];
		for(var j=orderArr.length-1;j>=0;--j){
			var order = orderArr[j];
			if(order[ Net.oenum_time ] == Gamestats.mapTime){
				
				var ownerId = order[ Net.oenum_owner ];
				var orderExecTime = order[ Net.oenum_time ];
				var uids = order[2];
				var targetType = order[3];
				var targetId = order[4];
				var orderX = order[5];
				var orderY = order[6];
				var formation = order[7];
				var abid = order[8];
	
				if(!uids){
					//order has no unit net_id array, which means it's reused from previous order
					//not the same as an empty array!
					uids = Net.last_selection_arrays[ ownerId ];
				}
				Net.last_selection_arrays[ ownerId ] = uids;
				
				var sel = [];
				for(var k=0;k< uids.length;++k){
					sel[k] = Net.Units[ uids[k] ];
					if(!sel[k]){
						console.log("Net: unit desync");
						Net.request_resync();
						continue;
					}
				}
				
				var formationRect = null;
				if( formation){
					formationRect = DragWorldRect.fromNetData( formation)
				}
				if( targetType == Net.targetType_point){
					Move_Issued_Handler(sel,new Point(orderX,orderY),Ability.getById( abid), formationRect ,true);
				}else if( targetType == Net.targetType_none){
					InstantOrder(sel, Ability.getById( abid),true);
				}else if( targetType == Net.targetType_cancel){
					TrainingCancelOrder(sel[0], targetId,true);
				}else if( targetType == Net.targetType_unit){
					var ability = Ability.getById( abid);
					if( targetId < 0){//target dummy
						var target = new AbilityTargetDummyUnit(orderX,orderY);
					}else{//regular unit
						var target = Net.Units[ targetId ];
						if(!target){
							console.log("NET: target desync");
							Net.request_resync();
							continue;
						}
					}
					Control.SetAbilityTarget(target, ability, sel);
					Move_Issued_Handler(sel,target,ability, formationRect ,true);
				}
				
				orderArr.splice(orderArr.indexOf(order),1);
			}
		}
	}
}

//returns false if order came too late. That means BIG trouble
Net.addOrderQueue = function(order){
	var insertHappened = false;
	
	var orderExecTime = order[ Net.oenum_time ];
	var ownerId = order[ Net.oenum_owner ];
	
	if( orderExecTime < Gamestats.mapTime){
		console.log("TOO LATE", Gamestats.mapTime, orderExecTime );
		Net.request_resync();
		return false;
	}
	var orderArr = Net.OrderQueue[ ownerId ];
	for(var i=0;i<orderArr.length;++i){
		var nextOrder = orderArr[i];
		var nextTime = nextOrder[ Net.oenum_time ];
		if( nextTime > orderExecTime){ //later order is already stored
			orderArr.splice(i,0,order);
			insertHappened = true;
			break;
		}
	}
	if(!insertHappened){//array was empty or all orders were older
		orderArr.push(order);
	}
	return true;
}

Net.getLatestOrderTime = function(ownerId){
	var orderArr = Net.OrderQueue[ownerId];
	var latest = Utils.lastElem(orderArr);
	if(latest){
		return latest[ Net.oenum_time ];
	}
	return Gamestats.mapTime;
}

Net.targetType_none = 1;
Net.targetType_point = 2;
Net.targetType_unit = 3;
Net.targetType_cancel = 4;

Net.oenum_owner = 0;
Net.oenum_time = 1;

Net.storeOrder = function(unitArr, targetObject , ability, formation){
	if( NetConnection.anyone_else_loading() ){return;}

	var ownerId = Control.currentPlayer.id;
	var orderExecTime = Gamestats.mapTime + Net.orderDelay;
	var uids = 0; //final unit id array that is sent, zero if redundant
	var targetType = 0;
	var targetId = 0;
	var orderX = 0; 
	var orderY = 0;
	var formation = 0;
	var abid = ability.id;
	
	var mostAhead = NetConnection.get_most_ahead();
	if(Gamestats.mapTime < mostAhead + 1 ){
		//the other side is ahead of us, we must delay the order after their clock
		//eventually they will wait for us, but we can't risk missing their deadline
		console.log("AHEAD!");
		orderExecTime = mostAhead + 1 + Net.orderDelay;
	}
	
	//Net.orderDelay could change between orders, but that must not change scheduling priority
	orderExecTime = Math.max(orderExecTime, Net.getLatestOrderTime( ownerId ));
	
	var idArr = [];
	for(var i=0;i<unitArr.length;++i){
		idArr[i] = unitArr[i].net_id;
	}
	if(Utils.compareArrays(idArr, Net.last_selection_arrays[ ownerId ]) == false){
		//selection has changed
		uids = idArr;
	}//otherwise order needs no ids
	
	if(ability == Ability.NetTrainingCancel){
		targetType = Net.targetType_cancel;
		targetId = targetObject;
	}else{
		if(targetObject){
			if(targetObject.alive){
				targetType = Net.targetType_unit;
				targetId = targetObject.net_id;
			}else{
				targetType = Net.targetType_point;
			}
			orderX = fixed3(targetObject.x);
			orderY = fixed3(targetObject.y);
			if(formation){
				formation = [fixed3(formation.angle),formation.cols ,formation.rows , fixed3(formation.spread)];
			}
		}else{
			targetType = Net.targetType_none;
		}
	}
	
	var order = [];
	order[0] = ownerId;
	order[1] = orderExecTime;
	order[2] = uids;
	order[3] = targetType;
	order[4] = targetId;
	order[5] = orderX;
	order[6] = orderY;
	order[7] = formation;
	order[8] = abid;
	
	Net.TickOrders.push(order);
	Net.addOrderQueue(order);
}

Net.loop = function(){
	//refresh order delay based on latency
	var latency = NetConnection.getMaxLatency();
	if(latency >= Net.orderDelay){
		Net.orderDelay ++; //if latency is too high, extend the order delay
	}else if(latency < Net.orderDelay){
		Net.orderDelay --; //if latency is back to acceptable, we can slowly start to decrease order delay
	}
	Net.orderDelay = Math.max(Net.orderDelay_min, Math.min(Net.orderDelay_max, Net.orderDelay ))
	
	Net.multiplexer++;
	if(Net.isClient && Net.multiplexer%Net.tickrate==1){
		Net.clientTick();
	}else if(Net.isServer && Net.multiplexer%Net.tickrate==1){
		Net.serverTick();
	}
	
	NetConnection.checkTimeouts();
}

Net.ahead_of_others = function(){
	if( Net.resync_needed || NetConnection.anyone_needs_resync() ){
		console.log("wait for resync");
		return true;
	}
	
	for(var i=0;i<Net.Connections.length; ++i){
		var conn = Net.Connections[i];
		var lat = Gamestats.mapTime-conn.lastTimeEcho;
		if(isNaN(lat)){
			lat = 10;
		}
		
		if(Math.abs(lat - conn.latency) < 10){
			conn.latency = Math.round(conn.latency*0.75+lat*0.25);
		}else{
			conn.latency = lat;
		}
		var predicted_other_time = conn.lastTime + (lat/2);
		
		if(!M.isMenu){
			if(conn.lastTime < conn.lastTimeEcho && !Net.lastPacket.halt
			&& lat > 4+Net.multiplexer%6 //other side is behind even our last packet
			|| conn.wait_for_my_loading || lat > 100/*|| Net.TickQueue.length > Net.tick_wait_count*/
			|| conn.FileOutTransfers.length> 0 || conn.FileInTransfers.length > 0){
				//hard freeze
				Net.waiting_for_sync = 1;
				console.log("F");
				return true;		
			}else if(Gamestats.mapTime-predicted_other_time>Net.tickrate && Net.multiplexer%2 ){
				//random halt
				console.log("H");
				return true;
			}
		}
	}

	Net.waiting_for_sync = 0;
	return false;
}

Net.writeChat = function(msg){
	GUI.Alert_Chat(msg, Control.currentPlayer.id);
	if(Net.online){
		Net.TickChats.push([Control.currentPlayer.id, msg]);
	}
}
Net.receiveChat = function(msg){
	SoundObject.chat.play(0,0);
	GUI.Alert_Chat(msg[1], msg[0]);
}
Net.setUserName = function(name){
	if(Net.online){
		Net.TickUserName = name;
	}
	Net.userName = name;
}

Net.Hashes = [];
Net.STORE_DEBUG = function(){
	if(Gamestats.mapTime < 2){
		Net.Hashes = [];
	}
	if(Gamestats.mapTime % 300 == 0){
		var posHash = 0;
		for(var i=0;i<Units.length;++i){
			posHash+=(Units[i].x+Units[i].y)*0.01;
		}
		Net.Hashes.push(posHash);
		console.log(Net.Hashes.length,  posHash%1);
	}	
}

function FileTransfer(conn, data, fragSize, fileId){
	this.frags = [];
	this.isOut = false;
	this.fileId = fileId;
	this.conn = conn;
	
	if(data){ //this is an outward file transfer
		this.isOut = true;
		this.fragSize = fragSize;
		this.fileId = conn.nextOutTransferId;
		this.conn.nextOutTransferId++;
		
		this.fragCount = Math.ceil(data.length/this.fragSize);
		this.lastSentFragId = 0;
		for(var i=0; i<data.length; i+=fragSize){
			this.frags.push( data.substr(i, fragSize) );
		}
	}
}

//remove from both transfer arrays (should only be in one, but better safe than sorry)
FileTransfer.prototype.remove = function(){
	var arrPos = this.conn.FileInTransfers.indexOf( this );
	if(arrPos >= 0){
		this.conn.FileInTransfers.splice(arrPos, 1);
	}
	arrPos = this.conn.FileOutTransfers.indexOf( this );
	if(arrPos >= 0){
		this.conn.FileOutTransfers.splice(arrPos, 1);
	}
}
//receiver is acknowledging the arrival of our fragment, now we no longer need the frag
//could be expanded to support multiple destinations with an ack bitmask
FileTransfer.prototype.ack = function(fragId){
	this.frags[fragId] = 0;
}

FileTransfer.prototype.transferOutLoop = function(){
	var done = true;
	//cycle through fragments and send the first one that hasn't yet been acknowledged by the receiver
	for(var i=0;i<this.frags.length;++i){
		if(this.lastSentFragId >= this.fragCount){
			this.lastSentFragId = 0;
		}
		if(this.frags[this.lastSentFragId]){
			//frag is zero if it's already been acknowledged by receiving end
			done = false;
			this.conn.nextOutFileFrag = this.packFrag( this.lastSentFragId );
			break;
		}
		this.lastSentFragId++;
	}
	if(done){
		this.remove();
	}
}

FileTransfer.prototype.receiveFrag = function(frag){
	if(frag[0] == this.fileId && frag[4].length == frag[3] ){
		//send signal to sender that this frag of this file is received
		Net.TickTransferAcks.push([frag[0],frag[1]]);
		this.fragCount = frag[2];
		this.frags[ frag[1] ] = frag[4];
		//check integrity
		var done = true;
		for (var i=0;i<this.fragCount;++i){
			if(!this.frags[i]){
				done = false;
			}
		}
		if(done){
			this.receiveComplete();
			this.remove();
		}
	}
}

FileTransfer.prototype.receiveComplete = function(){
	this.data = "";
	for(var i=0;i<this.frags.length;++i){
		this.data += this.frags[i];
	}
	console.log("Transfer done: "+ this.data.length);
	Net.resync(this.data);
	this.data = null;
}

FileTransfer.prototype.packFrag = function(fragId){
	return [ this.fileId, fragId , this.fragCount, this.frags[fragId].length , this.frags[fragId] ];
}

FileTransfer.decodeAcks = function(conn, acks){
	for(var i=0;i<acks.length;++i){
		for(var j=0;j< conn.FileOutTransfers.length;++j){
			if(acks[i][0] ==  conn.FileOutTransfers[j].fileId ){
				 conn.FileOutTransfers[j].ack( acks[i][1] );
			}
		}
	}
}
FileTransfer.prepareAnyOutFrag = function(conn){
	for(var i=0;i<conn.FileOutTransfers.length;++i){
		conn.FileOutTransfers[i].transferOutLoop();
	}
}

FileTransfer.receiveAnyFrag = function(conn, frag){
	//if we only remember ids of currently active transfers,
	//a laggard fragment from the last finished transfer could restart it
	if( conn.incomingTransferHistory.indexOf(frag[0])>=0){
		for(var i=0;i< conn.FileInTransfers.length;++i){
			if(frag[0] ==  conn.FileInTransfers[i].fileId){
				conn.FileInTransfers[i].receiveFrag(frag);
				return;
			}
		}
	}else{
		//fileTransfer does not exist yet
		var newTransfer = new FileTransfer(conn, null, null, frag[0]);
		conn.FileInTransfers.push( newTransfer );
		conn.incomingTransferHistory.push( newTransfer.fileId );
		newTransfer.receiveFrag(frag);
		console.log("New FileInTransfer");
	}
}

FileTransfer.CreateOut = function(conn, data){
	var newTransfer = new FileTransfer(conn, data, 1000 ,  conn.nextOutTransferId );
	conn.nextOutTransferId ++;
	conn.FileOutTransfers.push( newTransfer );
}