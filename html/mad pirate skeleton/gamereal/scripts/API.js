// Initializes the AG API
document.domain = "armorgames.com";

(function() {
  var ag = null;

  document.addEventListener("DOMContentLoaded", function(event) {
    var agiChecks = 0;

    function checkForAGI() {
      if (agiChecks > 1000) return;

      try {
        if (typeof parent.agi !== 'undefined') {
          ag = new ArmorGames({
            user_id: parent.apiAuth.user_id,
            auth_token: parent.apiAuth.auth_token,
            game_id: parent.apiAuth.game_id,
            // Todo: Set the api_key to your game's unique api_key
            api_key: '4C645776-65B5-475B-8DDC-CA1E751EDCF4',
            agi: parent.agi
          });

          // ... you can start doing AG requests
        } else {
          agiChecks++;
          window.setTimeout(checkForAGI, 250);
        }
      } catch (err) {
        agiChecks++;
        window.setTimeout(checkForAGI, 250);
      }
    }

    checkForAGI();
  });
})();




/* Vars to record any medals and scoreboards that get loaded */
var medals, scoreboards;

// Fires the animation in-game
function onMedalUnlocked(medal) {
    for (let i = 0; i < achievements.medals.length; i++) {
        if (medal.name == achievements.medals[i].name) {
            achievements.start(achievements.medals[i]);
        }
    }
}

// Given the medal name, checks if it is valid or if it has been already unlocked, then dispatches the onMedalUnlocked(medal) function
function unlockMedal(medal_name) {

    return;
}

// Initializes the API
function initSession() {
    
    return;
}
initSession();

// Gives the score to the scoreboard
// postScore('test scores', 89079);
function postScore(board_name, score_value) {
    
    return;
}
