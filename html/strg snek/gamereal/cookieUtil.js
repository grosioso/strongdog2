function loadCookie(){
  game.player.nbSegment = getCookie("snekLength");
  game.player.color = getCookie("color");
  game.checkX = parseInt(getCookie("checkX"));
  game.checkY = parseInt(getCookie("checkY"));
  game.checkRoom = getCookie("checkRoom");
  game.checkColor = getCookie("checkColor");

  game.powerPillTaken.deserialize(getCookie("powerPillTaken"));
  game.deathMarkList.deserialize(getCookie("deathMarks"));
  deserializeFlag(getCookie("flags"));

  if(getCookie("colorBG") != "null") game.colorScene = getCookie("colorBG")
  else game.colorScene = "white";
}

function saveCookie(){
  expDate = new Date;
  expDate = new Date(expDate.getTime() +1000*60*60*24*365);; 

  document.cookie = "snekLength=" + game.player.nbSegment + ";Samesite=none;Secure;expires=" + expDate.toUTCString();
  document.cookie = "color=" + game.player.color + ";Samesite=none;Secure;expires=" + expDate.toUTCString();
  document.cookie = "checkRoom=" + game.checkRoom + ";Samesite=none;Secure;expires=" + expDate.toUTCString();
  document.cookie = "checkX=" + game.checkX + ";Samesite=none;Secure;expires=" + expDate.toUTCString();
  document.cookie = "checkY=" + game.checkY + ";Samesite=none;Secure;expires=" + expDate.toUTCString();

  document.cookie = "powerPillTaken=" + game.powerPillTaken.serialize() + ";Samesite=none;Secure;expires=" + expDate.toUTCString();
  document.cookie = "flags=" + serializeFlag() + ";Samesite=none;Secure;expires=" + expDate.toUTCString();
  document.cookie = "deathMarks=" + game.deathMarkList.serialize() + ";Samesite=none;Secure;expires=" + expDate.toUTCString();

  document.cookie = "colorBG=" + game.colorScene + ";Samesite=none;Secure;expires=" + expDate.toUTCString();
  document.cookie = "checkColor=" + game.checkColor + ";Samesite=none;Secure;expires=" + expDate.toUTCString();

}

function checkCookie(){
  var check = getCookie("snekLength");
  if (check != null) return true;
  else return false;
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

function resetSave(){
  game.player.color = "white";
  game.player.nbSegment = 3;
}

function serializeFlag(){
  var str = "";
  for (var cpt=0;cpt<game.cptFlag;cpt++){
      var part = game.flagName[cpt] + ",";
      if(game.flagValue[cpt] == true) part += "true";
      if(game.flagValue[cpt] == false) part += "false";
      if(cpt != 0) str += "|";
      str += part;
    }
  return str;
}

function deserializeFlag(str){
  var flags = str.split('|');
  var nb = flags.length;
  for (var cpt=0;cpt<nb;cpt++){
      var flag = flags[cpt].split(",");
      if (flag[1] == "true") game.setFlag(flag[0], true)
      if (flag[1] == "false") game.setFlag(flag[0], false)
  }
}