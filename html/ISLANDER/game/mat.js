function onSite() 
{
	var sites = [
    "www.coolmath-games.com",
	"www.coolmathgames.com",
    "edit.coolmath-games.com",
	"edit.coolmathgames.com",
	"www.stage.coolmath-games.com",
	"www.stage.coolmathgames.com",
	"edit-stage.coolmath-games.com",
	"edit-stage.coolmathgames.com",
	"dev.coolmath-games.com",
	"dev.coolmathgames.com"
	]; 

	var getUrl = window.location;
	var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
	
	for (i = 0; i < sites.length; i++) 
	{
		if(baseUrl.indexOf(sites[i]) != -1)
			return true;
	}
	
	return false;
}