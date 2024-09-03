_wrs = (function(){
	var wrs = [
		"2.56",		// 1
		"5.83",		// 2
		"4.59",		// 3
		"5.99",		// 4
		"5.80",		// 5
		"6.67",		// 6
		"6.57",		// 7
		"6.20",		// 8
		"16.23",	// 9
		"5.65",		// 10
		"7.06",		// 11
		"6.93",		// 12
		"10.84",	// 13
		"6.23",		// 14
		"6.00",		// 15
	];
	
	var decimal_places_display = 2;
	var customTimes = null;

    return {
		// Return the WR times, or return custom times if they were set by the user
        getTimes: function() {
			if (customTimes) {
				return {"title": "Pace", "wrs": customTimes};
			}

			// There are no custom times, so just return the WR times instead
            return {"title": "WR", "wrs": wrs};
		},
		// Set new custom level times 
		setCustomTimes: function(times) {
			// Check if the given object by the user is valid - must be array
			// Also disable custom level times in TAS mode
			if (TAS_MODE || !times || !Array.isArray(times)) {
				customTimes = null;
				return;
			}
			
			// Flag to check if at least one value in the custom times is valid
			var validFlag = false;

			// Copy only the first 15 elements, any more are irrelevant
			times = times.slice(0, 15);

			for (var i = 0; i < times.length; i++) {
				levelTime = times[i];
				
				// check if the current level time is a valid number
				if (typeof(levelTime) === "number" && levelTime >= 0 && levelTime < 100){
					times[i] = levelTime.toFixed(decimal_places_display);
					validFlag = true;
				}
				// In case of invalid number, take the WR time instead
				else {
					times[i] = wrs[i];
				}
			}

			// If the length of the custom times array is less than 15, copy the rest of the WR times into it
			times = times.concat(wrs.slice(times.length));

			if (validFlag)
				customTimes = times;
			else
				customTimes = null;
		}
	};
})();