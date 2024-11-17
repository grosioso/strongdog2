(function() {
    "use strict";
    
    var resources = new Resources();
    var theGameCanvas = null;
    var lastMousePos = null;
    var musicStarted = false;
    var playlist = ['ld34a'];
    var levels = {};
    var levelNameToNumber = {};
    var numLevels = 0;
    var numNormalLevels = 0;
    var numBonusLevels = 0;
    var levelNameToStoryMap = {};
    var levelIdxToPrev = [];
    var lastLevel = null;
    var story = [
    ];
    var forceUnlockAllLevels = false
    window.unlockAllLevels = function() { forceUnlockAllLevels = true; }
    
    var PRE_WON_TIME = 0.5;
    var LEVEL_WON_DELAY = 2.0;
    var DEFAULT_SAY_TIME = 3.0;
    var SAY_TRANSITION_TIME = 1.0;
    var SAY_BLANK_TIME = 0.75;
    var TRANSITION_IN_TIME = 2.0;
    var MENU_TRANSITION_TIME = 1.0;
    
    var MODE_LOADING = 'MODE_LOADING';
    var MODE_PLAYING = 'MODE_PLAYING';
    var MODE_SAYING = 'MODE_SAYING';
    var MODE_MENU = 'MODE_MENU';
    var MODE_ENDING = 'MODE_ENDING';
    var MODE_LEVELSELECT = 'MODE_LEVELSELECT';
    
    var gameState = {
        mode: MODE_LOADING,
        level: null,
        levelNum: null,
        highlightTile: null,
        towns: null,
        forbid: null,
        goodTowns: null,
        badTowns: null,
        won: false,
        wonTime: null,
        startTime: null,
        sayText: null,
        lastStoryEvent: -1,
        riverPaths: null,
        startMenuTime: null,
        menuExitTime: null,
        menuExitCallback: null,
        startEndingTime: null,
        startLevelSelectTime: null,
        startSayTime: null,
        endSayTime: null,
        superEnding: false,
        nearbyRiverPoints: null,
        forceMark: false,
        levelButtonOver: null
    }
    var wonHouses = [];
    
    function callCmgFunction()
    {
        if(parent && parent.cmgGameEvent)
        {
            parent.cmgGameEvent.apply(this, arguments);
        }
        else
        {
            var msg = "cmgGameEvent called with arguments: " + JSON.stringify(arguments);
            console.log(msg)
        }
    }
    
    function validStartup()
    {
        var re = /^(.*\.)?coolmath-games\.com$/;
        return parent && parent.document.location.host.match(re) !== null;
    }
    
    function handleWindowLoad()
    {
        theGameCanvas = document.getElementById('gameCanvas');
        if(theGameCanvas !== null) {handleCanvasLoad();}
        else {setTimeout(handleWindowLoad, 1000); }
    }
    
    function handleCanvasLoad()
    {
        // request level data
        resources.reqAscii('levels');
        
        // request images
        resources.reqImage('marker');
        resources.reqImage('invalid');
        // request audio
        resources.reqAudio('ld34_button');
        resources.reqAudio('ld34_win');
        resources.reqAudio('ld34_place');
        resources.reqAudio('ld34_clear');
        
        for(var k = 0; k < playlist.length; k++)
        {
            resources.reqAudio(playlist[k]);
        }
        // start requesting file sizes, then download
        resources.getAllFileSizes(handleGotFileSizes);
        
        // compute all the houses to show when won
        setupWonHouses();
        
        requestAnimationFrame(frame);
    }
    
    function handleGotFileSizes()
    {
        // we got the file sizes
        
        // download the actual files
        resources.downloadAll(handleDownloaded);
    }
    
    function handleDownloaded()
    {
        // create patterns
        var ctx = gameCanvas.getContext('2d');
        resources.invalidPattern = ctx.createPattern(resources.data['invalid'], 'repeat');
        
        // produce all the level data from the text file
        extractAllLevels();
        gameCanvas.addEventListener('click', handleClick);
        gameCanvas.addEventListener('dblclick', handleDoubleClick);
        gameCanvas.addEventListener('contextmenu', handleClick);
        gameCanvas.addEventListener('mousemove', handleMouseMove);
        
        startMenu();
    }
    
    function startMenu()
    {
        gameState.mode = MODE_MENU;
        gameState.startMenuTime = curTime();
        gameState.menuExitTime = null;
    }
    
    function exitMenu(callback)
    {
        gameState.menuExitTime = curTime();
        gameState.menuExitCallback = callback;
    }
    
    function startEnding(isSuper)
    {
        gameState.mode = MODE_ENDING;
        gameState.startEndingTime = curTime();
        gameState.superEnding = isSuper;
    }
    
    function startLevelSelect()
    {
        gameState.mode = MODE_LEVELSELECT;
    }
    
    function startMusic()
    {
        if(!resources.musicStarted)
        {
            var tracks = [];
            for(var k = 0; k < playlist.length; k++)
            {
                tracks.push(resources.data[playlist[k]]);
            }
            resources.startMusic(tracks, 0);
        }
    }
    
    function startStory()
    {
        gameState.lastStoryEvent = -1;
        callCmgFunction("start")
        nextStoryEvent();
    }
    
    function continueStory()
    {
        var lastLevelName = getLastLevelStarted();
        var levelNum = levelNameToNumber[lastLevelName];
        gameState.lastStoryEvent = levelIdxToPrev[levelNum];
        callCmgFunction("start")
        nextStoryEvent();
        startMusic();
    }
    
    function startFromLevel(idx)
    {
        if(idx == 0)
        {
            startStory();
        }
        else
        {
            gameState.lastStoryEvent = levelIdxToPrev[idx];
            nextStoryEvent();
            startMusic();
        }
    }
    
    function setLastLevelStarted(levelName)
    {
        localStorage.setItem("RBLastLevelStarted", levelName);
    }
    
    function getLastLevelStarted()
    {
        return localStorage.getItem("RBLastLevelStarted");
    }
    
    function setLastLevelUnlocked(levelIdx)
    {
        localStorage.setItem("RBLastLevelUnlocked", levelIdx);
    }
    
    function getLastLevelUnlocked()
    {
        return localStorage.getItem("RBLastLevelUnlocked");
    }
    
    function unlockLevel(levelName)
    {
        var num = levelNameToNumber[levelName];
        var curUnlocked = getLastLevelUnlocked();
        if(num > curUnlocked)
        {
            setLastLevelUnlocked(num);
        }
    }
    
    function showContinueButton()
    {
        var lev = getLastLevelStarted();
        if(lev === null) return false;
        return true;
    }
    
    function nextStoryEvent()
    {
        gameState.lastStoryEvent++;
        var i = gameState.lastStoryEvent;
        var ev = story[i];
        var evType = ev.type;
        if(evType == 'level')
        {
            startLevel(ev.name);
        }
        else if(evType == 'say')
        {
            startSay(ev.text, ev.sound);
        }
        else if(evType == 'ending')
        {
            startEnding(false);
        }
        else if(evType == 'superending')
        {
            startEnding(true);
        }
    }
    
    function startLevel(levelName)
    {
        unlockLevel(levelName);
        setLastLevelStarted(levelName);
        var levelNum = levelNameToNumber[levelName];
        gameState.levelNum = levelNum;
        callCmgFunction("start", (levelNum + 1).toString());
        gameState.mode = MODE_PLAYING;
        gameState.levelName = levelName;
        gameState.sayText = null;
        var level = levels[levelName];
        gameState.level = level;
        gameState.towns = grid2d(level.h, level.w, false);
        gameState.forbid = grid2d(level.h, level.w, false);
        gameState.houses = grid2d(level.h, level.w, null);
        for(var i = 0; i < level.h; i++)
        {
            for(var j = 0; j < level.w; j++)
            {
                gameState.houses[i][j] = [];
            }
        }
        gameState.wonTime = null;
        createRiverPaths();
        updateGameState();
        gameState.startTime = curTime();
        
        startMusic(); // (if not started already)
    }
    
    function endSay()
    {
        gameState.startSayTime = null;
        gameState.endSayTime = null;
        nextStoryEvent();
    }
    
    function startSay(sayText, saySound)
    {
        gameState.mode = MODE_SAYING;
        gameState.sayText = sayText;
        var t = curTime();
        var duration;
        if(saySound === null)
        {
            duration = DEFAULT_SAY_TIME;
        }
        else
        {
            var sound = resources.data[saySound];
            duration = sound.duration;
            resources.playSpeech(sound, null);
        }
        setTimeout(endSay, (duration + SAY_BLANK_TIME) * 1000);
        gameState.startSayTime = t;
        gameState.endSayTime = t + duration;
    }
    
    function charToNumber(c)
    {
        if(c == '#') return -1;
        return parseInt(c);
    }

    function isRiverTile(c)
    {
        return ('|-r,nL'.indexOf(c) >= 0);
    }
    
    function riverFromSide(grid, rivers, i, j)
    {
        // given out-of-bounds indices i, j, find the river they belong to
        var h = grid.length;
        var w = grid[0].length;
        
        var ci = i;
        var cj = j;
        if(ci < 0) ci++;
        if(ci >= h) ci--;
        if(cj < 0) cj++;
        if(cj >= w) cj--;
        
        for(var k = 0; k < rivers.length; k++)
        {
            for(var l = 0; l < rivers[k].length; l++)
            {
                if(rivers[k][l][0] == ci && rivers[k][l][1] == cj)
                {
                    return k;
                }
            }
        }
        for(var k in grid) console.log(grid[k]);
        throw new Error("River does not end at this coordinate");
    }
    
    function getAdjacentRiverTiles(grid, i, j)
    {
        var trials = null;
        var h = grid.length;
        var w = grid[0].length;
        if(i === -1) return [[0, j]];
        if(i === h) return [[h-1, j]];
        if(j === -1) return [[i, 0]]; 
        if(j === w) return [[i, w-1]];
        var c = grid[i][j];
        if(c === '|') trials = [[i - 1, j], [i + 1, j]];
        if(c === '-') trials = [[i, j - 1], [i, j + 1]];
        if(c === 'r') trials = [[i, j + 1], [i + 1, j]];
        if(c === ',') trials = [[i - 1, j], [i, j - 1]];
        if(c === 'n') trials = [[i, j - 1], [i + 1, j]];
        if(c === 'L') trials = [[i - 1, j], [i, j + 1]];
        if(trials === null)
        {
            throw new Error("Character is not a river tile: " + c);
        }
        
        return trials;
    }
    
    function pointsUp(c)
    {
        return c === '|' || c === ',' || c === 'L';
    }
    function pointsRight(c)
    {
        return c === '-' || c === 'L' || c === 'r';
    }
    function pointsDown(c)
    {
        return c === '|' || c === 'n' || c === 'r';
    }
    function pointsLeft(c)
    {
        return c === 'n' || c === '-' || c === ',';
    }
    
    function updateRiverLabels(riverLabels, riverLabelPos, grid, rivers, i, j, value)
    {
        if(value !== -1)
        {
            var r = riverFromSide(grid, rivers, i, j);
            riverLabels[r] = value;
            riverLabelPos[r] = [i, j];
        }
    }
    
    function traceRiver(grid, seen, origI, origJ)
    {
        // create a queue of river tiles to add to this river
        var q = [[origI,origJ]];
        var curRiver = [];
        var h = grid.length;
        var w = grid[0].length;
        while(q.length > 0)
        {
            var nextij = q[0];
            q.splice(0, 1);
            curRiver.push(nextij);
            var i = nextij[0];
            var j = nextij[1];
            
            if(i >= 0 && i < h && j >= 0 && j < w && !seen[i][j])
            {
                seen[i][j] = true;
            }
            var adjs = getAdjacentRiverTiles(grid, i, j);
            for(var k = 0; k < adjs.length; k++)
            {
                var newI = adjs[k][0];
                var newJ = adjs[k][1];
                if((newI !== origI || newJ !== origJ) &&
                    (newI < 0 || newI >= h || newJ < 0 | newJ >= w || !seen[adjs[k][0]][adjs[k][1]]))
                {
                    q.push(adjs[k]);
                }
            }
        }
        return curRiver;
    }
    
    function traceRiverAndUpdate(rivers, grid, seen, i0, j0, i1, j1)
    {
        if(!seen[i1][j1] && isRiverTile(grid[i1][j1]))
        {
            rivers.push(traceRiver(grid, seen, i0, j0));
        }
    }
    
    function recordLevel(levelName, levelHint, levelLines, citySize)
    {
        // process the level lines to produce a grid, and
        // the positions and numbers of the labels
        var grid = [];
        var rightNumbers = [];
        var leftNumbers = [];
        var topNumbers = [];
        var bottomNumbers = [];
        for(var lineNum = 0; lineNum < levelLines.length; lineNum++)
        {
            var line = levelLines[lineNum];
            if(lineNum == 0 || lineNum == levelLines.length - 1)
            {
                // top or bottom line, giving river numbers
                line = line.substring(1, line.length - 1);
                var curNumbers = [];
                for(var i = 0; i < line.length; i++)
                {
                    curNumbers.push(charToNumber(line[i]));
                }
                if(lineNum == 0)
                {
                    topNumbers = curNumbers;
                }
                else
                {
                    bottomNumbers = curNumbers;
                }
            }
            else
            {
                // not the top or bottom line
                leftNumbers.push(charToNumber(line[0]));
                rightNumbers.push(charToNumber(line[line.length - 1]));
                line = line.substring(1, line.length - 1);
                grid.push(line);
            }
        }
        
        // compute, for each river, a list of the tiles
        // comprising the river;
        var h = grid.length;
        var w = grid[0].length;
        var rivers = [];
        var seen = grid2d(h, w, false);
        for(var j = 0; j < w; j++)
        {
            if(pointsUp(grid[0][j])) traceRiverAndUpdate(rivers, grid, seen, -1, j, 0, j);
            if(pointsDown(grid[h-1][j])) traceRiverAndUpdate(rivers, grid, seen, h, j, h-1, j);
        }
        for(var i = 0; i < h; i++)
        {
            if(pointsLeft(grid[i][0])) traceRiverAndUpdate(rivers, grid, seen, i, -1, i, 0);
            if(pointsRight(grid[i][w-1])) traceRiverAndUpdate(rivers, grid, seen, i, w, i, w-1);
        }
        
        // compute the river label numbers
        var riverLabels = [];
        var riverLabelPos = [];
        for(var k = 0; k < topNumbers.length; k++)
        {
            updateRiverLabels(riverLabels, riverLabelPos, grid, rivers, -1, k, topNumbers[k])
        }
        for(var k = 0; k < bottomNumbers.length; k++)
        {
            updateRiverLabels(riverLabels, riverLabelPos, grid, rivers, h, k, bottomNumbers[k])
        }
        for(var k = 0; k < leftNumbers.length; k++)
        {
            updateRiverLabels(riverLabels, riverLabelPos, grid, rivers, k, -1, leftNumbers[k])
        }
        for(var k = 0; k < rightNumbers.length; k++)
        {
            updateRiverLabels(riverLabels, riverLabelPos, grid, rivers, k, w, rightNumbers[k])
        }
        
        for(var r = 0; r < rivers.length; r++)
        {
            if(typeof riverLabels[r] === "undefined")
            {
                throw new Error("Did not find a label for a river -- level " + levelName);
            }
        }
        
        // debug output
        // for(var k = 0; k < grid.length; k++) console.log(grid[k]);
        // for(var k = 0; k < rivers.length; k++)
        // {
            // console.log(JSON.stringify(rivers[k]) + ": " + riverLabels[k]);
        // }
        
        // record the level data
        var levelData = {
            'name': levelName,
            'h': h,
            'w': w,
            'hint': levelHint,
            'citySize': citySize,
            'grid': grid,
            'rivers': rivers,
            'riverLabels': riverLabels,
            'riverLabelPos': riverLabelPos,
        }
        levels[levelName] = levelData;
        
        levelNameToStoryMap[levelName] = story.length;
        story.push({
            'type': 'level',
            'name': levelName
        });
        levelNameToNumber[levelName] = numLevels;
        levelIdxToPrev.push(lastLevel);
        lastLevel = story.length - 1;
        numLevels++;
        if(levelName.substring(0, 5) === 'bonus')
        {
            numBonusLevels++;
        }
        else
        {
            numNormalLevels++;
        }
    }
    
    function extractAllLevels()
    {
        // extract all levels from a big string defining them
        
        // all levels are rectangular, and a blank line separates them.
        var levels = {};
        var text = resources.data['levels'];
        var textLines = text.split(/\r*\n/); // split on newline, unix or windows
        var nL = textLines.length;
        var curCitySize = null;
        var curLevelName = '';
        var curLevelLines = null
        var curLevelHint = null;
        var levelNameMap = {};
        
        for(var i = 0; i < nL; i++)
        {
            var line = textLines[i];
            if(line.length === 0)
            {
                // blank line, ignore
            }
            else if(line.substring(0, 6) === 'level ')
            {
                // line indicating that we are defining a new level
                if(curLevelLines !== null)
                {
                    throw new Error('Started new level without ending old one');
                }
                curLevelName = line.substring(6);
                curLevelLines = [];
            }
            else if(line === 'endlevel')
            {
                recordLevel(curLevelName, curLevelHint, curLevelLines, curCitySize);
                curLevelName = null;
                curLevelLines = null;
                curLevelHint = null;
                curCitySize = null;
            }
            else if(line.substring(0, 5) === 'next ')
            {
                // line indicating the next level after this one
                story.nextLevel[curLevelName] = line.substring(5);
            }
            else if(line.substring(0, 6) === 'start ')
            {
                // line setting the starting level
                story.startLevel = line.substring(6);
            }
            else if(line.substring(0, 9) === 'citysize ')
            {
                // line setting the city size
                curCitySize = parseInt(line.substring(9));
            }
            else if(line.substring(0, 5) === 'hint ')
            {
                // line setting the city size
                curLevelHint = line.substring(5);
            }
            else if(line.substring(0, 4) === 'say ')
            {
                story.push({
                    'type': 'say',
                    'text': line.substring(4),
                    'sound': null
                });
            }
            else if(line.substring(0, 7) === 'speech ')
            {
                var rem = line.substring(7);
                var firstSpace = rem.indexOf(' ');
                var sound = rem.substring(0, firstSpace);
                rem = rem.substring(firstSpace + 1);
                
                story.push({
                    'type': 'say',
                    'text': rem,
                    'sound': sound
                });
            }
            else if(line === 'ending')
            {
                story.push({
                    'type': 'ending'
                });
            }
            else if(line === 'superending')
            {
                story.push({
                    'type': 'superending'
                });
            }
            else
            {
                if(curLevelLines === null)
                {
                    throw new Error("Cannot understand line: " + line);
                }
                for(var k = 0; k < line.length; k++)
                {
                    if('.|-,rnL#0123456789'.indexOf(line[k]) < 0)
                    {
                        throw new Error("Cannot understand line: " + line);
                    }
                }
                curLevelLines.push(line);
            }
            
        }
        if(curLevelLines !== null)
        {
            throw new Error('Level data file ended without ending level ' + curLevelName);
        }
    }
    
    function grid1d(w, val)
    {
        var result = [];
        for(var i = 0; i < w; i++)
        {
            result[i] = val;
        }
        return result;
    }
    
    function grid2d(w, h, val)
    {
        var result = [];
        for(var i = 0; i < w; i++)
        {
            result[i] = [];
            for(var j = 0; j < h; j++)
            {
                result[i][j] = val;
            }
        }
        return result;
    }
    
    function getIslands(map)
    {
        var L0 = map.length;
        var L1 = map[0].length;
        var islandNumbers = grid2d(L0, L1, null);
        var prevident = []
        var nextIslandNumber = 0;
        var i, j;
        // find islands
        for(i = 0; i < L0; i++)
        {
            for(j = 0; j < L1; j++)
            {
                if(map[i][j])
                {
                    var above = (j > 0 && map[i][j-1]);
                    var left = (i > 0 && map[i-1][j]);
                    if(above && left)
                    {
                        var n1 = islandNumbers[i][j-1];
                        while(typeof prevident[n1] !== 'undefined') n1 = prevident[n1];
                        var n2 = islandNumbers[i-1][j];
                        while(typeof prevident[n2] !== 'undefined') n2 = prevident[n2];
                        if(n1 < n2) prevident[n2] = n1;
                        if(n2 < n1) prevident[n1] = n2;
                        islandNumbers[i][j] = Math.min(n1, n2);
                    }
                    else if(above)
                    {
                        islandNumbers[i][j] = islandNumbers[i][j - 1];
                    }
                    else if(left)
                    {
                        islandNumbers[i][j] = islandNumbers[i - 1][j];
                    }
                    else
                    {
                        islandNumbers[i][j] = nextIslandNumber;
                        nextIslandNumber++;
                    }
                }
            }
        }
        // map island numbers to consecutive numbers
        var remap = [];
        var nextRemap = 0;
        for(var k = 0; k < nextIslandNumber; k++)
        {
            if(typeof prevident[k] === 'undefined')
            {
                remap[k] = nextRemap;
                nextRemap++;
            }
        }
        // renumber the grid
        for(i = 0; i < L0; i++)
        {
            for(j = 0; j < L1; j++)
            {
                if(map[i][j])
                {
                    var n = islandNumbers[i][j];
                    while(typeof prevident[n] !== 'undefined') n = prevident[n];
                    islandNumbers[i][j] = remap[n];
                }
            }
        }
        
        // set the data
        return islandNumbers;
    }
    
    function curTime()
    {
        return (new Date()).getTime()/1000;
    }
    
    function updateGameState()
    {
        // compute all the islands
        var level = gameState.level;
        var grid = level.grid;
        var islands = getIslands(gameState.towns);
        gameState.islands = islands;
        // for each island, compute the list of tiles in it
        var islandTiles = [];
        var h = islands.length;
        var w = islands[0].length;
        for(var i = 0; i < h; i++)
        {
            for(var j = 0; j < w; j++)
            {
                var x = islands[i][j]
                if(x !== null)
                {
                    if(typeof islandTiles[x] === "undefined")
                    {
                        islandTiles[x] = [];
                    }
                    islandTiles[x].push([i, j]);
                }
            }
        }
        var nIslands = islandTiles.length;
        // figure out which islands are bad (too large or cover multiple rivers)
        // and update badTowns array. also get counts of towns on each river
        var rivers = level.rivers;
        var nRiversTotal = rivers.length;
        var townOnRiverMap = grid2d(nIslands, nRiversTotal, false);
        var townsOnThisRiver = grid1d(nRiversTotal, 0);
        var goodTowns = grid1d(nIslands, false);
        var badTowns = grid1d(nIslands, false);
        for(var k = 0; k < nIslands; k++)
        {
            var riversOnThisTown = 0;
            for(var l = 0; l < islandTiles[k].length; l++)
            {
                for(var r = 0; r < nRiversTotal; r++)
                {
                    for(var m = 0; m < rivers[r].length; m++)
                    {
                        if(rivers[r][m][0] == islandTiles[k][l][0] && rivers[r][m][1] == islandTiles[k][l][1])
                        {
                            townOnRiverMap[k][r] = true;
                        }
                    }
                }
            }
            
            for(var r = 0; r < nRiversTotal; r++)
            {
                if(townOnRiverMap[k][r])
                {
                    riversOnThisTown++;
                    townsOnThisRiver[r]++;
                }
            }
            
            if(islandTiles[k].length > level.citySize || riversOnThisTown > 1)
            {
                badTowns[k] = true;
            }
            else if(islandTiles[k].length == level.citySize && riversOnThisTown == 1)
            {
                goodTowns[k] = true;
            }
        }
        gameState.goodTowns = goodTowns;
        gameState.badTowns = badTowns;
        gameState.townsOnThisRiver = townsOnThisRiver;
        
        // check if the level is won
        var ok = true;
        for(var k = 0; k < nIslands; k++)
        {
            if(!gameState.goodTowns[k])
            {
                ok = false;
                break;
            }
        }
        var labels = level.riverLabels;
        for(var r = 0; r < nRiversTotal; r++)
        {
            var numer = townsOnThisRiver[r];
            var denom = labels[r];
            if(numer !== denom)
            {
                ok = false;
                break;
            }
        }
        
        gameState.won = ok;
        if(gameState.won && gameState.wonTime === null)
        {
            gameState.wonTime = curTime() + PRE_WON_TIME;
            gameState.highlightTile = null;
            resources.playSpeech(resources.data['ld34_win']);
        }
        
        // debug logging
        // for(var k in islandTiles)
        // {
            // console.log(JSON.stringify(islandTiles[k]), goodTowns[k], badTowns[k]);
        // }
    }
    
    function drawLoadingMode(errorDecoding)
    {
        var mbToLoad = (resources.totalToLoad / 1e6).toFixed(1);
        var mbLoaded = (resources.totalLoaded / 1e6).toFixed(1);
        
        var ctx = theGameCanvas.getContext('2d');
        
        var cx = theGameCanvas.width / 2;
        var cy = theGameCanvas.height / 2;
        
        var loadingString = "Loading";
        var subLoadingString = "";
        if(errorDecoding)
        {
            loadingString = "There was an error decoding the audio";
            subLoadingString = "maybe the connection was lost or there is a problem with your browser?";
        }
        else if(mbToLoad > 0)
        {
            loadingString += " " + mbLoaded + "/" + mbToLoad + "MB";
        }
        if(resources.numDownloaded === resources.numRequests)
        {
            loadingString = "Decoding audio";
            subLoadingString = "(this could take a minute)";
        }
        
        ctx.font = "20pt Verdana";
        ctx.fillStyle = "#000000";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.fillText(loadingString, cx, cy);
        
        
        ctx.font = "14pt Verdana";
        ctx.fillStyle = "#000000";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.fillText(subLoadingString, cx, cy + 20);
    }
    
    function isMouseOverButton(cx, cy, buttonWidth, buttonHeight)
    {
        if(lastMousePos === null) return false;
        
        var mx = lastMousePos[0];
        var my = lastMousePos[1];
        
        var left = cx - buttonWidth / 2;
        var top = cy - buttonHeight / 2;
        var right = cx +  buttonWidth / 2;
        var bottom = cy + buttonHeight / 2;
        
        return (mx >= left && mx <= right && my >= top && my <= bottom);
    }
    
    function getDims()
    {
        var canvW = gameCanvas.width;
        var canvH = gameCanvas.height;
        var level = gameState.level;
        var maxGridW = 12;
        var maxGridH = 10;
        
        var scale = Math.min(canvW * 0.9 / (maxGridW + 2), canvH * 0.9 / (maxGridH + 3));
        var cx = canvW / 2;
        var cy = canvH / 2;
        
        var basicFontSize = Math.floor(scale / 3);
        
        var result = {
            cx: cx,
            cy: cy,
            boardcy: cy - 0.5 * scale,
            scale: scale,
            blockHeight: scale,
            blockWidth: scale,
            cityTextTop: cy - 6.5 * scale,
            cityTextCenter: cx,
            hintTop: cy + 6.5 * scale,
            hintCenter: cx,
            sayTextX: cx,
            sayTextY: cy,
            basicFontSize: basicFontSize,
            maxTextWidth: (maxGridW + 2) * scale,
            houseScale: scale * 0.125,
            markerScale: scale * 0.5,
            levelCountX: canvW - scale * 0.5,
            levelCountY: scale * 0.5,
        }
        
        if(gameState.mode === MODE_PLAYING)
        {
            var gridW = level.w;
            var gridH = level.h;
            result.t = cy - scale * (gridH + 1) / 2;
            result.l = cx - scale * gridW / 2;
            result.buttonsY = cy + scale * (gridH + 2.5) / 2;
        }
        
        return result;
    }
    
    function getMenuDims()
    {
        var result = getDims();
        result.titleY = result.cy - result.scale * 2;
        result.startY = result.cy + result.scale * 0.5;
        result.continueY = result.cy + result.scale * 2;
        result.titleFontSize = result.basicFontSize * 2;
        result.buttonWidth = result.scale * 3;
        
        result.levSelTitleY = result.cy - result.scale * 4;
        
        var spacingW = result.scale * 2;
        var spacingH = result.scale * 1.5;
        var cols = 5;
        
        var levX = [];
        var levY = [];
        for(var i = 0; i < numNormalLevels; i++)
        {
            var row = Math.floor(i / cols)
            var col = i - row * cols;
            var x = result.cx + (col - (cols-1)/2) * spacingW;
            var y = result.cy - result.scale * 2.5 + row * spacingH;
            levX.push(x);
            levY.push(y);
        }
        result.levBonusTitleY = result.cy + result.scale * 2;
        for(var i = 0; i < numBonusLevels; i++)
        {
            var x = result.cx + (i - (numBonusLevels-1)/2)*spacingW;
            var y = result.cy + result.scale * 3.5;
            levX.push(x);
            levY.push(y);
        }
        result.levX = levX;
        result.levY = levY;
        result.levW = result.scale * 0.6;
        result.levH = result.scale * 0.9;
        return result;
    }
    
    function interp(npts, previj, curij, nextij)
    {
        var result = [];
        if(previj[0] === nextij[0] || previj[1] === nextij[1])
        {
            for(var k = 0; k < npts; k++)
            {
                var i = (k / npts) * nextij[0] + (1 - k / npts) * previj[0];
                var j = (k / npts) * nextij[1] + (1 - k / npts) * previj[1];
                result.push([(i + curij[0]) / 2, (j + curij[1]) / 2]);
            }
        }
        else
        {
            var c = [previj[0] + nextij[0] - curij[0], previj[1] + nextij[1] - curij[1]];
            for(var k = 0; k < npts; k++)
            {
                var theta = (k / npts) * Math.PI / 2;
                var i = c[0] + Math.cos(theta) * (previj[0] - c[0]) + Math.sin(theta) * (nextij[0] - c[0]);
                var j = c[1] + Math.cos(theta) * (previj[1] - c[1]) + Math.sin(theta) * (nextij[1] - c[1]);
                result.push([(i + curij[0]) / 2, (j + curij[1]) / 2]);
            }
        }
        return result;
    }
    
    function shortInterp(npts, previj, curij, isInitial)
    {
        var result = [];
        var count;
        for(var k = (isInitial?-npts:0); k < (isInitial?0:npts); k++)
        {
            var i = (k / npts) * curij[0] + (1 - k / npts) * previj[0];
            var j = (k / npts) * curij[1] + (1 - k / npts) * previj[1];
            result.push([(i + curij[0]) / 2, (j + curij[1]) / 2]);
        }
        return result;
    }
    
    function smooth(path)
    {
        // smooth out a path
        var result = [path[0]];
        for(var i = 1; i < path.length - 1; i++)
        {
            result.push([(path[i-1][0] + path[i][0] + path[i+1][0])/3, (path[i-1][1] + path[i][1] + path[i+1][1])/3]);
        }
        result.push(result, path[path.length-1]);
        return result;
    }
    
    function subDivide(path, extraPer)
    {
        // subdivide a piecewise linear path
        var last = path[0];
        var result = [last];
        for(var k = 1; k < path.length; k++)
        {
            var next = path[k];
            for(var h = 0; h < extraPer; h++)
            {
                var cur = [(h * next[0] + (extraPer - h)*last[0]) / extraPer, (h * next[1] + (extraPer - h)*last[1]) / extraPer];
                result.push(cur);
            }
            last = next;
        }
        result.push(path[path.length-1]);
        return result;
    }
    
    function addNearbyRiverPoints(nrp, gridLocs, riverPts)
    {
        var h = nrp.length;
        var w = nrp[0].length;
        for(var gli = 0; gli < gridLocs.length; gli++)
        {
            var p = gridLocs[gli];
            if(p[0] < 0 || p[0] >= h || p[1] < 0 || p[1] >= w) continue;
            var arr = nrp[p[0]][p[1]]
            for(var k = 0; k < riverPts.length; k++)
            {
                arr.push(riverPts[k]);
            }
        }
    }
    
    function createRiverPaths()
    {
        var dims = getDims();
        var riverPaths = [];
        var rivers = gameState.level.rivers;
        var h = gameState.level.h;
        var w = gameState.level.w;
        var nrp = grid2d(h, w, null); //nearby river points
        for(var i = 0; i < h; i++)
        {
            for(var j = 0; j < w; j++)
            {
                nrp[i][j] = [];
            }
        }
        var nPer = 3;
        for(var r = 0; r < rivers.length; r++)
        {
            var rivPt1 = rivers[r][0];
            var rivPt2 = rivers[r][1];
            var newPts = shortInterp(nPer, rivPt1, rivPt2, true);
            addNearbyRiverPoints(nrp, [rivPt1, rivPt2], newPts);
            var curPath = newPts;
            for(var k = 1; k < rivers[r].length - 1; k++)
            {
                var previj = rivers[r][k-1];
                var curij = rivers[r][k];
                var nextij = rivers[r][k+1];
                var newPts = interp(nPer, previj, curij, nextij);
                var scale = 0.15;
                for(var l = 0; l < newPts.length; l++)
                {
                    newPts[l][0] += (Math.random()-0.5) * scale;
                    newPts[l][1] += (Math.random()-0.5) * scale;
                }
                addNearbyRiverPoints(nrp, [previj, curij, nextij], newPts);
                curPath = curPath.concat(newPts);
            }
            var secondLastPt = rivers[r][rivers[r].length-2];
            var lastPt = rivers[r][rivers[r].length-1];
            var newPts = shortInterp(nPer, secondLastPt, lastPt);
            addNearbyRiverPoints(nrp, [secondLastPt, lastPt], newPts);
            curPath = curPath.concat(newPts, false);
            riverPaths.push(curPath);
        }
        for(var r = 0; r < riverPaths.length; r++)
        {
            riverPaths[r] = smooth(subDivide(riverPaths[r], 5));
        }
        gameState.riverPaths = riverPaths;
        gameState.nearbyRiverPoints = nrp;
    }
    
    function shuffleInPlace(L)
    {
        for(var k = L.length - 1; k >= 0; k--)
        {
            var rd = Math.floor(Math.random() * (k + 1));
            var swap = L[rd];
            L[rd] = L[k];
            L[k] = swap;
        }
    }
    
    function addHouses(i, j, nrp)
    {
        gameState.houses[i][j] = makeHouseList(i, j, gameState.nearbyRiverPoints);
    }
    
    // var baseHousePos;
    // (function(){
        // baseHousePos = {};
        // var chars = '.|-nrL,';
        // var o = 0.3;
        // for(var k = 0; k < chars.length; k++)
        // {
            // var c = chars[k];
            // baseHousePos[c] = [[-o, -o], [o, -o], [-o, o], [o, o]];
            // if(c === '.') baseHousePos[c].push([0, 0]);
            // if(!pointsUp(c)) baseHousePos[c].push([-o, 0]);
            // if(!pointsDown(c)) baseHousePos[c].push([o, 0]);
            // if(!pointsLeft(c)) baseHousePos[c].push([0, -o]);
            // if(!pointsRight(c)) baseHousePos[c].push([0, o]);
        // }
    // })();
    var baseHousePos;
    (function(){
        var h = 5;
        baseHousePos = []
        for(var i = 0.5; i <= h; i++)
        {
            for(var j = 0.5; j <= h; j++)
            {
                var pt = [i/h-0.5, j/h-0.5];
                baseHousePos.push(pt);
            }
        }
    })();
    function makeHouseList(i, j, nrp)
    {
        var radCutoff = 0.2;
        // always draw at least 2 houses.
        var result = [];
        //var bhpc = baseHousePos[c];
        var bhpc = baseHousePos;
        shuffleInPlace(bhpc);
        var count = 0;
        var numToDraw = Math.floor((Math.random() * (bhpc.length - 1))) + 2;
        var nrpij = (nrp === null ? nrp : nrp[i][j]);
        for(var k = 0; k < bhpc.length; k++)
        {
            var posi = i + bhpc[k][0] + (Math.random() - 0.5) * 0.05;
            var posj = j + bhpc[k][1] + (Math.random() - 0.5) * 0.05;
            var ok = true;
            if(nrpij !== null)
            {
                for(var l = 0; l < nrpij.length; l++)
                {
                    var dx = posi - nrpij[l][0];
                    var dy = posj - nrpij[l][1];
                    var d = Math.sqrt(dx * dx + dy * dy);
                    if(d < radCutoff)
                    {
                        ok = false;
                    }
                }
            }
            if(ok)
            {
                result.push([posi, posj]);
                count++;
            }
            if(count >= numToDraw) break;
        }
        return result;
    }
    
    function clearHouses(i, j)
    {
        gameState.houses[i][j] = [];
    }
    
    function setupWonHouses()
    {
        wonHouses = [];
        var seen = [];
        for(var rad = 0; rad < 20; rad++)
        {
            for(var count = 0; count < 10; count++)
            {
                var i = Math.round((Math.random() - 0.5) * rad)
                var j = Math.round((Math.random() - 0.5) * rad)
                var ok = true;
                for(var k = 0; k < seen.length; k++)
                {
                    if(seen[k][0] === i && seen[k][1] === j)
                    {
                        ok = false;
                        break;
                    }
                }
                if(ok)
                {
                    seen.push([i, j]);
                    var these = makeHouseList(i, j, null);
                    for(var k = 0; k < these.length; k++)
                    {
                        wonHouses.push(these[k]);
                    }
                }
            }
        }
    }
    
    function drawPlaying()
    {
        var ctx = gameCanvas.getContext('2d');
        var dims = getDims();
        var t = curTime();
        var inTime = t - gameState.startTime;
        var transitionInFactor = (inTime < TRANSITION_IN_TIME)?inTime/TRANSITION_IN_TIME:1;
        var transitionOutFactor = 0;
        ctx.save();
        if(gameState.won)
        {
            transitionOutFactor = (t - gameState.wonTime) / LEVEL_WON_DELAY;
            transitionOutFactor = Math.max(0, Math.min(transitionOutFactor, 1));
            transitionOutFactor = Math.pow(transitionOutFactor, 2);
            ctx.globalAlpha = Math.max(1 - 1.5 * transitionOutFactor, 0);
            var scale = 1 / (1 + transitionOutFactor * 2);
            ctx.translate(dims.cx, dims.cy);
            ctx.scale(scale, scale);
            ctx.translate(-dims.cx, -dims.cy);
        }
        var level = gameState.level;
        var grid = level.grid;
        var rivers = level.rivers;
        var riverLabels = level.riverLabels;
        var riverLabelPos = level.riverLabelPos;
        var towns = gameState.towns;
        var islands = gameState.islands;
        var goodTowns = gameState.goodTowns;
        var badTowns = gameState.badTowns;
        var townsOnThisRiver = gameState.townsOnThisRiver;
        var forbid = gameState.forbid;
        var h = level.h;
        var w = level.w;
        var highlightTile = gameState.highlightTile;
        
        var blockWidth = dims.blockWidth;
        var blockHeight = dims.blockHeight;
        var l = dims.l;
        var t = dims.t;
        
        ctx.lineWidth = 1;
        
        // draw grid lines
        var lc = (Math.floor((1 - transitionInFactor) * 255)).toString();
        var GRID_DARK_COLOR = "rgb(" + lc + "," + lc + "," + lc + ")";
        var extra = 1
        var grad = ctx.createLinearGradient(l - extra * blockWidth, 0, l + (w + extra) * blockWidth, 0);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(extra / (w + 2*extra), GRID_DARK_COLOR);
        grad.addColorStop(1 - extra / (w + 2*extra), GRID_DARK_COLOR);
        grad.addColorStop(1, "#ffffff");
        ctx.strokeStyle = grad;
        ctx.beginPath();
        for(var i = 0; i <= h; i++)
        {
            ctx.moveTo(l - extra * blockWidth, t + i * blockHeight);
            ctx.lineTo(l + (w + extra) * blockWidth, t + i * blockHeight);
        }
        ctx.stroke();
        var grad = ctx.createLinearGradient(0, t - extra * blockHeight, 0, t + (h + extra) * blockHeight);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(extra / (h + 2*extra), GRID_DARK_COLOR);
        grad.addColorStop(1 - extra / (h + 2*extra), GRID_DARK_COLOR);
        grad.addColorStop(1, "#ffffff");
        ctx.strokeStyle = grad;
        ctx.beginPath();
        for(var j = 0; j <= w; j++)
        {
            ctx.moveTo(l + j * blockWidth, t - extra * blockHeight);
            ctx.lineTo(l + j * blockWidth, t + (h + extra) * blockHeight);
        }
        ctx.stroke();
        
        // draw the grid
        var markerImg = resources.data['marker'];
        var markerScale = dims.markerScale;
        for(var i = 0; i < h; i++)
        {
            for(var j = 0; j < w; j++)
            {
                var y = t + blockHeight * i;
                var x = l + blockWidth * j;
                var islandId = islands[i][j];
                
                if(towns[i][j])
                {
                    if(goodTowns[islandId] && badTowns[islandId])
                    {
                        throw new Error("Sanity check failed - town goodness inconsistent");
                    }
                    if(goodTowns[islandId])
                    {
                        ctx.fillStyle = 'rgba(0,90,0,' + (0.2 * (1 - transitionOutFactor)).toString() + ')';
                        ctx.fillRect(x, y, blockWidth, blockHeight);
                    }
                    else if(badTowns[islandId])
                    {
                        ctx.fillStyle = resources.invalidPattern;
                        ctx.fillRect(x, y, blockWidth, blockHeight);
                    }
                }
                if(forbid[i][j])
                {
                    ctx.drawImage(markerImg, 0, 0, markerImg.width, markerImg.height,
                        x + (blockWidth-markerScale)/2, y + (blockHeight-markerScale)/2, markerScale, markerScale);
                }
                if(highlightTile != null)
                {
                    if(highlightTile[0] === i && highlightTile[1] === j)
                    {
                        ctx.fillStyle = 'rgba(0,0,0,0.4)';
                        ctx.fillRect(x, y, blockWidth, blockHeight);
                    }
                }
            }
        }
        
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgb(0,0,0)';
        var islands = gameState.islands;
        // draw thicker lines around the towns
        for(var i = 0; i < h; i++)
        {
            for(var j = 0; j <= w; j++)
            {
                var leftj = j - 1;
                var leftc, rightc;
                if(leftj < 0) leftc = null; else leftc = islands[i][leftj];
                if(j >= w) rightc = null; else rightc = islands[i][j];
                if(leftc !== rightc)
                {
                    var y = t + blockHeight * i;
                    var x = l + blockWidth * j;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + blockHeight);
                    ctx.stroke();
                }
            }
        }
        for(var j = 0; j < w; j++)
        {
            for(var i = 0; i <= h; i++)
            {
                var upi = i - 1;
                var upc, downc;
                if(upi < 0) upc = null; else upc = islands[upi][j];
                if(i >= h) downc = null; else downc = islands[i][j];
                if(upc !== downc)
                {
                    var y = t + blockHeight * i;
                    var x = l + blockWidth * j;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + blockWidth, y);
                    ctx.stroke();
                }
            }
        }
        
        // draw the river
        ctx.lineWidth = 2;
        var rps = gameState.riverPaths;
        for(var r = 0; r < rps.length; r++)
        {
            ctx.strokeStyle = 'rgba(0,0,0,' + (transitionInFactor * (1 - transitionOutFactor)).toString() + ')';
            ctx.beginPath();
            ctx.moveTo((rps[r][0][1] + 0.5) * blockWidth + l, (rps[r][0][0] + 0.5) * blockHeight + t);
            for(var k = 1; k < rps[r].length * transitionInFactor; k++)
            {
                ctx.lineTo((rps[r][k][1] + 0.5) * blockWidth + l, (rps[r][k][0] + 0.5) * blockHeight + t);
            }
            ctx.stroke();
        }
        
        // draw the text for the counts
        for(var r = 0; r < rivers.length; r++)
        {
            var rij = riverLabelPos[r];
            var i = rij[0];
            var offset = 0.5;
            if(i < 0) i -= offset;
            if(i >= h) i += offset;
            var j = rij[1];
            if(j < 0) j -= offset;
            if(j >= w) j += offset;
            var y = t + blockHeight * (i + 0.5);
            var x = l + blockWidth * (j + 0.5);
            
            var numer = townsOnThisRiver[r];
            var denom = riverLabels[r];
            
            var msg = numer.toString() + '/' + denom.toString();
            
            ctx.font = dims.basicFontSize.toString() + "pt Verdana";
            var col = 2 * (1 - transitionInFactor);
            col = Math.floor(Math.max(0, Math.min(col, 1)) * 255);
            if(numer == denom)
            {
                ctx.fillStyle = "rgb(" + col.toString() + "," + (col + 90).toString() + "," + col.toString() + ")";
            }
            else
            {
                ctx.fillStyle = "rgb(" + col.toString() + "," + col.toString() + "," + col.toString() + ")";
            }
            ctx.textAlign="center";
            ctx.textBaseline="middle";
            ctx.fillText(msg, x, y);
        }
        
        // draw houses
        var houseScale = dims.houseScale;
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        for(var i = 0; i < h; i++)
        {
            for(var j = 0; j < w; j++)
            {
                var hs = gameState.houses[i][j];
                for(var k = 0; k < hs.length; k++)
                {
                    var x = (hs[k][1] + 0.5) * blockWidth + l - 0.5 * houseScale;
                    var y = (hs[k][0] + 0.5) * blockHeight + t - 0.5 * houseScale;
                    ctx.fillRect(x, y, houseScale, houseScale);
                    ctx.strokeRect(x, y, houseScale, houseScale);
                }
            }
        }
        
        // draw houses if won
        var wonOffi = Math.floor(h / 2);
        var wonOffj = Math.floor(w / 2);
        for(var k = 0; k < wonHouses.length * transitionOutFactor; k++)
        {
            var i = wonHouses[k][0];
            var j = wonHouses[k][1];
            var drawi = i + wonOffi;
            var drawj = j + wonOffj;
            
            var ok = drawi < -0.5 || drawi >= h - 0.5 || drawj < -0.5 || drawj >= w - 0.5;
            ok = ok || !towns[Math.floor(drawi + 0.5)][Math.floor(drawj + 0.5)];
            
            if(ok)
            {
                var x = (drawj + 0.5) * blockWidth + l - 0.5 * houseScale;
                var y = (drawi + 0.5) * blockHeight + t - 0.5 * houseScale;
                ctx.fillRect(x, y, houseScale, houseScale);
                ctx.strokeRect(x, y, houseScale, houseScale);
            }
        }
        
        ctx.restore();
        ctx.save();
        ctx.globalAlpha = Math.max(1 - 1.5 * transitionOutFactor, 0);
        ctx.font = dims.basicFontSize.toString() + "pt Verdana";
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // draw the text saying the city size
        if(level.citySize > 1) // don't overcomplicate things at the beginning
        {
            var msg = "Required town size: " + level.citySize.toString();
            ctx.fillText(msg, dims.cityTextCenter, dims.cityTextTop);
        }
        
        // draw the buttons
        drawButtons(ctx, dims)
        
        // draw the hint
        ctx.fillStyle = "#000000";
        if(level.hint !== null)
        {
            var lineStep = dims.scale * 0.6;
            var hintLines = wordWrap(ctx, level.hint, dims.maxTextWidth);
            var hintPosY = dims.hintTop;
            for(var k = hintLines.length - 1; k >= 0; k--)
            {
                ctx.fillText(hintLines[k], dims.hintCenter, hintPosY);
                hintPosY -= lineStep;
            }
        }
        
        // draw the level number
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        var levelNumber = levelNameToNumber[level.name] + 1;
        if(level.name.substring(0, 5) === 'bonus')
        {
            ctx.fillText("Bonus " + (levelNumber - numNormalLevels).toString() + "/" + numBonusLevels.toString(), dims.levelCountX, dims.levelCountY);
        }
        else
        {
            ctx.fillText(levelNumber.toString() + "/" + numNormalLevels.toString(), dims.levelCountX, dims.levelCountY);
        }
        
        ctx.restore();
    }
    
    function canBuildMark()
    {
        return gameState.levelNum >= 2;
    }
    function highlightBuild()
    {
        return !gameState.forceMark;
    }
    function clickBuild()
    {
        gameState.forceMark = false;
    }
    function highlightMark()
    {
        return gameState.forceMark;
    }
    function clickMark()
    {
        gameState.forceMark = true;
    }
    function canLevels()
    {
        return true;
    }
    function highlightLevels()
    {
        return false;
    }
    function clickLevels()
    {
        startLevelSelect();
    }
    
    var gameButtons = [
      ['Build', canBuildMark, highlightBuild, clickBuild],
      ['Mark', canBuildMark, highlightMark, clickMark],
      ['Levels', canLevels, highlightLevels, clickLevels]
    ];
    
    function drawButtons(ctx, dims)
    {
        var n = gameButtons.length;
        for(var i = 0; i < n; i++)
        {
            var r = gameButtonRect(dims, i);
            var but = gameButtons[i];
            if(but[1]())
            {
                var isOver = isMouseOverButton(r[0], r[1], r[2], r[3]);
                var highlight = but[2]();
                var shouldHandle = gridShouldHandleMouse();
                drawButton(ctx, r[0], r[1], r[2], r[3], but[0],
                    shouldHandle && (highlight || isOver));
            }
        }
    }
    
    function gameButtonRect(dims, idx)
    {
        var buttonsY = dims.buttonsY;
        var w = dims.scale * 2;
        var h = dims.scale * 0.8;
        var spacing = dims.scale * 2.4;
        var n = gameButtons.length;
        var x = dims.cx + (idx - (n-1)*0.5) * spacing;
        return [x, dims.buttonsY, w, h];
    }
    
    function drawButton(ctx, x, y, w, h, txt, highlight)
    {
        var style = 'rgba(0,0,0,1)';
        var l = x - w/2;
        var t = y - h/2;
        var fontSize = h * 0.5;
        ctx.font = fontSize.toString() + "pt Verdana";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        if(highlight)
        {
            ctx.fillStyle = style;
            ctx.fillRect(l, t, w, h);
            ctx.fillStyle = "#FFFFFF";
        }
        else
        {
            ctx.strokeStyle = style;
            ctx.strokeRect(l, t, w, h);
            ctx.fillStyle = "#000000";
        }
        ctx.fillText(txt, x, y);
    }
    
    function drawSaying()
    {
        var ctx = gameCanvas.getContext('2d');
        var t = curTime();
        var transitionInFactor = (t - gameState.startSayTime) / SAY_TRANSITION_TIME;
        var transitionOutFactor = (gameState.endSayTime - t) / SAY_TRANSITION_TIME;
        var transitionFactor = Math.max(0, Math.min(1, transitionInFactor * transitionOutFactor));
        var dims = getDims();
        ctx.save();
        ctx.globalAlpha = transitionFactor;
        ctx.font = dims.basicFontSize + "pt Verdana";
        ctx.fillStyle = "rgb(0, 0, 0)";
        
        var msgs = wordWrap(ctx, gameState.sayText, dims.maxTextWidth);
        var lineStep = dims.scale * 0.6;
        var y = dims.sayTextY - lineStep * msgs.length / 2;
        for(var k = 0; k < msgs.length; k++)
        {
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(msgs[k], dims.sayTextX, y);
            y += lineStep;
        }
        ctx.restore();
    }
    
    function drawFadingLine(ctx, i0, j0, i1, j1, extra, darkColor)
    {
        var dirx = i1 - i0;
        var diry = j1 - j0;
        var mag = Math.sqrt(dirx * dirx + diry * diry);
        dirx /= mag;
        diry /= mag;
        
        var pre_i = i0 - dirx * extra;
        var pre_j = j0 - diry * extra;
        var post_i = i1 + dirx * extra;
        var post_j = j1 + diry * extra;
        var grad = ctx.createLinearGradient(pre_i, pre_j, post_i, post_j);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(extra / (mag + 2*extra), darkColor);
        grad.addColorStop(1 - extra / (mag + 2*extra), darkColor);
        grad.addColorStop(1, "#ffffff");
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(pre_i, pre_j);
        ctx.lineTo(post_i, post_j);
        ctx.stroke();
    }
    
    function drawButtonLines(ctx, cx, cy, buttonWidth, buttonHeight, extra)
    {
        drawFadingLine(ctx, cx - buttonWidth / 2, cy - buttonHeight / 2,
            cx + buttonWidth / 2, cy - buttonHeight / 2, extra, "#808080");
        drawFadingLine(ctx, cx - buttonWidth / 2, cy + buttonHeight / 2,
            cx + buttonWidth / 2, cy + buttonHeight / 2, extra, "#808080");
    }
    
    function drawMenu()
    {
        var ctx = gameCanvas.getContext('2d');
        var t = curTime();
        var transitionInFactor = (t - gameState.startMenuTime) / MENU_TRANSITION_TIME;
        var transitionOutFactor = 0;
        if(gameState.menuExitTime !== null)
        {
            transitionOutFactor = (t - gameState.menuExitTime) / MENU_TRANSITION_TIME;
        }
        var transitionFactor = Math.max(0, Math.min(1, transitionInFactor * (1 - transitionOutFactor)));
        ctx.save();
        ctx.globalAlpha = transitionFactor;
        var dims = getMenuDims();
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = dims.titleFontSize + "pt Helvetica";
        ctx.fillText("Cities of Babylon", dims.cx, dims.titleY);
        
        ctx.font = dims.basicFontSize + "pt Verdana";
        
        var hm = menuShouldHandleMouse();
        var isMouseOverStart = hm && isMouseOverButton(dims.cx, dims.startY, dims.buttonWidth, dims.scale);
        ctx.fillText("Start", dims.cx, dims.startY);
        drawButtonLines(ctx, dims.cx, dims.startY, isMouseOverStart?dims.buttonWidth*2:dims.buttonWidth, dims.scale, dims.scale);
        
        if(showContinueButton())
        {
            var isMouseOverContinue = hm && isMouseOverButton(dims.cx, dims.continueY, dims.buttonWidth, dims.scale);
            ctx.fillText("Continue", dims.cx, dims.continueY);
            drawButtonLines(ctx, dims.cx, dims.continueY, isMouseOverContinue?dims.buttonWidth*2:dims.buttonWidth, dims.scale, dims.scale);
        }
        ctx.restore();
    }
    
    function drawLevelSelect()
    {
        var ctx = gameCanvas.getContext('2d');
        var t = curTime();
        var transitionInFactor = (t - gameState.startLevelSelectTime) / MENU_TRANSITION_TIME;
        
        var transitionFactor = Math.max(0, Math.min(1, transitionInFactor));
        
        var unlocked = getLastLevelUnlocked();
        
        ctx.save();
        ctx.globalAlpha = transitionFactor;
        
        // draw level text
        var dims = getMenuDims();
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = dims.titleFontSize + "pt Verdana";
        ctx.fillText("Main Levels", dims.cx, dims.levSelTitleY);
        ctx.fillText("Bonus Levels", dims.cx, dims.levBonusTitleY);
        
        // draw level buttons
        ctx.font = dims.basicFontSize + "pt Verdana";
        for(var i = 0; i < numLevels; i++)
        {
            var x = dims.levX[i];
            var y = dims.levY[i];
            var dispid=(i>=numNormalLevels?i-numNormalLevels+1:i+1)
            if(i <= unlocked)
            {
                var over = isMouseOverButton(x, y,
                    dims.levW, dims.levH);
                drawButtonLines(ctx, x, y, over?dims.levW*2:dims.levW,
                    dims.levH, dims.scale/2);
                ctx.fillStyle = "rgb(0, 0, 0)";
            }
            else
            {
                ctx.fillStyle = "rgba(128,48,0,0.5)";
            }
            ctx.fillText(dispid.toString(), x, y);
        }
        
        ctx.restore();
    }
    
    function drawEnding()
    {
        var ctx = gameCanvas.getContext('2d');
        var t = curTime();
        var transitionInFactor = (t - gameState.startEndingTime) / MENU_TRANSITION_TIME;
        
        var transitionFactor = Math.max(0, Math.min(1, transitionInFactor));
        
        ctx.save();
        ctx.globalAlpha = transitionFactor;
        var dims = getMenuDims();
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = dims.titleFontSize + "pt Verdana";
        ctx.fillText("Cities of Babylon", dims.cx, dims.titleY);
        ctx.font = dims.basicFontSize + "pt Verdana";
        ctx.fillText("This was a game by Michael Pauley", dims.cx, dims.titleY + dims.scale * 2);
        ctx.fillText("This version is for coolmath-games", dims.cx, dims.titleY + dims.scale * 3);
        
        if(!gameState.superEnding)
        {
            ctx.font = dims.basicFontSize * 1.5 + "pt Verdana";
            ctx.fillText("Click for bonus levels!", dims.cx, dims.titleY + dims.scale * 4.4);
        }
        else
        {
            ctx.fillText("That's really the end, really.", dims.cx, dims.titleY + dims.scale * 4.4);
        }
        
        ctx.restore();
    }
    
    var frameResetTime = null;
    var frameCount = 0;
    function frame() {
        // request to call this function again the next frame
        requestAnimationFrame(frame);
        
        var t = curTime();
        if(frameResetTime === null)
        {
            frameResetTime = t;
        }
        else if(t > frameResetTime + 1)
        {
            window.frameRate = frameCount;
            frameCount = 0;
            frameResetTime = t;
        }
        frameCount++;
        
        if(forceUnlockAllLevels)
        {
            setLastLevelUnlocked(numLevels - 1);
            forceUnlockAllLevels = false;
        }
        
        // drawing
        var ctx = theGameCanvas.getContext('2d');
        
        // make sure canvas is the right size
        var w = window.innerWidth;
        var h = window.innerHeight;
        if(theGameCanvas.width !== w || theGameCanvas.height !== h)
        {
            theGameCanvas.width = w;
            theGameCanvas.height = h;
        }
        ctx.clearRect(0, 0, theGameCanvas.width, theGameCanvas.height);
        
        if(gameState.mode === MODE_LOADING)
        {
            drawLoadingMode();
            return;
        }
        
        // draw based on the state of the game
        if(gameState.mode === MODE_PLAYING)
        {
            drawPlaying();
            if(gameState.wonTime !== null && t > gameState.wonTime + LEVEL_WON_DELAY)
            {
                nextStoryEvent();
            }
        }
        else if(gameState.mode === MODE_SAYING)
        {
            drawSaying();
        }
        else if(gameState.mode === MODE_MENU)
        {
            drawMenu();
            if(gameState.menuExitTime !== null && t > gameState.menuExitTime + MENU_TRANSITION_TIME)
            {
                gameState.menuExitCallback();
            }
        }
        else if(gameState.mode === MODE_LEVELSELECT)
        {
            drawLevelSelect();
        }
        else if(gameState.mode === MODE_ENDING)
        {
            drawEnding();
        }
    }
    
    function getCanvasCoordsFromScreenCoords(x, y) {
        var rect = theGameCanvas.getBoundingClientRect();
        var rx = x - rect.left;
        var ry = y - rect.top;
        return [rx, ry];
    }
    
    function getTileFromCanvasCoords(rx, ry)
    {
        // nb, mouse/canvas coords are (horizontal, vertical)
        // but tile coords are (vertical, horizontal)
        var dims = getDims();
        var ty = Math.floor((ry - dims.t) / dims.blockHeight);
        var tx = Math.floor((rx - dims.l) / dims.blockWidth);
        var h = gameState.level.h;
        var w = gameState.level.w;
        if(ty < 0 || ty >= h || tx < 0 || tx >= w) return null;
        return [ty, tx];
    }
    
    function gridShouldHandleMouse()
    {
        if(gameState.mode !== MODE_PLAYING) return false;
        var t = curTime();
        return !gameState.won && t >= gameState.startTime + TRANSITION_IN_TIME;
    }
    
    function menuShouldHandleMouse()
    {
        if(gameState.mode !== MODE_MENU) return false;
        var t = curTime();
        return (gameState.menuExitTime === null) && (t > gameState.startMenuTime + MENU_TRANSITION_TIME)
    }
    
    function handleClick(e)
    {
        // don't let event bubble up
        e.preventDefault();
        e.stopPropagation();
        var bs;
        
        var w = theGameCanvas.width;
        var h = theGameCanvas.height;
        
        if(e.type === 'click' && e.which !== 1)
        {
            // We'll handle the right-click in oncontextmenu, but
            // Firefox fires an extra click event
            return false;
        }
        
        var isLeft = (e.type === 'click');
        var t = curTime();
        if(gridShouldHandleMouse())
        {
            // handling clicks in the level
            var coords = getCanvasCoordsFromScreenCoords(e.clientX, e.clientY);
            var tij = getTileFromCanvasCoords(coords[0], coords[1]);
            
            if(tij !== null)
            {
                var i = tij[0];
                var j = tij[1];
                var level = gameState.level;
                
                var building = isLeft && !gameState.forceMark;
                if(building)
                {
                    gameState.towns[i][j] = !gameState.towns[i][j];
                    if(gameState.towns[i][j])
                    {
                        addHouses(i, j, gameState.level.grid[i][j]);
                        resources.playSpeech(resources.data['ld34_place']);
                    }
                    else
                    {
                        clearHouses(i, j);
                        resources.playSpeech(resources.data['ld34_clear']);
                    }
                }
                else
                {
                    gameState.forbid[i][j] = !gameState.forbid[i][j];
                }
                updateGameState();
            }
            else
            {
                // check if mouse clicked on any buttons
                var n = gameButtons.length;
                var dims = getDims();
                for(var i = 0; i < n; i++)
                {
                    var r = gameButtonRect(dims, i);
                    var but = gameButtons[i];
                    if(but[1]())
                    {
                        var isOver = isMouseOverButton(
                            r[0], r[1], r[2], r[3]);
                        if(isOver)
                        {
                            but[3](); // call button's click handler
                        }
                    }
                }
            }
        }
        else if(menuShouldHandleMouse())
        {
            if(isLeft)
            {
                var dims = getMenuDims();
                var isMouseOverStart = isMouseOverButton(dims.cx, dims.startY, dims.buttonWidth, dims.scale);
                var isMouseOverContinue = isMouseOverButton(dims.cx, dims.continueY, dims.buttonWidth, dims.scale);
                
                if(isMouseOverStart)
                {
                    resources.playSpeech(resources.data['ld34_button']);
                    exitMenu(startStory);
                }
                else if(showContinueButton() && isMouseOverContinue)
                {
                    exitMenu(continueStory);
                }
            }
        }
        else if(gameState.mode === MODE_ENDING && !gameState.superEnding)
        {
            nextStoryEvent();
        }
        else if(gameState.mode === MODE_LEVELSELECT)
        {
            var dims = getMenuDims();
            if(isLeft)
            {
                for(var i = 0; i < numLevels; i++)
                {
                    var x = dims.levX[i];
                    var y = dims.levY[i];
                    var over = isMouseOverButton(x, y,
                        dims.levW, dims.levH);
                    if(over)
                    {
                        var unlocked = getLastLevelUnlocked();
                        if(i <= unlocked)
                        {
                            startFromLevel(i);
                            break;
                        }
                    }
                }
            }
        }
        
        return false;
    }
    
    function handleDoubleClick(e)
    {
        // don't let event bubble up
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    
    function handleMouseMove(e)
    {
        var coords = getCanvasCoordsFromScreenCoords(e.clientX, e.clientY);
        lastMousePos = coords;
        
        var t = curTime();
        if(gridShouldHandleMouse())
        {
            var tij = getTileFromCanvasCoords(coords[0], coords[1]);
            gameState.highlightTile = tij;
        }
    }
    
    function wordWrap(ctx, text, maxw)
    {
        var outList = [];
        var cLine = '';
        var rem = text;
        while(rem != '')
        {
            // get the next word
            var nextSpace = rem.indexOf(' ');
            var nextWord;
            if(nextSpace < 0)
            {
                nextWord = rem;
                rem = '';
            }
            else
            {
                nextWord = rem.slice(0, nextSpace);
                rem = rem.slice(nextSpace + 1);
            }
            // test if the line is OK
            var trialLine = cLine;
            if(trialLine !== '') trialLine += ' ';
            trialLine += nextWord;
            var textmes = ctx.measureText(trialLine);
            if(cLine === '' || textmes.width < maxw)
            {
                cLine = trialLine;
            }
            else
            {
                outList.push(cLine);
                cLine = nextWord;
            }
        }
        if(cLine != '') outList.push(cLine);
        return outList;
    }
    
    window.onload = handleWindowLoad();
})();



