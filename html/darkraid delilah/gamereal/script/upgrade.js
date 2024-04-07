function Upgrade(name){
	this.name = name;
	this.isUpgrade = true;
	this.unitEffect = null;
	this.globalEffect = null;
	//checks if a given player has finished the upgrade
	this.ownerArray = [];
	//checks if a player can still research it
	this.allowArray = [];
	this.moneyCost = 50;
	this.maintenance = 0;
	this.coinCost = 0;
	this.trainingTime = 600;
	this.reset();
	this.iconId = 10;
	this.allow_parallel_research = false;
	this.singleUpgrade = true;
	this.id = Upgrade.list.length;
	this.upgradeMoment = -1;
	Upgrade.list.push(this);
}
Upgrade.getById = function(id){
	return this.list[id];
}

Upgrade.getSaveState = function(){
	var data = [];
	for(var i=0;i<Players.length;++i){
		data[i] = [];
		for(var j=0;j<this.list.length;++j){
			if(this.list[j].ownerArray[i]){
				data[i].push([j,this.list[j].upgradeMoment]);
			}
		}
	}
	return data;
}

Upgrade.loadSaveState = function(data){
	for(var i=0;i<data.length;++i){
		for(var j=0;j<data[i].length;++j){
			var up = this.getById(data[i][j][0]);
			up.apply(i, true);
			up.upgradeMoment = data[i][j][1];
			if(up.singleUpgrade){
				up.disableForPlayer( i );
			}
		}
	}
}

Upgrade.prototype.reset = function(){
	this.upgradeMoment = -1;
	for(var i=0;i<Players.length;++i){
		this.ownerArray[i] = false;
		this.allowArray[i] = true;
	}
}
Upgrade.prototype.apply = function(playerId, loadGame){
	if(this.ownerArray[playerId]==false){
		if(!loadGame){
			this.upgradeMoment =  Gamestats.mapTime;
		}
		this.ownerArray[playerId] = true;
		if(this.globalEffect){
			this.globalEffect(playerId);
		}
		if(this.unitEffect){
			for(var i=Units.length-1;i>=0;--i){
				var u = Units[i];
				if(u.owner.id == playerId && u.proto.Upgrades.indexOf(this)>=0){
					this.unitEffect(u);
				}
			}
		}
	}
}
Upgrade.prototype.enableForPlayer = function(playerId){
	this.allowArray[playerId] = true;
}
Upgrade.prototype.disableForPlayer = function(playerId){
	this.allowArray[playerId] = false;
}

Upgrade.list = [];
Upgrade.init = function(){
	Upgrade.list = [];
	Upgrade.PlasmaCharge = new Upgrade("Plasma Charge");
	Upgrade.PlasmaCharge.iconId = 10;
	Upgrade.PlasmaCharge.moneyCost = 100;
	Upgrade.PlasmaCharge.coinCost = 150;
	Upgrade.PlasmaCharge.trainingTime = 1200;
	
	Upgrade.Walker = new Upgrade("Attila Mechanzied Walker");
	Upgrade.Walker.iconId = 25;
	Upgrade.Walker.moneyCost = 250;
	Upgrade.Walker.coinCost = 150;
	Upgrade.Walker.trainingTime = 2250;
	
	Upgrade.TankSpeed = new Upgrade("Boson Stabilizer");
	Upgrade.TankSpeed.iconId = 0;
	Upgrade.TankSpeed.moneyCost = 150;
	Upgrade.TankSpeed.coinCost = 200;
	Upgrade.TankSpeed.trainingTime = 1800;
	Upgrade.TankSpeed.unitEffect = function(u){
		u.speed += u.proto.speed*0.2;
	}
	
	Upgrade.BodyArmor = new Upgrade("M-Grade Composite Suit");
	Upgrade.BodyArmor.iconId = 50;
	Upgrade.BodyArmor.moneyCost = 150;
	Upgrade.BodyArmor.coinCost = 150;
	Upgrade.BodyArmor.trainingTime = 1500;
	Upgrade.BodyArmor.unitEffect = function(u){
		u.armor += 1;
	}
	
	Upgrade.TankArmor = new Upgrade("Minervite Nano-Lattice");
	Upgrade.TankArmor.iconId = 48;
	Upgrade.TankArmor.moneyCost = 250;
	Upgrade.TankArmor.coinCost = 200;
	Upgrade.TankArmor.trainingTime = 1800;
	Upgrade.TankArmor.unitEffect = function(u){
		u.armor += 1;
	}
	
	Upgrade.Regen = new Upgrade("Von Neumann Mesh");
	Upgrade.Regen.iconId = 54;
	Upgrade.Regen.moneyCost = 150;
	Upgrade.Regen.coinCost = 200;
	Upgrade.Regen.trainingTime = 1800;
	Upgrade.Regen.unitEffect = function(u){
		u.hp_regen += 0.033;
	}
	
	/*Upgrade.Virus = new Upgrade("Cryptojack");
	Upgrade.Virus.iconId = 7;
	Upgrade.Virus.moneyCost = 75;
	Upgrade.Virus.coinCost = 150;
	Upgrade.Virus.trainingTime = 1200;*/
	Upgrade.StunMine = new Upgrade("Entropy Grenade");
	Upgrade.StunMine.iconId = 7;
	Upgrade.StunMine.moneyCost = 100;
	Upgrade.StunMine.coinCost = 100;
	Upgrade.StunMine.trainingTime = 1200;
	//Upgrade.Bankruptcy = new Upgrade("Bankruptcy");
	
	Upgrade.ProbeDamage = new Upgrade("Combat Drill");
	Upgrade.ProbeDamage.iconId = 7;
	Upgrade.ProbeDamage.moneyCost = 100;
	Upgrade.ProbeDamage.coinCost = 50;
	Upgrade.ProbeDamage.iconId = 3;
	Upgrade.ProbeDamage.trainingTime = 540;
	Upgrade.ProbeDamage.unitEffect = function(u){
		u.attackDamage += 1;
	}
	
	Upgrade.RailDamage = new Upgrade("Triton-VI Railing");
	Upgrade.RailDamage.moneyCost = 150;
	Upgrade.RailDamage.coinCost = 150;
	Upgrade.RailDamage.iconId = 56;
	Upgrade.RailDamage.trainingTime = 1200;
	Upgrade.RailDamage.unitEffect = function(u){
		if(u.proto.attackDamage <= 10){
			u.attackDamage += 1;
		}else{
			u.attackDamage += 2;
		}
	}
	
	Upgrade.LaserDamage = new Upgrade("Condensate Prism");
	Upgrade.LaserDamage.moneyCost = 200;
	Upgrade.LaserDamage.coinCost = 200;
	Upgrade.LaserDamage.iconId = 57;
	Upgrade.LaserDamage.trainingTime = 1200;
	Upgrade.LaserDamage.unitEffect = Upgrade.ProbeDamage.unitEffect;
	
	Upgrade.ShockDamage = new Upgrade("Darkstorm Loop");
	Upgrade.ShockDamage.iconId = 58;
	Upgrade.ShockDamage.moneyCost = 150;
	Upgrade.ShockDamage.coinCost = 150;
	Upgrade.ShockDamage.trainingTime = 1200;
	Upgrade.ShockDamage.unitEffect = Upgrade.ProbeDamage.unitEffect;
	
	Upgrade.Starship = new Upgrade("Firefly Cruiser");
	Upgrade.Starship.iconId = 30;
	Upgrade.Starship.moneyCost = 150;
	Upgrade.Starship.coinCost = 150;
	Upgrade.Starship.trainingTime = 1800;
	
	Upgrade.Bubble = new Upgrade("Kinetic Bubble");
	Upgrade.Bubble.iconId = 15;
	Upgrade.Bubble.moneyCost = 200;
	Upgrade.Bubble.coinCost = 200;
	Upgrade.Bubble.trainingTime = 1500;
	
	Upgrade.BigComputer = new Upgrade("Blackchain Supercore");
	Upgrade.BigComputer.iconId = 45;
	Upgrade.BigComputer.moneyCost = 100;
	Upgrade.BigComputer.coinCost = 100;
	Upgrade.BigComputer.trainingTime = 600;
	
	Upgrade.Absorption = new Upgrade("Absorption");
	Upgrade.Absorption.iconId = 55;
	Upgrade.Absorption.moneyCost = 200;
	Upgrade.Absorption.coinCost = 200;
	Upgrade.Absorption.trainingTime = 1800;
	Upgrade.Absorption.unitEffect = function(u){
		u.absorption = 14;
	}
	
	Upgrade.Silo_Melee = new Upgrade("Minervite Extractor");
	Upgrade.Silo_Melee.iconId = 46;
	Upgrade.Silo_Melee.moneyCost = 300;
	Upgrade.Silo_Melee.coinCost = 200;
	Upgrade.Silo_Melee.trainingTime = 900;
}
Upgrade.LevelStart = function(){
	for(var i=0;i<Upgrade.list.length;++i){
		Upgrade.list[i].reset();
	}
}