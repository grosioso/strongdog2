


const scriptsInEvents = {

	async _global_Event3_Act1(runtime, localVars)
	{
		window.addEventListener('keydown', ev => {
		    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', ' '].includes(ev.key)) {
		        ev.preventDefault();
		    }
		});
		window.addEventListener('wheel', ev => ev.preventDefault(), { passive: false });
	},

	async _global_Event81_Act1(runtime, localVars)
	{
		
		window.electron.remote.app.exit( 0 );
	},

	async _global_Event82_Act1(runtime, localVars)
	{
		
		window.electron.remote.app.exit( 1 );
	},

	async _global_Event83_Act1(runtime, localVars)
	{
		
		window.electron.remote.app.exit( 2 );
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

