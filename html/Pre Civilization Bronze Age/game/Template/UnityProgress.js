function UnityProgress (dom) {
	this.progress = 0.0;
	this.message = "";
	this.dom = dom;

	var parent = dom.parentNode;

	var background = document.createElement("div");
	background.style.background = Module["backgroundColor"] ? Module["backgroundColor"] : "#4D4D4D";
	background.style.position = "absolute";
	background.style.overflow = "hidden";
	parent.appendChild(background);
	this.background = background;

	var progressBar = document.createElement("div");
	progressBar.style.position = "absolute";
	progressBar.style.overflow = "hidden";
	progressBar.style.display = "block";
	progressBar.style.zIndex = "11";
	parent.appendChild(progressBar);
	this.progressBar = progressBar;

	var progressBarImg = document.createElement("img");
	progressBarImg.src = "Template/progress.png"; 
	progressBarImg.style.position = "absolute";
	progressBarImg.style.zIndex = "12";
	progressBar.appendChild(progressBarImg);
	this.progressBarImg = progressBarImg;

	var messageArea = document.createElement("p");
	messageArea.style.position = "absolute";
	messageArea.style.display = "inline";
	messageArea.style.zIndex = "13";
	messageArea.style.color = "#00FF00";
	messageArea.style.textShadow = "1px 1px 1px black, -1px -1px 1px black, -1px 1px 1px black, 1px -1px 1px black";
	parent.appendChild(messageArea);
	this.messageArea = messageArea;


	this.SetProgress = function (progress) { 
		if (this.progress < progress)
			this.progress = progress; 
		this.Update();
	}

	this.SetMessage = function (message) { 
		if (!message || message.length == 0 && this.progress > 0) {
			this.SetProgress(1);
			return;
		}
		this.message = message; 
		this.Update();
	}

	this.Clear = function() {
		this.background.style.display = "none";
		this.progressBar.style.display = "none";
		this.messageArea.style.display = "none";
	}

	this.Update = function() {
		var percentage = Math.min(this.progress / 1.01, 1);
		var length = 752 * percentage;

		this.background.style.top = this.dom.offsetTop + 'px';
		this.background.style.left = this.dom.offsetLeft + 'px';
		this.background.style.width = this.dom.offsetWidth + 'px';
		this.background.style.height = this.dom.offsetHeight + 'px';

		this.progressBar.style.top = this.dom.offsetTop + '537px';
		this.progressBar.style.left = this.dom.offsetLeft + '27px';
		this.progressBar.style.width = '752px';
		this.progressBar.style.height = '47px';

		this.progressBarImg.style.top = '0px';
		this.progressBarImg.style.left = '0px';
		this.progressBarImg.style.width = length + 'px';
		this.progressBarImg.style.height = this.progressBar.style.height;

		this.messageArea.style.top = this.progressBar.style.top;
		this.messageArea.style.left = 0;
		this.messageArea.style.width = '100%';
		this.messageArea.style.textAlign = 'center';
		this.messageArea.innerHTML = Math.round(percentage * 100) + "%";
	}

	this.Update ();
}