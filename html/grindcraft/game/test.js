/**
 * ...
 * @author gonzos
 */
var externalCallManagerInstance;

class externalCallManager
{
	callbacks;
	
	constructor()
	{
		this.callbacks = {};
	}
	
	registerFunction(name, callback)
	{
		this.callbacks[name] = callback;
	}
	
	callEvent(name)
	{
		if(this.callbacks.hasOwnProperty(name))
		{
			this.callbacks[name]();
		}
		else
		{
			console.log("event "+name+" called but no such registered callback exists");
		}
	}
	
	setpause()
	{
		externalCallManagerInstance.callEvent("pause");
		
		window.setTimeout(()=>{externalCallManagerInstance.callEvent("unpause");},5000);
	}
		
}

(function() {
	
	console.log("Test....");
	externalCallManagerInstance = new externalCallManager();
	
	//window.setTimeout(()=>{externalCallManagerInstance.setpause()},10000);
	
})();


