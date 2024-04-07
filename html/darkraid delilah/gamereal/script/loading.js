var loadingCanvas = document.getElementById("loadingCanvas");
var loadingCtx = loadingCanvas.getContext("2d");
//var radarCanvas = document.getElementById("radarCanvas");
//var radarCtx = radarCanvas.getContext("2d");
var canvas = document.getElementById("mainCanvas");
//var intro_video = document.getElementById("intro_video");

//var intro = 
var GPU_FAIL = false;
var LoadingScreen = new Object();

LoadingScreen.CheckMouseSupport = function(){
	loadingCanvas.requestPointerLock = loadingCanvas.requestPointerLock || loadingCanvas.mozRequestPointerLock || loadingCanvas.webkitRequestPointerLock;
	if(loadingCanvas.requestPointerLock == null || loadingCanvas.requestPointerLock==undefined){
		return false;
	}
	return true;
}

LoadingScreen.CheckWebGlSupport = function(){
	var gl_test = null;
	try{
		gl_test=canvas.getContext("webgl",{antialias:false,premultipliedAlpha: false,alpha: false, failIfMajorPerformanceCaveat: true});
	}catch(x){
		gl_test=null;
	}
	if(gl_test===null){
		try{
			gl_test=canvas.getContext("experimental-webgl",{antialias:false,premultipliedAlpha: false,alpha: false, failIfMajorPerformanceCaveat: true});
		}
		catch(x){
			gl_test=null;
		}
	}
	
	if(gl_test == null || gl_test==undefined){
		if(window.WebGLRenderingContext != undefined){
			return 2;
		}else{
			return 0;
		}
	}
	return 1;
}

LoadingScreen.NoSupport = function(){
	loadingCtx.fillStyle = "rgb(0,0,0)";
	loadingCtx.fillRect(0,0,900,600);
	loadingCtx.fillStyle = "rgb(255,255,255)";
	loadingCtx.font = "30px Georgia";
	loadingCtx.fillText("Sorry, but the game could not start. Cause:",50, 100);
	
	loadingCtx.fillText("The recommended browser for this game is Google Chrome.",50, 500);
}

LoadingScreen.NotArmor = function(){
	loadingCtx.fillStyle = "rgb(0,0,0)";
	loadingCtx.fillRect(0,0,900,600);
	loadingCtx.fillStyle = "rgb(255,255,255)";
	loadingCtx.font = "30px Georgia";
	loadingCtx.fillText("Play this great game at armorgames.com",50, 100);

}

LoadingScreen.Init = function(){
	var w = window;
	var ww = w;
	
	var glSupport = this.CheckWebGlSupport();
	if(glSupport != 1 ){
		/*if(DESKTOP_VERSION){
			
		}else{
			if(glSupport == 0){
				LoadingScreen.NoSupport();
				loadingCtx.font = "15px Georgia";
				loadingCtx.fillText("Your browser might not support WebGL. Are other WebGL games working?",20, 150);
				return;
			}else if(glSupport == 2){
				LoadingScreen.NoSupport();
				loadingCtx.font = "15px Georgia";
				loadingCtx.fillText("Hardware acceleration turned off in your browser. Are other WebGL games working?",20, 150);
				loadingCtx.fillText("Chrome/Opera: Go to 'chrome://gpu' to see if hardware acceleration is enabled",20, 200);
				loadingCtx.fillText("Chrome/Opera: Go to 'chrome://flags' and enable 'Override software rendering list'",20, 250);
				loadingCtx.fillText("Firefox: Go to 'about:config' and enable 'webgl.force-enabled'",20, 300);
				loadingCtx.fillText("Firefox: Go to 'about:config' and enable 'layers.acceleration.force-enabled'",20, 350);
				loadingCtx.fillText("Relaunch your browser",20, 400);
				loadingCtx.fillText("Make sure your GPU drivers are up to date",20, 450);
				GPU_FAIL = true;
				return;
			}
		}*/
	}
	loadingCtx.font = "30px Georgia";
	Game_PREINIT();
	this.Draw();
}

LoadingScreen.Draw = function(){
	loadingCtx.textAlign = "center";
	loadingCtx.fillStyle = "rgb(0,0,0)";
	loadingCtx.fillRect(0,0,loadingCanvas.width,loadingCanvas.height);
	loadingCtx.fillStyle = "rgb(200,210,220)";
	loadingCtx.fillRect(0,295,610,50);
	loadingCtx.fillStyle = "rgb(20,20,20)";
	loadingCtx.fillRect(5,300,600,40);
	loadingCtx.fillStyle = "rgb(200,210,220)";
	loadingCtx.font="50px Courier New";	
	if(getOpera()){
		loadingCtx.fillText("Hey, Opera user!", 300, 100);
		loadingCtx.font="25px Courier New";	
		loadingCtx.fillText("Your browser might have mouse gestures enabled.", 300, 150),
		loadingCtx.fillText("If you experience problems on right clicking,", 300, 200);
		loadingCtx.fillText("try turning off mouse gestures.", 300, 250);
	}else{
		loadingCtx.fillText("Loading", 300, 220);
	}
	
	loadingCtx.fillStyle = "rgb(0,0,0)";
}

LoadingScreen.Update = function(){
	loadingCtx.fillStyle = "rgb(200,50,20)";
	loadingCtx.fillRect(5,300,600 * Asset.numLoadedFiles/Asset.numAssets,40);
}


function getOpera(){
	return navigator.userAgent.indexOf('OPR/') > -1 || !!window.opr; 
}
