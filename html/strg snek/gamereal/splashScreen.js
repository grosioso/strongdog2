function loadSplash(){
    document.getElementById("ag").style.visibility = "hidden";
	document.getElementById("ag").innerHTML = "<video id=\"introAG\" onclick=\"redirect()\" ><source src=\"intro.webm\"  type=\"video/webm\"></video>";
    var vid = document.getElementById("introAG");

	vid.onended = function(e){
        screen.resetTextAbove();
        document.getElementById("ag").innerHTML = "";
        intro.start();
	};

    vid.oncanplaythrough = function(e){
        loading.splash = true;
    }

    vid.width = 1100;
    vid.height = 600;
}

function agIntro(){
    document.getElementById("ag").style.visibility = "visible";;
    screen.drawTextAboveOpacity(resource.get("src/dark.png"),1)
    var vid = document.getElementById("introAG");
    vid.play();
}

function redirect(){
	window.open("http://armor.ag/MoreGames");
}