var Filesaver = new Object();

Filesaver.saveFile = function(text, name, folder) {
	if(DESKTOP_VERSION && folder){
		ipcRenderer.send('set-savePath', folder );
	}
    var a = document.createElement("a");
    var file = new Blob([text], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}

//download(jsonData, 'test.txt', 'text/plain');