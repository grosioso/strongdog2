(function(){
	"use strict";
	
	var MUSIC_VOLUME = 0.3;
	var SPEECH_VOLUME = 0.9;
	var PRE_MUSIC_DELAY = 3; // seconds
    
    // chrome has a bug where the sound end event doesn't fire if you don't hold a reference to the audio object
    var curSource = null;
	
	function Resources()
	{
		// constructor for a collection of resources
		this.data = {};
		this.amtLoaded = {};
		this.requests = [];
		this.sizes = {};
		this.numSizesGot = 0;
		this.numRequests = 0;
		this.numDownloaded = 0;
		this.numDecoded = 0;
		this.totalLoaded = 0;
		this.totalToLoad = 0;
		this.playlist = [];
		this.currentTrackId = -1;
		this.musicStarted = false;
		this.playingSpeech = null;
        this.errorDecoding = false;
        this.speechTimeout = null;
		
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        
        // attempt to use web audio when possible
		if(typeof window.AudioContext !== "undefined")
		{
			this.useWebAudio = true;
			this.audioContext = new AudioContext();
			
			this.musicGainNode = this.audioContext.createGain();
			this.musicGainNode.gain.value = MUSIC_VOLUME;
			this.musicGainNode.connect(this.audioContext.destination);
			
			this.speechGainNode = this.audioContext.createGain();
			this.speechGainNode.gain.value = SPEECH_VOLUME;
			this.speechGainNode.connect(this.audioContext.destination);
		}
		else
		{
			this.useWebAudio = false;
		}
	}
	window.Resources = Resources;
	
	Resources.prototype.reqImage = function(name)
	{
		// request an image
		this.requests.push([name, ".png", "image/png"]);
		this.numRequests++;
	}
	
	Resources.prototype.reqAudio = function(name)
	{
		// request an mp3 sound
		this.requests.push([name, ".mp3", "audio/mpeg"]);
		this.numRequests++;
	}
    
    Resources.prototype.reqAscii = function(name)
    {
        // request a text file
        this.requests.push([name, ".txt", "text/plain"]);
        this.numRequests++;
    }
	
	Resources.prototype.getAllFileSizes = function(callback)
	{
		// start getting all the file sizes
		for(var i = 0; i < this.requests.length; i++)
		{
			var name = this.requests[i][0];
			var ext = this.requests[i][1];
			var mime = this.requests[i][2];
			var filename = name + ext;
			this.getFileSize(filename, mime, 
				this.handleGotFileSize.bind(this, name, callback));
		}
	}
	
	Resources.prototype.getFileSize = function(filename, mime, callback)
	{
		var req = new XMLHttpRequest();
		req.open("HEAD", filename);
        if(req.overrideMimeType) req.overrideMimeType(mime);
		req.onreadystatechange = function() {
			if(req.readyState == req.DONE)
			{
				var bytes = parseInt(req.getResponseHeader("Content-Length"));
				callback(bytes);
			}
		}
		req.send();
	}
	
	Resources.prototype.handleGotFileSize = function(name, callback, size)
	{
		// handle receiving a file size
		this.sizes[name] = size;
		this.numSizesGot++;
		if(this.numSizesGot == this.numRequests)
		{
			this.recomputeLoaded();
			callback();
		}
	}
	
	Resources.prototype.downloadAll = function(callback)
	{
		// start getting all the file sizes
		for(var i = 0; i < this.requests.length; i++)
		{
			var name = this.requests[i][0];
			var ext = this.requests[i][1];
			var mime = this.requests[i][2];
			this.amtLoaded[name] = 0;
			var filename = name + ext;
			this.downloadFile(name, filename, mime,
				this.handleDownloadedFile.bind(this, name, mime, callback));
		}
	}
	
	Resources.prototype.recomputeLoaded = function()
	{
		var denom = 0;
		for(var x in this.sizes)
		{
			if(this.sizes.hasOwnProperty(x))
			{
				denom += this.sizes[x];
			}
		}
		this.totalToLoad = denom;
		
		var numer = 0;
		for(var x in this.amtLoaded)
		{
			if(this.amtLoaded.hasOwnProperty(x))
			{
				numer += this.amtLoaded[x];
			}
		}
		this.totalLoaded = numer;
	}
	
	Resources.prototype.downloadFile = function(name, filename, mime, callback)
	{
		var req = new XMLHttpRequest();
		req.open("GET", filename);
        if(req.overrideMimeType) req.overrideMimeType(mime);
		req.responseType = 'arraybuffer';
		req.onprogress = (function(evt) {
			this.amtLoaded[name] = evt.loaded;
			this.recomputeLoaded();
		}).bind(this);
		req.onreadystatechange = function() {
			if(req.readyState == req.DONE)
			{
				callback(req.response);
			}
		}
		req.send();
	}
	
	Resources.prototype.handleDownloadedFile = function(name, mime, callback, response)
	{
		this.numDownloaded++;
		if(mime == "image/png")
		{
			var blob = new Blob([response], {type: mime});
			var result = new Image();
			result.src = URL.createObjectURL(blob);
			result.onload = this.handleProcessedFile.bind(this, callback);
			this.data[name] = result;
		}
		else if(mime == "audio/mpeg")
		{
			if(this.useWebAudio)
			{
				// web audio API
                var me = this;
				this.audioContext.decodeAudioData(response, (function(buffer)
				{
					this.data[name] = buffer;
					this.handleProcessedFile(callback);
				}).bind(this), function() {me.errorDecoding = true; throw new Error('Could not decode sound');});
			}
			else
			{
				// regular audio
				var blob = new Blob([response], {type: mime});
				var result = new Audio();
				result.src = URL.createObjectURL(blob);
				result.addEventListener('canplaythrough',
					this.handleProcessedFile.bind(this, callback));
				this.data[name] = result;
			}
		}
        else if(mime == "text/plain") // ascii
        {
            this.data[name] = String.fromCharCode.apply(null, new Uint8Array(response));
			this.handleProcessedFile(callback); // already processed
        }
		else
		{
			throw new Error("Don't know how to handle mime type " + mime);
		}
	}
	
	Resources.prototype.handleProcessedFile = function(callback)
	{
		this.numDecoded++;
		if(this.numDecoded == this.numRequests)
		{
			callback();
		}
	}
	
	Resources.prototype.startMusic = function(playlist, firstTrackId)
	{
		this.musicStarted = true;
		this.playlist = playlist;
		
		this.currentTrackId = firstTrackId;
        if(playlist.length === 0) return;
		var track = playlist[firstTrackId];
		
		if(this.useWebAudio)
		{
			var source = this.audioContext.createBufferSource();
			source.buffer = track;
			source.loop = false;
			source.connect(this.musicGainNode);
			source.start(this.audioContext.currentTime + PRE_MUSIC_DELAY);
			//source.onended = this.nextTrack.bind(this);
			setTimeout(this.nextTrack.bind(this), (0.1  + track.duration) * 1000);
            curSource = source;
		}
		else
		{
            track.pause();
			track.currentTime = 0;
			track.volume = 0;
			setTimeout(function()
			{
				track.volume = MUSIC_VOLUME;
				track.play();
			}, PRE_MUSIC_DELAY * 1000);
			
			// give all the tracks event listeners to make them play the next track
			for(var i = 0; i < playlist.length; i++)
			{
				playlist[i].addEventListener('ended', this.nextTrack.bind(this), false);
			}
		}
	}
	
	Resources.prototype.nextTrack = function()
	{
		// select a random track other than the current one
        var nextTrackId;
        if(this.playlist.length > 1)
        {
            nextTrackId = Math.floor(Math.random() * (this.playlist.length - 1));
            if(nextTrackId == this.currentTrackId) nextTrackId++;
        }
        else
        {
            nextTrackId = 0;
        }
		var track = this.playlist[nextTrackId];
		this.currentTrackId = nextTrackId;
		
		if(this.useWebAudio)
		{
			var source = this.audioContext.createBufferSource();
			source.buffer = track;
			source.loop = false;
			source.connect(this.musicGainNode);
			source.start(this.audioContext.currentTime + PRE_MUSIC_DELAY);
			//source.onended = this.nextTrack.bind(this);
			setTimeout(this.nextTrack.bind(this), (0.1  + track.duration) * 1000);
            curSource = source;
		}
		else
		{
			track.currentTime = 0;
			track.volume = 0;
			setTimeout(function()
			{
				track.volume = MUSIC_VOLUME;
				track.play();
			}, 3000);
		}
	}
    
    Resources.prototype.stopSpeech = function()
    {
        if(this.useWebAudio)
        {
            this.playingSpeech.stop();
            if(this.speechTimeout !== null)
            {
                clearTimeout(this.speechTimeout);
                this.speechTimeout = null;
            }
        }
        else
        {
            this.playingSpeech.pause();
            this.playingSpeech.currentTime = 0;
        }
        this.playingSpeech = null;
    }
	
	Resources.prototype.playSpeech = function(sound, callback)
	{
		if(this.useWebAudio)
		{
			var source = this.audioContext.createBufferSource();
			source.buffer = sound;
			source.loop = false;
            source.connect(this.speechGainNode);
			source.start(this.audioContext.currentTime);
			// call me again when sound finished
			//source.onended = callback;
			this.speechTimeout = setTimeout(callback, (0.1  + sound.duration) * 1000);
			this.playingSpeech = source;
		}
		else
		{
			sound.currentTime = 0;
            sound.volume = SPEECH_VOLUME;
			sound.play();
			sound.onended = callback;
			this.playingSpeech = sound;
		}
	}
})();
