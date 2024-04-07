var cptRess = 0;

function load(){
	
	resource.addResource("src/snek.png");
	resource.addResource("src/introStrsnk.png");
	resource.addResource("src/loadScreen.png");
	resource.addResource("src/loadBar.png");
	resource.addResource("src/bg.png");
	resource.addResource("src/page.png");
	resource.addResource("src/gameOverScreen.png");
	resource.addResource("src/introLoad.png");
	resource.addResource("src/dark.png");
	resource.addResource("src/credits.png");
	resource.addResource("src/pause.png");
	resource.addResource("src/control.png");
	resource.addResource("src/warning.png");
	resource.addResource("src/loadFinished.png");
	resource.addResource("src/ag.png");

	resource.addSFX("sound/sfx_sounds_button6.wav");
	resource.addSFX("sound/sfx_alarm_loop5.wav");
	resource.addSFX("sound/sfx_coin_cluster3.wav");
	resource.addSFX("sound/sfx_movement_jump19.wav");
	resource.addSFX("sound/sfx_movement_ladder2a.wav");
	resource.addSFX("sound/sfx_movement_jump11.wav")

	resource.addMusic("sound/towerDefenseTheme.mp3")

	var funct = function(){cptRess++;}
	
	for(var cpt=0;cpt<resource.cptRes;cpt++){
		resource.file[cpt].src = resource.file[cpt].nom;
		if(resource.file[cpt].type == "img"){
			resource.file[cpt].onload = funct;
		} else {
			resource.file[cpt].oncanplaythrough = funct;
			resource.file[cpt].load();
		}
	}
}