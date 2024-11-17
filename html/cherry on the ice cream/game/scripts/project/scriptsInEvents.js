function coolmathCallStart() {
  if (typeof parent.cmgGameEvent === "function") {

      parent.cmgGameEvent("start");
  }
  console.log("game start event");
}
function coolmathCallLevelStart(level) {
  if (typeof parent.cmgGameEvent === "function") {
    try {
      parent.cmgGameEvent("start", String(level));
    } catch (e) {}
  }
  console.log("level start " + level);
}
function coolmathCallLevelRestart(level) {
  if (typeof parent.cmgGameEvent === "function") {
    try {
      parent.cmgGameEvent("replay", String(level));
    } catch (e) {}
  }
  console.log("level restart " + level);
}


const scriptsInEvents = {

	async Ev_tools_Event6_Act1(runtime, localVars)
	{
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/;
    return regex.test(email);
}
if(isValidEmail(localVars.email)){
localVars.result = 1;
}else{localVars.result = 0};
	},

	async Ev_tools_Event8_Act1(runtime, localVars)
	{
		// Functions declaration
		function containsSubstring(string, substrings) {
		    string = string.toLowerCase();
		    for (let i = 0; i < substrings.length; i++) {
		        if (string.includes(substrings[i].toLowerCase())) {
		            return true;
		        }
		    }
		    return false;
		}
		
		function stringToList(string) {
		    return string.split(",");
		}
		function stringToArray(string) {
		    return JSON.parse(string);
		}
		//console.log(stringToList(localVars.array));
		
		if(containsSubstring(localVars.string, stringToList(localVars.array))){
			localVars.result = 1;
		}else{
			localVars.result = 0;
		}
	},

	async Ev_game_Event1_Act7(runtime, localVars)
	{
		coolmathCallLevelStart(runtime.globalVars.level_actual);
	},

	async Ev_sdk_Event1_Act1(runtime, localVars)
	{
		await window.CrazyGames.SDK.init();
	},

	async Ev_sdk_Event4_Act2(runtime, localVars)
	{
		const callbacks = {
		  adFinished: () => runtime.callFunction("SDK_CrazyGames_AD_complete", [1]),
		  adError: (error) => runtime.callFunction("SDK_CrazyGames_AD_complete", [0]),
		  adStarted: () => runtime.callFunction("SDK_CrazyGames_AD_start"),
		};
		await window.CrazyGames.SDK.ad.requestAd("midgame", callbacks);
	},

	async Ev_sdk_Event10_Act2(runtime, localVars)
	{
		cmgAdBreak();
	},

	async Ev_sdk_Event29_Act1(runtime, localVars)
	{
		const callbacks = {
		  adFinished: () => runtime.callFunction("SDK_Rewarded_AD_complete", true, localVars.rewardActual),
		  adError: (error) => runtime.callFunction("SDK_Rewarded_AD_complete", false, localVars.rewardActual),
		  adStarted: () => console.log("Start rewarded ad"),
		};
		window.CrazyGames.SDK.ad.requestAd("rewarded", callbacks);
	},

	async Ev_sdk_Event32_Act3(runtime, localVars)
	{
		cmgRewardAds();
	},

	async Ev_sdk_Event55_Act1(runtime, localVars)
	{
		await window.CrazyGames.SDK.banner.hideAllBanners();
	},

	async Ev_sdk_Event63_Act1(runtime, localVars)
	{
		await window.CrazyGames.SDK.banner.requestBanners([
		  {
		    id: localVars.IdBanner,
		    width: localVars.width,
		    height: localVars.height,
		    x: localVars.X,
		    y: localVars.Y,
		  }
		]);
	},

	async Ev_sdk_Event66_Act1(runtime, localVars)
	{
		window.CrazyGames.SDK.game.gameplayStart();
	},

	async Ev_sdk_Event69_Act1(runtime, localVars)
	{
		window.CrazyGames.SDK.game.gameplayStop();
	},

	async Ev_sdk_Event73_Act1(runtime, localVars)
	{
		window.CrazyGames.SDK.game.happytime();
	},

	async Ev_sdk_Event77_Act2(runtime, localVars)
	{
		if (window.CrazyGames.SDK.game.getInviteParam(localVars.paramName)){
			localVars.value = window.CrazyGames.SDK.game.getInviteParam(localVars.paramName);
		}else{ localVars.value = "" }
	},

	async Ev_sdk_Event78_Act1(runtime, localVars)
	{
		localVars.value = PokiSDK.getURLParam(localVars.paramName);
	},

	async Ev_sdk_Event81_Act1(runtime, localVars)
	{
		window.CrazyGames.SDK.game.hideInviteButton();
	},

	async Ev_sdk_Event84_Act1(runtime, localVars)
	{
		localVars.uri = await window.CrazyGames.SDK.game.inviteLink({ R : localVars.R});
	},

	async Ev_sdk_Event84_Act2(runtime, localVars)
	{
		const link = window.CrazyGames.SDK.game.showInviteButton({ R: localVars.R});
	},

	async Ev_sdk_Event85_Act1(runtime, localVars)
	{
		localVars.uri = await window.CrazyGames.SDK.game.inviteLink({ R : localVars.R, D : localVars.domain});
	},

	async Ev_sdk_Event85_Act2(runtime, localVars)
	{
		const link = window.CrazyGames.SDK.game.showInviteButton({ R: localVars.R, D: localVars.domain});
	},

	async Ev_sdk_Event87_Act1(runtime, localVars)
	{
		// example
		const params = {
		    R : localVars.R
		    // ... any other param
		}
		
		await PokiSDK.shareableURL(params).then(url => {
		    localVars.uri = url});
	},

	async Ev_sdk_Event88_Act1(runtime, localVars)
	{
		// example
		const params = {
		    R : localVars.R,
			D : localVars.domain
		    // ... any other param
		}
		
		await PokiSDK.shareableURL(params).then(url => {
		    localVars.uri = url});
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

