GUI.Alert = function(msg, is_centered){
	if(is_centered){
		var e = GUI.TextElem(0.5,-0.1,11,msg,GUI.align_center);
	}else{
		var e = GUI.TextElem(0.03,-0.1,11,msg);
	}
	
	e.update = function(){
		this.setPosY_smooth((GUI.Elements_Alerts.length-GUI.Elements_Alerts.indexOf(this))*0.035);
		this.age += Render.frameDelta;
		if(this.age > 300){
			this.opacity = 0.01*(400-this.age);
		}
		if(this.age > 400){
			this.removeFromGUI(GUI.Elements_Alerts);
		}
	}
	e.age = 0;
	e.defaultColor = e.color = GUI.textColor_itemPickup;
	e.addToGUI(GUI.Elements_Alerts);
	return e;
}

GUI.Alert_Chat = function(msg, playerId){
	var e = GUI.Alert(msg);
	var cArr = Players[playerId].colorFloat;
	//use player colors for chat, but lighten it
	e.defaultColor = e.color = [0.5*(cArr[0]+1),0.5*(cArr[1]+1),0.5*(cArr[2]+1)];
	e.age = -2*msg.length;
}

GUI.Alert_Attack_timer = 0;
GUI.Alert_Unit_Attack_timer = 0;
GUI.Alert_Base_Attack_timer = 0;
GUI.Alert_Worker_Attack_timer = 0;
GUI.Alert_Tech_timer = 0;

GUI.Alert_Under_Attack = function(u){
	if(GUI.Alert_Attack_timer <= 0 && !Gamestats.cinematicMode){
		GUI.Alert_Attack_timer = 250;
		GUI.Minimap_InGame.ping(u.x,u.y,GUI.color_expensive);
		if(u.isStructure){
			if( GUI.Alert_Base_Attack_timer <= 0){
				GUI.Alert_Base_Attack_timer = 1000;
				SoundObject.disp_base.play_dispatch();
				GUI.Alert("Base under attack!");
			}
		}else if(u.proto.isWorker){
			if(GUI.Alert_Worker_Attack_timer <= 0){
				GUI.Alert_Worker_Attack_timer = 500;
				SoundObject.disp_workers.play_dispatch();
				GUI.Alert("Workers under attack!");
			}
		}else if(GUI.Alert_Unit_Attack_timer <= 0){
			GUI.Alert_Unit_Attack_timer = 1000;
			SoundObject.disp_attack.play_dispatch();
			GUI.Alert("Troops under attack!");
		}
	}
}

GUI.Alert_Construction = function(u){
	GUI.Minimap_InGame.ping(u.x,u.y,GUI.textColor_rescue);
	SoundObject.disp_construction.play_dispatch();
	//GUI.Alert("We are under attack!");
}

GUI.Alert_Point_Taken = function(p){
	GUI.Minimap_InGame.ping(p.x,p.y,GUI.textColor_rescue);
	GUI.Alert("Control point taken!");
	SoundObject.controlPoint.play_dispatch();
}

GUI.Alert_Point_Lost = function(p){
	GUI.Minimap_InGame.ping(p.x,p.y,GUI.color_expensive);
	GUI.Alert("Control point lost!");
}

GUI.Alert_Research = function(u, upgrade){
	GUI.Minimap_InGame.ping(u.x,u.y,GUI.textColor_rescue);
	GUI.Alert("Resarch Finished: "+upgrade.name);
	SoundObject.disp_research.play_dispatch();
}

GUI.Alert_Minerals_timer = 0;
GUI.Alert_Coin_timer = 0;
GUI.Alert_Maintenance_timer = 0;
GUI.Alert_Minerals = function(u){
	if(GUI.Alert_Minerals_timer <= 0){
		GUI.Alert_Minerals_timer = 30;
		GUI.Alert("Not enough minervite!");
		SoundObject.disp_minerals.play_dispatch();
	}
	
}
GUI.Alert_Coin = function(u){
	if(GUI.Alert_Coin_timer <= 0){
		GUI.Alert_Coin_timer = 30;
		GUI.Alert("Not enough coin!");
		SoundObject.disp_coin.play_dispatch();
	}
}
GUI.Alert_Maintenance = function(){
	if(GUI.Alert_Maintenance_timer <= 0 && Control.currentPlayer.resourcePoints.length > 0 && !Gamestats.cinematicMode
	&& !M.isMenu){
		GUI.Alert_Maintenance_timer = 1000;
		GUI.Alert("Coin income too low!");
		SoundObject.disp_maintenance.play_dispatch();
	}
}
GUI.Alert_Tech = function(){
	if(GUI.Alert_Tech_timer <= 0){
		GUI.Alert_Tech_timer = 30;
		GUI.Alert("Technology not available!");
	}
}

GUI.Reset_Alerts = function(){
	GUI.Alert_Attack_timer = 30;
	GUI.Alert_Unit_Attack_timer = 30;
	GUI.Alert_Base_Attack_timer = 30;
	GUI.Alert_Worker_Attack_timer = 30;
	GUI.Alert_Tech_timer = 30;
	GUI.Alert_Minerals_timer = 30
	GUI.Alert_Maintenance_timer = 300;
	GUI.Alert_Coin_timer = 30;
}
GUI.Update_Alerts = function(){
	if(!Control.gamePaused){
		this.Alert_Attack_timer=Math.max(0, this.Alert_Attack_timer-1);
		this.Alert_Unit_Attack_timer=Math.max(0, this.Alert_Unit_Attack_timer-1);
		this.Alert_Worker_Attack_timer=Math.max(0, this.Alert_Worker_Attack_timer-1);
		this.Alert_Base_Attack_timer=Math.max(0, this.Alert_Base_Attack_timer-1);
		this.Alert_Minerals_timer=Math.max(0, this.Alert_Minerals_timer-1);
		this.Alert_Coin_timer=Math.max(0, this.Alert_Coin_timer-1);
		this.Alert_Tech_timer =Math.max(0, this.Alert_Tech_timer-1);
		if(Control.currentPlayer.getIncome() >= 0){
			this.Alert_Maintenance_timer= 100;
		}else{
			this.Alert_Maintenance_timer=Math.max(0, this.Alert_Maintenance_timer-1);
			GUI.Alert_Maintenance();
		}
	}
}
