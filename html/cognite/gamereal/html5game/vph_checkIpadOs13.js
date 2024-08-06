function checkIpadOs13() {
	window.gml_Script_gmcallback_isIPadOs13(null,null,navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}