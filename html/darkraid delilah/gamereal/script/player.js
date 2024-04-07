function Player(_id, _teamId){
	this.id = _id;
	this.team = _teamId;
	this.visGroup = _id;
	this.colorId = _id;
	this.laserColorId = _id;
	this.color = Player.Colors[this.colorId].color_int;
	this.colorFloat = Player.Colors[this.colorId].color_float;
	
	this.skirmishTeam = 1;
	this.skirmishRole = null;
	
	if(!this.color || !this.colorFloat){
		var c1 = Math.floor(Math.random()*256);
		var c2 = Math.floor(Math.random()*256);
		var c3 = 255-c1;
		this.color = [c1,c2,c3];
		this.colorFloat = [c1/255,c2/255,c3/255,1];
	}
	
	this.enemyArray = [];
	this.money = 50;
	this.coin = 0;
	this.coinLimit = 1000;
	//places where resources can be stored
	this.resourcePoints = [];
	this.workers = [];
	this.idleWorkerCount = 0;
	this.structures = [];
	this.maintenance = 0;//per second
	this.coinPerSecond = 0;
	this.lastTickIncome = 0;
	this.ai = null;
	this.counter = 0;
	this.moneySpent = 0;
	this.moneyGathered = 0;
	this.kills = 0;
	this.unitKills = 0;
	this.structureKills = 0;
	this.unitCount = 0;
	this.unitsLost = 0;
	this.rescuable = false;
	this.gotStartLocation = false;
	this.useCampaignUnitTypes = false;
}

Player.getSaveState = function(){
	var data = [];
	for(var i=0;i<Players.length;++i){
		var p = Players[i];
		var roleId = -1;
		var connId = 0;
		if(p.skirmishRole && M.isMelee){
			roleId = p.skirmishRole.id;
			connId = p.skirmishRole.connId;
		}
		data.push([p.money,p.coin,p.counter,p.kills,p.unitKills,p.structureKills, p.moneyGathered, p.team, p.visGroup, roleId, p.colorId, connId ]);
	}
	return data;
}

Player.loadSaveState = function(data){
	for(var i=0;i<data.length;++i){
		var p = Players[i];
		var pdat = data[i];
		p.money = pdat[0];
		p.coin = pdat[1];
		p.counter = pdat[2];
		p.kills = pdat[3];
		p.unitKills = pdat[4];
		p.structureKills = pdat[5];
		p.moneyGathered = pdat[6];
		p.team = pdat[7];
		p.visGroup =  pdat[8];
		p.setColor(pdat[10]);
		if(M.isMelee && pdat[9]>=0){
			p.visGroup = p.team;
			p.skirmishRole = PlayerRoleEntry.getById(pdat[9]);
			if(p.skirmishRole && p.skirmishRole.persona){
				p.makeAI(p.skirmishRole.persona);
			}else if(p.skirmishRole == PlayerRoleEntry.Human){
				if(Net.isClient){ //resync
					//we're not this human player, this is the server
					p.skirmishRole = PlayerRoleEntry.Server;
				}else{
					Player.defaultHumanPlayer = p.id;
					Control.changeCurrentPlayer(p.id);
				}
			}else if(p.skirmishRole.isHuman && Net.isClient){ //other player, multiplayer only
				if(Net.my_server_connId == pdat[11] ){//this is me
					p.skirmishRole = PlayerRoleEntry.Human;
					Player.defaultHumanPlayer = p.id;
					Control.changeCurrentPlayer(p.id);
				}
			}
		}else{
			p.skirmishRole = null;
		}
	}
	this.generate_all_allegiance_arrays();
}

Player.prototype.levelStart = function(){
	this.resourcePoints = [];
	this.workers = [];
	this.structures = [];
	this.idleWorkerCount = 0;
	if(M.isMelee){
		this.money = Gamestats.skirmishStartResource;
	}else{
		this.money = 50;
		this.setColor(this.id);
	}
	
	this.unitCount = 0;
	this.unitsLost = 0;
	this.maintenance = 0;
	this.coin = 0;
	this.coinPerSecond = 0;
	this.lastTickIncome = 0;
	this.moneyGathered = 0;
	this.moneySpent = 0;
	this.counter = 0;
	this.kills = 0;
	this.unitKills = 0;
	this.structureKills = 0;
}

Player.prototype.setColor = function(id){
	this.colorId = id;
	if(id>=0 && id<Player.Colors.length){
		this.color = Player.Colors[this.colorId].color_int;
		this.colorFloat = Player.Colors[this.colorId].color_float;
		this.laserColorId = Player.Colors[this.colorId].laserColorId;
	}	
}

Player.prototype.remove_all_units = function(){
	for(var i=Units.length-1;i>=0;--i){
		if(Units[i].owner == this){
			Units[i].Remove();
		}
	}
}

Player.prototype.makeStartLocation = function(p){
	var hall = Unit.Create(p.x,p.y,this,UnitPrototype.Center,0);
	this.gotStartLocation = true;
	if(this.id == Player.defaultHumanPlayer){
		cam.setPos_with_bounds(hall.x, hall.y);
	}
	if(hall){
		for(var i=0;i<5;++i){
			Unit.Create(hall.x+i*0.25-0.5,hall.y-1.6,this,UnitPrototype.Probe,3.14);
		}
	}	
}
Player.prototype.loop = function(){
	this.counter++;
	if(this.counter%30 == 0){
		this.spend(0,this.maintenance);
		this.getCoin(this.coinPerSecond);
		this.checkIdleWorkers();
	}
	if(this.ai && this.counter %30 == this.id*3){
		this.ai.loop();
	}
	this.lastTickIncome = this.getIncome();
	
	if(M.isMelee){
		this.coinPerSecond = 2;
	}else{
		this.coinPerSecond = 0;
	}
	
	this.coinLimit = 100;
}
Player.prototype.hasUpgrade = function(upgrade){
	return upgrade.ownerArray[this.id];
}
Player.prototype.hasAbility = Player.prototype.hasUpgrade;
Player.prototype.canUpgrade = function(upgrade){
	return upgrade.allowArray[this.id];
}

Player.prototype.spend = function(money,coin){
	this.money = Math.max(0, this.money-money);
	this.coin = Math.max(0, this.coin-coin);
	this.moneySpent += money;
}
Player.prototype.getMoney = function(amt){
	this.money += amt;
	this.moneyGathered += amt;
}
Player.prototype.getCoin = function(amt){
	this.coin = Math.min(this.coinLimit, amt+this.coin);
}
Player.prototype.getIncome = function(){
	return this.coinPerSecond-this.maintenance;
}

Player.prototype.loseUnit = function(u){
	u.proto.playerCounts[this.id]--;
	this.unitsLost ++;
	this.maintenance-=u.proto.maintenance;
}
Player.prototype.gainUnit = function(u){
	u.proto.playerCounts[this.id]++;
	this.unitCount ++;
	this.maintenance+=u.proto.maintenance;
}
Player.prototype.unitKilled = function(u){
	u.proto.playerKills[this.id]++;
	if(!u.proto.isResource){
		if(u.isStructure){
			this.structureKills++;
		}else{
			this.unitKills++;
		}
		this.kills ++;
	}
}

Player.prototype.getTypeCount = function(proto){
	return proto ? proto.playerCounts[this.id] : 0;
}
Player.prototype.loseUnit_born = function(u){
	u.proto.playerCounts_born[this.id]--;
}
Player.prototype.gainUnit_born = function(u){
	u.proto.playerCounts_born[this.id]++;
}
Player.prototype.getTypeCount_born = function(proto){
	return proto ? proto.playerCounts_born[this.id] : 0;
}
Player.prototype.getPassiveBuildingCount = function(){
	//if player has only these structures, it loses
	return this.getTypeCount(UnitPrototype.Computer)+this.getTypeCount(UnitPrototype.Cooler);
}
Player.prototype.getRandomOfBuilding = function(proto){
	var count = this.getTypeCount_born(proto);
	if(count > 0){
		var nth = Math.floor(RAND()*count*0.999);
		for(var i=0;i<this.structures.length;++i){
			var b = this.structures[i];
			if(b.proto == proto && b.born){
				if(nth == 0){
					return b;
				}
				nth--;
			}
		}
	}
	return null;
}

Player.prototype.getIdleBuilding = function(proto){
	var count = this.getTypeCount_born(proto);
	if(count > 0){
		var reverse_iter = RAND()<0.5;
		var i = reverse_iter?this.structures.length-1:0;
		var inc = reverse_iter?-1:1;
		for(;;i+=inc){
			if(i < 0 || i>=this.structures.length){
				break;
			}
			var structure = this.structures[i];
			if(structure.proto == proto && structure.born && structure.trainingQueue.length<2){
				return structure;
			}
		}
	}
}
Player.prototype.checkIdleWorkers = function(){
	this.idleWorkerCount = 0;
	for(var i=0;i<this.workers.length;++i){
		if(this.workers[i].task.id == Task.id_IdleTask){
			this.idleWorkerCount ++;
		}
	}
}

Player.prototype.makeAI = function(persona){
	if(!this.ai){
		this.ai = new AI(this);
	}
	if(persona){
		persona.setter(this.ai);
	}
}

Player.prototype.setTeam = function(newTeam){
	if(this.team != newTeam){
		this.team = newTeam;
		Player.generate_all_allegiance_arrays();
	}
}
Player.prototype.addResourcePoint = function(u){
	if(this.resourcePoints.indexOf(u) <0){
		this.resourcePoints.push(u);
	}
}
Player.prototype.deleteResourcePoint = function(u){
	var id = this.resourcePoints.indexOf(u);
	if(id>=0){
		this.resourcePoints.splice(id,1);
	}
}
Player.prototype.addWorker = function(u){
	if(this.workers.indexOf(u) <0){
		this.workers.push(u);
	}
}
Player.prototype.deleteWorker = function(u){
	var id = this.workers.indexOf(u);
	if(id>=0){
		this.workers.splice(id,1);
	}
}
Player.prototype.addStructure = function(u){
	if(this.structures.indexOf(u) <0){
		this.structures.push(u);
	}
}
Player.prototype.deleteStructure = function(u){
	var id = this.structures.indexOf(u);
	if(id>=0){
		this.structures.splice(id,1);
	}
}
Player.prototype.getClosestStructure = function(p, break_if_lower){
	var minPoint = null;
	var minDist = 999;
	break_if_lower = break_if_lower || -1;
	for(var i=0;i<this.structures.length;++i){
		var dist = Unit_Distance(this.structures[i],p);
		if(dist < break_if_lower){
			return null;
		}
		if(dist < minDist){
			minDist = dist;
			minPoint = this.structures[i];
		}
	}
	return minPoint;
}

Player.prototype.getRandomResourcePoint = function(){
	return Utils.randomElem(this.resourcePoints);
}
Player.prototype.get_worker_at_townhall = function(townhall){
	var searchStart = Pathfinder.getNodeAt_Robust(townhall.x,townhall.y-2);
	var builder = Pathfinder.Dijkstra_Unit_Search(searchStart, 12, 
	SearchFilter.get_builder_worker,townhall,0);
	return builder;
}


Player.prototype.getClosestResourcePoint = function(p){
	var minPoint = null;
	var minDist = 999;
	for(var i=0;i<this.resourcePoints.length;++i){
		if(!this.resourcePoints[i].born){continue;}
		var dist = Unit_Distance(this.resourcePoints[i],p);
		if(dist < minDist){
			minDist = dist;
			minPoint = this.resourcePoints[i];
		}
	}
	return minPoint;
}

Player.prototype.getClosestEmptyExpansion = function(p){
	var minPoint = null;
	var minDist = 999;
	for(var i=0;i<AI.Points.length;++i){
		var poi = AI.Points[i];
		
		if(poi&&poi.worth > 2000){
			var node = Pathfinder.getNodeAt_Robust(poi.x,poi.y);
			//empty or guarded by neutral building
			if( poi.maxInfluenceId == 0 || poi.maxInfluenceId!=0 && node.passability>4 ){
				var dist = Unit_Distance(poi, p);
				if(dist < minDist && dist > 8){
					minDist = dist;
					minPoint = poi;
				}
			}
		} 
	}
	return minPoint;
}

Player.prototype.getArmySize = function(){
	return this.getInfantrySize() + this.getCavalrySize() + this.getAirforceSize();
}
Player.prototype.getInfantrySize = function(){
	var force = this.getTypeCount(UnitPrototype.Pioneer);
	force += this.getTypeCount(UnitPrototype.Marine);
	force += this.getTypeCount(UnitPrototype.Stinger);
	force += this.getTypeCount(UnitPrototype.Zapper);
	force += this.getTypeCount(UnitPrototype.EvilProbe);
	return force;
}
Player.prototype.getCavalrySize = function(){
	var force = 0;
	force += this.getTypeCount(UnitPrototype.Laika);
	force += this.getTypeCount(UnitPrototype.Tank);
	force += this.getTypeCount(UnitPrototype.Walker);
	force += this.getTypeCount(UnitPrototype.Electropod);
	force += this.getTypeCount(UnitPrototype.Walker_Robot);
	return force;
}
Player.prototype.getAirforceSize = function(){
	var force = 0;
	force += this.getTypeCount(UnitPrototype.Mantis);
	force += this.getTypeCount(UnitPrototype.Widow);
	force += this.getTypeCount(UnitPrototype.Starship);
	return force;
}

Player.prototype.getRandomEnemyPlayer = function(){
	return Utils.randomElem(this.enemyArray);
}
Player.prototype.generate_allegiance_arrays = function(){
	this.enemyArray = [];
	this.alliedArray = [];
	for(var i=1;i<Players.length;++i){
		if(Players[i].team != this.team){
			this.enemyArray.push(Players[i])
		}else if(Players[i]!=this){
			this.alliedArray.push(Players[i])
		}
	}
}

function PlayerColor(id, name, color_int, color_float){
	this.name = name;
	this.color_int = color_int;
	this.color_float = color_float;
	this.id = id;
	this.laserColorId = id;
}
Player.Colors = [];
Player.Colors[0] = new PlayerColor(0,"White", [255,255,255], [1,1,1,1]);
Player.Colors[1] = new PlayerColor(1,"Gold", [240,230,0], [0.95,0.94,0,1]);
Player.Colors[2] = new PlayerColor(2,"Blue", [50,0,200], [0.2,0,0.85,1]);
Player.Colors[3] = new PlayerColor(3,"Red", [255,0,0], [1,0,0,1]);
Player.Colors[4] = new PlayerColor(4,"Green", [64,175,25], [0.25,0.75,0.1,1]);
Player.Colors[5] = new PlayerColor(5,"Purple", [190,30,190], [0.8,0.1,0.8,1]);
Player.Colors[6] = new PlayerColor(6,"Orange", [230,120,0], [1,0.5,0,1]);
Player.Colors[7] = new PlayerColor(7,"Black", [30,30,30], [0.3,0.3,0.3,1]);
Player.Colors[7].laserColorId = 0;
Player.Colors[8] = new PlayerColor(8,"Cyan", [20,180,180], [0.1,0.9,0.9,1]);

Player.currentPlayerColor = [0,255,0];
Player.defaultHumanPlayer = 1;

Player.Init = function(){
	this.defaultHumanPlayer = 1;
	for(var i=0;i<Players.length;++i){
		Players[i].team = i;
		Players[i].ai = null;
		Players[i].gotStartLocation = false;
		Players[i].visGroup = i;
		if(M.isMelee && i > 0){
			Players[i].rescuable = false;
			Players[i].team = Players[i].skirmishTeam;
			Players[i].visGroup = Players[i].team;
			if(Players[i].skirmishRole == null){
				//this will skip start location generation
				Players[i].gotStartLocation = true;
			}else if(Players[i].skirmishRole == PlayerRoleEntry.Human){
				this.defaultHumanPlayer = i;
				Control.changeCurrentPlayer(i);
			}else if(Players[i].skirmishRole.persona){
				Players[i].makeAI( Players[i].skirmishRole.persona );
			}
		}
	}

	if(!M.isMelee){
		Players[4].team = 1;
		Players[4].rescuable = true;
	}
	

	for(var i=0;i<Players.length;++i){
		Players[i].levelStart();
	}
	Player.generate_all_allegiance_arrays();
	AI.Points = [];
}
Player.generate_all_allegiance_arrays = function(){
	for(var i=1;i<Players.length;++i){
		Players[i].generate_allegiance_arrays();
	}
}

//gives a brain to the player
function AI(player){
	this.owner = player;
	//this.Members = [];
	//this.Buildings = [];
	this.stance = AI.stance_wait;
	this.strength = 0;
	//this.buildOrder = [
	//	UnitPrototype.
	//]
	this.wait_for_barracks = 0;
	this.wait_for_farm = 0;
	this.wait_for_worker = 0;
	this.wait_for_factory = 0;
	this.wait_for_infantry = 0;
	this.wait_for_airforce = 0;
	this.wait_for_cavalry = 0;
	this.wait_for_tower = 0;
	this.wait_for_center = 0;
	this.wait_for_deposit = 0;
	this.wait_for_capacitor = 0;
	this.wait_for_commandpost = 0;
	this.wait_for_hangar = 0;
	
	this.wait_for_assault = 0;
	this.last_assault_wait = 0;
	
	this.attack_min_size = 8;
	this.selection = [];
	this.Squads = [];
	
	this.max_infantry = 9999;
	this.max_cavalry = 9999;
	this.max_airforce = 9999;
	this.max_barracks = 9999;
	this.max_factory = 9999;
	this.max_farm = 9999;
	this.max_capacitor = 9999;
	this.max_deposit = 9999;
	this.max_hangar = 3;
	this.max_workers = 9999;
	this.barracks_needed_for_factory = 1;
	this.min_attacking_force = 5;
	this.capacitor_money_treshold = 2300; 
	this.deposit_money_treshold = 1500;
	if(!DESKTOP_VERSION){ //no capacitor in demo
		this.capacitor_money_treshold = 999999;
	}
	
	this.walker_money_treshold = 2700;
	this.starship_money_treshold = 3100;
	this.rich_treshold = 500;
	this.ultra_rich_treshold = 1000;
	this.rich_coin_treshold = 850;
	this.coin_per_towers = 20;
	this.coin_per_deposit = 30;
	this.coin_per_barracks = 18;
	this.coin_per_factory = 22;
	this.coin_per_hangar = 30;
	this.infantry_train_wait_time = 120;
	this.cavalry_train_wait_time = 120;
	this.airforce_train_wait_time = 120;
	this.infantry_cavalry_ratio = 1.5;
	this.stinger_pioneer_ratio = 0.5;
	this.tank_laika_ratio = 0.45;
	this.tank_electropod_ratio = 0.75;
	this.tank_walker_ratio = 0.4;
	this.marine_pioneer_ratio = 0.5;
	this.starship_mantis_ratio = 0.4;
	this.can_train_pioneer = true;
	this.worker_train_wait_time = 300; 
	this.last_assault_pos = null;
	//how much smaller the enemy force must be to allow attacking
	this.assault_enemy_size_factor = 0.5;
	this.min_workers_for_army = 4;
	
	this.infantry=0;
	this.cavalry=0;
	this.airforce = 0;
	this.infantry_bought_total = 0;
	this.cavalry_bought_total = 0;
	
	this.expansion_money_tiers = [0,2400,4500,7000,10500,14000,18000,22000];
	this.expansion_army_tiers = [0,3,7,10,12,14,15,16,17];
	
	this.cheat_money_bonus = 0;
	this.cheat_coin_bonus = 0;
}

AI.prototype.loop = function(){
	this.owner.money += this.cheat_money_bonus;
	this.owner.coin += this.cheat_coin_bonus;
	
	this.wait_for_barracks=Math.max(0,this.wait_for_barracks-30);
	this.wait_for_farm=Math.max(0,this.wait_for_farm-30);
	this.wait_for_worker=Math.max(0,this.wait_for_worker-30);
	this.wait_for_factory =Math.max(0,this.wait_for_factory-30);
	this.wait_for_tower =Math.max(0,this.wait_for_tower-30);
	this.wait_for_infantry =Math.max(0,this.wait_for_infantry-30);
	this.wait_for_cavalry =Math.max(0,this.wait_for_cavalry-30);
	this.wait_for_airforce =Math.max(0,this.wait_for_airforce-30);
	this.wait_for_center = Math.max(0,this.wait_for_center-30);
	this.wait_for_deposit = Math.max(0,this.wait_for_deposit-30);
	this.wait_for_commandpost = Math.max(0,this.wait_for_commandpost-30);
	this.wait_for_capacitor = Math.max(0,this.wait_for_capacitor-30);
	this.wait_for_hangar = Math.max(0,this.wait_for_hangar-30);
	
	this.wait_for_assault =Math.max(0,this.wait_for_assault-30);

	
	var mySize = this.owner.getArmySize();
	this.infantry = this.owner.getInfantrySize();
	this.cavalry = this.owner.getCavalrySize();
	
	
	for(var i=this.Squads.length-1;i>=0;--i){
		this.Squads[i].loop();
	}
	if(mySize >= this.attack_min_size){
		if(this.wait_for_assault <= 0){
			var enemy = this.getEnemy();
			var enemySize = enemy.getArmySize();
			if(enemy.structures.length >0 && mySize > enemySize*this.assault_enemy_size_factor || RAND()<0.02){
				if(mySize > enemySize*1.7 || this.last_assault_wait > 3000){
					this.attackEnemyBase(enemy,4+RAND()*3);
				}else{
					this.attackEnemyBase(enemy,RAND()*3);
				}
			}
		}
	}
	var income = this.owner.coinPerSecond-this.owner.maintenance + this.cheat_coin_bonus;
	
	if( (this.owner.workers.length > this.min_workers_for_army || this.owner.money > 400)
	&& (this.owner.money > 50+ Math.pow(this.owner.coinPerSecond*12,0.75))
		|| this.owner.workers.length >= this.max_workers ){
		
		if(income < 2+this.owner.workers.length/8+this.owner.resourcePoints.length){
			//supply blocked
		
			if(this.wait_for_farm <=0){
				this.build_farm();
			}
		}else{
			var expansionTier = this.owner.resourcePoints.length;
			if(mySize > this.expansion_army_tiers[expansionTier] //we have army needed for next expansion
			&& this.owner.moneyGathered > this.expansion_money_tiers[expansionTier]){ //it is time for next expansion
				//expand
				if(this.wait_for_center<=0){
					this.build_new_expansion();
				}
			}
			
			if(this.owner.coin > this.owner.coinPerSecond && this.owner.money > 100){
			
				this.trainArmy();
				if(this.owner.coin >this.rich_coin_treshold &&this.owner.money>this.rich_treshold){
					this.trainArmy();
				}
			}
		}
		if(this.owner.getTypeCount(UnitPrototype.RailTower) < this.owner.coinPerSecond/this.coin_per_towers){
			if(this.wait_for_tower <=0){
				this.build_tower();
			}
		}
		
		
		var deposit_count = this.owner.getTypeCount(UnitPrototype.Deposit);
		if(this.owner.moneyGathered > this.deposit_money_treshold && deposit_count < this.owner.coinPerSecond/this.coin_per_deposit
		&& deposit_count < this.max_deposit){
			if(this.wait_for_deposit <= 0){
				this.build_anywhere(UnitPrototype.Deposit);
			}
		}
		if(deposit_count > 0){
			this.check_repairDrone();
		}		
	}else{
		if(this.wait_for_worker <=0){
			this.trainWorkerAnywhere();
		}
	}
	
	if((this.owner.workers.length < this.owner.coinPerSecond*0.33+this.owner.resourcePoints.length
	|| this.owner.moneyGathered < 500) && this.owner.workers.length<this.max_workers){
		if(this.wait_for_worker <=0){
			this.trainWorkerAnywhere();
		}
	}	
	
	if(this.owner.money > this.rich_treshold && mySize > 5){
		//if we have a lot of money, let's just expand
		if(this.owner.coin < 5000 || this.owner.money>this.ultra_rich_treshold){
			if(this.wait_for_farm <=0 || this.owner.money>this.ultra_rich_treshold&&this.wait_for_farm <=300){
				this.build_farm();
			}
		}else if(income > 0){
			this.trainArmy();
		}
	}
	this.special_loop();
}

AI.prototype.getEnemy = function(){
	return this.owner.getRandomEnemyPlayer();
}

AI.prototype.special_loop = Utils.DO_NOTHING;
AI.prototype.trainArmy = function(){
	if(RAND()<0.5 && this.infantry < this.max_infantry){
		if(this.wait_for_infantry <= 0){
			this.trainInfantry();
		}
	}else if(this.cavalry < this.max_cavalry){
		if( this.infantry*this.infantry_cavalry_ratio > this.cavalry && this.infantry_bought_total > 5){
			if(this.wait_for_cavalry <= 0){
				this.trainCavalry();
			}	
		}
	}
	if(this.airforce < this.max_airforce && this.cavalry_bought_total > 3){
		if(this.wait_for_airforce <= 0){
			this.trainAirforce();
		}
	}
}

AI.prototype.trainInfantry = function(x,y){
	//getRandomIdleOfBuilding
	var barracks_count = this.owner.getTypeCount(UnitPrototype.Barracks);
	var barracks = this.owner.getIdleBuilding(UnitPrototype.Barracks);
	if(barracks){
		this.infantry_bought_total ++;
		this.wait_for_infantry = this.infantry_train_wait_time - barracks_count*30;
		
		if(RAND() < this.marine_pioneer_ratio && this.infantry_bought_total > 2){
			if(this.owner.getTypeCount_born(UnitPrototype.CommandPost)>0){
				Unit.getAbilityInstance(barracks, Ability.TrainMarine).cast();
			}else if(this.wait_for_commandpost <= 0 && this.owner.getTypeCount(UnitPrototype.CommandPost)<=0){
				this.build_anywhere(UnitPrototype.CommandPost);
				this.infantry_bought_total --;
				this.wait_for_infantry = 0;
			}
		}else{
			if(this.owner.moneyGathered>this.capacitor_money_treshold && RAND()<this.stinger_pioneer_ratio){
				if(this.owner.getTypeCount_born(UnitPrototype.Capacitor)>0){
					Unit.getAbilityInstance(barracks, Ability.TrainStinger).cast();
				}else if(this.wait_for_capacitor <= 0 && this.owner.getTypeCount(UnitPrototype.Capacitor)<=0){
					this.build_anywhere(UnitPrototype.Capacitor)
					this.infantry_bought_total --;
					this.wait_for_infantry = 0;
				}
			}else if(this.can_train_pioneer){
				Unit.getAbilityInstance(barracks, Ability.TrainPioneer).cast();
			}
		}
	}
	if(this.wait_for_barracks <= 0 && barracks_count < this.max_barracks){
		if(!barracks 
		|| barracks_count<Math.pow(this.owner.coinPerSecond/this.coin_per_barracks,0.85) && this.owner.getInfantrySize() > barracks_count+2){
			this.build_anywhere(UnitPrototype.Barracks);
		}
	}
}

AI.prototype.trainCavalry = function(x,y){
	//getRandomIdleOfBuilding
	var factory_count = this.owner.getTypeCount(UnitPrototype.Factory);
	if(this.owner.getTypeCount(UnitPrototype.Barracks)< this.barracks_needed_for_factory){
		if(this.wait_for_barracks <=0){
			this.build_anywhere(UnitPrototype.Barracks);
		}
	}else{
		this.wait_for_cavalry = this.cavalry_train_wait_time - factory_count*30;
		var factory = this.owner.getIdleBuilding(UnitPrototype.Factory);
		if(factory){
			this.cavalry_bought_total ++;
			if(this.owner.getTypeCount(UnitPrototype.Capacitor) > 0 && RAND()< this.tank_laika_ratio){
				if(this.owner.moneyGathered > this.walker_money_treshold &&  RAND()< this.tank_walker_ratio){
					//WALKER
					if(this.owner.hasUpgrade(Upgrade.Walker)){
						Unit.getAbilityInstance(factory, Ability.TrainWalker).cast();
					}else if(this.owner.getTypeCount(UnitPrototype.Deposit) > 0){
						this.research(Ability.Research_Walker);
					}
				}else if(RAND()< this.tank_electropod_ratio ){
					//TANK
					Unit.getAbilityInstance(factory, Ability.TrainTank).cast();
				}else{
					//ELECTROPOD
					Unit.getAbilityInstance(factory, Ability.TrainElectropod).cast();
				}
			}else{
				//LAIKA
				Unit.getAbilityInstance(factory, Ability.TrainLaika).cast();
			}
		}
		if(this.wait_for_factory <= 0 && factory_count < this.max_factory){
			if(!factory 
			|| factory_count<Math.pow(this.owner.coinPerSecond/this.coin_per_factory,0.85) && this.owner.getCavalrySize() > factory_count+2){
				this.build_anywhere(UnitPrototype.Factory); 
			}
		}
	}
}

AI.prototype.trainAirforce = function(x,y){
	//getRandomIdleOfBuilding
	var hangar_count = this.owner.getTypeCount(UnitPrototype.Hangar);
	this.wait_for_airforce = this.airforce_train_wait_time - hangar_count *30;
	var hangar = this.owner.getIdleBuilding(UnitPrototype.Hangar);
	if(hangar){
		if(this.owner.moneyGathered > this.starship_money_treshold &&  RAND()< this.starship_mantis_ratio){
			if(this.owner.hasUpgrade(Upgrade.Starship)){
				Unit.getAbilityInstance(hangar, Ability.TrainStarship).cast();
			}else if(this.owner.getTypeCount(UnitPrototype.Deposit) > 0){
				this.research(Ability.Research_Starship);
			}
		}else{
			Unit.getAbilityInstance(hangar, Ability.TrainMantis).cast();
		}
	}
	if(this.wait_for_hangar <= 0 && hangar_count < this.max_hangar && this.owner.getTypeCount_born(UnitPrototype.Deposit) > 0){
		if(!hangar 
		|| hangar_count < Math.pow(this.owner.coinPerSecond/this.coin_per_hangar,0.85) && this.owner.getAirforceSize() > hangar_count ){
			this.build_anywhere(UnitPrototype.Hangar); 
		}
	}
}


AI.prototype.research = function(researchAbility){
	if(researchAbility == Ability.Research_Walker || researchAbility == Ability.Research_Starship){
		var buildingType = UnitPrototype.Deposit;
	}
	var b = this.owner.getRandomOfBuilding(buildingType);
	if(b){
		var ab = Unit.getAbilityInstance(b,researchAbility);
		if(ab){
			Unit.getAbilityInstance(b,researchAbility).cast();
		}
	}
}

AI.prototype.build_anywhere = function(proto){
	var townhall = Utils.randomElem(this.owner.resourcePoints);
	if(townhall){
		this.build_from_townhall_to(proto, townhall, null);
	}
}
AI.prototype.build_near_structure = function(proto, otherStructure){
	var townhall = Utils.randomElem(this.owner.resourcePoints);
	if(townhall){
		this.build_from_townhall_to(proto, townhall, otherStructure);
	}
}

AI.prototype.build_from_townhall_to = function(proto, townhall, dest){
	var builder = this.owner.get_worker_at_townhall(townhall);
	var buildSpace = Math.max(4, proto.structureSize+2);
	
	if(builder){
		if(!dest){
			//build anywhere
			if(proto == UnitPrototype.Factory){
				buildSpace = 6;
			}
			
			var buildSite = this.getBuildSite(builder.atNode, [buildSpace, proto]);
			/*if(buildSite && proto == UnitPrototype.Factory){
				buildSite = Pathfinder.map[buildSite.nodey+1][buildSite.nodex];
			}*/
		}else if(dest.isStructure){
			//build around other building
			if(dest.proto.structureSize == 1 && proto.structureSize == 1){
				buildSpace = 1;
			}
			var buildSite = this.getBuildSite(Pathfinder.getNodeAt_Robust(dest.x,dest.y),[buildSpace, proto]);
		}else{
			var buildSite = this.getBuildSite(Pathfinder.getNodeAt_Robust(dest.x,dest.y),[buildSpace, proto]);
		}
		
		if(buildSite){
			this.build_at_node(proto, buildSite, builder);
		}
	}else{
		//NO WORKER
	}
}

AI.prototype.build_new_expansion = function(poi){
	var townhall = this.owner.resourcePoints[0];
	var poi = this.owner.getClosestEmptyExpansion(townhall);
	if(poi){
		var enemyInfluence = poi.getEnemyInfluence(this.owner);
		if(enemyInfluence > 0){//expansion needs to be taken
			this.attackPOI(poi, 2 + Math.round(RAND()*2))
		}else{//safe to build Hub
			this.build_from_townhall_to(UnitPrototype.Center, townhall, poi);
		}
	}	
}

AI.prototype.build_farm = function(){
	if(this.owner.getTypeCount(UnitPrototype.Computer) >= this.max_farm){
		return;
	}
	var b = this.owner.getRandomOfBuilding(UnitPrototype.Computer);
	if(b && Pathfinder.getClusterAt(b.x,b.y).heat<4){
		this.build_near_structure(UnitPrototype.Computer, b);
	}else{
		this.build_anywhere(UnitPrototype.Computer);
	}
}

AI.prototype.build_tower = function(){
	/*for(var i=0;i<this.owner.structures.length;++i){
		var b = this.owner.structures[i];
		if(b.proto==UnitPrototype.RailTower && Pathfinder.getClusterAt(b.x,b.y).heat<6){
			this.build_near_structure(UnitPrototype.RailTower, b);
			return;
		}else if(b.proto.structureSize >)
	}*/
	var b = null;
	if(RAND() < 0.7){
		if(RAND()<0.7){
			b = Utils.lastElem(this.owner.resourcePoints);
		}else{
			b = Utils.randomElem(this.owner.resourcePoints);
		}
	}else{
		b = Utils.lastElem(this.owner.structures);
	}
	if(b){
		var builder = this.owner.get_worker_at_townhall(b);
		if(builder){
			var n = Pathfinder.Get_Free_Node_Radial(b.x,b.y,5+RAND()*5,5);
			if(n){
				this.build_at_node(UnitPrototype.RailTower, n, builder);
			}
		}
	}
}

AI.prototype.get_any_worker = function(){
	return Utils.randomElem(this.owner.workers);
}

AI.prototype.build_at_node_any_worker = function(proto, buildSite){
	var builder = this.get_any_worker();
	if(builder){
		this.build_at_node(proto, buildSite, builder);
		return true;
	}
	return false;
}

AI.prototype.build_at_node = function(proto, buildSite, builder){
	if(proto == UnitPrototype.Barracks){
		var ab = Unit.getAbilityInstance(builder, Ability.BuildBarracks);
		this.wait_for_barracks = 1000;
	}else if(proto == UnitPrototype.Computer){
		var ab = Unit.getAbilityInstance(builder, Ability.BuildComputer);
		this.wait_for_farm = 600;
	}else if(proto == UnitPrototype.Factory){
		var ab = Unit.getAbilityInstance(builder, Ability.BuildFactory);
		this.wait_for_factory = 1200;
	}else if(proto == UnitPrototype.RailTower){
		var ab = Unit.getAbilityInstance(builder, Ability.BuildRailTower);
		this.wait_for_tower = 1200;
	}else if(proto == UnitPrototype.Center){
		var ab = Unit.getAbilityInstance(builder, Ability.BuildCenter);
		this.wait_for_center = 3600;
	}else if(proto == UnitPrototype.Capacitor){
		var ab = Unit.getAbilityInstance(builder, Ability.BuildCapacitor);
		this.wait_for_capacitor = 2000;
	}else if(proto == UnitPrototype.CommandPost){
		var ab = Unit.getAbilityInstance(builder, Ability.BuildCommandPost);
		this.wait_for_commandpost = 1500;
	}else if(proto == UnitPrototype.Deposit){
		var ab = Unit.getAbilityInstance(builder, Ability.BuildDeposit);
		this.wait_for_deposit = 1500;
	}else if(proto == UnitPrototype.Hangar){
		var ab = Unit.getAbilityInstance(builder, Ability.BuildHangar);
		this.wait_for_hangar = 1300;
	}else{
		console.log("Invalid Build Type")
	}
	if(ab.proto.techCondition(this.owner)){
		var dummy = new AbilityTargetDummyUnit(buildSite.nodex, buildSite.nodey);
		ab.target = dummy;
		builder.addSubTask( Task.ChaseTask_SingleTarget( builder, dummy, ab));
	}
}

AI.prototype.check_repairDrone = function(){
	if(this.owner.getTypeCount_born(UnitPrototype.Deposit)>0){
		var depo = this.owner.getRandomOfBuilding(UnitPrototype.Deposit);
		if(!depo){
			return;
		}
		var ab = Unit.getAbilityInstance(depo, Ability.RepairDrone);
		if(ab && ab.cooldownCounter<=0){
			var u = null;
			if(RAND()<0.65){
				u = Utils.randomElem(Units);
			}else{
				for(var i=0;i<this.owner.structures.length;++i){
					if(this.owner.structures[i].born && this.owner.structures[i].hp < this.owner.structures[i].hp_max*0.85){
						u = this.owner.structures[i];
						if(RAND()<0.5){break;}
					}
				}
				this.structure_repair_request = null;
			}
			if(u && u.owner == this.owner && u.born && u.hp < u.hp_max ){
				ab.shots = 1;
				depo.addSubTask( Task.AttackTask_Base( depo, u ,ab));
			}
		}
	}	
}

AI.prototype.selectIdleTroops = function(selection_attempts){
	this.selection = [];
	for(var i=0;i<selection_attempts;++i){
		this.selectIdleAroundBuilding(Utils.randomElem(this.owner.structures));
	}
}

AI.prototype.attackPOI = function(poi, force){
	this.selectIdleTroops(force);
	Ai_Move_Handler(this.selection,new Point(poi.x, poi.y),Ability.AttackMove);
	this.wait_for_assault = 1000;
	this.last_assault_pos = poi;
}

AI.prototype.getSiegeTarget = function(enemy){
	var enemyBase = null;
	if(enemy.resourcePoints.length > 0){
		if(RAND()<0.5){
			enemyBase = Utils.randomElem(enemy.resourcePoints);
		}else{
			enemyBase = Utils.lastElem(enemy.resourcePoints);
		}
	}else{
		enemyBase = Utils.randomElem(enemy.structures);
	}
	return enemyBase;
}

AI.prototype.checkRandomControlPoint = function(){
	var p = Utils.randomElem(AI.Points);
	if(p && p.isControlPoint){
		if(p.controllerId != this.owner.id){
			this.attackPOI(p, 2+RAND()*4);
		}else{
			var n = Pathfinder.getNodeAt_Robust(p.x,p.y);
			if(n.passability > 0){
				this.build_at_node_any_worker(UnitPrototype.RailTower, n);
			}else if(n.structure){
				if(n.structure.owner.team != this.owner.team){
					this.attackPOI(p); 
				}else if(this.wait_for_tower <= 0){
					this.build_near_structure(UnitPrototype.RailTower, n.structure);
				}
			}
		}
	}
}


AI.prototype.attackEnemyBase = function(enemy, extra_selections){
	var enemyBase = this.getSiegeTarget(enemy);
	this.last_assault_pos = enemyBase;
	if(enemyBase){
		var selection_attempts = this.owner.structures.length/4+1+extra_selections;
		this.selectIdleTroops(selection_attempts);
		if(this.selection.length >= this.min_attacking_force){
			var squad = this.makeSquad(this.selection);
			if(RAND()<0.25){
				var harassed = enemy.get_worker_at_townhall(enemyBase);
				//explicit target, don't stop for anyone
				if(harassed){
					squad.targetUnit = harassed;
					//Ai_Move_Handler(this.selection,new Point(harassed.x, harassed.y),Ability.Move);
					Ai_Move_Handler(this.selection, harassed ,Ability.AttackMove);
				}
			}else{
				if(RAND()<0.5){
					squad.retreat_threshold = 0.1;
				}
				Ai_Move_Handler(this.selection,new Point(enemyBase.x, enemyBase.y),Ability.AttackMove);
			}
		}
	}	
	if(RAND()<0.4){
		this.wait_for_assault = 1000 + Math.floor(RAND()*3000);
	}else{
		if(RAND()<0.4){
			this.wait_for_assault = 100;
		}else{
			this.wait_for_assault = 600;
		}
	}
	this.last_assault_wait = this.wait_for_assault;
}

AI.prototype.sendIdleTroopsHome = function(troopLeader){
	this.selection = [];
	this.selectIdleAroundUnit(troopLeader);
	var struct = this.owner.getClosestStructure(troopLeader,5);
	if(struct){
		struct = Utils.randomElem(this.owner.structures);
		if(RAND()<0.4){
			var troop_sector =  Pathfinder.getSectorAt(troopLeader.x,troopLeader.y,0);
			var n = Pathfinder.Get_Alternative_Node_For_Different_Sector(troopLeader.atNode, struct.atNode, troop_sector, 0);
			if(n){
				var target = new Point(n.nodex+0.5, n.nodey+0.5);
				if(Unit_Distance(target, struct)<struct.structureSize*3){
					//otherwise structure is somewhere obscure
					Ai_Move_Handler(this.selection,new Point(n.nodex+0.5, n.nodey+0.5),Ability.AttackMove);
				}
			}
		}else if(this.last_assault_pos && this.wait_for_assault > 500){
			//instead of sending them home, make them join the fight
			console.log("joining battle");
			var target = new Point(this.last_assault_pos.x,this.last_assault_pos.y);
			Ai_Move_Handler(this.selection,target,Ability.AttackMove);
		}
	}
}

AI.prototype.callRandomDefenders = function(attacker){
	this.selection = [];
	var sourceBuilding = Utils.randomElem(this.owner.structures);
	this.selectIdleAroundBuilding(sourceBuilding);
	Ai_Move_Handler(this.selection,new Point(attacker.x, attacker.y),Ability.AttackMove);
	//start ramping up production if base under attack, no matter the AI
	this.wait_for_cavalry = 0;
	this.wait_for_infantry = 0;
}

AI.prototype.selectIdleAroundUnit = function(unit){
	var searchStart = Pathfinder.getNodeAt_Robust(unit.x, unit.y);
	Pathfinder.Spiral_Unit_Search(searchStart, 10, SearchFilter.aiSelectIdle, unit, 0);
}
AI.prototype.selectIdleAroundBuilding = function(building){
	if(!building){return}
	var searchStart = Pathfinder.getNodeAt_Robust(building.x,building.y-1.7);
	Pathfinder.Spiral_Unit_Search(searchStart, 10, SearchFilter.aiSelectIdle, building, 0);
}

AI.prototype.getWorkerTrainingPoint = function(){
	if(RAND()<0.6){
		return Utils.lastElem(this.owner.resourcePoints);
	}else{
		return Utils.randomElem(this.owner.resourcePoints);
	}
}

AI.prototype.trainWorkerAnywhere = function(){
	//var townhall = this.owner.getClosestResourcePoint(new Point(x,y));
	var townhall = this.getWorkerTrainingPoint();
	if(townhall && townhall.trainingQueue && townhall.trainingQueue.length < 2){
		Unit.getAbilityInstance(townhall, Ability.TrainProbe).cast();
		this.wait_for_worker = this.worker_train_wait_time;
	}
}

AI.prototype.getBuildSite = function(startNode, paramArr ){
	var n = Pathfinder.Dijkstra_Search(startNode, 30, Pathfinder.Check_Free_Buildspace, paramArr ,0);
	return n;
}

AI.prototype.makeSquad = function(units){
	var sq = new Squad(this,units);
	this.Squads.push(sq);
	return sq;
}

AI.prototype.deleteSquad = function(squad){
	var id = this.Squads.indexOf(squad);
	if(id>=0){
		this.Squads.splice(id,1);
	}
}

AI.getUnitStrength = function(u){
	if(u.owner.team == 0 && u.isStructure){return 0;}
	return (u.hp + u.hp*u.attackDamage/(u.attackCooldown+1))/100;
}

AI.building_has_space_for_big_units = function(b){
	var n = Pathfinder.getNodeAt_Robust(b.x,b.y-1.8);
	return Node.isPassable(n, 1);
}

AI.loop_electropod = function(){
	if(this.task.targetUnit && this.inner_counter%10 == 0
	&& (this.hp<20 //shoot spell before dying
	||RAND()<0.1||
	this.task.targetUnit.atNode.unitCount > 1)){//don't waste spell on single unit
		var ab=Unit.getAbilityInstance(this, Ability.PlasmaCharge);
		if(ab&&ab.cooldownCounter <= 0 && 
		Unit_Distance(this,this.task.targetUnit) < Ability.PlasmaCharge.castRange){
			ab.shots = ab.proto.shots;
			this.addSubTask( Task.ChaseTask_SingleTarget( this, this.task.targetUnit, ab));
		}
	}else{
		if(this.inner_counter%60 == 0){
			if(!this.moving && !this.task.targetUnit && RAND()<0.1){
				this.owner.ai.sendIdleTroopsHome(this);
				this.squad=null;
			}
			if(this.squad){
				if(this.squad.allow_target_change){
					this.guarding = true;
				}else if(this.moving){
					this.guarding = false;
				}
			}
		}
	}
}

AI.loop_marine = function(){
	if(this.inner_counter%60 == 0){
		if(!this.moving && !this.task.targetUnit && RAND()<0.1){
			this.owner.ai.sendIdleTroopsHome(this);
			this.squad=null;
		}
		if(this.squad){
			if(this.squad.allow_target_change){
				this.guarding = true;
			}else if(this.moving){
				this.guarding = false;
			}
		}
	}
}
AI.loop_pioneer = AI.loop_marine;
AI.loop_mantis = AI.loop_marine;
AI.loop_tank = function(){
	if(this.inner_counter%60 == 0){
		if(!this.moving){
			if(RAND()<0.1){
				if(!this.task.targetUnit){
					this.owner.ai.sendIdleTroopsHome(this);
					this.squad=null;
				}else if(this.task.targetUnit.owner.team != this.owner.team){
					//maneuver
					var targ = this.task.targetUnit;
					var tdx = this.task.targetUnit.x-this.x;
					var tdy = this.task.targetUnit.y-this.y;
					//perpendicular to target, but also a bit towards
					var tp = new Point(this.x+(tdy+tdx)/2,this.y+(-tdx+tdy)/2);
					this.addSubTask(Task.Alone_Move_Task( this, tp , u.moveAbility, false));
					this.task.targetUnit = targ;
				}
			}
		}
		if(this.squad){
			if(this.squad.allow_target_change){
				this.guarding = true;
			}else if(this.moving){
				this.guarding = false;
			}
		}
	}
}

AI.loop_probe = function(){
	if(this.inner_counter%10 == 0){
		if(!this.task.targetUnit && !this.moving && this.taskStack.length==0){
			this.returnResources();
		}else if(this.task.ability && this.task.ability.Effect == Effect.Build){
			var buildX = this.task.abilityInstance.target.x;
			var buildY = this.task.abilityInstance.target.y;
			var structureType = this.task.ability.trainingProto;
			//build target is not buildable
			if(Unit.checkBuildable(buildX,buildY,structureType) == false){
				this.Stop();
			}
		}
	}
}

AI.Points = []; //points of interest;

function Squad(ai, members){
	this.ai = ai;
	this.owner = ai.owner;
	this.strength = 0;
	this.Members = members.slice();
	for(var i=0;i<this.Members .length;++i){
		this.Members[i].squad = this;
	}
	this.first_strength = this.getStrength();
	this.lifetime = 0;
	
	this.retreat_threshold = 0.4;
	this.retreat_time = -1;
	this.pain = 0;
	this.targetUnit = null;
	this.allow_target_change = true;
}
Squad.prototype.loop = function(){
	this.lifetime ++;
	if(this.retreat_time >= 0){
		this.retreat_time ++;
		this.allow_target_change = false;
		if(this.retreat_time > 25){
			this.disband();
			return;
		}
	}
	var oldStrength = this.strength;
	this.strength = this.getStrength();
	this.pain = this.pain*0.5 + ((oldStrength-this.strength)/oldStrength);
	if(this.strength<this.first_strength*0.2||this.strength<=0){
		this.disband();
		return;
	}else if(this.strength/this.first_strength<this.retreat_threshold
	&& this.pain>0.03){
		this.retreat();
	}
	if(this.targetUnit){
		if(this.targetUnit.alive){
			if(this.getTargetDistance(this.targetUnit)<35){
				//focus harass
				this.allow_target_change = false;
			}else{
				this.allow_target_change = true;
			}
		}else{
			this.targetUnit = null;
		}
	}else{
		this.allow_target_change = true;
	}
}

Squad.prototype.getTargetDistance = function(u){
	return 0.5*(Unit_Distance(this.Members[0],u)+ Unit_Distance(u,Utils.lastElem(this.Members)));
}

Squad.prototype.retreat = function(){
	var retreatPoint = this.owner.getRandomResourcePoint();
	if(retreatPoint){
		Ai_Move_Handler(this.Members,new Point(retreatPoint.x, retreatPoint.y),Ability.Move);
		this.retreat_time = 0;
	}else{
		this.disband();
	}
}

Squad.prototype.disband = function(){
	for(var i=0;i<this.Members.length;++i){
		this.Members[i].squad = null;
		this.Members[i].Stop();
	}
	this.Members = null;
	this.ai.deleteSquad(this);
}
Squad.prototype.getStrength = function(){
	this.strength = 0;
	for(var i=0;i<this.Members.length;++i){
		this.strength += AI.getUnitStrength(this.Members[i]);
	}
	return this.strength;
}

function AIPersona(name){
	this.name = name;
	this.id = AIPersona.list.length;
	AIPersona.list.push(this);
	this.setter = function(ai){
	}
}
AIPersona.list = [];
AIPersona.init = function(){
	this.list = [];
	var a = AIPersona.Normal = new AIPersona("Melee");
	
	a = new AIPersona("TitanBlue");
	a.setter = function(ai){
		ai.max_workers = 10;
		ai.max_barracks = 3;
		ai.max_deposit = 2;
		ai.max_factory = 0;
		ai.min_attacking_force = 2;
		ai.max_infantry = 8;
		ai.max_cavalry = 2;
		ai.coin_per_barracks = 20;
		ai.infantry_train_wait_time = 750;
		ai.worker_train_wait_time = 400;
		ai.cavalry_train_wait_time = 1000;
		ai.assault_enemy_size_factor = 0.1;
		ai.owner.useCampaignUnitTypes = true;
		ai.min_workers_for_army = 1;
		ai.capacitor_money_treshold = 999999;
		
		if(Gamestats.difficulty > 0){
			ai.max_factory = 1;
			ai.infantry_train_wait_time = 550;
		}
	}
	
	a = new AIPersona("KerberosRed");
	a.setter = function(ai){
		ai.max_workers = 12;
		ai.max_barracks = 2;
		ai.max_deposit = 3;
		ai.max_factory = 2;
		ai.min_attacking_force = 5;
		ai.max_infantry = 8;
		ai.max_cavalry = 2;
		ai.max_hangar = 1;
		ai.max_airforce = 2;
		ai.coin_per_barracks = 20;
		ai.infantry_train_wait_time = 600;
		ai.cavalry_train_wait_time = 960;
		ai.worker_train_wait_time = 400;
		ai.assault_enemy_size_factor = 0.1;
		ai.owner.useCampaignUnitTypes = true;
		ai.stinger_pioneer_ratio = 0.3;
		ai.min_workers_for_army = 1;
		ai.tank_laika_ratio = 0;
		ai.capacitor_money_treshold = 0;
		ai.cheat_money_bonus = 5;
		ai.starship_mantis_ratio = 0;
		
		if(Gamestats.difficulty > 0){
			ai.max_airforce = 3;
			ai.max_barracks = 3;
			ai.max_infantry = 10;
			ai.max_cavalry = 4;
		}
	}
	
	a = new AIPersona("CaveControl");
	a.setter = function(ai){
		ai.max_workers = 18;
		ai.infantry_train_wait_time = 450;
		ai.cavalry_train_wait_time = 800;
		ai.worker_train_wait_time = 400;
		ai.assault_enemy_size_factor = 0.1;
		ai.owner.useCampaignUnitTypes = true;
		ai.tank_laika_ratio = 0.35;
		ai.min_workers_for_army = 1;
		ai.capacitor_money_treshold = 1000;
		ai.cheat_money_bonus = 5;
		ai.max_barracks = 2;
		ai.max_deposit = 3;
		ai.max_factory = 2;
		ai.max_hangar = 0;
		ai.special_loop = function(){
			if(this.wait_for_assault < 200){
				this.checkRandomControlPoint();
			}
		}
		
		if(Gamestats.difficulty > 0){
			ai.max_workers = 20;
			ai.max_barracks = 3;
			ai.cavalry_train_wait_time = 650;
		}
	}
	
	a = new AIPersona("SnowRed");
	a.setter = function(ai){
		ai.max_workers = 4;
		ai.infantry_train_wait_time = 450;
		ai.cavalry_train_wait_time = 700;
		ai.worker_train_wait_time = 400;
		ai.assault_enemy_size_factor = 0.1;
		ai.owner.useCampaignUnitTypes = true;
		ai.tank_laika_ratio = 0.4;
		ai.min_workers_for_army = 1;
		ai.capacitor_money_treshold = 500;
		ai.walker_money_treshold = 1000;
		ai.cheat_money_bonus = 5;
		ai.max_barracks = 2;
		ai.max_factory = 2;
		ai.max_deposit = 1;
		ai.max_cavalry = 7;
		ai.max_infantry = 10;
		ai.max_airforce = 3;
		ai.max_farm = 4;
		ai.max_hangar = 1;
		ai.min_attacking_force = 4;
		ai.special_loop = function(){
			this.cheat_coin_bonus = this.owner.maintenance + 12;
		}
		
		if(Gamestats.difficulty > 0){
			ai.max_cavalry = 9;
			ai.max_airforce = 4;
			ai.max_infantry = 13;
		}
	}
	
	a = new AIPersona("SiegeRed");
	a.setter = function(ai){
		ai.max_workers = 6;
		ai.assault_enemy_size_factor = 0;
		ai.owner.useCampaignUnitTypes = true;
		ai.min_workers_for_army = 1;
		ai.capacitor_money_treshold = 400;
		ai.walker_money_treshold = 1100;
		ai.starship_money_treshold = 1500;
		ai.cheat_money_bonus = 15;
		ai.max_barracks = 3;
		ai.max_factory = 3;
		ai.max_deposit = 3;
		ai.max_hangar = 2;
		ai.max_farm = 5;
		ai.min_attacking_force = 4;
		ai.special_loop = function(){
			//this.owner.coin = 1000;
			this.cheat_coin_bonus = this.owner.maintenance + 12;
		}
		ai.getEnemy = function(){
			return Players[2];
		}
		
		if(Gamestats.difficulty > 0){
			ai.max_factory = 4;
			ai.max_barracks = 4;
			ai.walker_money_treshold = 700;
			ai.starship_money_treshold = 1000;
		}
	}
	
	a = new AIPersona("LandingBlue");
	a.setter = function(ai){
		ai.max_workers = 11;
		ai.assault_enemy_size_factor = 0;
		ai.owner.useCampaignUnitTypes = true;
		ai.min_workers_for_army = 1;
		ai.capacitor_money_treshold = 500;
		ai.walker_money_treshold = 700;
		ai.max_barracks = 1;
		ai.infantry_cavalry_ratio = 1;
		ai.max_factory = 2;
		ai.max_deposit = 2;
		ai.max_hangar = 1;
		ai.min_attacking_force = 4;
		ai.tank_laika_ratio = 0.4;
		ai.tank_electropod_ratio = 0;
		ai.tank_walker_ratio = 0;
		ai.starship_mantis_ratio = 0;
		ai.barracks_needed_for_factory = 0;
		ai.coin_per_barracks = 999;
		ai.can_train_pioneer = false;
		ai.marine_pioneer_ratio = 0;
		
		if(Gamestats.difficulty > 0){
			ai.max_factory = 4;
			ai.max_hangar = 3;
		}
	}
	
	a = AIPersona.Easy = new AIPersona("Easy");
	a.setter = function(ai){
		ai.infantry_train_wait_time = 700;
		ai.cavalry_train_wait_time = 1000;
		ai.airforce_train_wait_time = 1200;
		ai.min_attacking_force = 2;
		ai.coin_per_barracks = 23;
		ai.coin_per_factory = 33;
		ai.worker_train_wait_time = 550;
		ai.attack_min_size = 5;
		ai.capacitor_money_treshold = 2500;
	}
	
	a = AIPersona.Cheater = new AIPersona("Cheater");
	a.setter = function(ai){
		ai.coin_per_barracks = 18;
		ai.coin_per_factory = 18;
		ai.tank_laika_ratio = 0.5;
		ai.infantry_cavalry_ratio = 1.25;
		ai.assault_enemy_size_factor = 0.75;
		ai.capacitor_money_treshold = 500;
		ai.walker_money_treshold = 800;
		ai.starship_money_treshold = 1000;
		ai.min_attacking_force = 6;
		ai.cheat_money_bonus = 4;
		ai.worker_train_wait_time = 200;
		ai.infantry_train_wait_time = 200;
		ai.cavalry_train_wait_time = 200;
		ai.airforce_train_wait_time = 200;
		ai.rich_treshold = 999999;
	}
}

function PlayerRoleEntry(id, name, isHuman, persona){
	this.name = name;
	this.persona = persona;
	this.isHuman = isHuman;
	this.connId = 0;
	this.id = id;
}
PlayerRoleEntry.list = [];
PlayerRoleEntry.BuildList = function(){
	PlayerRoleEntry.list = [];
	PlayerRoleEntry.list[0] = PlayerRoleEntry.Human = new PlayerRoleEntry(0, "You", true, null);
	PlayerRoleEntry.list[1] = PlayerRoleEntry.Easy = new PlayerRoleEntry(1, "AI Easy", false, AIPersona.Easy);
	PlayerRoleEntry.list[2] = PlayerRoleEntry.Normal = new PlayerRoleEntry(2, "AI Normal", false, AIPersona.Normal);
	PlayerRoleEntry.list[3] = PlayerRoleEntry.Cheater = new PlayerRoleEntry(3, "AI Cheater", false, AIPersona.Cheater);
}
PlayerRoleEntry.UpdateList = function(){
	if(Net.online){
		PlayerRoleEntry.list.length = 4 + Net.Connections.length;
		for(var i=0;i<Net.Connections.length;++i){
			if(PlayerRoleEntry.list[i+4]){
				PlayerRoleEntry.list[i+4].name = Net.Connections[i].userName;
			}else{
				var conn = Net.Connections[i];
				var role = new PlayerRoleEntry(i+4, conn.name , true, null);
				role.connId = Net.Connections[i].id;
				PlayerRoleEntry.list[i+4] = role;
			}
		}
		PlayerRoleEntry.Server = PlayerRoleEntry.list[4];
	}else{
		if(PlayerRoleEntry.list.length > 4){
			PlayerRoleEntry.list.length = 4;
		}
	}
}
PlayerRoleEntry.getById = function(id){
	return PlayerRoleEntry.list[id];
}

//these will be entries on the droplist for choosing a team in skirmish
function PlayerTeamEntry(id){
	this.name = ""+(id+1);
	this.value = id + 1;
}
PlayerTeamEntry.getById = function(id){
	return this.list[id-1];
}
PlayerTeamEntry.BuildList = function(count){
	this.list = [];
	for(var i=0;i<count;++i){
		this.list[i] = new PlayerTeamEntry(i);
	}
}
PlayerTeamEntry.list = [];