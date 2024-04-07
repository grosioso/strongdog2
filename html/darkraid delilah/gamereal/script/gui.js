function GUIElem(){
	this.x = 0.05;
	this.y = 0.05;
	
	this.x_relative = 0.05;
	this.y_relative = 0.05;
	
	this.w = 0.2;
	this.h = 0.2;
	this.angle = 0;
	this.visible = true;
	this.linesOnly = false;
	this.mouseBlocker = true;
	this.isMouseOver = false;
	//used for displaying text gradually
	this.prim_count_factor = 1;
	
	this.parent = null;
	this.Children = [];
	
	this.align_x = GUI.align_left;
	this.align_y = GUI.align_top;
	
	this.color = [1,1,1];
	this.callback = null;
	this.callback_right = null;
	this.callback_scroll = null;
	this.mouseOverSound = null;
	
	this.defaultColor = [1,1,1];
	this.mouseOverColor = [1,1,1];
	this.alphaBlended= false;
	this.opacity = 1;
	this.alphaCutoff = 0.02;
	
	this.mask_write = false;
	this.mask_read = false;
	
	this.asset = GUI.asset_rectCorner; 
	this.texture = Asset.texture.button;
	//startX, startY, width, height
	this.textureRect = GUI.textureRect_default;
	this.deleteOnReset = false;
	this.shader = ShaderProgram.guiShader;

	this.clickedLoop = Utils.DO_NOTHING;
}

GUIElem.prototype.getScreenWidth = function(){
	return this.w / GUI.aspectRatio;
}

GUIElem.prototype.getAlignedX = function(){
	if(this.align_x == GUI.align_left){return this.x;}
	if(this.align_x == GUI.align_center){return this.x - this.w/2/GUI.aspectRatio;}
	if(this.align_x == GUI.align_right){return this.x - this.w/GUI.aspectRatio;}
}

GUIElem.prototype.getAlignedY = function(){
	if(this.align_y == GUI.align_top){return this.y ;}
	if(this.align_y == GUI.align_center){return this.y - this.h/2;}
	if(this.align_y == GUI.align_bottom){return this.y - this.h;}
}

GUIElem.prototype.detachChild = function(c){
	var id = this.Children.indexOf(c);
	if(id >= 0){
		this.Children.splice(id,1);
		c.parent = null;
	}
}

GUIElem.prototype.setVisibility = function(vis){
	if(this.visible == vis){return;}
	this.visible = vis;
	for(var i=0;i<this.Children.length;++i){
		this.Children[i].setVisibility(vis);
	}
}

GUIElem.prototype.setOpacity = function(val){
	this.opacity = val;
	for(var i=0;i<this.Children.length;++i){
		this.Children[i].setOpacity(val);
	}
}

GUIElem.prototype.setMouseBlocking_recursive = function(isBlocker){
	this.mouseBlocker = isBlocker;
	for(var i=0;i<this.Children.length;++i){
		this.Children[i].setMouseBlocking_recursive(isBlocker);
	}
}

GUIElem.prototype.addChild = function(c){
	if(c == this || c.parent == this){return;}
	if(c.parent != null){
		c.parent.detachChild(c);
	}
	c.parent = this;
	this.Children.push(c);
	c.updatePos();
}

GUIElem.prototype.addChild_front = function(c){
	if(c == this || c.parent == this){return;}
	if(c.parent != null){
		c.parent.detachChild(c);
	}
	c.parent = this;
	this.Children.unshift(c);
	c.updatePos();
}


GUIElem.prototype.updatePos = function(){
	if(this.parent!=null){
		this.x = this.x_relative/GUI.aspectRatio +this.parent.getAlignedX();
		this.y = this.y_relative +this.parent.getAlignedY();
	}else{
		this.x = this.x_relative;
		this.y = this.y_relative;
	}
	for(var i=0;i<this.Children.length;++i){
		this.Children[i].updatePos();
	}
}

GUIElem.prototype.setPos = function(xx,yy){
	this.x_relative = xx;
	this.y_relative = yy;
	this.updatePos();
}

GUIElem.prototype.setPosX = function(xx){
	this.x_relative = xx;
	this.updatePos();
}

GUIElem.prototype.addPosX = function(xx){
	this.x_relative += xx;
	this.updatePos();
}


GUIElem.prototype.setPosY = function(yy){
	this.y_relative = yy;
	this.updatePos();
}

GUIElem.prototype.setPosY_smooth = function(yy, factor){
	if(factor === void 0){
		factor = 0.3;
	}
	this.y_relative += Render.frameDelta*factor*(yy-this.y_relative);
	this.updatePos();
}

GUIElem.prototype.setPosY_accel = function(y1, y2){
	var dir = Math.sign(y2-y1);
	if(dir <0&&y2<this.y_relative || dir>0&&y2>this.y_relative){
		this.y_relative += Render.frameDelta*((this.y_relative - y1)+dir*0.05)*0.1;
		this.updatePos();
	}
}

GUIElem.prototype.setPosX_smooth = function(xx){
	this.x_relative += Render.frameDelta*0.3*(xx-this.x_relative);
	this.updatePos();
}

GUIElem.prototype.setH_smooth = function(hh, factor){
	if(factor === void 0){
		factor = 0.3;
	}
	this.h += Render.frameDelta*factor*(hh-this.h);
	this.updatePos();
}

GUIElem.prototype.mouseOverCheck = function(){
	if(this.mouseBlocker == false || this.visible == false){return false;}
	var mx = GUI.pixelToScreenX(Control.mouseX);
	var my = GUI.pixelToScreenY(Control.mouseY);
	var xx = this.getAlignedX();
	var yy = this.getAlignedY();
	return ( mx >= xx && mx < xx+ this.getScreenWidth() && my >= yy && my < yy + this.h);
}

GUIElem.prototype.mouseOverCheck_force = function(){
	if(this.visible == false){return false;}
	var mx = GUI.pixelToScreenX(Control.mouseX);
	var my = GUI.pixelToScreenY(Control.mouseY);
	var xx = this.getAlignedX();
	var yy = this.getAlignedY();
	return ( mx >= xx && mx < xx+ this.getScreenWidth() && my >= yy && my < yy + this.h);
}

GUIElem.prototype.addToGUI = function(gui){
	if(gui.indexOf(this)>0){
		return;
	}
	gui.push(this);
	for(var i=0;i<this.Children.length;++i){
		this.Children[i].addToGUI(gui);
	}
}

GUIElem.prototype.addToGUI_before = function(gui, otherElem){
	if(gui.indexOf(this)>0){
		return;
	}
	gui.splice( gui.indexOf(otherElem),0,this);
	for(var i=0;i<this.Children.length;++i){
		this.Children[i].addToGUI_before(gui,otherElem);
	}
}
GUIElem.prototype.addToGUI_after = function(gui, otherElem){
	if(gui.indexOf(this)>0){
		return;
	}
	gui.splice( gui.indexOf(otherElem)+1,0,this);
	for(var i=0;i<this.Children.length;++i){
		this.Children[i].addToGUI_after(gui,otherElem);
	}
}


GUIElem.prototype.removeFromGUI = function(gui){
	var id = gui.indexOf(this);
	if(id >= 0){
		gui.splice(id,1);
		for(var i=0;i<this.Children.length;++i){
			this.Children[i].removeFromGUI(gui);
		}
	}
	//id = gui.indexOf(this);
	//if(id >= 0){
	//}
}
GUIElem.prototype.addLabel = function(txt, offset){
	if(offset === void 0){
		offset = 0;
	}
	if(this.label == null){
		this.label = GUI.TextElem(0.015,-0.03 + offset, 8, txt);
		this.addChild(this.label);
	}else{
		this.label.setText(txt);
	}
}


var GUI = new Object();
GUI.mouseOverElem = null;
GUI.clickedElem = null;
GUI.activeInputField = null;
GUI.currentOverlayText = null;
GUI.currentKeyBinding = null;
GUI.selectedTriggerActionList = null;

//ASSETS
GUI.rectCornerVertexBuffer  = null;
GUI.rectCenterVertexBuffer  = null;
GUI.rectCenterXVertexBuffer  = null;
GUI.minimapReticleBuffer = null;
GUI.rect9sliceTexCoordBuffer = null;
GUI.rectClipVertexBuffer  = null;

GUI.asset_rectCorner = [];
GUI.asset_rectCenter = [];
GUI.asset_rectCenterX = [];
GUI.asset_minimapReticle = [];
GUI.textureRect_default = [0,0,1,1];
GUI.textureRect_fill = [480/512,0,32/512,32/512];
GUI.textureRect_fill_hp = [480/512,64/512,32/512,32/512];
GUI.textureRect_highlight = [480/512,97/512,32/512,32/512];
GUI.textureRect_hurt = [480/512,33/512,32/512,32/512];
GUI.textureRect_hurt_inverse = [480/512,64/512,32/512,-31/512];
GUI.textureRect_bar = [0/512,32/512,192/512,32/512];
GUI.textureRect_cross = [0,64/512,32/512,32/512];
GUI.textureRect_dot = [32/512,64/512,32/512,32/512];
GUI.textureRect_gear = [283/512,0,85/512,85/512];
GUI.textureRect_inventory = [371/512,0,85/512,85/512];
GUI.textureRect_sell = [414/512,220/512,85/512,85/512];
GUI.textureRect_trade = [414/512,305/512,85/512,85/512];
GUI.textureRect_menuButton = [0,0/512,192/512,32/512];
//GUI.textureRect_hint = [293/512,230/512,121/512,80/512];
GUI.textureRect_hint = GUI.textureRect_menuButton;
GUI.textureRect_hero = [205/512,0/512, 307/512, 1];
GUI.textureRect_reloadmark = [426/512,160/512, 25/512, 60/512];
GUI.textureRect_wheel = [229/512,230/512, 64/512, 64/512];
GUI.textureRect_shipMarker = [451/512,160/512, 48/512, 60/512];
GUI.textureRect_portraitFrame = [27/512,281/512, 174/512, 174/512];
GUI.textureRect_minimapFrame = [0/512,256/512, 256/512, 256/512];
GUI.textureRect_abilityPanel = [256/512,362/512, 256/512, 150/512];
GUI.textureRect_coin = [429/512,0/512, 50/512, 50/512];
GUI.textureRect_minerals = [429/512,50/512, 50/512, 50/512];
GUI.textureRect_maintenance = [429/512,100/512, 50/512, 50/512];
GUI.textureRect_trainingTime = [429/512,150/512, 50/512, 50/512];
GUI.textureRect_compass = [479/512,129/512, 33/512, 33/512];

GUI.rectTexCoordBuffer = null;
GUI.align_left = 0;
GUI.align_top = 0;
GUI.align_center = 1;
GUI.align_right = 2;
GUI.align_bottom = 2;
GUI.enabled = true;
GUI.aspectRatio = 1.77;

GUI.textColor_itemPickup = [1,0.9,0.1];
GUI.textColor_alert = [1,0,0];
GUI.textColor_lowHealth = [1,0.1,0];
GUI.textColor_black = [0,0,0];
GUI.textColor_white = [1,1,1];
GUI.textColor_rescue = [0.2,0.9,0];
GUI.textColor_repair= [0.2,0.9,0,1];
GUI.textColor_stun = [0.6,0.9,1];
GUI.textColor_darkred = [ 0.8,0.2,0.2];
GUI.color_cooldown = [0.7,0.5,0.8];
GUI.textColor_reflect = [0.7,0.8,0.9];
GUI.textColor_damage = [1,0.4,0.1];
GUI.textColor_junk = [0.6,0.6,0.6];
GUI.color_checkboxOff = [0.2,0.2,0.2];
GUI.color_checkboxOn = [1.4,1.3,0.7];
GUI.color_blood = [0.9,0,0];
GUI.color_locked = [0.63,0.65,0.68];
GUI.color_unavailable = [0.5,0.4,0.35];
GUI.color_locked_phase = 0;
GUI.color_expensive = [1,0.1,0];
GUI.color_inventoryFull = [0.9,0.5,0.45];
GUI.color_mouseOver =  [1.4,1.3,1.2];
GUI.color_button = [0.9,0.93,0.95];
GUI.color_dragSelection =[0.15,0.8,0.4];
GUI.color_inputField = [0.28,0.42,0.35];
GUI.color_lifebar_arr = [[0.8,0.1,0.1],[0.9,0.5,0.1],[0.9,0.9,0.1],[0.5,0.8,0.15],[0.3,0.8,0.4]]

GUI.msg_panel_training ="Training";
GUI.msg_panel_construction = "Construction";
GUI.msg_panel_garrison = "Garrison";
GUI.msg_repair = "+";
GUI.msg_cantBuildThere = "Cannot build there!"
GUI.graphicsLevelNames =["High","Medium","Low","Potato"];
GUI.resolutionLevelNames =["150%","100%","85%","75%","50%"];
GUI.difficultyNames = ["Invalid","Easy","Moderate","Hard"];
GUI.difficultyTooltips =[
"Invalid",
"Easy. Recommended for beginners.\n70% enemy damage\n85% enemy health\nRings are 40% of dropped gold", 
"Moderate. Played by the developer.\n100% enemy damage\n100% enemy health\nRings are 60% of dropped gold",
"Hard. Recommended for madmen.\n140% enemy damage, 120% enemy health\nRings are 100% of dropped gold\n+2 loot level."];

GUI.lastRefreshWidth = 0;
GUI.lastRefreshHeight = 0;
GUI.Realign = function(){
	canvas.width = Math.floor(window.innerWidth*Render.supersampling);
	canvas.height = Math.floor(window.innerHeight*Render.supersampling);
	canvas.style.width = window.innerWidth+'px';
	canvas.style.height = window.innerHeight+'px';
	
	Render.update_pixel_size();
	
	GUI.aspectRatio = GUI.getAspectRatio();
	for(var i=0;i<GUI.Elements.length;++i){
		GUI.Elements[i].updatePos();
	}
	if(GUI.Elements != GUI.InGame){
		for(var i=0;i<GUI.InGame.length;++i){
			GUI.InGame[i].updatePos();
		}
	}
	GUI.lastRefreshWidth = canvas.width;
	GUI.lastRefreshHeight = canvas.height;
	
}

//Icon texture atlas functions
GUI.setEditorButton = function(elem, iconId){
	elem.textureRect = [(iconId%4)*.25,(7-Math.floor(iconId/4))*.125,0.25,0.125];
	elem.texture = Asset.texture.editor;
	elem.mouseOverColor = GUI.color_mouseOver;
}
GUI.getLifeColor = function(unit){
	var ratio = unit.hp/unit.hp_max;
	var tiers = GUI.color_lifebar_arr.length;
	return GUI.color_lifebar_arr[Math.min(tiers-1, Math.floor(tiers*ratio))];
}
GUI.getIconRect = function(iconId){
	return [(iconId%8)*.125,(7-Math.floor(iconId/8))*.125,0.125,0.125];
}

GUI.Panel = function(_x, _y, _w, _h){
	var e = new GUIElem();
	e.w = _w;
	e.h = _h;
	e.setPos(_x,_y);
	
	return e;
}
GUI.Panel9Slice = function(_x, _y, _w, _h,border){
	var e = new GUIElem();
	e.w = _w;
	e.h = _h;
	e.setPos(_x,_y);
	e.texture = Asset.texture.guiPanel;
	e.alphaBlended = true;
	e.border = border;
	init9slice(e,border,border);
	return e;
}
GUI.BlackPanel = function(_x,_y,_w,_h){
	/*var e = GUI.Panel(_x,_y,_w,_h);
	e.texture = Asset.texture.gui;
	e.textureRect = GUI.textureRect_hint;
	e.alphaBlended = true;*/
	var e = GUI.Panel9Slice(_x, _y, _w, _h,0.08);
	return e;
}
GUI.ThinPanel = function(_x,_y,_w,_h){
	var e = GUI.Panel9Slice(_x, _y, _w, _h,0.04);
	return e;
}

GUI.RuntimeImage = function(_x,_y,_w,_h,path){
	var e = GUI.Panel(_x,_y,_w,_h);
	e.texture_runtime = Asset.importTexture(path,false,false,true);
	e.texture_backup = e.texture;
	e.update =  function(){
		if(this.texture_runtime.buffer){
			this.texture = this.texture_runtime;
		}else{
			this.texture = this.texture_backup;
		}
	}
	return e;
}

GUI.Button = function(_x, _y,_w,_h){
	var e = new GUIElem();
	e.setPos(_x,_y);
	e.w = _w || 0.07;
	e.h = _h || 0.07;
	return e;
}

GUI.Slider = function(_x, _y,_min, _max, _h, _w){
	var e = new GUIElem();
	e.setPos(_x,_y);
	
	if(_w === void 0){ _w = 0.4;}
	if(_h === void 0){ _h = 0.04;}
	e.w = _w;
	e.h = _h;
	e.fillElem = GUI.Panel(0,0, e.w, e.h);
	e.fillElem.maxWidth = e.w;
	e.fillElem.texture = Asset.texture.gui;
	e.fillElem.textureRect = GUI.textureRect_fill_hp;
	e.addChild(e.fillElem);
	
	e.minValue = _min;
	e.maxValue = _max;
	e.value = (_min + _max)/2;
	e.setValue = GUI.Slider.setValue;
	e.scroll_multiplier = 0.1;
	
	e.updateBoundValue = function(){};
	
	e.callback_scroll = function(delta){
		delta *= this.scroll_multiplier;
		this.setValue( this.value + delta);
		this.updateBoundValue();
	}
	e.callback = function(){
		var mx = GUI.pixelToScreenX(Control.mouseX);
		var percent = (mx-this.x)/this.getScreenWidth();
		this.setValue(this.minValue + percent * (this.maxValue-this.minValue));
		this.updateBoundValue();
	}
	
	e.clickedLoop = function(){
		this.callback();
	}
	
	return e;
}
GUI.Slider.setValue = function(new_value){
	this.value = Math.min(this.maxValue,Math.max(this.minValue, new_value));
	this.fillElem.w = this.fillElem.maxWidth*((this.value - this.minValue)/(this.maxValue-this.minValue));
}
GUI.ColorSliderPanel = function(_x, _y,_min, _max, _colorArray, _label){
	var p = GUI.Panel(_x, _y, 0.05, _colorArray.length * 0.03);
	p.addLabel(_label,0.01);
	p.colorArray = _colorArray;
	p.sliderR = GUI.Slider(0.03,0.0,_min,_max,0.03); p.addChild(p.sliderR);
	p.sliderR.updateBoundValue = function(){this.parent.colorArray[0] = this.value};
	p.sliderR.setValue( p.colorArray[0]);
	p.sliderG = GUI.Slider(0.03,0.03,_min,_max,0.03); p.addChild(p.sliderG);
	p.sliderG.updateBoundValue = function(){this.parent.colorArray[1] = this.value};
	p.sliderG.setValue( p.colorArray[1]);
	p.sliderB = GUI.Slider(0.03,0.06,_min,_max,0.03); p.addChild(p.sliderB);
	p.sliderB.updateBoundValue = function(){this.parent.colorArray[2] = this.value};
	p.sliderB.setValue( p.colorArray[2]);
	p.texture = Asset.texture.white;
	if(p.colorArray.length > 3){
		p.sliderA = GUI.Slider(0.03,0.09, 0, 1, 0.03); p.addChild(p.sliderA);
		p.sliderA.updateBoundValue = function(){this.parent.colorArray[3] = this.value};
		p.sliderA.setValue( p.colorArray[3]);
	}
	p.update = function(){
		this.color[0] = this.sliderR.value;
		this.color[1] = this.sliderG.value;
		this.color[2] = this.sliderB.value;
	}
	return p;
}

//Used for ingame menus
GUI.FancySlider = function(x,y,minVal,maxVal,title, width){
	if(width === void 0){ width = 0.4;}
	var bg = GUI.Panel(-0.01,-0.005, width +0.02 ,0.048);
	bg.texture= Asset.texture.gui;
	bg.alphaBlended = true;
	bg.textureRect = GUI.textureRect_bar;
	
	var slider = GUI.Slider(x,y, minVal,maxVal,0.04,width);
	slider.title = GUI.TextElem( width/2 ,-0.00, 11,title, GUI.align_center);
	slider.opacity = 0;
	slider.fillEnd = GUI.Panel(0,slider.h/2,slider.w/12,slider.h);
	slider.fillEnd.asset = GUI.asset_rectCenter;
	slider.addChild(slider.fillEnd);
	slider.fillElem.textureRect = [0,0,1,1];
	slider.fillElem.texture = slider.fillEnd.texture = Asset.texture.slider;
	slider.fillElem.alphaBlended = slider.fillEnd.alphaBlended = true;
	slider.fillElem.defaultColor = slider.fillEnd.defaultColor = [0.9,0.1,0.05];
	slider.fillElem.mouseBlocker = slider.fillEnd.mouseBlocker = false;
	slider.setValue = function(new_value){
		var cellWidth = this.fillElem.maxWidth/12;
		this.value = Math.min(this.maxValue,Math.max(this.minValue, new_value));
		var fill = (this.value - this.minValue)/(this.maxValue-this.minValue);
		var continuousWidth = this.fillElem.maxWidth*fill;
		this.fillElem.w = Math.floor(fill*12)*cellWidth;
		this.fillElem.textureRect[2] = this.fillElem.w/cellWidth;
		this.fillEnd.setPosX(this.fillElem.w+ cellWidth/2);
		var fillEndScale = (continuousWidth-this.fillElem.w) / cellWidth;
		this.fillEnd.w = cellWidth*fillEndScale;
		this.fillEnd.h = this.fillElem.h *fillEndScale;
	}
	slider.addChild_front(bg);
	slider.addChild(slider.title);
	return slider;
}

GUI.TexGroupHSLPanel = function(_x, _y, _texGroup, _label){
	var colorArray = _texGroup.getHSL();
	var p = GUI.ColorSliderPanel(_x, _y,0,2, colorArray, _label);
	p.sliderR.maxValue = 180;
	p.sliderR.minValue = -180;
	p.sliderR.scroll_multiplier = 0.5;
	p.sliderR.setValue( p.colorArray[0]);
	p.texGroup = _texGroup
	p.texture = p.texGroup.list[0]||Asset.texture.white;
	p.update = function(){
		if(this.colorArray[0]!=this.texGroup.hue
		||this.colorArray[1]!=this.texGroup.sat
		||this.colorArray[2]!=this.texGroup.lum){
			this.texGroup.update(this.colorArray);
		}
	}
	p.callback_right = function(){
		this.sliderR.setValue(0);
		this.sliderG.setValue(1);
		this.sliderB.setValue(1);
		this.texGroup.update(this.colorArray);
	}
	return p;
}

GUI.DragSelectionGUIElem = function(){
	var e = new GUIElem();
	e.linesOnly = true;
	e.mouseBlocker = false;
	e.defaultColor = e.mouseOverColor = e.color= GUI.color_dragSelection;
	e.texture = Asset.texture.white;
	
	e.update = function(){
		if(Control.dragSelectionRect != null){
			this.x  = GUI.pixelToScreenX(Control.dragSelectionRect.startX);
			this.y  = GUI.pixelToScreenY(Control.dragSelectionRect.startY);
			this.w = GUI.pixelToScreenX(Control.dragSelectionRect.getWidth()*GUI.aspectRatio);
			this.h = GUI.pixelToScreenY(Control.dragSelectionRect.getHeight());
		}else{
			this.removeFromGUI(GUI.Elements);
		}
	}
	
	return e;
}

GUI.TextElem = function(_x, _y, _size, _text, _align , _textWidth){
	if(_align === void 0){ _align = GUI.align_left;}
	if(_textWidth === void 0){ _textWidth = 1;}
	var e = new GUIElem();
	e.asset = [];
	
	e.fontSize = _size;
	e.spaceSize = 1;
	e.char_spacing = 0.9;
	e.lineHeight = 1;
	e.font = Font.Standard;
	
	
	e.setPos(_x,_y);
	e.w = 1;
	e.textWidth = _textWidth; //sets the max length of lines
	e.h = 1;
	e.mouseBlocker = false;
	e.textAlign = _align;
	//minX, minY, maxX, maxY
	e.textBounds = new Float32Array(4);
	
	e.setText = function(_text){
		if(this.text && this.text.localeCompare(_text) == 0){return;}
		this.text = _text;
		initTextBuffers(this);

		
	}
	e.setFontSize = function(newSize){
		this.fontSize = newSize;
		initTextBuffers(this);
	}
	
	e.setText(_text);
	e.alphaBlended = true;
	
	e.texture = Asset.texture.font1;
	
	return e;
}
GUI.TextPanel = function(_textElem, _margin){
	var e = GUI.Panel( 0,0,0,0);
	e.textElem = _textElem;
	e.margin = 0.05;
	e.update = function(){
		this.w = this.textElem.textBounds[2]-this.textElem.textBounds[0];
		this.h = this.textElem.textBounds[3]-this.textElem.textBounds[1];
		this.x = this.textElem.x + this.textElem.textBounds[0];
		this.y = this.textElem.y + this.textElem.textBounds[1];
	}
	return e;
}
//text will be typed out char by char
GUI.TypedTextElem = function(_x, _y, _size, _text, _align , _textWidth){
	var e = GUI.TextElem(_x, _y, _size, _text, _align , _textWidth);
	e.prim_count_factor = 0;
	e.typeSpeed = 0.3;
	e.update = function(){
		this.prim_count_factor = Math.min(1,this.prim_count_factor + this.typeSpeed/(1+this.text.length)*Render.frameDelta);
	}
	return e;
}

GUI.List = function(_x, _y, _w, _h, _entryType){
	var e = new GUIElem();
	e.setPos(_x,_y);
	e.w = _w;
	e.h = _h;
	
	e.Entries = []; //these are guielems. they have copies in the Children array
	e.data = null;
	e.multiSelect = false;
	e.selectedEntry = null;
	e.defaultColor = e.color =  e.mouseOverColor = [0.6,0.6,0.6];
	e.scrollPos = 0;
	e.listSize = 32; //max number of entries
	e.entryHeight = 0.025;
	e.entryType = _entryType || GUI.ListEntry;
	e.entryTextGetter = function(object){
		return object.name;
	}
	e.alwaysUpdateSelectedText = false;
	
	e.linkToArray = function(arr, isInit){
		this.scrollPos = 0;
		this.updateList(arr, isInit);
	}
	
	e.updateList = function(arr, isInit){
		this.data = arr;
		for(var i=this.Entries.length-1;i>=0;--i){
			this.detachChild(this.Entries[i]);
			this.Entries[i].removeFromGUI(GUI.Elements); //remove entries from the gui hierarchy
		}
		this.Entries.length = 0;
		
		var len = Math.min( arr.length - this.scrollPos, this.listSize);
		for(var i=0; i< len ;++i){
			if(i-this.scrollPos >= arr.length){
				continue;
			}
			this.Entries[i] = this.entryType( arr[i- this.scrollPos], this);
			this.Entries[i].updateText();
			this.addChild(this.Entries[i]);
			this.Entries[i].setPos(0.02, i*this.entryHeight);
			if(isInit == false){
				this.Entries[i].addToGUI(GUI.Elements);
			}
		}
		this.h = Math.max(this.Entries.length * this.entryHeight, 0.05);
	}
	
	e.update = function(){
		if(this.alwaysUpdateSelectedText == true && this.selectedEntry!=null){
			this.selectedEntry.updateText();
		}
	}
	
	e.callback_scroll = function(delta){
		var oldPos = this.scrollPos;
		this.scrollPos = Math.max( -this.data.length + 2,( Math.min(0, Math.floor(this.scrollPos + delta))));
		this.scrollPos = Math.min(this.scrollPos, 0 );
		delta = this.scrollPos-oldPos;
		var delta_abs = Math.abs(delta);
	
		for(var i=0;i<delta_abs;++i){
			var newEntry = null;
			if(delta < 0){//add entries to the end
				var dataPos = this.listSize-this.scrollPos+delta+i;
				if(dataPos<this.data.length){
					var newEntry = this.entryType( this.data[dataPos], this);
					this.Entries.push(newEntry);
				}
			}else{ //add entries to the beginning
				var newEntry = this.entryType( this.data[-this.scrollPos+delta-i-1], this);
				this.Entries.unshift(newEntry);
			}
			if(newEntry){
				this.addChild(newEntry);
				newEntry.addToGUI(GUI.Elements);
				newEntry.updateText();
				newEntry.textElem.addToGUI(GUI.Elements);
			}
		}
		
		for(var i=0;i<delta_abs;++i){
			if(delta < 0){
				//remove first N entires
				this.detachChild(this.Entries[0]);
				this.Entries[0].removeFromGUI(GUI.Elements);
				this.Entries.splice(0,1);
			}else if(this.Entries.length >= this.listSize){
				//remove last N entires
				this.detachChild(this.Entries[this.Entries.length-1]);
				this.Entries[this.Entries.length-1].removeFromGUI(GUI.Elements);
				this.Entries.splice(this.Entries.length-1,1);
			}
		}
		
		for(var i=0;i<this.Entries.length;++i){
			this.Entries[i].setPos(0.02, i*this.entryHeight);
		}
		this.h = Math.max(this.Entries.length * this.entryHeight, 0.05);
	}
	
	e.setLinkedParameter = function(obj){};
	
	e.entrySelectionUpdate = function(entry){
		if(this.multiSelect == false){
			if(this.selectedEntry != null){
				this.selectedEntry.set_selected(false);
			}
			this.selectedEntry = entry;
			entry.set_selected(true);
		}else{
			entry.set_selected(!entry.selected);
		}
	}
	
	e.getEntryByLinkedObject = function(obj){
		for(var i=0;i<this.Entries.length;++i){
			if(this.Entries[i].linkedObject == obj){
				return this.Entries[i];
			}
		}
	}
	
	e.jumpToLetter = function(letter){
		letter = ""+letter.toUpperCase();
		//max to filter out cases where selectedEntry is null or not in the list
		if(this.selectedEntry){
			var startId = Math.max(0, this.data.indexOf(this.selectedEntry.linkedObject) + 1);
		}else{
			var startId = 0;
		}
		for(var k=0;k<this.data.length;++k){
			var i = ( k+startId)%this.data.length; //this will handle wrap-around
			if(this.data[i].name[0].toUpperCase() == letter){
				var entry = this.getEntryByLinkedObject( this.data[i] );
				if(!entry){//new entry is not on the list, let's move the list
					//leave a space of 10 other entries above the selected entry
					this.callback_scroll( -this.scrollPos - i + 10 );
					entry = this.getEntryByLinkedObject( this.data[i] );
				}
				if(entry){
					this.setLinkedParameter(this.data[i]);
					this.entrySelectionUpdate(entry);
				}
				break;
			}
		}
	}
	e.keyPress = function(event){
		if(event.key.length == 1){
			this.jumpToLetter(event.key);
		}
	}
	
	return e;
}

GUI.ListEntry = function(object, _list){
	var e = GUI.Panel(0, 0, _list.w - 0.04, 0.025 );
	e.list = _list;
	e.textElem = null;
	e.linkedObject = object;
	e.linesOnly = true;
	e.selected = false;
	e.defaultColor = GUI.color_checkboxOff;
	e.mouseOverColor = GUI.color_checkboxOn;
	//METHODS
	e.updateText = GUI.ListEntry.updateText;
	e.callback = GUI.ListEntry.callback;
	e.set_selected = GUI.ListEntry.set_selected;
	return e;
}
GUI.ListEntry.updateText = function(){
	var newText = this.list.entryTextGetter(this.linkedObject);
	if(this.textElem == null){
		this.textElem = GUI.TextElem(0, 0, 8, newText)
		this.addChild(this.textElem);
	}else{
		this.textElem.setText(newText);
	}
}
GUI.ListEntry.callback = function(){
	this.list.setLinkedParameter(this.linkedObject);
	this.list.entrySelectionUpdate(this);
}
GUI.ListEntry.set_selected = function(state){
	this.selected = state;
	this.linesOnly = !state;
}

GUI.ListPaletteEntry = function(object, _list){
	var e = GUI.ListEntry(object, _list);
	e.update = GUI.ListPaletteEntry.update;
	e.callback = GUI.ListPaletteEntry.callback;
	return e;
}
GUI.ListPaletteEntry.update = function(){
	if(this.linkedObject.contained_in_selection){
		this.textElem.color = GUI.textColor_rescue;
	}
} 
GUI.ListPaletteEntry.callback = function(){
	if(Control.pressed[17]){
		Editor.KeepTypeFromSelection(this.linkedObject);
	}else if(Control.pressed[18]){
		Editor.RemoveTypeFromSelection(this.linkedObject);
	}else{
		this.list.setLinkedParameter(this.linkedObject);
		this.list.entrySelectionUpdate(this);
	}
}

GUI.TextureTableClass = function(_x,_y){
	var e = GUI.Panel(_x, _y, 0.45, 0.85);
	e.mouseBlocker = true;
	e.callback = Utils.DO_NOTHING;
	//0=set floor, 1=set ceiling, 2=set bottom, 3=set top, 4=set middle
	e.texture_operation = 0;
	e.scroll_pos = 0;
	e.icons = [];
	e.colCount = 8;
	e.defaultColor = e.mouseOverColor = [0.3,0.3,0.3];
	e.hover_text = GUI.TextElem(0.01,0.82,10,"None");
	e.addChild(e.hover_text);
	for(var i=0;i<120;++i){
		if(i>=Asset.MATERIALS.length){break;}
		var ico = GUI.TextureTableIcon((i%e.colCount)*0.055+0.005, Math.floor(i/e.colCount)*0.055+0.005 ,i);
		e.addChild(ico);
		e.icons.push(ico);
	}
	e.callback_right = function(){
		this.setVisibility(false);
	}
	e.callback_scroll = function(delta){
		this.scroll_pos += delta ;
		this.scroll_pos =Math.max(0,Math.min(Asset.MATERIALS.length-2,this.scroll_pos));
		for(var i=0;i<this.icons.length;++i){
			var newTexId = i+Math.round(this.scroll_pos)*this.colCount;
			if(newTexId < Asset.MATERIALS.length &&
			newTexId >= 0){
				this.icons[i].texId = newTexId;
				this.icons[i].texture = Asset.MATERIALS[newTexId];
				this.icons[i].setVisibility(true);
			}else{
				this.icons[i].setVisibility(false);
			}
		}
	}
	e.update = function(){
		if(GUI.buttonUnderCursor_last && GUI.buttonUnderCursor_last.parent == this){
			if(GUI.buttonUnderCursor_last.texture.name){
				this.hover_text.setText(GUI.buttonUnderCursor_last.texture.name);
			}
		}
	}
	return e;
}
GUI.TextureTableIcon = function(_x,_y, _texId){
	var e = GUI.Button(_x, _y, 0.05, 0.05);
	e.texture = Asset.MATERIALS[_texId];
	e.texId = _texId;
	e.callback = function(){
		BuilderModel.set_selected_texture(this.texId, this.parent.texture_operation);
	}
	e.callback_right = function(){
		e.parent.setVisibility(false);
	}
	return e;
}

GUI.EditorPaletteClass = function(_x, _y){
	var e = GUI.Panel(_x, _y, 0.2, 0.001);
	e.list = GUI.List(-0.02,0, 0.25, 0., GUI.ListPaletteEntry);
	e.align_x = GUI.align_right;
	e.list.setPos(0.,0.);
	e.list.linesOnly = true;
	e.tab0Button = GUI.Button(-0.1,0.02);
	GUI.setEditorButton(e.tab0Button, 8);
	e.addChild(e.tab0Button );
	e.tab1Button = GUI.Button(-0.1,0.12);
	GUI.setEditorButton(e.tab1Button, 9);
	e.addChild(e.tab1Button );
	e.tab2Button = GUI.Button(-0.1,0.22);
	GUI.setEditorButton(e.tab2Button, 10);
	e.addChild(e.tab2Button );
	e.tab3Button = GUI.Button(-0.1,0.32);
	GUI.setEditorButton(e.tab3Button, 11);
	e.addChild(e.tab3Button );
	e.addChild(e.list);
	e.list.linkToArray(Editor.Objects[0], true);
	
	var b_playerId = GUI.Button(-0.1, 0.42);
	b_playerId.texture = Asset.texture.white;
	b_playerId.defaultColor = b_playerId.mouseOverColor = Players[Editor.brushPlayerId].colorFloat;
	b_playerId.callback = function(){
		Editor.brushPlayerId = (Editor.brushPlayerId + 1) % Players.length;
		this.defaultColor = this.mouseOverColor = Players[Editor.brushPlayerId].colorFloat;
	};
	b_playerId.callback_right = function(){2398
		Editor.brushPlayerId = (Editor.brushPlayerId>0)?(Editor.brushPlayerId-1):(Players.length-1);
		this.defaultColor = this.mouseOverColor = Players[Editor.brushPlayerId].colorFloat;
	};
	e.addChild(b_playerId);
	
	e.tab0Button.callback = function(){
		Editor.paletteId = 0;
		this.parent.list.linkToArray(Editor.Objects[0], false);
		//Editor.paletteId = (Editor.paletteId+1) % Editor.Objects.length;
		//this.parent.list.linkToArray(Editor.Objects[Editor.paletteId], false);
	}
	
	e.tab1Button.callback = function(){
		Editor.paletteId = 1;
		this.parent.list.linkToArray(Editor.Objects[1], false);
	}
	
	e.tab2Button.callback = function(){
		Editor.paletteId = 2;
		this.parent.list.linkToArray(Editor.Objects[2], false);
	}
	
	e.tab3Button.callback = function(){
		Editor.paletteId = 3;
		this.parent.list.linkToArray(Editor.Objects[3], false);
	}
	
	e.list.setLinkedParameter = function(obj){Editor.setBrushObject(obj);}
	e.list.key_override_condition = function(){
		return !Control.pressed[32];
	}
	
	return e;
}

GUI.MinimapClass = function(_x,_y,_h,_w){
	var e = GUI.Panel(_x, _y, _h, _w);
	e.w_default = _w;
	e.h_default = _h;
	
	e.updateCameraPos = function(){
		cam.setPos_with_bounds(this.getMouseMapX(), this.getMouseMapY());
	}
	
	e.getMouseMapX = function(){
		return M.width*((GUI.pixelToScreenX(Control.mouseX)-this.getAlignedX())/this.getScreenWidth());
	}
	e.getMouseMapY = function(){
		return M.height*(1-(GUI.pixelToScreenY(Control.mouseY)-this.getAlignedY())/this.h);
	}
	
	e.callback = function(){
		this.updateCameraPos();
		Control.minimapDrag = true;
	}
	
	e.callback_right = function(){
		if(Control.gameState == Control.gameState_inGame){
			MinimapOrder(this.getMouseMapX(), this.getMouseMapY());
		}
	}
	
	e.texture = Minimap.getTexture();
	
	e.reticle = GUI.Panel(0,0,0.1,0.1);
	e.reticle.align_x = GUI.align_center;
	e.reticle.align_y = GUI.align_center;
	e.addChild(e.reticle);
	//e.reticle.linesOnly = true;
	e.reticle.mouseBlocker = false;
	e.mask_write = true;
	e.reticle.mask_read = true;
	e.reticle.texture = Asset.texture.minimapReticle;
	e.reticle.asset = GUI.asset_minimapReticle;
	e.reticle.alphaBlended = true;
	
	e.update = function(){
		this.texture = Minimap.getTexture();
		this.w = this.w_default * Minimap.w / Minimap.maxDim;
		this.h = this.h_default * Minimap.h / Minimap.maxDim;
		
		if(Control.minimapDrag == true){
			this.updateCameraPos();
		}
		
		updateMinimapReticleBuffer();
		this.reticle.h = 1/M.maxDim*this.h;
		this.reticle.w = 1/M.maxDim*this.w;
		this.reticle.setPos(-Minimap.centerOffsetX/Minimap.resolutionDivisor/Minimap.w*this.w,
							Minimap.centerOffsetY/Minimap.resolutionDivisor/Minimap.h*this.h + this.h);
	}
	
	e.reset = function(){
	}
	
	e.ping = function(xx,yy,color){
		yy = M.height - yy - Minimap.centerOffsetY;
		xx = xx - Minimap.centerOffsetX;
		var maxDim = Math.max(M.height, M.width);
		var elem = GUI.Panel(xx*this.w/maxDim ,yy*this.h/maxDim,0.4,0.4);
		elem.asset = GUI.asset_rectCenter;
		elem.opacity = 0;
		if(color){elem.defaultColor = color;}
		elem.mouseBlocker = false;
		elem.alphaBlended = true;
		elem.texture = Asset.texture.ping;
		elem.deleteOnReset = true;
		elem.update = function(){
			this.w -= (this.w*0.015)*Render.frameDelta;
			this.h -= (this.h*0.015)*Render.frameDelta;
			this.opacity = Math.min(1,this.opacity + 0.04*Render.frameDelta);
			if(this.w <=0.02){
				this.removeFromGUI(GUI.InGame);
				this.parent.detachChild(this);
			}
		}
		this.addChild(elem);
		elem.addToGUI(GUI.InGame);
	}
	return e;
}

GUI.WorldLine = function(start, end){
	var e = GUI.Panel(0,0,0.03,0.005);
	e.start = start;
	e.end = end;
	e.texture = Asset.texture.targetLine;
	e.textureRect = [0,0,1,1];
	e.alphaBlended = true;
	e.update = function(){
		this.end = null;
		
		if(Control.PlayerHasControlOverSelection()){
			var u = Control.selectionLeader;
			this.start = u;
			if(u.isStructure){
				var rallyAb = Unit.getAbilityInstance(u , Ability.RallyPoint);
				if(rallyAb && rallyAb.lastTarget){
					this.end = rallyAb.lastTarget;
				}
			}else if(u.task && (u.task.orderdest||u.task.targetPoint||u.task.targetUnit)){
				this.end = (u.task.orderdest||u.task.targetPoint||u.task.targetUnit);
			}
		}
		if(this.start && this.end){
			if(this.end && this.end.hp && this.end.owner.team != u.owner.team){
				if(this.end.proto.isResource){
					this.color = GUI.textColor_itemPickup;
				}else{
					this.color = GUI.color_expensive;
				}
			}else{
				this.color = GUI.textColor_white;
			}
			this.refresh();
			this.opacity = 1;
		}else{
			this.opacity = 0;
		}
	}
	e.refresh = function(){
		var sStart = worldPointToGUI(this.start.x, this.start.y, this.start.z);
		var sEnd = worldPointToGUI(this.end.x, this.end.y, this.end.z||0.1);
		sEnd[0]-=(sEnd[0]-sStart[0])*(1-GUI.aspectRatio);
		this.setPos(sStart[0], sStart[1]);
		var dist = Utils.distance_xxyy(sStart[0],sEnd[0], sStart[1],sEnd[1]);
		this.w = dist;
		if(dist > 0){
			this.angle = 1.57+Math.atan2(sStart[0] - sEnd[0],sStart[1] - sEnd[1]);
			this.textureRect[2] = 8*dist;
		}
	}
	return e;
}

GUI.VitalBar = function(_x,_y,iconId){
	var e = GUI.Panel(_x,_y, 0.17,0.05);
	e.w_default = e.w;
	e.texture = Asset.texture.slider;
	e.textureRect =  [0,0,10,1];
	//e.defaultColor = color;
	e.mouseBlocker = false;
	e.icon = GUI.Panel(-0.05, 0 , 0.05,0.05);
	e.icon.mouseBlocker = false;
	e.icon.texture= Asset.texture.gui;
	e.icon.textureRect = [16/512*iconId, 112/512, 16/512,16/512];
	e.addChild(e.icon);
	
	e.textElem = GUI.TextElem(0.085, 0 , 15, "-", GUI.align_center);
	e.textElem.lineHeight*=0.6;
	e.addChild(e.textElem);
	return e;
}

GUI.BattlePanelClass = function(_x,_y){
	var e = GUI.Panel(_x, _y, 0, 0.16);
	e.x_default = _x;
	e.y_default = _y;
	e.align_y = GUI.align_bottom;
	
	e.hazmatBar = GUI.VitalBar(0.18,0.02,2);
	e.shieldBar = GUI.VitalBar(0.19,0.08,1);
	e.hpBar = GUI.VitalBar( 0.20,0.14,0);
	
	e.hpBar.defaultColor = [1,0.2,0.1];
	e.shieldBar.defaultColor = [0.3,0.7,0.4];
	e.hazmatBar.defaultColor = [0.9,0.8,0.1];
	
	e.unit = null;
	
	e.portrait = GUI.Portrait(0,-0.06);
	e.portrait.mouseBlocker = false;
	e.portraitFrame = GUI.Panel(-0.047,-0.018,0.22,0.22);
	e.portraitFrame.alphaBlended = true;
	e.portraitFrame.mouseBlocker = false;
	e.portraitFrame.texture = Asset.texture.gui;
	e.portraitFrame.textureRect =GUI.textureRect_portraitFrame;
	e.portrait.opacity = 0;
	//e.portrait.addChild(e.portraitFrame);
	e.portrait.addChild(e.hpBar);
	e.portrait.addChild(e.shieldBar);
	e.portrait.addChild(e.hazmatBar);
	
	e.addChild(e.portrait);
	e.setMouseBlocking_recursive(false);
	
	/*e.selectionIcons = [];
	for(var i=0;i<3;++i){
		for(var j=0;j<8;++j){
			var sicon = GUI.SelectionIcon(j*0.06 + 0.175,i*0.06-0.05,e.selectionIcons.length,0.06);
			e.selectionIcons.push(sicon);
			e.addChild(sicon);
		}
	}*/
	
	e.update = function(){
		if(Gamestats.cinematicMode){
			this.setPosX_smooth(-1);
		}else{
			this.setPosX_smooth(this.x_default);
		}
		
		/*if(Control.selectionLeader){
			if(this.unit != Control.selectionLeader){
				this.portrait.setPortrait(Control.selectionLeader.proto.portrait);
			}
			this.unit = Control.selectionLeader;
		}else{
			this.unit = null;
		}*/
		this.unit = Gamestats.Hero;

		if(this.unit){
			this.setVisibility(true);
			this.hpBar.w = Math.min(1, Math.min(this.unit.hp,this.unit.hp_max)/this.unit.hp_max) * this.hpBar.w_default;
			this.hpBar.textureRect[2] = this.hpBar.w/this.hpBar.w_default * 8;
			//this.hpTextElem.setText(''+ Math.floor(this.unit.hp)+'\n/'+this.unit.hp_max);
			this.hpBar.textElem.setText(''+ Math.floor(this.unit.hp) );
			
			this.shieldBar.w = Math.min(1, Math.min(this.unit.shield,this.unit.shield_max)/this.unit.shield_max) * this.shieldBar.w_default;
			this.shieldBar.textureRect[2] = this.shieldBar.w/this.shieldBar.w_default * 8;
			//this.shieldTextElem.setText(''+ Math.floor(this.unit.shield)+'\n/'+this.unit.shield_max);
			this.shieldBar.textElem.setText(''+ Math.floor(this.unit.shield));
			
			this.hazmatBar.w = Math.min(this.unit.hazmat,this.unit.hazmat_max)/this.unit.hazmat_max * this.hazmatBar.w_default;
			this.hazmatBar.textureRect[2] = this.hazmatBar.w/this.hazmatBar.w_default * 8;
			//this.hazmatTextElem.setText(''+ Math.floor(this.unit.hazmat)+'\n/'+this.unit.hazmat_max);
			this.hazmatBar.textElem.setText(''+ Math.floor(this.unit.hazmat));
			/*if(Selected.length > 1){
				this.damageIcon.setVisibility(false);
			}else{
				this.damageIcon.setVisibility(true);
			}*/
		}else{
			this.setVisibility(false);
		}
		/*for(var i=0;i<this.selectionIcons.length;++i){
			if(i<Selected.length && Selected.length > 1){
				this.selectionIcons[i].setVisibility(true);
				this.selectionIcons[i].color = GUI.getLifeColor(Selected[i]);
				if(this.selectionIcons[i].unit != Selected[i]){
					this.selectionIcons[i].unit = Selected[i];
					this.selectionIcons[i].textureRect = GUI.getIconRect(Selected[i].proto.iconId);
				}
			}else{
				this.selectionIcons[i].setVisibility(false);
			}
		}*/
		
	}
	
	return e;
}

GUI.Portrait = function(_x,_y,_scale,_hasBorder){
	var e = GUI.Panel(_x, _y, _scale || 0.12, _scale || 0.12);
	e.texture = Asset.texture.black;
	e.textureRect = [0,0,1/8,1/8];
	e.frame = 0;
	e.frameTime = 0;
	e.sprite = 0;
	e.portrait = null;
	e.staticTime = 0;
	e.speechTime = 0;
	e.tickPerFrame = 8;
	e.update = function(){
		if(this.speechTime > 0){
			this.speechTime -= Render.frameDelta;
			if(this.portrait){
				this.portrait.speech();
			}
		}
		
		if(!this.portrait||!this.visible || this==GUI.BattlePanel.portrait && GUI.DialogPanel.visible
		|| this.staticTime > 0){
			//to avoid double speed when portraits are of the same unit
			this.texture = Asset.texture.static;
			this.textureRect[2]=this.textureRect[3] = 1/4;
			this.textureRect[0] = Math.random();
			this.textureRect[1] = Math.random();
			this.staticTime -= Render.frameDelta;
			return;
		}
		this.texture = this.portrait.texture;
		if(this.frameTime>this.tickPerFrame && this.portrait){
			this.frameTime-=this.tickPerFrame;
			this.sprite = this.portrait.getNextFrame();
		}
		this.textureRect[2]=this.textureRect[3] = 1/8;
		this.textureRect[0] = this.sprite%8/8;
		this.textureRect[1] = (7-Math.floor(this.sprite/8))/8;
		this.frame = this.frame+Render.frameDelta;
		this.frameTime += Render.frameDelta;
	}
	e.setPortrait = function(port){
		if(!port){
			this.texture = Asset.texture.static;
		}else{
			this.texture = port.texture;
			this.tickPerFrame = port.tickPerFrame;
		}
		this.portrait = port;
		this.sprite = 0;
		this.frame = 0;
		this.staticTime = 5;
		this.speechTime = 0;
	}
	if(_hasBorder){
		e.border = GUI.Panel(0,0,e.w,e.h);
		e.border.mouseBlocker = false;
		e.border.texture = Asset.texture.portraitBorder;
		e.border.alphaBlended = true;
		e.addChild(e.border);
	}
	e.setPortrait(null);
	return e;
}

GUI.StatusPortraitClass = function(_x,_y,_scale){
	var e = new GUIElem();
	e.setPos(_x,_y);
	e.h = e.w = _scale;
	e.texture = Asset.texture.portrait;
	e.faceId = 0;
	e.damageId = 0;
	e.fire_hold_time = 0;
	e.pain_time = 0;
	e.look_time = 0;
	e.last_hp = 100;
	e.mouseBlocker = false;
	e.textureRect = [0,0,.125,.125];
	e.update_face = function(){
		if(!Gamestats.Hero){return;}
		var hp = Gamestats.Hero.hp;
		if(hp <= 0){ //DEAD
			this.faceId =0;
			this.damageId = 5;
		}else{
			this.damageId = Math.max(0, Math.floor((100-hp)/20));
			this.pain_time = Math.max(0, this.pain_time -1);
			this.look_time = Math.max(0, this.look_time -1);
			if(Weapon.any_attack_pressed()){
				this.fire_hold_time ++;
			}else{
				//this.fire_hold_time = 0;
				//if we just released it for a short time, we won't have to wait for as long
				this.fire_hold_time = Math.max(0, Math.min(this.fire_hold_time-2, 30));
			}
			if(this.pain_time <= 0){
				if(hp < this.last_hp){ //PAIN
					this.pain_time = 20;
					this.faceId = 3;
					if(Gamestats.Hero.last_hurter){//PAIN SIDE
						var angdiff = Unit.hero_angle_diff(Gamestats.Hero.last_hurter);
						if( angdiff > 1.047){
							this.faceId = 4;
						}else if(angdiff < -1.047){
							this.faceId = 5;
						}
					}
				}else if(this.fire_hold_time > 40){//RAMPAGE
					this.faceId = 3;
				}else if(this.look_time <= 0){//LOOK AROUND
					this.look_time = 20;
					this.faceId = (Math.random()*3) >> 0;
				}
			}
		}
		this.textureRect[0] = this.faceId * 0.125;
		this.textureRect[1] = 1 - (this.damageId+1) * 0.125;
		this.last_hp = hp;
	}
 
	return e;
}
 
GUI.AbilityButton = function(_x,_y){
	var e = new GUIElem();
	e.setPos(_x,_y);
	e.w = 0.07;
	e.h = 0.07;
	e.linkedAbility = null;
	e.mouseOverColor = GUI.color_mouseOver;
	e.callback = function(){
		if(this.linkedAbility != null){
			Control.AbilityButtonClicked(this.linkedAbility);
		}
	}
	e.hotkeyText = GUI.TextElem(0.05,0.05,9,"");
	e.addChild(e.hotkeyText);
	e.texture = Asset.texture.icons;
	e.textureRect = GUI.getIconRect(63);
	e.mouseBlocker = false;
	
	e.setAbility = function(ability){
		this.linkedAbility = ability;
		if(ability != null && ability != undefined){
			if(ability.proto.trainingType){
				if(ability.proto.isResearch){
					this.textureRect = GUI.getIconRect(Upgrade[ability.proto.trainingType].iconId);
				}else{
					this.textureRect = GUI.getIconRect(ability.proto.trainingProto.iconId);
				}
			}else{
				this.textureRect = GUI.getIconRect(ability.proto.iconId);
			}
			this.hotkeyText.setText(String.fromCharCode( ability.proto.hotkey));
			this.mouseBlocker = true;
		}else{
			this.textureRect = GUI.getIconRect(63);
			this.hotkeyText.setText("");
			this.mouseBlocker = false;
		}
	}
	e.cooldownElem = null;
	
	e.update = function(){
		if(this.linkedAbility){
			if(!this.linkedAbility.caster || this.linkedAbility.proto.techCondition(this.linkedAbility.caster.owner)){
				this.defaultColor = GUI.color_button;
			}else{
				this.defaultColor = this.color =  GUI.color_unavailable;
			}
		}else{
			this.defaultColor = this.color =  GUI.textColor_junk;
		}
		
		if(this.linkedAbility && this.linkedAbility.cooldownCounter > 0){
			if(!this.cooldownElem){
				this.cooldownElem = GUI.Panel(0.008,0.008,e.w-0.016,e.h-0.016);
				this.addChild(this.cooldownElem);
				this.cooldownElem.addToGUI_after(GUI.Elements, this);
				this.cooldownElem.texture = Asset.texture.cooldown;
				this.cooldownElem.mouseBlocker = false;
			}
			this.defaultColor = GUI.color_cooldown;
			this.cooldownElem.alphaCutoff = 1-this.linkedAbility.cooldownCounter/this.linkedAbility.proto.cooldown;
		}else{
			if(this.cooldownElem){
				this.detachChild(this.cooldownElem);
				this.cooldownElem.removeFromGUI(GUI.Elements);
				this.cooldownElem = null;
			}
		}
	}
	return e;
}

GUI.UnitIcon = function(_x,_y,_size){
	var e = GUI.Panel(_x,_y,_size,_size);
	e.texture = Asset.texture.icons;
	e.defaultColor = GUI.color_button;
	return e;
}

GUI.ControlGroupIcon = function(_x,_y,id){
	var e = GUI.UnitIcon(_x,_y,0.05);
	e.id = id;
	e.callback = function(){
		Control.SelectControlGroup(this.id);
	}
	e.update = function(){
		if(Control.ControlGroups[this.id] && Control.ControlGroups[this.id].length>0){
			this.setVisibility(true);
			this.textureRect = GUI.getIconRect(Control.ControlGroups[this.id][0].proto.iconId);
		}else{
			this.setVisibility(false);
		}
	}
	e.addChild(GUI.TextElem(0,0,10,""+id));
	return e;
}

GUI.IdleWorkerIcon = function(_x,_y){
	var e = GUI.UnitIcon(_x,_y,0.06);
	e.callback = function(){
		Control.SelectIdleWorkers();
	}
	e.value = 0;
	e.update = function(){
		if(Control.currentPlayer.idleWorkerCount>0&&Control.currentPlayer.workers.length>0){
			this.setVisibility(true);
			this.textureRect = GUI.getIconRect(Control.currentPlayer.workers[0].proto.iconId);
			if(this.value != Control.currentPlayer.idleWorkerCount){
				this.value = Control.currentPlayer.idleWorkerCount;
				this.countTextElem.setText(""+this.value);
			}
		}else{
			this.setVisibility(false);
		}
	}
	e.addChild(e.countTextElem = GUI.TextElem(0,0,10,"0"));
	return e;
}

GUI.RepairIcon = function(_x,_y){
	var e = GUI.UnitIcon(_x,_y,0.06);
	e.callback = function(){
		Control.SelectDeposits();
	}
	e.value = 0;
	e.textureRect = GUI.getIconRect(Ability.RepairDrone.iconId);
	e.update = function(){
		if(Control.currentPlayer.getTypeCount_born(UnitPrototype.Deposit) > 0){
			this.setVisibility(true);
			if(Control.currentPlayer.money < Ability.RepairDrone.moneyCost){
				this.defaultColor=GUI.color_expensive;
			}else{
				this.defaultColor=GUI.color_button;
			}
		}else{
			this.setVisibility(false);
		}
	}
	e.addChild(e.countTextElem = GUI.TextElem(0.035,0.035,11,"R"));
	return e;
}

GUI.SelectionIcon = function(_x,_y,id,scale){
	scale = scale || 0.05;
	var e = GUI.Panel(_x,_y,scale,scale);
	e.id = id;
	e.texture = Asset.texture.icons;
	e.unit = null;
	e.callback = function(){
		if(this.unit){
			Control.SelectExplicitUnit(this.unit);
		}
	}
	return e;
}

GUI.TrainingIcon = function(_x,_y,id,scale){
	scale = scale || 0.04;
	var e = GUI.Panel(_x,_y,scale,scale);
	e.id = id;
	e.texture = Asset.texture.icons;
	e.callback = function(){
		var trainer = GUI.AbilityPanel.selectedUnit;
		if(trainer && trainer.owner == Control.currentPlayer){
			TrainingCancelOrder(trainer, this.id);
		}
	}
	return e;
}

GUI.ResourceIcon = function(x,y,scale,type){
	var e = GUI.Panel(x,y,scale,scale);
	e.texture = Asset.texture.gui;
	e.alphaBlended = true;
	if(type == 0){
		e.textureRect = GUI.textureRect_minerals;
	}else if(type == 1){
		e.textureRect = GUI.textureRect_coin;
	}else if(type == 2){
		e.textureRect = GUI.textureRect_maintenance;
	}else{
		e.textureRect = GUI.textureRect_trainingTime;
	}
	return e;
}

GUI.AbilityPanelClass = function(_x,_y){
	var e = GUI.Panel(_x+0.02, _y, 0.37, 0.2);
	e.align_y = GUI.align_bottom;
	e.align_x = GUI.align_right;
	e.texture = Asset.texture.gui;
	e.alphaBlended = true;
	e.textureRect = GUI.textureRect_abilityPanel;
	
	e.buttons = [];
	e.numberOfButtons = 8;
	e.selectedUnit = null;
	e.buttonIdOffset = 0;
	e.setButtonOffset = function(val){
		if(val == this.buttonIdOffset){return;}
		this.buttonIdOffset = val;
		if(Control.selectionLeader){
			this.link_abilities(Control.selectionLeader);
			if(val != 0){
				this.buttons[7].setAbility(new AbilityInstance ( null , Ability.TabCancel));
			}
		}
	}
	
	e.ability_shown = function(ab){
		var buttId = ab.buttonPos - this.buttonIdOffset;
		return buttId >= 0 && buttId < this.numberOfButtons;
	}
	
	if(DEVMODE){
		e.ticks = GUI.TextElem(0.02,0.18,10,"0");
		e.ping = GUI.TextElem(0.22,0.18,10,"0");
		e.addChild(e.ticks);
		e.addChild(e.ping);
	}
	
	for(var i=0;i<e.numberOfButtons;++i){
		e.buttons[i] = GUI.AbilityButton(0.02 + 0.075*(i%4), 0.02+0.075*Math.floor(i/4));
		e.addChild(e.buttons[i]);
	}
	
	e.link_abilities = function(unit){
		for(var i=0;i<this.numberOfButtons;++i){
			//just preparing to link nulls at end of function
			this.buttons[i].linkedAbility = null;
		}
		if(unit){
			var abilities = unit.Abilities;
			for(var i=0;i<abilities.length;++i){
				var buttId = abilities[i].proto.buttonPos - this.buttonIdOffset;
				if(buttId >= 0 && buttId < this.numberOfButtons && unit.owner.hasAbility(abilities[i].proto)){
					this.buttons[buttId].setAbility(abilities[i]);
				}
			}
		}
		for(var i=0;i<this.numberOfButtons;++i){
			if(this.buttons[i].linkedAbility == null){
				this.buttons[i].setAbility(null);
			}
		}
	}
	
	e.update = function(){
		if(DEVMODE){
			this.ticks.setText(""+Gamestats.mapTime);
			this.ping.setText(""+Net.otherLatency);
		}
		if(Gamestats.cinematicMode){
			this.setPosX_smooth(1.5);
		}else{
			this.setPosX_smooth(1.02);
		}
		var newTooltipAb = null;
		if(Control.selectionLeader){
			if(this.selectedUnit != Control.selectionLeader){
				GUI.BattlePanel.portrait.setPortrait(Control.selectionLeader.proto.portrait)
				if(Control.PlayerHasControlOverSelection() == true){
					this.link_abilities(Control.selectionLeader);
				}
			}
			this.selectedUnit = Control.selectionLeader;
			//get tooltip
			for(var i=0;i<this.numberOfButtons;++i){
				if(this.buttons[i].linkedAbility && this.buttons[i].mouseOverCheck()){
					newTooltipAb = this.buttons[i].linkedAbility.proto;
					break;
				}
			}
		}else if(this.selectedUnit){
			for(var i=0;i<this.numberOfButtons;++i){
				this.buttons[i].setAbility(null);
			}
			this.selectedUnit = null;
		}
		
		if(this.tooltipAbility != newTooltipAb){
			if(newTooltipAb==null){
				this.tooltip.setVisibility(false);
			}else{
				this.tooltip.setVisibility(true);
				this.tooltip.setText(newTooltipAb.name);
				this.tooltipText.setText(newTooltipAb.tooltip);
				var tooltipHeight = this.tooltipText.textBounds[3]-this.tooltipText.textBounds[1];
				if(newTooltipAb.requirementText && !newTooltipAb.techCondition(Control.currentPlayer)){
					this.tooltipRequireText.setVisibility(true);
					this.tooltipRequireText.setPosY(tooltipHeight+0.04);
					this.tooltipRequireText.setText(newTooltipAb.requirementText);
					tooltipHeight += this.tooltipRequireText.textBounds[3]-this.tooltipRequireText.textBounds[1]+0.03;
				}else{
					this.tooltipRequireText.setVisibility(false);
				}
				this.tooltip.setPosY(-tooltipHeight-0.03);
				
				var moneyCost = newTooltipAb.moneyCost;
				var coinCost = newTooltipAb.coinCost;
				var maintenance = 0;
				var trainingTime = fixed1(newTooltipAb.cooldown/30);
				if(newTooltipAb.trainingType){
					if(newTooltipAb.isResearch){
						var type = Upgrade[newTooltipAb.trainingType];
					}else{
						var type = newTooltipAb.trainingProto;
					}
					moneyCost = type.moneyCost;
					coinCost = type.coinCost;
					maintenance = type.maintenance;
					trainingTime = fixed1(type.trainingTime/30);
				}
				
				if(moneyCost||coinCost||maintenance||trainingTime){
					
					this.tooltip.mineralIcon.setPosX(0);
					this.tooltip.coinIcon.setPosX(0.1);
					this.tooltip.maintenanceIcon.setPosX(0.2);
					this.tooltip.timeIcon.setPosX(0.3);
					
					if(moneyCost > 0){
						this.tooltip.mineralIcon.setVisibility(true);
						this.tooltip.mineralIcon.textElem.setText(""+moneyCost);
						if(Control.currentPlayer.money < moneyCost){
							this.tooltip.mineralIcon.textElem.defaultColor = GUI.color_expensive;
						}else{
							this.tooltip.mineralIcon.textElem.defaultColor = GUI.textColor_white;
						}
					}else{
						this.tooltip.mineralIcon.setVisibility(false);
						//offset the icons right of this one
						this.tooltip.coinIcon.addPosX(-0.1);
						this.tooltip.maintenanceIcon.addPosX(-0.1);
						//this.tooltip.timeIcon.addPosX(-0.1);
					}
					if(coinCost > 0){
						this.tooltip.coinIcon.setVisibility(true);
						this.tooltip.coinIcon.textElem.setText(""+coinCost);
						if(Control.currentPlayer.coin < coinCost){
							this.tooltip.coinIcon.textElem.defaultColor = GUI.color_expensive;
						}else{
							this.tooltip.coinIcon.textElem.defaultColor = GUI.textColor_white;
						}
					}else{
						this.tooltip.coinIcon.setVisibility(false);
						//offset the icons right of this one
						this.tooltip.maintenanceIcon.addPosX(-0.1);
						//this.tooltip.timeIcon.addPosX(-0.1);
					}
					if(maintenance > 0){
						this.tooltip.maintenanceIcon.setVisibility(true);
						this.tooltip.maintenanceIcon.textElem.setText(""+maintenance);
						if(Control.currentPlayer.getIncome() < maintenance){
							this.tooltip.maintenanceIcon.textElem.defaultColor = GUI.textColor_itemPickup;
						}else{
							this.tooltip.maintenanceIcon.textElem.defaultColor = GUI.textColor_white;
						}
					}else{
						this.tooltip.maintenanceIcon.setVisibility(false);
						//offset the icons right of this one
						//this.tooltip.timeIcon.addPosX(-0.1);
					}
					if(trainingTime > 0){
						this.tooltip.timeIcon.setVisibility(true);
						this.tooltip.timeIcon.textElem.setText(""+trainingTime);
					}else{
						this.tooltip.timeIcon.setVisibility(false);
					}
				}else{
					this.tooltip.mineralIcon.setVisibility(false);
					this.tooltip.coinIcon.setVisibility(false);
					this.tooltip.maintenanceIcon.setVisibility(false);
					this.tooltip.timeIcon.setVisibility(false);
				}
			}
			this.tooltipAbility = newTooltipAb;
		}
	}
	
	e.tooltipAbility = null;
	e.tooltip= GUI.TextElem(-0.1,-0.1,10,"",GUI.align_left,0.5);
	
	e.tooltip.mineralIcon = GUI.ResourceIcon(0,-0.05,0.035, 0);
	e.tooltip.mineralIcon.addChild(e.tooltip.mineralIcon.textElem = GUI.TextElem(0.036,0.0,11,""));
	e.tooltip.coinIcon = GUI.ResourceIcon(0.1,-0.05,0.035, 1);
	e.tooltip.coinIcon.addChild(e.tooltip.coinIcon.textElem = GUI.TextElem(0.036,0.0,11,""));
	e.tooltip.maintenanceIcon  = GUI.ResourceIcon(0.2,-0.05,0.035,2);
	e.tooltip.maintenanceIcon.addChild(e.tooltip.maintenanceIcon.textElem = GUI.TextElem(0.036,0.0,11,""));
	e.tooltip.timeIcon  = GUI.ResourceIcon(0.3,-0.05,0.035,3);
	e.tooltip.timeIcon.addChild(e.tooltip.timeIcon.textElem = GUI.TextElem(0.036,0.0,11,""));
	
	e.tooltip.addChild(e.tooltip.mineralIcon);
	e.tooltip.addChild(e.tooltip.coinIcon);
	e.tooltip.addChild(e.tooltip.maintenanceIcon);
	e.tooltip.addChild(e.tooltip.timeIcon);
	e.tooltipText = GUI.TextElem(0,0.03,8,"",GUI.align_left,0.44);
	e.tooltipRequireText = GUI.TextElem(0,0.03,9,"",GUI.align_left,0.44);
	e.tooltipRequireText.defaultColor = GUI.textColor_damage;
	e.addChild(e.tooltip);
	e.tooltip.addChild(e.tooltipText);
	e.tooltip.addChild(e.tooltipRequireText);
	e.tooltip.setVisibility(false);
	
	e.trainingQueue = GUI.Panel(-0.35,0.35,0.35,0.2);
	e.trainingQueue.texture = Asset.texture.gui;
	e.trainingQueue.alphaBlended = true;
	e.trainingQueue.textureRect = GUI.textureRect_abilityPanel;
	
	e.trainingQueue.icons = [];
	for(var i=0;i<5;++i){
		e.trainingQueue.icons[i] = GUI.TrainingIcon(0.06*(i)+0.05,0.05, i,0.058);
		e.trainingQueue.icons[i].align_x = GUI.align_center;
		e.trainingQueue.addChild(e.trainingQueue.icons[i]);
	}
	
	e.trainingQueue.progressBar = GUI.FancySlider(0.04,0.12,0,1,"",0.27);
	e.trainingQueue.textElem = GUI.TextElem(0.175,0.02,10,GUI.msg_panel_training,GUI.align_center);
	e.trainingQueue.addChild(e.trainingQueue.textElem);
	e.trainingQueue.addChild(e.trainingQueue.progressBar);
	
	e.addChild(e.trainingQueue);
	e.trainingQueue.update = function(){
		var tq = null;
		var garrison = false;
		var u = this.parent.selectedUnit;
		if(u && Control.AllySelected()){
			tq = u.trainingQueue;
			if(!tq && u.garrisonArray && u.born){
				tq = u.garrisonArray;
				garrison = true;
				this.textElem.setText(GUI.msg_panel_garrison);
			}else if(!u.born && u.isStructure){
				tq = [u];
				this.textElem.setText(GUI.msg_panel_construction);
			}else if(tq && tq.length>0){
				this.textElem.setText(GUI.msg_panel_training);
			}
		}
		if(tq && tq.length!=0){
			if(this.visible == false){
				SoundObject.panel_in.play(0,0);
			}
			this.setVisibility(true);
			this.setPosY_smooth(0);
			if(garrison){
				this.progressBar.setVisibility(false);
			}else if(u.isStructure&&!u.born){
				this.progressBar.setVisibility(true);
				this.progressBar.setValue(u.birthCounter/Math.max(1,u.birthTime));
			}else{
				this.progressBar.setVisibility(true);
				this.progressBar.setValue(1-tq[0][1]/Math.max(1,tq[0][0].trainingTime));
			}
			for(var i=0;i<this.icons.length;++i){
				this.icons[i].color = GUI.textColor_white;
				if(tq[i]){
					if(tq[i].proto){
						this.icons[i].textureRect = GUI.getIconRect(tq[i].proto.iconId);
						this.icons[i].color = GUI.getLifeColor(tq[i]);
					}else{
						this.icons[i].textureRect = GUI.getIconRect(tq[i][0].iconId);
					}
					this.icons[i].setVisibility(true);
				}else{
					this.icons[i].setVisibility(false);
				}
			}
		}else{
			if(this.y_relative < 0.01){
				SoundObject.panel_out.play(0,0);
			}
			this.setPosY_accel(0,0.4);
			if(this.y_relative > 0.3){
				this.setVisibility(false);
			}
		}
	}
	
	return e;
}


GUI.AmmoCounter = function(_x, _y, iconId, ammoId){
	var e = GUI.Panel(_x, _y, 0.05,0.05);
	e.ammoId = ammoId;
	e.mouseBlocker = false;
	e.texture = Asset.texture.gui;
	e.textureRect = [iconId*16/512, 96/512,16/512,16/512];
	e.textElem = GUI.TextElem(0.05,0.01,12, "0");
	e.addChild(e.textElem);
	e.update = function(){
		this.textElem.setText(""+Gamestats.Hero.ammoArray[this.ammoId].count);
	}
	return e;
}	

GUI.BottomPanelClass = function(_x,_y){
	var e = GUI.Panel(_x, _y, 0.4,0);//0.067);
	e.alphaBlended = true;
	e.texture = Asset.texture.gui;
	e.textureRect = GUI.textureRect_bar;
	e.defaultColor = e.color = [0.6,0.65,0.65];
	e.mouseBlocker = false;
	e.align_y = GUI.align_bottom;
	e.align_x = GUI.align_right;
	
	e.redKeyElem = GUI.Panel(0.2,-0.06,0.05,0.05);
	e.redKeyElem.mouseBlocker = false;
	e.redKeyElem.texture = Asset.texture.key_red;
	e.addChild(e.redKeyElem);
	e.greenKeyElem = GUI.Panel(0.25,-0.06,0.05,0.05);
	e.greenKeyElem.texture = Asset.texture.key_green;
	e.greenKeyElem.mouseBlocker = false;
	e.addChild(e.greenKeyElem);
	e.blueKeyElem = GUI.Panel(0.3,-0.06,0.05,0.05);
	e.blueKeyElem.texture = Asset.texture.key_blue;
	e.blueKeyElem.mouseBlocker = false;
	e.addChild(e.blueKeyElem);
	 
	e.addChild(e.ammo1 = GUI.AmmoCounter(0, 0., 0,0));
	e.addChild(e.ammo2 = GUI.AmmoCounter(0.1, 0., 1,2));
	e.addChild(e.ammo3 = GUI.AmmoCounter(0.2, 0., 2,1));
	e.addChild(e.ammo4 = GUI.AmmoCounter(0.3, 0., 3,3));
	
	e.update = function(){
		this.redKeyElem.setVisibility(Gamestats.Keycards[0]>0);
		this.greenKeyElem.setVisibility(Gamestats.Keycards[1]>0);
		this.blueKeyElem.setVisibility(Gamestats.Keycards[2]>0);
		/*this.mineralTextElem.setText(""+Control.currentPlayer.money);
		var income = Control.currentPlayer.getIncome();
		var coin = Math.floor(Control.currentPlayer.coin);
		var capacity = Control.currentPlayer.coinLimit;
		this.incomeTextElem.setText(""+fixed1(income));
		this.coinTextElem.capacityElem.setText("/"+capacity);
		if(income < 0){
			this.incomeTextElem.color = GUI.color_expensive;
		}else{
			this.incomeTextElem.color = GUI.textColor_white;
		}
		this.coinTextElem.setText(""+coin);
		if(coin >= capacity){
			this.coinTextElem.color = GUI.textColor_itemPickup;  
		}else{
			this.coinTextElem.color = GUI.textColor_white;
		}*/
	}

	return e;
}

GUI.TimerPanelClass = function(_x,_y,title){
	var e = GUI.ThinPanel(_x,_y,0.3,0.1);
	e.timerText = GUI.TextElem(0.1,0.052,15,"",);
	e.titleText = GUI.TextElem(0.15,0.014,12,title,GUI.align_center);
	//e.alphaBlended = true;
	//e.texture = Asset.texture.gui;
	//e.textureRect = GUI.textureRect_bar;
	e.addChild(e.timerText);
	e.addChild(e.titleText);
	e.timerId = 0;
	e.secondsLeft = 30;
	e.deleteOnReset = true;
	e.update = function(){
		if(!this.visible){
			return;
		}
		this.setPosY(GUI.ObjectiveTimers.indexOf(this)*0.12 + GUI.ObjectivePanel.listHeight);
		var oldSec=this.secondsLeft;
		var ticksLeft = Trigger.Timers[this.timerId] || 0;
		this.secondsLeft = Math.max(0,ticksLeft/30);
		if(this.secondsLeft != oldSec){
			var mins = Math.floor(this.secondsLeft/60);
			var secs = Math.floor(this.secondsLeft%60);
			var str = "";
			if(mins<10){
				str+="0"+mins;
			}else{
				str+=mins;
			}
			if(secs<10){
				str+=":0"+secs;
			}else{
				str+=":"+secs;
			}
			this.timerText.setText(str);
		}
	}
	e.destroy = function(){
		var panelId = GUI.ObjectiveTimers.indexOf(this);
		if(panelId>=0){
			GUI.ObjectiveTimers.splice(panelId,1);
			this.removeFromGUI(GUI.InGame);
		}
	}
	return e;
}
GUI.TimerPanelClass.Create = function(title){
	var panel = GUI.TimerPanelClass(0.02,0,title);
	panel.addToGUI(GUI.InGame);
	GUI.ObjectiveTimers.push(panel);
	return panel;
}

GUI.TimerPanelClass.getById = function(id){
	for(var i=0;i<GUI.ObjectiveTimers.length;++i){
		if(GUI.ObjectiveTimers[i]&&GUI.ObjectiveTimers[i].timerId == id){
			return GUI.ObjectiveTimers[i];
		}
	}
}

GUI.InputField = function(_x,_y){
	var e = GUI.Panel(_x, _y, 0.1, 0.04);
	e.fontSize = 8;
	e.textElem = GUI.TextElem(0.015, 0.01, e.fontSize, "");
	e.addChild(e.textElem);
	e.label = null;
	e.dynamicHeight = false;
	e.wholeNumbers = false;
	e.lose_focus_on_click = true;
	
	e.setFontSize = function(newSize){
		this.fontSize = newSize;
		this.textElem.setFontSize(newSize);
	}
	
	e.callback = function(){
		if(this.enabled == true){
			GUI.activeInputField = this;
		}
	}
	
	e.callback_right = function(){
		if(this.enabled == true){
			this.callback();
			this.emptyField();
		}
		//this.value = this.defaultValue;
		//this.setBoundValue();
	}
	e.callback_scroll = function(delta){
		if(this.enabled == false){
			return;
		}
		delta = Math.sign(delta);
		if(this.numberOnly == true){
			this.getBoundValue();
			if(Control.pressed[16]){ //hold SHIFT for small increment
				delta *= 0.2;
			}
			this.value += delta*this.scrollIncrement;
			this.updateValue();
			this.setBoundValue( delta*this.scrollIncrement );
		}
	}
	
	e.keyPress = function(event){
		if(event.keyCode == 13 && !this.dynamicHeight){
			this.updateValue();
			this.setBoundValue();
		}else if(event.keyCode == 8){
			this.backspace();
		}else if(DESKTOP_VERSION && event.ctrlKey){
			if(event.keyCode == 86 ){
				this.pasteInto(clipboard.readText('selection'));
			}else if(event.keyCode == 67){
				clipboard.writeText(this.copyFrom(),'selection');
			}
		}else{
			var chr = event.key; 
			if(event.keyCode == 13){
				this.writeChar("\n");
			}else if(event.key.length ==1){
				this.writeChar(chr);
			}
		}
	}
	
	e.update = function(){
		this.enabled = this.activationCondition();
		if(this.enabled == false){
			this.color = this.defaultColor;
		}else{
			if(GUI.activeInputField == this){
				this.color = [0.2,0.3,0.8];
				if(this.dynamicHeight){
					this.h = Math.max(0.04, 0.02+this.textElem.textBounds[3]-this.textElem.textBounds[1]);
				}
			}else{
				//this.color = [0.5,0.5,0.5];
				this.color = GUI.color_inputField;
				var actualVal = this.getBoundValue();
				if(this.value != actualVal){
					this.value = actualVal;
					this.updateValue();
				}
				if(this.dynamicHeight){
					this.h = 0.04;
				}
			}
		}
	}
	
	e.maxLength = 5;
	
	e.numberOnly = true; //for num only
	e.defaultValue = 0;
	e.value = 0;
	e.minValue = -256; 
	e.maxValue = 256;
	e.scrollIncrement = 0.05;
	
	e.emptyField = function(){
		this.textElem.setText("");
	}
	
	e.writeChar = function(chr){
		if(this.textElem.text.length >= this.maxLength){
			return;
		}
		if(this.numberOnly == true){
			var cod = chr.charCodeAt(0);
			if(cod >= 48 && cod <= 57 || 
			this.textElem.text.length == 0 && chr == '-' ||
			chr == '.' && this.textElem.text.indexOf('.')<0){
				this.textElem.setText(this.textElem.text + chr);
			}
			this.value = parseFloat(this.textElem.text);
		}else{
			this.textElem.setText(this.textElem.text + chr);
			this.value = this.textElem.text ;
		}
	}
	
	e.pasteInto = function(txt){
		if(this.numberOnly == false){
			this.value = txt ;
			this.updateValue();
		}
	}
	e.copyFrom = function(){
		return this.textElem.text;
	}
	
	e.backspace = function(){
		this.textElem.setText(this.textElem.text.slice(0,-1));
		this.contentCheck();
	}
	
	e.contentCheck = function(){
		if(this.numberOnly == true){
			if(this.textElem.text.length > 0){
				this.value = parseFloat(this.textElem.text);
			}else{
				this.value = this.defaultValue;
			}
		}else{
			if(this.textElem.text.length > 0){
				this.value = this.textElem.text ;
			}
		}
	}
	
	e.outOfFocus = function(){
		this.contentCheck();
		this.updateValue();
		this.setBoundValue();
	}

	e.updateValue = function(){
		if(this.numberOnly == true){
			if(isNaN(this.value)){
				this.value = this.defaultValue;
			}
			if(this.wholeNumbers){
				this.value = Math.round(this.value);
			}
			this.value = Math.max(this.minValue, Math.min(this.maxValue, this.value));
			var newText = (""+this.value).slice(0,this.maxLength);
		}else{
			var newText = this.value;
		}
		this.textElem.setText(newText); //collapse whatever is in there to the correct format
	}
	
	
	//these functions are for data binding
	e.enabled = false;
	e.activationCondition = Utils.TRUE;
	e.getBoundValue = function(){
		return this.value;
	}
	
	e.setBoundValue = Utils.DO_NOTHING;
		
	
	e.updateValue();
	return e;
}

GUI.DropList = function(_x,_y, _inputList){
	var e = GUI.InputField(_x, _y);
	e.inputList = _inputList;
	e.mouseBlocker = true;
	e.callback=function(){
		var listYOff = (this.y < 0.5 || !this.smart_position) ? 0 : -(this.inputList.length-1.5)*0.025;
		var list = GUI.List(0,  listYOff , this.w , 0.4);
		//list.margin_x = 0.01;
		list.update = function(){
			if(this.mouseOverCheck_force()==false){
				this.removeFromGUI(GUI.Elements);
			}
		}
		list.linkToArray(this.inputList, true);
	
		this.addChild(list);
		list.setLinkedParameter = function(obj){
			this.parent.value = obj;
			this.parent.updateValue();
			this.parent.setBoundValue();
			//this.removeFromGUI(GUI.Elements);
		}
		list.addToGUI(GUI.Elements);
		list.key_override_condition = Utils.TRUE;
	}
	e.callback_scroll = function(delta){
		var nextId = this.inputList.indexOf(this.value)+Math.sign(delta);
		nextId = Math.max(0, Math.min(nextId, this.inputList.length-1));
		this.value = this.inputList[nextId];
		this.updateValue();
		this.setBoundValue();
	}
	e.updateValue = function(){
		if(this.value && this.value.name){
			this.textElem.setText(this.value.name);
		}
	}
	e.callback_right = Utils.DO_NOTHING;
	return e;
}


GUI.HintPanelClass = function(_x,_y){
	var e = GUI.Panel(_x, _y, 0., 0.);
	e.align_x = GUI.align_right;
	e.Hints = [];
	e.addHint = function(message){
		
		
		var textElem = GUI.TextElem(0.02,0.015,10,message, GUI.align_left, 0.38);
		var hintH = Math.max(0.055,textElem.textBounds[3]- textElem.textBounds[1] + 0.03);
		var hint = GUI.Panel9Slice(0, -.2, 0.42, hintH ,0.05);
		hint.alphaBlended = true;
		hint.align_x = GUI.align_right;
		hint.mouseBlocker=false;
		hint.textElem = textElem;
		
		hint.cancelButton = GUI.Button(-0.06,0.);
		hint.cancelButton.w = hint.cancelButton.h = 0.05;
		hint.cancelButton.callback = function(){
			this.parent.parent.removeHint(this.parent);
		}
		hint.cancelButton.alphaBlended = true;
		hint.cancelButton.mouseOverColor = GUI.color_mouseOver ;
		hint.cancelButton.texture = Asset.texture.gui;
		hint.cancelButton.textureRect = GUI.textureRect_cross;
		hint.addChild(hint.textElem);
		hint.addChild(hint.cancelButton);
		this.addChild(hint);
		hint.addToGUI(GUI.InGame);
		this.Hints.push(hint);
		SoundObject.hint.play(0.5,0);
	}
	e.removeHint = function(hint){
		this.detachChild(hint);
		hint.removeFromGUI(GUI.InGame);
		this.Hints.splice(this.Hints.indexOf(hint),1);
	}
	e.update = function(){
		this.listHeight = 0;
		for(var i=0;i<this.Hints.length;++i){
			var hint = this.Hints[i];
			hint.setPosY_smooth(this.listHeight);
			this.listHeight += hint.h+0.01;
		}
	}
	return e;
}

GUI.ObjectivePanelClass = function(_x,_y){
	var e = GUI.Panel(_x, _y, 0., 0.);
	e.Hints = [];
	e.listHeight = 0;
	//only called when necessary, don't confuse it with e.update
	e.refresh = function(){
		//display newly created objectives
		for(var i=0;i<Trigger.Objectives.length;++i){
			var obj = Trigger.Objectives[i];
			if(obj){
				if(!obj.finished && !obj.displayed){
					this.addHint(obj);
				}
			}
		}
		//update visible objectives
		for(var i=this.Hints.length-1;i>=0;--i){
			var obj = this.Hints[i].linkedObjective;
			if(obj){
				if(obj.finished){
					this.removeHint(this.Hints[i]);
				}else{
					this.Hints[i].textElem.setText(obj.getText());
				}
			}
		}
	}
	e.reset = function(){
		this.Hints = [];
	}
	e.addHint = function(obj){
		var textElem = GUI.TypedTextElem(0.25,0.015,10,obj.getText(), GUI.align_center, 0.5);
		var hintH = Math.max(0.055,textElem.textBounds[3]- textElem.textBounds[1] + 0.02);
		var hint = GUI.ThinPanel(0, -.2, 0.5, hintH);
		//hint.texture = Asset.texture.gui;
		//hint.textureRect = GUI.textureRect_bar;
		//hint.alphaBlended = true;
		hint.mouseBlocker=false;
		hint.textElem = textElem;
		hint.linkedObjective = obj;
		hint.linkedObjective.displayed = true;
		hint.deleteOnReset = true;
		
		hint.addChild(hint.textElem);
		this.addChild(hint);
		hint.addToGUI_before(GUI.InGame, this);
		this.Hints.push(hint);
		//SoundObject.alert_small.play(0,0,1.4);
	}
	e.addHintButton = function(hintId,name,trigId,condId){
		var hint = this.Hints[hintId];
		if(hint){
			var btn = GUI.MenuButton(0.1,hint.h-0.01,name,12,0.3);
			btn.h = 0.055;
			hint.addChild(btn);
			hint.button = btn;
			btn.addToGUI_after(GUI.InGame,hint);
			btn.setVisibility(false);
			btn.condId = condId;
			btn.trigId = trigId;
			btn.callback = function(){
				var trig = Trigger.list[this.trigId];
				if(trig && !trig.triggered){trig.fire();}
			}
			btn.update = function(){
				if(this.condId > 0 && !Trigger.list[this.condId].condition()){
					if(this.visible){
						this.parent.h -= 0.05;
					}
					this.setVisibility(false);
				}else{
					if(!this.visible){
						this.parent.h += 0.05;
					}
					this.setVisibility(true);
				}
			}
		}
	}
	e.removeHint = function(hint){
		this.detachChild(hint);
		hint.linkedObjective.displayed = false;
		hint.removeFromGUI(GUI.InGame);
		this.Hints.splice(this.Hints.indexOf(hint),1);
	}
	e.update = function(){
		var hintY = 0.01;
		for(var i=0;i<this.Hints.length;++i){
			var obj = this.Hints[i];
			obj.setPosY_smooth(hintY);
			hintY+=0.01+obj.h;
			this.listHeight = Math.max(this.listHeight, obj.y+obj.h);
		}
	}
	return e;
}

GUI.EditorParamsPanelClass = function(_x, _y){
	var e = GUI.Panel(_x, _y, 0., 0.);
	
	e.coordText = GUI.TextElem(-0.08,0,8,"-");
	e.addChild(e.coordText);
	
	e.inp1 = GUI.InputField(0.,0.);
	e.inp1.addLabel("Z pos");
	e.inp2 = GUI.InputField(0.12,0.);
	e.inp2.addLabel("RotX");
	e.inp3 = GUI.InputField(0.24,0.);
	e.inp3.addLabel("RotY");
	e.inp4 = GUI.InputField(0.36,0.);
	e.inp4.addLabel("Scale");
	e.addChild(e.inp1);
	e.addChild(e.inp2);
	e.addChild(e.inp3);
	e.addChild(e.inp4);
	e.rpy_switch = GUI.Checkbox(0.47,0.0);
	e.rpy_switch.addLabel("R-P-Y");
	e.rpy_switch.getBoundValue = function(){return Editor.RPY;}
	e.rpy_switch.setBoundValue = function(){Editor.RPY = this.value;}
	e.addChild(e.rpy_switch);
	
	e.soundBlockerInput = GUI.Checkbox(0.57,0.0);
	e.soundBlockerInput.addLabel("SoundBlocker");
	e.soundBlockerInput.getBoundValue = function(){
			if(Editor.selected[0]){
				if(Editor.selected[0].linkedObject){//linedef helper
					return Editor.selected[0].linkedObject.sound_blocker;
				}else if(Editor.selected[0].owner){//unit
					return Editor.selected[0].owner.deaf;
				}
			}
		return false;
		}
	e.soundBlockerInput.setBoundValue = function(){
		for(var i=0;i<Editor.selected.length;++i){
			if(Editor.selected[i].linkedObject && Editor.selected[i].type == 1){
				Editor.selected[i].linkedObject.sound_blocker = this.value;//linedef helper
			}else if(Editor.selected[i].owner){
				Editor.selected[i].owner.deaf = this.value;//unit
			}
		}
	}
	e.addChild(e.soundBlockerInput);
	
	e.inp1.getBoundValue = function(){
		return Editor.selected[0].z;
	}
	e.inp1.setBoundValue = function(){
		Editor.SetZSelection(this.value);
	}
	
	e.inp2.getBoundValue = function(){
		var o = Editor.selected[0];
		return o.owner == null ?Editor.GetRot(o,0):o.owner.wanderChance*10;
	}
	e.inp2.setBoundValue = function(){
		var o = Editor.selected[0];
		if(o.owner == null){
			Editor.SetRotSelection(this.value, 0);
		}else{
			Editor.SetWanderParamSelection(this.value/10, 0);
		}
	}
	e.inp3.getBoundValue = function(){
		var o = Editor.selected[0];
		return o.owner == null ?Editor.GetRot(o,1):o.owner.wanderRadius;
	}
	e.inp3.setBoundValue = function(){
		var o = Editor.selected[0];
		if(o.owner == null){
			Editor.SetRotSelection(this.value, 1);
		}else{
			Editor.SetWanderParamSelection(this.value, 1);
		}
	}
	e.inp4.getBoundValue = function(){
		return Editor.selected[0].scale;
	}
	e.inp4.setBoundValue = function(){
		Editor.SetScaleSelection(this.value, 1);
	}
	e.inp4.defaultValue = 1;
	
	e.update = function(){
		if(Editor.selected.length > 0){
			var focusObject = Editor.selected[0];
			this.setVisibility(true);
			this.coordText.setText(focusObject.x.toFixed(2) +"\n"+Editor.selected[0].y.toFixed(2));
			if(focusObject && focusObject.proto){
				if(this.inp2.label.text != focusObject.proto.rotXName ){
					this.inp2.label.setText(focusObject.proto.rotXName );
				}
				if(this.inp3.label.text != focusObject.proto.rotYName ){
					this.inp3.label.setText(focusObject.proto.rotYName );
				}
			}
			//selection is linedef helper or unit
			if(focusObject.linkedObject && focusObject.type == 1 || focusObject.owner){ 
				this.soundBlockerInput.setVisibility(true);
			}else{
				this.soundBlockerInput.setVisibility(false);
			}
			
		}else{
			this.setVisibility(false);
		}
	}
	
	e.inp1.activationCondition = function(){
		return (Editor.selected.length > 0);
	}
	e.inp2.activationCondition = e.inp1.activationCondition;
	e.inp3.activationCondition = e.inp1.activationCondition;
	e.inp4.activationCondition = e.inp1.activationCondition;
	
	
	return e;
}

GUI.Checkbox = function(_x, _y){
	var e = GUI.Button(_x,_y);
	e.value = false;
	e.alphaBlended = true;
	e.label = null;
	e.texture = Asset.texture.gui;
	e.textureRect = GUI.textureRect_cross;
	
	e.callback = function(){
		this.value = !this.value;
		this.setBoundValue();
	}
	e.setBoundValue = Utils.DO_NOTHING;
	e.getBoundValue = function(){
		return this.value;
	}
	e.activationCondition = Utils.TRUE;

	e.update = function(){
		this.enabled = this.activationCondition();
		if(this.enabled){
			this.value = this.getBoundValue();
			this.color = this.defaultColor;
			this.textureRect = this.value?GUI.textureRect_dot:GUI.textureRect_cross;
		}else{
			this.color = GUI.color_checkboxOff;
		}
		
	}
	return e;
}

GUI.TriggerParamPanelClass = function(_x,_y){
	var e = GUI.Panel(_x,_y,0.7,0.1);
	var paramTypes = Trigger.selectedTrigger.enableCondition.params;
	var input_pos = 0;
	
	e.generate_inputs_recursive = function(param_subtree, paramTypeList, param_flat_id, level){
		for(var i=0;i<param_subtree.length;++i){
			var paramType = paramTypeList[i];
			if(paramType.noInput != true){
				if(paramType.inputList==null){
					var param_input = GUI.InputField(input_pos, 0.05);
				}else{
					var param_input = GUI.DropList(input_pos, 0.05, paramType.inputList);
				}
				param_input.paramPos = i;
				param_input.paramArray = param_subtree;
				param_input.paramType = paramType;
				param_input.numberOnly = paramType.isNumeric;
				param_input.w += paramType.input_scale;
				if(!paramType.isNumeric){
					param_input.maxLength = 256;
					param_input.textElem.textWidth = param_input.w +0.1;
					param_input.dynamicHeight = true;
				}
				input_pos += paramType.input_scale;
				
				param_input.addLabel(paramType.name);
				
				param_input.maxValue = 900000;
				param_input.minValue = -900000;
				param_input.setBoundValue = paramType.inputSetter;
				param_input.getBoundValue = paramType.inputGetter;
				
				this.addChild(param_input);
				param_flat_id ++;
				input_pos += 0.12;
			}
			if(paramType.isComposite == true && param_subtree[i].length > 0){ //composite parameter, needs to generate multiple inputs for it
				var subtree_paramTypeList = paramType.getPrimitiveTypeList(param_subtree[i]);
				param_flat_id = this.generate_inputs_recursive(param_subtree[i], subtree_paramTypeList, param_flat_id, level+1);
			}
		}
		return param_flat_id;
	}
	
	e.addActionDelayInput = function(){
		var param_input = GUI.InputField(0, 0);
		param_input.addLabel("Delay");
		param_input.maxValue = 10000;
		param_input.minValue = 0;
		param_input.activationCondition = function(){
			return Trigger.selectedTrigger!=null&&Trigger.selectedTrigger.selectedAction!=null;
		}
		param_input.setBoundValue = function(){
			Trigger.selectedTrigger.selectedAction[2] = this.value;
		}
		param_input.getBoundValue = function(){
			return Trigger.selectedTrigger.selectedAction[2];
		}
		
		this.addChild(param_input);
	}
	
	return e;
}

GUI.TriggerParamPanelClass.Rebuild_ConditionPanel = function(){
	if(GUI.TriggerConditionParamPanel != null){
		GUI.TriggerConditionParamPanel.parent.detachChild(GUI.TriggerConditionParamPanel);
		GUI.TriggerConditionParamPanel.removeFromGUI(GUI.Triggers);
	}
	GUI.TriggerConditionParamPanel = GUI.TriggerParamPanelClass(0,0.15,0.7,0.1);
	GUI.TriggerConditionParamPanel.generate_inputs_recursive(
		Trigger.selectedTrigger.enableParam, 
		Trigger.selectedTrigger.enableCondition.params, null, 0, 0);
	GUI.TriggerPanel.addChild(GUI.TriggerConditionParamPanel);
	GUI.TriggerConditionParamPanel.addToGUI(GUI.Triggers);
}
GUI.TriggerParamPanelClass.Rebuild_ActionPanel = function(){
	if(GUI.TriggerActionParamPanel != null){
		if(GUI.TriggerActionParamPanel.parent){
			GUI.TriggerActionParamPanel.parent.detachChild(GUI.TriggerActionParamPanel);
		}
		GUI.TriggerActionParamPanel.removeFromGUI(GUI.Triggers);
	}
	if(Trigger.selectedTrigger.selectedAction != null){
		GUI.TriggerActionParamPanel = GUI.TriggerParamPanelClass(0,0.75,0.7,0.1);
		GUI.TriggerActionParamPanel.generate_inputs_recursive(
			Trigger.selectedTrigger.selectedAction[1], 
			TriggerAction.getById(Trigger.selectedTrigger.selectedAction[0]).params, null, 0, 0);
		GUI.TriggerActionParamPanel.addActionDelayInput();
		GUI.TriggerPanel.addChild(GUI.TriggerActionParamPanel);
		GUI.TriggerActionParamPanel.addToGUI(GUI.Triggers);
	}
}

GUI.GunSpriteClass = function(_isLeftHanded){
	var e = GUI.Panel(0.5,1.05,0.44,0.4 );
	e.shader = ShaderProgram.gunShader;
	e.align_y = GUI.align_bottom;
	//e.align_x = GUI.align_center;
	e.mouseBlocker = false;
	e.texture = Asset.texture.minigun;
	e.frameTime = 0;
	e.frame = 0;
	e.animFrame = 0;
	e.animTime = 0;
	e.animSpeed = 0;
	e.shakeY = 0;
	e.shakeX = 0;
	e.shakePhase = 0;
	e.weapon_swap_y = 0;
	e.gun = null;
	e.animCollection = Anim.Empty;
	e.animSequence = null;
	e.specialAnimLoop = null; //get it from gun
	e.isLeftHanded = _isLeftHanded;
	
	e.startAnim = function(animId){
		this.animSequence = this.animCollection[animId];
		this.frameTime = this.animTime = 0;
		if(this.animSequence.randomStart == false){
			this.animFrame = 0;
			this.animTime = 0;
		}else{
			this.animFrame = Math.floor(Math.random()*this.animSequence.numberOfFrames);
			this.animTime = this.animSequence.frameTimes[(this.animFrame-1+this.animSequence.numberOfFrames)%this.animSequence.numberOfFrames];
		}
	}
 
	e.update_anim = function(){
		var numOfFrames = this.animSequence.numberOfFrames;
		this.frameTime += Render.frameDelta * this.animSpeed;
		this.animTime += Render.frameDelta * this.animSpeed;
		if(this.animSequence.frameTimes[this.animFrame] <= this.animTime){
			if(this.animSequence.looping && this.animFrame+1 >= numOfFrames){
				this.animFrame = 0;
				this.animTime = 0;
			}else{
				if(this.animSequence.nextType >= 0 && this.animFrame+1 >= numOfFrames){
					this.startAnim(this.animSequence.nextType);
					return;
				}
				this.animFrame = Math.min(this.animFrame+1, numOfFrames-1);
			}
		}
		this.frame = this.animSequence.frames[this.animFrame];
	}
	
	e.update = function(){
		if(!this.gun){return;}
		if(this.specialAnimLoop){
			this.specialAnimLoop();
		}else{
			this.update_anim();
		}
		
		this.textureRect = this.gun.rects[this.frame];
		if(this.gun.owner.moving){
			this.shakePhase += Render.frameDelta * this.gun.owner.currentSpeed;
			this.shakeY += (Math.cos(this.shakePhase * 1.2) - this.shakeY)*0.2;
			this.shakeX += (Math.sin(this.shakePhase * 0.38) - this.shakeX) * 0.2
		}else{
			this.shakeY *= 0.8;
			this.shakeX *= 0.9;
		}
		
		if(this.isLeftHanded){
			this.shakeY = -GUI.GunSprite.shakeY;
		}

		var scaleFactor = 1.93 * this.gun.spriteSize/512;
		this.w = this.textureRect[2] * scaleFactor;
		this.h = this.textureRect[3] * scaleFactor;
		if(this.gun.put_away_delay > 0 || !Gamestats.Hero.alive){
			this.weapon_swap_y =  this.weapon_swap_y+0.02*Render.frameDelta;
		}else{
			this.weapon_swap_y = Math.max(this.weapon_swap_y-0.015*Render.frameDelta, 0);
		}
		
		var frame_x_offset = this.gun.frame_x_offsets ? this.gun.frame_x_offsets[this.frame] : 0;
		if(this.isLeftHanded){
			frame_x_offset -= 0.18;
		}
		var frame_y_offset = this.gun.frame_y_offsets ? this.gun.frame_y_offsets[this.frame] : 0;
		this.setPos( (this.gun.spriteOffsetX + this.shakeX*0.04 + frame_x_offset)/GUI.aspectRatio + 0.5, 
		this.gun.spriteOffsetY + 1.05+this.shakeY*0.008 +this.weapon_swap_y + frame_y_offset);
		
		if(this.ammo_screen){
			this.ammo_screen.setPosY(  this.h );
		}
	}
	
	return e;
}

GUI.AddElem = function(elem){
	GUI.Elements.push(elem);
}
GUI.RemoveElem = function(elem){
	GUI.Elements.splice(GUI.Elements.indexOf(elem), 1);
}
GUI.getAspectRatio = function(){
	return Render.pixelWidth/Render.pixelHeight;
}
GUI.pixelToScreenX = function(px){
	return px/Render.pixelWidth;
}
GUI.pixelToScreenY = function(py){
	return py/Render.pixelHeight;
}
GUI.screenToClipX = function(sx){
	return sx*2 -1;
}
GUI.screenToClipY = function(sy){
	return 1-sy*2;
}
GUI.pixelToClipX = function(px){
	return px/Render.pixelWidth*2 -1;
}
GUI.pixelToClipY = function(py){
	return 1-py/Render.pixelHeight*2;
}
GUI.clipToScreenX = function(cx){
	return (cx+1)/2;
}
GUI.clipToScreenY = function(cy){
	return (1-cy)/2;
}
GUI.clipToPixelX = function(cx){
	return (cx+1)/2 * Render.pixelWidth;
}
GUI.clipToPixelY = function(cy){
	return (1-cy)/2 * Render.pixelHeight;
}

GUI.Minimap = null;
GUI.Minimap_InGame = null;
GUI.BattlePanel = null;
GUI.TargetPanel = null;
GUI.AbilityPanel = null;
GUI.DialogPanel = null;
GUI.TopPanel = null;
GUI.HintPanel = null;
GUI.EmptyButtonTexture = null;
GUI.ObjectList = null;
GUI.EditorParamsPanel = null;
GUI.Fade = null;
GUI.Elements  = [];
GUI.Elements_Tags = [];
GUI.Elements_Alerts = [];
GUI.ExitPanel = null;
GUI.ShipPanel = null;
GUI.InventoryPanel = null;
GUI.ReloadPanel = null;
GUI.TriggerPanel = null;
GUI.TriggerList = null;
GUI.TriggerConditionParamPanel = null;
GUI.TriggerActionParamPanel = null;
GUI.FilePanel = null;
GUI.NewGamePanel = null;
GUI.OptionsPanel = null;
GUI.QuitPanel = null;
GUI.KeysPanel = null;
GUI.CreatorPanel = null;
GUI.PropertyPanel = null;
GUI.SkirmishPanel = null;
GUI.NetPanel = null;
GUI.Editor = null;
GUI.ObjectiveTimers = [];
GUI.ObjectivePanel = null;
GUI.ScrollCompass = null;
GUI.ChatPanel = null;
GUI.StatusPortrait = null;

GUI.Init = function(){
	GUI.enabled = true;
	
	GUI.Fade = GUI.Panel(0,0,2,1);
	GUI.Fade.defaultColor = GUI.Fade.color = GUI.Fade.mouseOverColor = GUI.textColor_black;
	GUI.Fade.alphaBlended = true;
	GUI.Fade.mouseBlocker = true;
	GUI.Fade.opacity = 1.5;
	GUI.Fade.update = function(){
		this.w = GUI.aspectRatio  + 0.01;
		this.opacity = Math.max(0, this.opacity-0.03*Render.frameDelta);
		if(this.opacity < 0.3){
			this.mouseBlocker = false;
		}
	}

	GUI.HintPanel = GUI.HintPanelClass(1,0.12);
	GUI.EditorParamsPanel = GUI.EditorParamsPanelClass(0.3,0.9);
	GUI.DialogPanel = GUI.BlackPanel(0.1,0.01,0.18,0.18);
	GUI.DialogPanel.mouseBlocker = false;
	GUI.DialogPanel.bg = GUI.BlackPanel(0.18,0,0.96,0.25);
	GUI.DialogPanel.bg.mouseBlocker = false;
	GUI.DialogPanel.bg.opacity = 0.9;
	GUI.DialogPanel.portrait = GUI.Portrait(0.03,0.03,0,true);
	GUI.DialogPanel.titleElem = GUI.TextElem(0.22,0.01,13,"Marine");
	GUI.DialogPanel.titleElem.defaultColor = GUI.textColor_darkred;
	GUI.DialogPanel.textElem = GUI.TypedTextElem(0.21,0.05,15,"",GUI.align_left,0.9);
	GUI.DialogPanel.addChild(GUI.DialogPanel.bg);
	GUI.DialogPanel.addChild(GUI.DialogPanel.portrait);
	GUI.DialogPanel.addChild(GUI.DialogPanel.titleElem);
	GUI.DialogPanel.addChild(GUI.DialogPanel.textElem);
	GUI.DialogPanel.setVisibility(false);
	GUI.DialogPanel.timer = 0;
	GUI.DialogPanel.update = function(){
		if(this.timer>0){
			this.timer -= Render.frameDelta*0.5;
		}else{
			this.setVisibility(false);
		}
	}
	GUI.DialogPanel.setText = function(text){
		this.textElem.setText(text);
		GUI.DialogPanel.textElem.prim_count_factor = 0;
		this.bg.h = Math.max(0.12,this.textElem.textBounds[3] - this.textElem.textBounds[1] + 0.09);
		init9slice(this.bg,this.bg.border,this.bg.border);
	}
	
	GUI.EmptyButtonTexture = Asset.texture.button;
	GUI.ObjectivePanel = GUI.ObjectivePanelClass(0,0);
	
	//var screen = GUI.Panel(0,0,GUI.aspectRatio,1);
	//screen.texture = postProcessTexture;
	//screen.mouseBlocker = false;
	
	GUI.InGame = [];
	GUI.Minimap_InGame = GUI.MinimapClass(0.025,0.025,0.26,0.26);
	GUI.BattlePanel = GUI.BattlePanelClass(0.015, 1.02);
	GUI.BattlePanel.align_y = GUI.align_bottom;
	
	GUI.BottomPanel = GUI.BottomPanelClass(1,0.94);
	GUI.StatusPortrait = GUI.StatusPortraitClass(0,-0.02, 0.14);
	GUI.BattlePanel.addChild(GUI.StatusPortrait);
	
	GUI.GunSprite = GUI.GunSpriteClass(false);
	GUI.LeftGunSprite = GUI.GunSpriteClass(true);
	
	var ammo_screen = GUI.Panel(0,0,0.038,0.038);
	ammo_screen.alphaBlended = true;
	ammo_screen.asset = [GUI.rectCenterVertexBuffer, Asset.model.ammo_screen.buffers[2]];
	ammo_screen.texture = hudTexture;
	ammo_screen.ammoTextElem = GUI.TextElem(0.5,0.15,250,"50",GUI.align_center);
	ammo_screen.bgElem = GUI.Panel(0,0,1,1);
	//ammo_screen.bgElem.defaultColor = ammo_screen.bgElem.color = [0.2,0.7,0.4];
	ammo_screen.bgElem.defaultColor = ammo_screen.bgElem.color = [1.2,0.2,0.1];
	ammo_screen.bgElem.texture = Asset.texture.ammo_screen;
	ammo_screen.bgElem.alphaBlended = true;
	ammo_screen.heatElem = GUI.Panel(0,0,1,1);
	ammo_screen.heatElem.texture = Asset.texture.ammo_screen;
	ammo_screen.heatElem.textureRect = [0,0,1,1];
	ammo_screen.heatElem.alphaBlended = true;
	ammo_screen.heatElem.color = [1.4,1,0.2];
	ammo_screen.HUD = [ammo_screen.bgElem, ammo_screen.heatElem, ammo_screen.ammoTextElem ];
	ammo_screen.update = function(){
		var gun = GUI.GunSprite.gun;
		if(!gun){return;}
		this.ammoTextElem.setText(""+ gun.get_ammo_count());
		this.heatElem.textureRect[3] = gun.heat; //heat bar
		this.heatElem.h = gun.heat;
		this.heatElem.y = 1-gun.heat;
		//draw the contects of the gun HUD into the gun screen's texture
		gl.bindFramebuffer(gl.FRAMEBUFFER, hudFramebuffer );
		gl.viewport(0,0,hudSize,hudSize);
		
		gl.clearColor(0,0,0,0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		draw_ui(this.HUD , 1);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null );
		gl.viewport(0,0,Render.pixelWidth,Render.pixelHeight);
		
		this.h = this.w = 0.038 * gun.spriteSize/512;
		var ammo_screen_frame_id = gun.ammo_screen_frames[GUI.GunSprite.frame] || 0;
		this.asset[0] = Asset.model.ammo_screen.buffers[0][ammo_screen_frame_id];
		
	}
	GUI.GunSprite.addChild(ammo_screen);
	GUI.GunSprite.ammo_screen = ammo_screen;
	
	var crosshair = GUI.Panel(0.5,0.5,0.03,0.03);
	crosshair.align_x = GUI.align_center;
	crosshair.alphaBlended = true;
	crosshair.opacity = 0.5;
	crosshair.align_y = GUI.align_center;
	crosshair.texture = Asset.texture.crosshair;
	crosshair.mouseBlocker = false;
	crosshair.update = function(){
		if(cam.shearPitch){
			var pitch = cam.pitch-1.57;
			if(pitch > 1){
				this.setPosY(0.5 - (pitch -1)*3.7 );
			}else if(pitch < -1){
				this.setPosY(0.5 - (pitch +1)*3.7 );
			}else{
				this.setPosY(0.5);
			}
		}else{
			this.setPosY(0.5);
		}
	}
	
	/*var p1 = GUI.Button(1., 0.78);
	p1.align_y = GUI.align_bottom;
	p1.align_x = GUI.align_right;
	p1.texture = Asset.texture.icons;
	p1.textureRect = GUI.getIconRect(11);
	p1.callback = function(){
		Control.setGameState(Control.gameState_inEditor);
	}
	p1.update = function(){
		this.setVisibility(DEVMODE || EDITORMODE);
	}
	p1.addToGUI(GUI.InGame);*/
	
	GUI.ChatPanel = GUI.InputField(0.05,0.01);
	GUI.ChatPanel.maxLength = 96;
	GUI.ChatPanel.numberOnly = false;
	GUI.ChatPanel.lose_focus_on_click = false;
	GUI.ChatPanel.w = 1.2;
	GUI.ChatPanel.toggle = function(){
		if(this.visible){
			this.setVisibility(false);
		}else{
			this.setVisibility(true);
			GUI.activeInputField = this;
			this.value = "";
			this.emptyField();
		}
	}
	GUI.ChatPanel.cancel = function(){
		this.setVisibility(false);
		GUI.activeInputField = null;
		this.emptyField();
	}
	GUI.ChatPanel.textElem.addChild(GUI.TextElem(-0.052,0,9,"Say:"));
	GUI.ChatPanel.setBoundValue = function(){
		if(this.value.length > 0){
			Net.writeChat(this.value);
		}
		this.cancel();
	}
	GUI.ChatPanel.setVisibility(false);
	
	GUI.HurtPanel = GUI.Panel(0,0,2,1);
	GUI.HurtPanel.opacity = 0;
	GUI.HurtPanel.texture = Asset.texture.white;
	GUI.HurtPanel.mouseBlocker = false;
	GUI.HurtPanel.defaultColor = GUI.textColor_alert;
	GUI.HurtPanel.alphaBlended = true;
	GUI.HurtPanel.update = function(){
		this.opacity *= (1- 0.1*Render.frameDelta);
		this.w = GUI.aspectRatio;
	}
	GUI.HurtPanel.addToGUI(GUI.InGame);
		
	//minimapBorder.addToGUI(GUI.InGame);
	GUI.LeftGunSprite.addToGUI(GUI.InGame);
	GUI.GunSprite.addToGUI(GUI.InGame);
	
	GUI.BottomPanel.addToGUI(GUI.InGame);
	GUI.HintPanel.addToGUI(GUI.InGame);
	GUI.ObjectivePanel.addToGUI(GUI.InGame);
	GUI.BattlePanel.addToGUI(GUI.InGame);
	GUI.DialogPanel.addToGUI(GUI.InGame);
	GUI.ChatPanel.addToGUI(GUI.InGame);
	crosshair.addToGUI(GUI.InGame);
	/*var DEBUG_PANEL = GUI.Panel(0.0,0.0,0.4,0.4);
	DEBUG_PANEL.addToGUI(GUI.InGame);
	DEBUG_PANEL.mouseBlocker = false;
	DEBUG_PANEL.texture = particleVertexTexture;
	//DEBUG_PANEL.texture = terrainTexTable[1][1];*/
	GUI.Elements = GUI.InGame;
	
	GUI.Fade.addToGUI(GUI.InGame);
}

GUI.set_gui_editor = function(){
	if(GUI.Editor){
		GUI.Elements = GUI.Editor;
		return;
	}
	
	var p1 = GUI.Button(0.95, 0.95);
	p1.align_y = GUI.align_bottom;
	p1.align_x = GUI.align_right;
	p1.callback = function(){
		Control.setGameState(Control.gameState_inGame);
	}
	GUI.setEditorButton(p1, 24);
	
	var b_help = GUI.Button(0, 0);
	b_help.callback = GUI.set_gui_Help;
	GUI.setEditorButton(b_help, 27);
	
	var b_undo = GUI.Button(0.14,0);
	GUI.setEditorButton(b_undo,12);
	b_undo.w = 0.07;b_undo.h = 0.04; b_undo.callback = EditorAction.UndoCommand;
	var b_redo = GUI.Button(0.21,0);
	GUI.setEditorButton(b_redo,13);
	b_redo.w = 0.07;b_redo.h = 0.04; b_redo.callback = EditorAction.RedoCommand;
	
	var b_cliff = GUI.Button(0.05,0.45);
	GUI.setEditorButton(b_cliff,1);
	b_cliff.callback = function(){Editor.setBrushMode(Editor.brushMode_Draw);Editor.drawType=Editor.drawType_points;};
	var b_mask = GUI.Button(0.05,0.525);
	GUI.setEditorButton(b_mask, 2);
	b_mask.callback = function(){Editor.setBrushMode(Editor.brushMode_Draw);Editor.drawType=Editor.drawType_cut;};
	var b_mask2 = GUI.Button(0.05,0.6);
	GUI.setEditorButton(b_mask2, 3);
	b_mask2.callback = function(){Editor.setBrushMode(Editor.brushMode_Draw);Editor.drawType=Editor.drawType_hole;};
	
	var b_path1 = GUI.Button(0.1,0.45);
	GUI.setEditorButton(b_path1, 16);
	b_path1.callback = function(){BuilderModel.extrude_selection();};
	var b_path2 = GUI.Button(0.1,0.525);
	GUI.setEditorButton(b_path2, 17);
	b_path2.callback = function(){BuilderModel.split_selection();};
	var b_path3 = GUI.Button(0.1,0.6);
	GUI.setEditorButton(b_path3, 18);
	b_path3.callback = function(){BuilderModel.bridge_selection()};
	
	var b8 = GUI.Button(0.15,0.45);
	b8.callback = function(){BuilderModel.select_segment_edges()};
	b8.callback_right = function(){BuilderModel.select_segment_points()};
	GUI.setEditorButton(b8, 4);
	var b82 = GUI.Button(0.15,0.525);
	GUI.setEditorButton(b82, 19);
	b82.callback = function(){Editor.setBrushMode( Editor.brushMode_TileMaterial);};
	var b_water = GUI.Button(0.15,0.6);
	GUI.setEditorButton(b_water, 5);
	b_water.callback = function(){BuilderModel.merge_selection()};

	/*b_cliff.callback_right = function(){
		this.callback();
		var cliffList = GUI.List(this.x+0.02,this.y, 0.15, 0.);
		cliffList.linkToArray(CliffSet.list, true);
		cliffList.setLinkedParameter = function(obj){
			Editor.cliffSet = obj;
			this.removeFromGUI(GUI.Editor);
		}
		cliffList.addToGUI(GUI.Editor);
	}*/
	
	b82.callback_right = function(){
		this.callback();
		var materialList = GUI.List(this.x+0.02,this.y, 0.15, 0.);
		materialList.linkToArray(TerrainMaterial.list, true);
		materialList.setLinkedParameter = function(obj){
			Editor.tileMaterial = obj;
			this.removeFromGUI(GUI.Editor);
		}
		materialList.addToGUI(GUI.Editor);
	}
	
	var b_save = GUI.Button(0.9,0);
	b_save.h = 0.04;
	GUI.setEditorButton(b_save, 26);
	b_save.align_x = GUI.align_right;
	b_save.callback = function(){M.downloadSavedMap()};
	
	var b_load = GUI.Button(1,0);
	b_load.h = 0.04;
	//GUI.setEditorButton(b_load, 26);
	b_load.align_x = GUI.align_right;
	b_load.callback = function(){
		GUI.Elements = [];
		GUI.remove_menu_tabs();
		GUI.set_gui_customgame('maps');
		var cancelButton = GUI.Button(0.05,0.05);
		GUI.setEditorButton(cancelButton, 24);
		cancelButton.callback = GUI.set_gui_editor;
		cancelButton.addToGUI(GUI.Elements);
	};
	
	
	
	var l1 = GUI.EditorPaletteClass(1,0.05);
	GUI.ObjectList = l1;
	l1.linesOnly = true;
	l1.align_x = GUI.align_right;

	var p2 = GUI.Slider(0.01,0.03, 0.1, 1, 0.03,0.15);
	p2.updateBoundValue = function(){Editor.Set_Grid_Size(this.value);}
	p2.setValue(0.9); p2.updateBoundValue();
	p2.addLabel("Grid Size");
	
	/*var brushOps = GUI.Panel(0.05,0.15,0.01,0.01);
	brushOps.update = function(){
		if(Editor.brushMap == Editor.brushMap_Cliff||Editor.brushMap == Editor.brushMap_Pathing||Editor.brushMode!= Editor.brushMode_Paint){
			this.strenghtSlider.setVisibility(false);
		}else if(Editor.brushMap != Editor.brushMap_Pathing&&Editor.brushMap != Editor.brushMap_Cliff&&Editor.brushMode == Editor.brushMode_Paint){
			this.strenghtSlider.setVisibility(true);
		}
		
		if(Editor.brushMap == Editor.brushMap_Cliff){
			this.cliffLevel.setVisibility(true);
		}else{
			this.cliffLevel.setVisibility(false);
		}
	}
	
	brushOps.strenghtSlider = GUI.Slider(0,0, 1, 50);
	brushOps.strenghtSlider.updateBoundValue = function(){Editor.setBrushStrength(this.value);};
	brushOps.strenghtSlider.setValue(15); brushOps.strenghtSlider.updateBoundValue();
	brushOps.strenghtSlider.addLabel("Brush Strength");
	brushOps.addChild(brushOps.strenghtSlider)
	
	brushOps.cliffLevel = GUI.InputField(0,0.01);
	brushOps.cliffLevel.addLabel('Cliff Level');
	brushOps.cliffLevel.scrollIncrement = 1;
	brushOps.cliffLevel.wholeNumbers = true;
	brushOps.cliffLevel.setBoundValue = function(){
		Editor.cliffLevel = this.value;}
	brushOps.cliffLevel.getBoundValue = function(){
		return Editor.cliffLevel;}
	brushOps.addChild(brushOps.cliffLevel)
	
	brushOps.cliffType = GUI.DropList(0.15,0, CliffSet.list);
	brushOps.cliffType.addLabel('Cliff Type');
	brushOps.cliffType.getBoundValue = function(){return  Editor.cliffSet;}
	brushOps.cliffType.setBoundValue = function(){Editor.cliffSet = this.value;}
	brushOps.cliffLevel.addChild(brushOps.cliffType);
	
	brushOps.cliffBlending = GUI.Checkbox(0.3,0);
	brushOps.cliffBlending.addLabel('Blend Levels');
	brushOps.cliffBlending.getBoundValue = function(){return  Editor.cliffLevelBlending;}
	brushOps.cliffBlending.setBoundValue = function(){Editor.cliffLevelBlending = this.value;}
	brushOps.cliffLevel.addChild(brushOps.cliffBlending);*/
	
	var b_env = GUI.Button(0.2,0.6);
	b_env.callback = GUI.set_gui_Environment;
	GUI.setEditorButton(b_env, 20);
	var b_map = GUI.Button(0.2,0.525);
	b_map.callback = GUI.set_gui_MapData;
	GUI.setEditorButton(b_map, 7);
	var b_trig = GUI.Button(0.2,0.45);
	b_trig.callback = GUI.set_gui_Triggers;
	GUI.setEditorButton(b_trig, 6);
	

	GUI.Editor = [ b_undo, b_redo, p1, b_cliff ,b_path1,b_path2,b_path3,b8,b82,b_mask,b_mask2,b_water,b_env,b_map,b_trig, b_save,b_load];
	p2.addToGUI(GUI.Editor);
	//brushOps.addToGUI(GUI.Editor);
	l1.addToGUI(GUI.Editor);
	
	
	var input_brightness = GUI.InputField(0.02,0.18);
	input_brightness.scrollIncrement = 16;
	input_brightness.minValue = 0;
	input_brightness.maxValue = 512;
	input_brightness.addLabel("Brightness");
	input_brightness.getBoundValue = function(){
		if(Editor.selected.length > 0 && Editor.selected[0].linkedModel && Editor.selected[0].type == 2){
			return Editor.selected[0].linkedObject.brightness;
		}return 0;
	}
	input_brightness.setBoundValue = function( delta ){
		for(var i=0;i<Editor.selected.length;++i){
			if(Editor.selected[i].linkedModel && Editor.selected[i].type == 2){
				if(delta){
					Editor.selected[i].linkedObject.brightness += delta;
					Editor.selected[i].linkedObject.brightness = Math.max(0,Editor.selected[i].linkedObject.brightness);
				}else{
					Editor.selected[i].linkedObject.brightness = this.value;
				}
				Editor.selected[i].linkedModel.needs_update = true;
			}
		}
	};
	input_brightness.addToGUI(GUI.Editor);
	
	var input_strobe_strength = GUI.InputField(0.11,0.18);
	input_strobe_strength.scrollIncrement = 16;
	input_strobe_strength.minValue = 0;
	input_strobe_strength.maxValue = 255;
	input_strobe_strength.addLabel("Strobe");
	input_strobe_strength.getBoundValue = function(){
		if(Editor.selected.length > 0 && Editor.selected[0].linkedModel && Editor.selected[0].type == 2){
			return Editor.selected[0].linkedObject.strobe_strength;
		}return 0;
	}
	input_strobe_strength.setBoundValue = function(){
		for(var i=0;i<Editor.selected.length;++i){
			if(Editor.selected[i].linkedModel && Editor.selected[i].type == 2){
				Editor.selected[i].linkedObject.strobe_strength = this.value;
				Editor.selected[i].linkedModel.needs_update = true;
			}
		}
	};
	input_strobe_strength.addToGUI(GUI.Editor);
	
	var input_strobe_type = GUI.InputField(0.2,0.18);
	input_strobe_type.scrollIncrement = 1;
	input_strobe_type.minValue = 0;
	input_strobe_type.maxValue = 255;
	input_strobe_type.addLabel("Type");
	input_strobe_type.getBoundValue = function(){
		if(Editor.selected.length > 0 && Editor.selected[0].linkedModel && Editor.selected[0].type == 2){
			return Editor.selected[0].linkedObject.strobe_type;
		}return 0;
	}
	input_strobe_type.setBoundValue = function(){
		for(var i=0;i<Editor.selected.length;++i){
			if(Editor.selected[i].linkedModel && Editor.selected[i].type == 2){
				Editor.selected[i].linkedObject.strobe_type = this.value;
				Editor.selected[i].linkedModel.needs_update = true;
			}
		}
	};
	input_strobe_type.addToGUI(GUI.Editor);
	
	var input_tex_x = GUI.InputField(0.02,0.25);
	input_tex_x.addLabel("tex_x");
	input_tex_x.getBoundValue = function(){
		if(Editor.selected.length > 0 && Editor.selected[0].linkedModel && Editor.selected[0].type >= 1){
			return Editor.selected[0].linkedObject.tex_offX;
		}return 0;
	}
	input_tex_x.setBoundValue = function(delta){
		for(var i=0;i<Editor.selected.length;++i){
			if(Editor.selected[i].linkedModel && Editor.selected[i].type >= 1){
				if(delta){Editor.selected[i].linkedObject.tex_offX += delta;
				}else{Editor.selected[i].linkedObject.tex_offX = this.value;}
				Editor.selected[i].linkedModel.needs_update = true;
			}
		}
	};
	input_tex_x.addToGUI(GUI.Editor);
	
	var input_tex_y = GUI.InputField(0.11,0.25);
	input_tex_y.addLabel("tex_y");
	input_tex_y.getBoundValue = function(){
		if(Editor.selected.length > 0 && Editor.selected[0].linkedModel && Editor.selected[0].type >= 1){
			return Editor.selected[0].linkedObject.tex_offY;
		}return 0;
	}
	input_tex_y.setBoundValue = function(delta){
		for(var i=0;i<Editor.selected.length;++i){
			if(Editor.selected[i].linkedModel && Editor.selected[i].type >= 1){
				if(delta){Editor.selected[i].linkedObject.tex_offY += delta;
				}else{Editor.selected[i].linkedObject.tex_offY = this.value;}
				Editor.selected[i].linkedModel.needs_update = true;
			}
		}
	};
	input_tex_y.addToGUI(GUI.Editor);
	
	var input_top_x = GUI.InputField(0.02,0.32);
	input_top_x.addLabel("top_x");
	input_top_x.getBoundValue = function(){
		if(Editor.selected.length > 0 && Editor.selected[0].linkedModel && Editor.selected[0].type >= 1){
			return Editor.selected[0].linkedObject.top_offX;
		}return 0;
	}
	input_top_x.setBoundValue = function(delta){
		for(var i=0;i<Editor.selected.length;++i){
			if(Editor.selected[i].linkedModel && Editor.selected[i].type >= 1){
				if(delta){Editor.selected[i].linkedObject.top_offX += delta;
				}else{Editor.selected[i].linkedObject.top_offX = this.value;}
				Editor.selected[i].linkedModel.needs_update = true;
			}
		}
	};
	input_top_x.addToGUI(GUI.Editor);
	
	var input_top_y = GUI.InputField(0.11,0.32);
	input_top_y.addLabel("top_y");
	input_top_y.getBoundValue = function(){
		if(Editor.selected.length > 0 && Editor.selected[0].linkedModel && Editor.selected[0].type >= 1){
			return Editor.selected[0].linkedObject.top_offY;
		}return 0;
	}
	input_top_y.setBoundValue = function(delta){
		for(var i=0;i<Editor.selected.length;++i){
			if(Editor.selected[i].linkedModel && Editor.selected[i].type >= 1){
				if(delta){Editor.selected[i].linkedObject.top_offY += delta;
				}else{Editor.selected[i].linkedObject.top_offY = this.value;}
				Editor.selected[i].linkedModel.needs_update = true;
			}
		}
	};
	input_top_y.addToGUI(GUI.Editor);
	
	var input_tag = GUI.InputField(0.02,0.39);
	input_tag.addLabel("tag");
	input_tag.scrollIncrement = 1;
	input_tag.minValue = 0;
	input_tag.maxValue = 255;
	input_tag.getBoundValue = function(){
		if(Editor.selected.length > 0 && Editor.selected[0].linkedModel && Editor.selected[0].type >= 1){
			return Editor.selected[0].linkedObject.value;
		}return 0;
	}
	input_tag.setBoundValue = function(delta){
		this.value = Math.round(this.value);
		for(var i=0;i<Editor.selected.length;++i){
			if(Editor.selected[i].linkedModel && Editor.selected[i].type >= 1){
				Editor.selected[i].linkedObject.tag = this.value;
				Editor.selected[i].linkedModel.needs_update = true;
			}
		}
	};
	var tag_btn = GUI.Button(0.1,0);
	tag_btn.h = 0.02;
	tag_btn.addLabel("Auto");
	tag_btn.callback = function(){
		var new_tag = NavSector.get_first_unused();
		for(var i=0;i<Editor.selected.length;++i){
			if(Editor.selected[i].linkedModel && Editor.selected[i].type >= 1){
				Editor.selected[i].linkedObject.tag = new_tag;
				Editor.selected[i].linkedModel.needs_update = true;
			}
		}
	}
	input_tag.addChild(tag_btn);
	input_tag.addToGUI(GUI.Editor);
	
	GUI.Minimap = GUI.MinimapClass(0.12,0.98-0.15,0.3,0.3);
	GUI.Minimap.align_y = GUI.align_center;
	GUI.Minimap.align_x = GUI.align_center;
	var minimapCursor = GUI.Panel(0,0,0.003,0.003);
	minimapCursor.texture =Asset.texture.white;
	minimapCursor.asset = GUI.asset_rectCenter;
	GUI.Minimap.addChild(minimapCursor);
	minimapCursor.update = function(){
		this.setPos(this.parent.w * Control.terrainCursorPos[0]/64,
		this.parent.h*(1-Control.terrainCursorPos[1]/64))
	}
	GUI.Minimap.addToGUI(GUI.Editor);
	
	var b_tex_table = GUI.Panel(0,0.07);
	var b_tex_op_names = ["Floor","Ceil","Bot","Top","Mid"];
	b_tex_table.buttons = [];
	for(var i=0;i<5;++i){
		var b_tex = GUI.Button(0.01 + i*0.071,0.01);
		b_tex.texture_operation = i+1;
		b_tex.callback = function(){GUI.TextureTable.setVisibility(true);GUI.TextureTable.texture_operation = this.texture_operation;}
		b_tex.update = function(){
			if(GUI.TextureTable.visible && GUI.TextureTable.texture_operation == this.texture_operation){
				this.color = GUI.color_mouseOver;
			}else{
				this.color = GUI.textColor_white;
			}
		}
		b_tex.addLabel(b_tex_op_names[i], 0.01);
		b_tex_table.buttons.push(b_tex);
		b_tex_table.addChild(b_tex);
	}
	b_tex_table.addToGUI(GUI.Editor);
 
	b_tex_table.update = function(){ //update the textures of the 5 tex buttons
		if(BuilderModel.ACTIVE){
			for(var i=0;i<Editor.selected.length;++i){
				var o = Editor.selected[i];
				if(!o.linkedObject){continue;}
				if(o.type == 1){
					this.buttons[2].texture = Asset.MATERIALS[o.linkedObject.bottomMat]||Asset.texture.black;
					this.buttons[3].texture = Asset.MATERIALS[o.linkedObject.topMat]||Asset.texture.black;
					if(o.linkedObject.middleMat){
						this.buttons[4].texture = Asset.MATERIALS[o.linkedObject.middleMat]||Asset.texture.black;
					}
				}else if(o.type == 2){
					this.buttons[0].texture = Asset.MATERIALS[o.linkedObject.floorMat]||Asset.texture.black;
					this.buttons[1].texture = Asset.MATERIALS[o.linkedObject.ceilingMat]||Asset.texture.black;
				}
			}
		}
	}
	
	GUI.TextureTable = GUI.TextureTableClass(0.01,0.12);
	GUI.TextureTable.addToGUI(GUI.Editor);
	GUI.TextureTable.setVisibility(false);
	
	GUI.ScrollCompass = GUI.Panel(0.5,0.5,0.05,0.05);
	GUI.ScrollCompass.asset = GUI.asset_rectCenter;
	GUI.ScrollCompass.addToGUI(GUI.Editor);
	GUI.ScrollCompass.mouseBlocker = false;
	GUI.ScrollCompass.textureRect = GUI.textureRect_compass;
	GUI.ScrollCompass.texture = Asset.texture.gui;
	GUI.ScrollCompass.alphaBlended = true;
	GUI.ScrollCompass.opacity = 0.5;
	
	GUI.EditorParamsPanel.addToGUI(GUI.Editor);
	
	GUI.Elements = GUI.Editor;
}

GUI.set_gui_Environment = function(){
	var b_back = GUI.Button(0.9,0.9);
	GUI.setEditorButton(b_back, 24);
	b_back.callback = function(){GUI.Elements = GUI.Editor;}
	
	GUI.Environment = [b_back];
	GUI.ColorSliderPanel(0.02,0.05, 0, 2, Environment.lightColor,"Light Color").addToGUI(GUI.Environment);
	GUI.ColorSliderPanel(0.02,0.2, 0, 1, Environment.fillColor,"Fill Color").addToGUI(GUI.Environment);
	var slider_fill1 = GUI.Slider(0.02,0.3, 0, 6.28, 0.03);
	slider_fill1.updateBoundValue = function(){Environment.setAzimuth(Environment.fillPosition, this.value);};
	slider_fill1.addLabel("Fill Azimuth",0.03);
	slider_fill1.addToGUI(GUI.Environment);
	
	var slider_fill2 = GUI.Slider(0.02,0.34, 0, 3.14, 0.03);
	slider_fill2.updateBoundValue = function(){Environment.setElevation(Environment.fillPosition, this.value);};
	slider_fill2.addLabel("Fill Elevation",0.03);
	slider_fill2.addToGUI(GUI.Environment);
	
	GUI.ColorSliderPanel(0.02,0.4, 0, 1, Environment.ambientColor,"Ambient Color" ).addToGUI(GUI.Environment);
	GUI.ColorSliderPanel(0.3,0.05, 0, 1, Environment.fogZColor,"Height Fog Color" ).addToGUI(GUI.Environment);
	var slider_fogZstart = GUI.Slider(0.3, 0.19, 0, 6, 0.03);
	slider_fogZstart.updateBoundValue = function(){Environment.fogZStart = this.value-4;};
	slider_fogZstart.addLabel("Height fog start",0.03);
	slider_fogZstart.addToGUI(GUI.Environment);
	var slider_fogZlength = GUI.Slider(0.3, 0.23, 0, 6, 0.03);
	slider_fogZlength.updateBoundValue = function(){Environment.fogZLength = this.value+1;};
	slider_fogZlength.addLabel("Height fog width",0.03);
	slider_fogZlength.addToGUI(GUI.Environment);
	var slider_fogZConsistency = GUI.Slider(0.3, 0.27, 0, 33, 0.03);
	slider_fogZConsistency.updateBoundValue = function(){Environment.fogZConsistency = this.value+1;};
	slider_fogZConsistency.addLabel("Height fog consistency",0.03);
	slider_fogZConsistency.addToGUI(GUI.Environment);
	
	GUI.ColorSliderPanel(0.6,0.05, 0, 1, Environment.fogColor,"Fog Color" ).addToGUI(GUI.Environment);
	var slider_fogStart= GUI.Slider(0.6, 0.15, 10, 80, 0.03);
	slider_fogStart.updateBoundValue = function(){Environment.fogStart_ref = this.value;};
	slider_fogStart.addLabel("Fog start",0.03);
	slider_fogStart.addToGUI(GUI.Environment);
	var slider_fogLength = GUI.Slider(0.6, 0.19, 10, 80, 0.03);
	slider_fogLength.updateBoundValue = function(){Environment.fogLength = this.value;};
	slider_fogLength.addLabel("Fog width",0.03);
	slider_fogLength.addToGUI(GUI.Environment);
	
	var slider_wind = GUI.Slider(0.6, 0.26, 0, 2, 0.03);
	slider_wind.updateBoundValue = function(){Environment.windStrength_ref = Environment.windStrength = this.value;};
	slider_wind.addLabel("Wind strength",0.03);
	slider_wind.addToGUI(GUI.Environment);
	
	GUI.ColorSliderPanel(0.6,0.33, 0, 2, Environment.skyColor, "Sky Color").addToGUI(GUI.Environment);
	GUI.ColorSliderPanel(0.6,0.45, 0, 2, Environment.cloudColor, "Cloud Color").addToGUI(GUI.Environment);
	
	var rainBox = GUI.Checkbox(0.6,0.6);
	rainBox.addLabel("Rain");
	rainBox.setBoundValue = function(){
		Environment.raining = this.value;
	}
	rainBox.getBoundValue = function(){
		return Environment.raining;
	}
	rainBox.addToGUI(GUI.Environment);
	
	
	GUI.Elements = GUI.Environment;
}

GUI.set_gui_MapData = function(){
	var b_back = GUI.Button(0.9,0.9);
	GUI.setEditorButton(b_back, 24);
	b_back.callback = function(){GUI.Elements = GUI.Editor;}

	GUI.Elements = [b_back];
	
	var nameField = GUI.InputField(0.1,0.1);
	nameField.w = 0.3;
	nameField.addLabel("Map name");
	nameField.maxLength = 50;
	nameField.numberOnly = false;
	nameField.getBoundValue = function(){return M.name || "No name";}
	nameField.setBoundValue = function(){M.name = this.value};
	nameField.addToGUI(GUI.Elements);
	
	
	var musicField = GUI.DropList(0.1,0.2,Music.Tracks);
	musicField.addLabel("Music");
	musicField.w = 0.2;
	musicField.getBoundValue = function(){return  Music.Tracks[M.musicId];}
	musicField.setBoundValue = function(){
		M.musicId = Music.Tracks.indexOf(this.value);
		Music.ChangeTrack(M.musicId);
	};
	musicField.addToGUI(GUI.Elements);
	
	var boundTop = GUI.InputField(0.4,0.1);
	boundTop.addLabel("Top");
	boundTop.maxValue = 2048;
	boundTop.getBoundValue = function(){return M.cam_bound_top;}
	boundTop.setBoundValue = function(){M.cam_bound_top = this.value};
	var boundBottom = GUI.InputField(0.55,0.1);
	boundBottom.addLabel("Bottom");
	boundBottom.maxValue = 2048;
	boundBottom.getBoundValue = function(){return M.cam_bound_bottom;}
	boundBottom.setBoundValue = function(){M.cam_bound_bottom = this.value};
	var boundLeft = GUI.InputField(0.4,0.2);
	boundLeft.addLabel("Left");
	boundLeft.maxValue = 2048;
	boundLeft.getBoundValue = function(){return M.cam_bound_left;}
	boundLeft.setBoundValue = function(){M.cam_bound_left = this.value};
	var boundRight = GUI.InputField(0.55,0.2);
	boundRight.addLabel("Right");
	boundRight.maxValue = 2048;
	boundRight.getBoundValue = function(){return M.cam_bound_right;}
	boundRight.setBoundValue = function(){M.cam_bound_right = this.value};
	
	var playerCountInput = GUI.InputField(0.1,0.3);
	playerCountInput.addLabel("Melee Players");
	playerCountInput.maxValue = 8; playerCountInput.minValue = 1;
	playerCountInput.getBoundValue = function(){return M.meleePlayers;}
	playerCountInput.setBoundValue = function(){M.meleePlayers = this.value};
	
	var meleeCheckbox = GUI.Checkbox(0.25,0.3);
	meleeCheckbox.addLabel("Is Melee");
	meleeCheckbox.getBoundValue = function(){return M.isMelee;}
	meleeCheckbox.setBoundValue = function(){M.isMelee = this.value};
	
	boundTop.addToGUI(GUI.Elements);
	boundBottom.addToGUI(GUI.Elements);
	boundLeft.addToGUI(GUI.Elements);
	boundRight.addToGUI(GUI.Elements);
	playerCountInput.addToGUI(GUI.Elements);
	meleeCheckbox.addToGUI(GUI.Elements);
	
	GUI.TexGroupHSLPanel(0.05,0.6,TexGroup.sand,"Sand HSL" ).addToGUI(GUI.Elements);
	GUI.TexGroupHSLPanel(0.35,0.6,TexGroup.vegetation,"Panel HSL" ).addToGUI(GUI.Elements);
	GUI.TexGroupHSLPanel(0.65,0.6,TexGroup.rock,"Rock HSL" ).addToGUI(GUI.Elements);
	GUI.TexGroupHSLPanel(0.05,0.75,TexGroup.concrete,"Concrete HSL" ).addToGUI(GUI.Elements);
	GUI.TexGroupHSLPanel(0.35,0.75,TexGroup.dirt,"Dirt HSL" ).addToGUI(GUI.Elements);

}
GUI.set_gui_Help = function(){
	var b_back = GUI.Button(0.9,0.9);
	GUI.setEditorButton(b_back, 24);
	b_back.callback = function(){GUI.Elements = GUI.Editor;}
	var p = GUI.Panel(0.0,0.0,1,1);
	p.texture = Asset.texture.editor_tutorial;
	GUI.Elements = [b_back,p];
}

GUI.set_gui_Triggers = function(){
	var b_back = GUI.Button(0.9,0.9);
	GUI.setEditorButton(b_back, 24);
	b_back.callback = function(){GUI.Elements = GUI.Editor;}
	GUI.Triggers = [b_back];
	var p = GUI.Panel(0.02,0.02,1,0.8);
	GUI.TriggerPanel = p;
	
	p.nameField = GUI.InputField(0.05,0.);
	p.nameField.numberOnly = false;
	p.nameField.defaultValue = "_";
	p.nameField.w = 0.4;
	p.nameField.h = 0.05;
	p.nameField.setFontSize(12);
	p.nameField.maxLength = 100;
	p.nameField.setBoundValue = function(){
		Trigger.selectedTrigger.name = this.value;
		GUI.TriggerList.selectedEntry.updateText();
	}
	p.nameField.getBoundValue = function(){
		return Trigger.selectedTrigger.name;
	}
	p.nameField.activationCondition = function(){
		return Trigger.selectedTrigger != null;
	}
	
	p.addChild(p.nameField);
	p.addChild(GUI.TextElem(0.05, 0.05, 12, "Condition:"));
	p.addChild(GUI.TextElem(0.05, 0.25, 12, "Actions:"));
	p.condList = GUI.List(0.9,0.1, 0.3, 0.);
	p.condList.linkToArray(Trigger.Conditions, true);
	p.condList.setLinkedParameter = function(obj){
		if(Trigger.selectedTrigger != null){
			Trigger.selectedTrigger.setCondition(obj);
			GUI.TriggerParamPanelClass.Rebuild_ConditionPanel();
		}
	}
	p.addChild(p.condList);
	p.condList.setVisibility(false);
	
	p.condButton = GUI.Button(0.8,0.02);
	GUI.setEditorButton(p.condButton, 21);
	p.condButton.callback = function(){
		this.parent.condList.setVisibility(!this.parent.condList.visible );
	}
	p.addChild(p.condButton);
	
	p.condCopyButton = GUI.Button(0.9,0.01);
	GUI.setEditorButton(p.condCopyButton, 30);
	p.condCopyButton.callback = function(){
		if(Trigger.selectedTrigger){
			//can use stringify to make a deep copy of nested arrays in enableParam (.slice would only clone the top array)
			Trigger.conditionClipboard = [Trigger.selectedTrigger.enableCondition, JSON.stringify( Trigger.selectedTrigger.enableParam ) ];
		}
		
	}
	p.condCopyButton.callback_right = function(){
		if(Trigger.conditionClipboard && Trigger.selectedTrigger){
			Trigger.selectedTrigger.enableCondition = Trigger.conditionClipboard[0]
			Trigger.selectedTrigger.enableParam = JSON.parse(Trigger.conditionClipboard[1]); 
			GUI.TriggerParamPanelClass.Rebuild_ConditionPanel();
		}
	}
	p.addChild(p.condCopyButton);
	
	p.conditionText = GUI.TextElem(0.05, 0.1, 9, "_");
	p.addChild(p.conditionText);
	
	p.actButton = GUI.Button(0.8,0.35);
	GUI.setEditorButton(p.actButton, 22);
	p.actButton.callback = function(){
		this.parent.actList.setVisibility(!this.parent.actList.visible );
	}
	p.addChild(p.actButton);
	
	//list of all action types
	p.actList = GUI.List(0.9,0.35, 0.3, 0.);
	p.actList.linkToArray(Trigger.Actions, true);
	p.actList.setLinkedParameter = function(obj){
		if(Trigger.selectedTrigger != null){
			//clicked action type gets added to action list of selected trigger
			Trigger.selectedTrigger.addAction(obj);
			GUI.selectedTriggerActionList.updateList( Trigger.selectedTrigger.actions, false);
		}
	}
	p.addChild(p.actList);
	p.actList.setVisibility(false);
	
	//list of actions executed by currently selected trigger
	p.actList_current = GUI.List(0.,0.3, 0.6, 0.);
	p.actList_current.entryTextGetter = function(object){
		//display generated triggerAction description
		var description = TriggerAction.getById(object[0]).getText(object[1]);
		if(object[2] != 0){
			description += " |del:" + object[2];
		}
		return description;
	}
	p.actList_current.alwaysUpdateSelectedText = true;
	p.actList_current.linkToArray([], true);
	p.actList_current.setLinkedParameter = function(obj){
		if(Trigger.selectedTrigger != null){
			Trigger.selectedTrigger.selectedAction = obj;
			GUI.TriggerParamPanelClass.Rebuild_ActionPanel();
		}
	}
	p.addChild(p.actList_current);
	GUI.selectedTriggerActionList = p.actList_current;
	
	p.actionDeleteButton = GUI.Button(0.8,0.6);
	GUI.setEditorButton(p.actionDeleteButton, 23);
	p.actionDeleteButton.callback = function(){
		if(Trigger.selectedTrigger != null){
			if(Trigger.selectedTrigger.selectedAction != null){
				//remove selected action from the action list of the trigger
				Trigger.selectedTrigger.actions.splice(
				Trigger.selectedTrigger.actions.indexOf(Trigger.selectedTrigger.selectedAction), 1);
				GUI.selectedTriggerActionList.updateList( Trigger.selectedTrigger.actions, false);
			}
		}
	}
	p.addChild(p.actionDeleteButton);
	
	p.actionSortButton = GUI.Button(0.8,0.5);
	GUI.setEditorButton(p.actionSortButton, 29);
	p.actionSortButton.callback = function(){
		if(Trigger.selectedTrigger != null){
			Trigger.selectedTrigger.sortActions();
			GUI.selectedTriggerActionList.updateList( Trigger.selectedTrigger.actions, false);
		}
	}
	p.addChild(p.actionSortButton);
	
	/*p.eventCheckbox = GUI.Checkbox(0.8,0.01);
	p.eventCheckbox.addLabel("Area Event");
	p.eventCheckbox.setBoundValue = function(){
		Trigger.selectedTrigger.needsAreaEvent = this.value;
	}
	p.eventCheckbox.getBoundValue = function(){
		return Trigger.selectedTrigger.needsAreaEvent;
	}
	p.eventCheckbox.activationCondition = function(){
		return Trigger.selectedTrigger != null;
	}
	p.addChild(p.eventCheckbox);*/
	
	p.update = function(){
		if(Trigger.selectedTrigger != null){
			this.conditionText.setText(Trigger.selectedTrigger.getConditionText());
			this.nameField.textElem.color = Trigger.selectedTrigger.color;
		}
	}
	p.addToGUI(GUI.Triggers);
	
	
	var list = GUI.List(0.,0., 0.3, 0.);
	GUI.TriggerList = list;
	list.align_x = GUI.align_right;
	list.setPos(1,0);
	list.linesOnly = true;
	list.linkToArray(Trigger.list, true);
	list.setLinkedParameter = function(obj){
		Trigger.selectedTrigger = obj;
		Trigger.selectedTrigger.selectedAction = null;
		GUI.TriggerParamPanelClass.Rebuild_ConditionPanel();
		GUI.TriggerParamPanelClass.Rebuild_ActionPanel();
		GUI.selectedTriggerActionList.linkToArray( Trigger.selectedTrigger.actions, false);
	}
	list.addToGUI(GUI.Triggers);
	list.update = function(){
		for(var i=0;i<this.Entries.length;++i){
			this.Entries[i].texture = Asset.texture.white;
			this.Entries[i].color = this.Entries[i].linkedObject.color;
		}
	}
	
	GUI.Elements = GUI.Triggers;
}

GUI.set_gui_menu = function(){
	GUI.Elements = [];
	
	if(!M.isMenu){
		
	}else{
		var bg = GUI.Panel(0,-0,1.8,1.8);
		bg.texture = Asset.texture.menu;
		bg.update = function(){
			this.setPosY_smooth(-0.8,0.0016);
		}
		bg.addToGUI(GUI.Elements);
		GUI.TextElem(0.01,0.975,9,game_version).addToGUI(GUI.Elements);
	}
	
	var titleGroup  = GUI.Panel(1,0.02,0,0);
	titleGroup.align_x = GUI.align_right;
	var title = GUI.Panel(-0.36,0.,0.6,0.3);
	title.asset = GUI.asset_rectCenterX;
	title.texture = Asset.texture.logo;
	title.alphaBlended = true;

	var subtitle = GUI.TextElem(0.,0.8,12,"A game by Borington",GUI.align_center);
	
	subtitle.defaultColor = GUI.textColor_darkred;
	title.addChild(subtitle);
	
	var bg_menu = GUI.Panel(1,0,1,1);
	bg_menu.texture= Asset.texture.menu_overlay;
	bg_menu.align_x = GUI.align_right;
	bg_menu.alphaBlended = true;
	bg_menu.mouseBlocker = false;
	bg_menu.addToGUI(GUI.Elements);
	
	var buttX = -0.22;
	var buttY = 0.3;
	if(!DESKTOP_VERSION){
		if(M.isMenu){
			var b1 = GUI.MenuButton(buttX,buttY, "Start Game");
			b1.callback = function(){GUI.set_gui_story(0)};
			var b2 = GUI.MenuButton(buttX,buttY+.1, "Select Level");
			b2.callback = GUI.set_gui_newGame;
			var b3 = GUI.MenuButton(buttX,buttY+.4, "Developer");
			b3.callback = callback_borington;
			title.addChild(b3);
		}else{
			var b1 = GUI.MenuButton(buttX,buttY, "Resume Game");
			b1.callback = function(){Control.Set_Pause_Game(false)};
			var b2 = GUI.MenuButton(buttX,buttY + .1, "Restart Game");
			b2.callback = Gamestats.RestartMap;
			var b_exit = GUI.MenuButton(buttX,buttY+.4, "Quit Game");
			b_exit.callback = function(){GUI.set_gui_quit(1)};
			title.addChild(b_exit);
		}
		title.addChild(b1);
		title.addChild(b2);
		
		if(game_portal != "gd"){
			if(game_portal == "crazy"){
				var b4 = GUI.MenuButton(buttX,buttY+.3, "More Games");
				b4.callback = callback_portal;
			}else{
				var b4 = GUI.MenuButton(buttX,buttY+.3, "More Delilah");
				b4.callback = callback_steam;
			}
			title.addChild(b4);
		}
		var b5 = GUI.MenuButton(buttX,buttY+.2, "Options");
		b5.callback = GUI.set_gui_options;
		
		title.addChild(b5);
		
		b_steam = GUI.Button(0.01,0.14);
		b_steam.h = b_steam.w = 0.1;
		b_steam.callback = callback_steam;
		b_steam.texture = Asset.texture.steam;
		b_steam.alphaBlended = true;
		b_steam.addChild(GUI.TextElem(0.12,0.01,15,"Wishlist Delilah\non Steam!"));
		b_steam.mouseOverColor = GUI.color_mouseOver;
		b_steam.addToGUI(GUI.Elements);
		
		b_discord = GUI.Button(0.01,0.27);
		b_discord.h = b_discord.w = 0.1;
		b_discord.callback = callback_discord;
		b_discord.texture = Asset.texture.discord;
		b_discord.alphaBlended = true;
		b_discord.addChild(GUI.TextElem(0.12,0.01,15,"Join the\ncommunity!"));
		b_discord.mouseOverColor = GUI.color_mouseOver;
		b_discord.addToGUI(GUI.Elements);
	
	}else{
		if(M.isMenu){
			var b1 = GUI.MenuButton(buttX,0.23, "Start Game");
			b1.callback = GUI.set_gui_newGame;
			//b1.callback = function(){GUI.set_gui_story(0)};
			var b4 = GUI.MenuButton(buttX,0.33, "COMING SOON");
			b4.callback = GUI.set_gui_load;
			var b2 = GUI.MenuButton(buttX,0.43, "Skirmish");
			b2.callback = GUI.set_gui_skirmish;
			var b3 = GUI.MenuButton(buttX,0.53, "Options");
			b3.callback = GUI.set_gui_options;
			var b5 = GUI.MenuButton(buttX,0.63, "Map Editor");
			b5.callback =  GUI.set_gui_creator;
			var b6 = GUI.MenuButton(buttX,0.73, "Exit Game");
			b6.callback = function(){GUI.set_gui_quit(0)};
		}else{
			var b1 = GUI.MenuButton(buttX,0.23, "Resume Game");
			b1.callback = function(){Control.Set_Pause_Game(false)};
			var b2 = GUI.MenuButton(buttX,0.33, "COMING SOON");
			b2.callback = function(){
				GUI.Alert("Game Saved");
				Gamestats.SaveGame(true);
				};
			var b3 = GUI.MenuButton(buttX,0.43, "COMING SOON");
			b3.callback = GUI.set_gui_load;
			var b4 = GUI.MenuButton(buttX,0.53, "Options");
			b4.callback = GUI.set_gui_options;
			var b5 = GUI.MenuButton(buttX,0.63, "Quit to Menu");
			b5.callback = function(){GUI.set_gui_quit(1)};
			var b6 = GUI.MenuButton(buttX,0.73, "Restart Map");
			b6.callback = Gamestats.RestartMap;
		}
		
		title.addChild(b1);
		title.addChild(b2);
		title.addChild(b3);
		title.addChild(b4);
		title.addChild(b5);
		title.addChild(b6);
	}
		
	if(!DESKTOP_VERSION && (game_portal == "crazy")){
		var logo = GUI.Button(0.01,0.3);
		logo.w *= 8;
		logo.h*=0.8;logo.w*=0.8;
		logo.alphaBlended = true;
		logo.texture = Asset.texture.logo_portal;
		logo.addToGUI(GUI.Elements);
		logo.mouseOverColor = GUI.color_mouseOver;
		logo.callback = callback_portal;
	}
	GUI.TextElem(0.01,0.01,12,"This game is a preview of my\nupcoming project called Delilah.\nIt was made for Halloween 2022.").addToGUI(GUI.Elements);
	titleGroup.addChild(title);
	titleGroup.addToGUI(GUI.Elements);
	GUI.Fade.addToGUI(GUI.Elements);
}

GUI.set_gui_network = function(){
	if(GUI.NetPanel){
		GUI.NetPanel.removeFromGUI(GUI.Elements);
		GUI.NetPanel = null;
		return;
	}else{
		GUI.remove_menu_tabs();
	}
	
	GUI.NetPanel = GUI.BlackPanel(0.1,0.1,0.8,0.8);
	GUI.NetPanel.addChild(GUI.TextElem(0.1,0.1,12,"Your LAN IP: "+Net.localIP));
	
	var input_ip = GUI.InputField(0.08,0.2);
	input_ip.maxLength = 32;
	input_ip.w = 0.4;
	input_ip.addLabel("Connect to IP address:")
	input_ip.numberOnly = false;
	input_ip.getBoundValue = function(){
		return Net.serverIP;
	}
	input_ip.setBoundValue = function(){
		Net.serverIP = this.value;
	}
	
	GUI.NetPanel.addChild(input_ip);
	
	var input_port = GUI.InputField(0.5,0.2);
	input_port.maxLength = 8;
	input_port.w = 0.2;
	input_port.addLabel("Server port:")
	input_port.numberOnly = true;
	input_port.maxValue = 99999999;
	input_port.minValue = 0;
	input_port.getBoundValue = function(){
		return Net.serverPort;
	}
	input_port.setBoundValue = function(){
		Net.serverPort = this.value;
	}
	GUI.NetPanel.addChild(input_port);
	
	var joinButton = GUI.MenuButton(0.4,0.25,"Connect to IP");
	joinButton.align_x = GUI.align_center;
	joinButton.callback = function(){
		if(Net.isClient){
			GUI.Alert("You are already listening to a server");
		}else if(Net.isServer){
			GUI.Alert("You are already hosting a game");
		}else{
			Net.makeClient(Net.serverIP);
			GUI.Alert("Looking for server...");
		}
	}
	GUI.NetPanel.addChild(joinButton);
	
	
	var input_port2 = GUI.InputField(0.3,0.4);
	input_port2.maxLength = 8;
	input_port2.w = 0.2;
	input_port2.addLabel("Server port:")
	input_port2.numberOnly = true;
	input_port2.maxValue = input_port.maxValue;
	input_port2.minValue = input_port.minValue;
	input_port2.getBoundValue = input_port.getBoundValue;
	input_port2.setBoundValue = input_port.setBoundValue;
	GUI.NetPanel.addChild(input_port2);
	
	var createButton = GUI.MenuButton(0.4,0.45,"Create Server");
	createButton.align_x = GUI.align_center;
	createButton.callback = function(){
		if(Net.isClient){
			GUI.Alert("You are already listening to a server");
		}else if(Net.isServer){
			GUI.Alert("You are already hosting a game");
		}else{
			Net.makeServer();
			Control.Set_Pause_Game(false);
			GUI.Alert("Creating server...");
		}
	}
	GUI.NetPanel.addChild(createButton);
	
	var quitButton = GUI.MenuButton(0.4,0.55,"Disconnect");
	quitButton.align_x = GUI.align_center;
	quitButton.callback = function(){
		if(!Net.online){
			GUI.Alert("You are not connected");
		}else{
			Net.quit();
		}
	}
	GUI.NetPanel.addChild(quitButton);
	GUI.NetPanel.addChild(GUI.TextElem(0.1,0.65,9,
	"Note: you can only connect to an IP if\nit's already waiting for clients!\nYour server is not visible outside your local\nnetwork without port forwarding/tunneling."));
	
	GUI.NetPanel.addToGUI(GUI.Elements);
}

GUI.set_gui_keys = function(){
	if(GUI.KeysPanel){
		GUI.KeysPanel.removeFromGUI(GUI.Elements);
		GUI.KeysPanel = null;
		return;
	}else{
		GUI.remove_menu_tabs();
	}
	
	GUI.KeysPanel = GUI.BlackPanel(0,0.1,1,0.8);

	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.05,0.05,Control.key_primary));
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.05,0.17,Control.key_secondary));
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.05,0.29,Control.key_spell));
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.05,0.41,Control.key_forward));
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.05,0.53,Control.key_backward));
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.05,0.65,Control.key_left));
	
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.35,0.05,Control.key_right));
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.35,0.17,Control.key_rum));
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.35,0.29,Control.key_reload));
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.35,0.41,Control.key_fiddle));
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.35,0.53,Control.key_sprint));
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.35,0.65,Control.key_inventory));
	
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.65,0.05,Control.key_addSelection));
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.65,0.17,Control.key_melee));
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.65,0.29,Control.key_ship));
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.65,0.41,Control.key_use));
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.65,0.53,Control.key_lifebars));
	GUI.KeysPanel.addChild(GUI.KeyBindButton(0.65,0.65,Control.key_controlGroup));
	
	GUI.KeysPanel.addToGUI(GUI.Elements);
}

GUI.KeyBindButton = function(_x,_y,_key){
	var b = GUI.Button(_x, _y);
	b.w = 0.3;
	b.mouseOverColor = GUI.color_mouseOver ;
	b.texture= Asset.texture.gui;
	b.alphaBlended = true;
	b.textureRect = GUI.textureRect_menuButton;
	b.textElem = GUI.TextElem(0.15, 0.013, 16, Control.getKeyName(_key), GUI.align_center);
	b.addChild(b.textElem);
	b.keyBinding = _key;
	b.label = GUI.TextElem(0.15, -0.04, 13, _key.name , GUI.align_center);
	b.addChild(b.label);
	
	b.callback = function(){
		GUI.currentKeyBinding = this;
	}
	b.callback_right = function(){
		GUI.currentKeyBinding = null;
	}
	b.update = function(){
		if(GUI.currentKeyBinding == this){
			this.defaultColor = GUI.color_mouseOver;
		}else{
			this.defaultColor = GUI.textColor_white;
		}
	}
	b.setValue = function(keyCode){
		this.keyBinding.value1 = keyCode;
		this.textElem.setText(Control.getKeyName(this.keyBinding));
		GUI.currentKeyBinding = null;
		GUI.Alert("Key Binding Set");
	}
	return b;
}

GUI.remove_menu_tabs = function(){
	if(GUI.FilePanel){
		GUI.FilePanel.removeFromGUI(GUI.Elements);
		GUI.FilePanel = null;
	}
	if(GUI.NewGamePanel){
		GUI.NewGamePanel.removeFromGUI(GUI.Elements);
		GUI.NewGamePanel = null;
	}
	if(GUI.OptionsPanel){
		saveConfig();
		GUI.OptionsPanel.removeFromGUI(GUI.Elements);
		GUI.OptionsPanel = null;
	}
	if(GUI.CreatorPanel){
		GUI.CreatorPanel.removeFromGUI(GUI.Elements);
		GUI.CreatorPanel = null;
	}
	if(GUI.QuitPanel){
		GUI.QuitPanel.removeFromGUI(GUI.Elements);
		GUI.QuitPanel = null;
	}
	if(GUI.KeysPanel){
		saveConfig();
		GUI.KeysPanel.removeFromGUI(GUI.Elements);
		GUI.KeysPanel = null;
	}
	if(GUI.NetPanel){
		GUI.NetPanel.removeFromGUI(GUI.Elements);
		GUI.NetPanel = null;
	}
}

GUI.set_gui_options = function(){
	if(GUI.OptionsPanel){
		saveConfig();
		GUI.OptionsPanel.removeFromGUI(GUI.Elements);
		GUI.OptionsPanel = null;
		return;
	}else{
		GUI.remove_menu_tabs();
	}
	
	GUI.OptionsPanel = GUI.BlackPanel(0.05,0.1,0.8,0.8);
	
	b_postProcess = GUI.Checkbox(0.04,0.08);
	b_postProcess.addChild(GUI.TextElem(0.08,0.015,14,"256 Colors"));
	b_postProcess.setBoundValue = function(){
		Render.postProcess= this.value;
	}
	b_postProcess.getBoundValue = function(){
		return Render.postProcess;
	}
	
	var b_resolution = GUI.MenuButton(0.6,0.08,GUI.resolutionLevelNames[Render.pixelLevel]);
	b_resolution.align_x = GUI.align_center;
	b_resolution.w = 0.35;
	b_resolution.textElem.setPosX(0.175);
	b_resolution.title = GUI.TextElem(0.175,-0.05, 12,"Pixel Density", GUI.align_center);
	b_resolution.addChild(b_resolution.title);
	b_resolution.callback = function(){
		setPixelLevel((Render.pixelLevel+1) % 5);
		this.textElem.setText(GUI.resolutionLevelNames[Render.pixelLevel]);
	}
	b_resolution.callback_right = function(){
		setPixelLevel((Render.pixelLevel-1+5) % 5);
		this.textElem.setText(GUI.resolutionLevelNames[Render.pixelLevel]);
	}
	/*var b_difficulty = GUI.MenuButton(0.6,0.22,GUI.difficultyNames[Gamestats.difficulty]);
	b_difficulty.align_x = GUI.align_center;
	b_difficulty.w = 0.35;
	b_difficulty.textElem.setPosX(0.175);
	b_difficulty.title = GUI.TextElem(0.175,-0.05, 12,"Difficulty", GUI.align_center);
	b_difficulty.addChild(b_difficulty.title);
	b_difficulty.callback = function(){
		Gamestats.difficulty = ((Gamestats.difficulty+1) % 4);
		if(Gamestats.difficulty < 1){Gamestats.difficulty = 1;}
		Gamestats.updateMonsterLevel(M.monsterLevel);
		this.textElem.setText(GUI.difficultyNames[Gamestats.difficulty]);
	}*/
	
	var b_volume = GUI.FancySlider(0.2,0.2, 0, 1, "Master Volume");
	b_volume.setValue(SoundObject.masterVolume);
	b_volume.updateBoundValue = function(){
		SoundObject.SetMasterVolume(this.value);
	}
	var b_music = GUI.FancySlider(0.2,0.25, 0, 1, "Music Volume");
	b_music.setValue(Music.volume);
	b_music.updateBoundValue = function(){
		Music.SetVolume(this.value);
	}

	var b_portrait = GUI.FancySlider(0.2,0.3, 0, 1, "Portrait Volume");
	b_portrait.setValue(SoundObject.portraitVolume);
	b_portrait.updateBoundValue = function(){
		SoundObject.SetPortraitVolume(this.value);
	}
	
	//var b_keys = GUI.MenuButton(0.4,0.65,"Key Bindings");
	//b_keys.align_x = GUI.align_center;
	//b_keys.callback = GUI.set_gui_keys;
	
	b_fullscreen= GUI.Checkbox(0.1,0.36);
	b_fullscreen.addChild(GUI.TextElem(0.08,0.015,14,"Windowed Mode"));
	b_fullscreen.setBoundValue = function(){
		Control.fullScreen();
	}
	b_fullscreen.getBoundValue = function(){
		return !Control.checkFullScreen();
	}

	b_mouseLock = GUI.Checkbox(0.1,0.44);
	b_mouseLock.addChild(GUI.TextElem(0.08,0.015,14,"Lock cursor to window"));
	b_mouseLock.setBoundValue = function(){
		Control.pointerLock = this.value;
	}
	b_mouseLock.getBoundValue = function(){
		return Control.pointerLock;
	}
	
	b_invertMouse = GUI.Checkbox(0.1,0.52);
	b_invertMouse.addChild(GUI.TextElem(0.08,0.015,14,"Invert mouse Y axis"));
	b_invertMouse.setBoundValue = function(){
		Control.invertMouseY = this.value;
	}
	b_invertMouse.getBoundValue = function(){
		return Control.invertMouseY;
	}
	
	/*b_mouseScroll = GUI.Checkbox(0.1,0.52);
	b_mouseScroll.addChild(GUI.TextElem(0.08,0.015,14,"Always mouse scroll"));
	b_mouseScroll.setBoundValue = function(){
		Control.alwaysMouseScroll = this.value;
	}
	b_mouseScroll.getBoundValue = function(){
		return Control.alwaysMouseScroll;
	}*/
	
	
	
	var b_scroll = GUI.FancySlider(0.2,0.62, 0.0015, 0.015, "Mouse Sensitivity");
	b_scroll.setValue(cam.sensitivity_x);
	b_scroll.updateBoundValue = function(){
		cam.sensitivity_x = this.value;
		cam.sensitivity_y = this.value;
	}
	
	/*var b_scroll_key = GUI.FancySlider(0.2,0.65, 0.3, 1.5, "Arrow Keys Scroll Speed");
	b_scroll_key.setValue(Control.scroll_speed_arrows);
	b_scroll_key.updateBoundValue = function(){
		Control.scroll_speed_arrows = this.value;
	}
	
	var b_doubleClick = GUI.FancySlider(0.2,0.7, 4, 36, "Double Click Time");
	b_doubleClick.setValue(Control.doubleClickTimeframe_max);
	b_doubleClick.updateBoundValue = function(){
		Control.doubleClickTimeframe_max = Math.round(this.value);
	}*/
	
	if(game_portal != "armor"){
		GUI.OptionsPanel.addChild(b_fullscreen);
	}
	
	GUI.OptionsPanel.addChild(b_resolution);
	//GUI.OptionsPanel.addChild(b_keys);
	GUI.OptionsPanel.addChild(b_mouseLock);
	GUI.OptionsPanel.addChild(b_postProcess);
	GUI.OptionsPanel.addChild(b_invertMouse);
	//GUI.OptionsPanel.addChild(b_mouseScroll);
	GUI.OptionsPanel.addChild(b_volume);
	GUI.OptionsPanel.addChild(b_music);
	GUI.OptionsPanel.addChild(b_portrait);
	GUI.OptionsPanel.addChild(b_scroll);
	//GUI.OptionsPanel.addChild(b_scroll_key);
	//GUI.OptionsPanel.addChild(b_doubleClick);
	GUI.OptionsPanel.addToGUI(GUI.Elements);
}

GUI.set_gui_load = function(){
	if(GUI.FilePanel){
		GUI.FilePanel.removeFromGUI(GUI.Elements);
		GUI.FilePanel = null;
		return;
	}else{
		GUI.remove_menu_tabs();
	}
	
	GUI.FilePanel = GUI.BlackPanel(0.1,0.1,0.8,0.8);
	GUI.FilePanel.addChild(GUI.TextElem(0.4,-0.05,16,"Load Game", GUI.align_center));
	GUI.FilePanel.data = [];
	GUI.FilePanel.Elements =[];
	for(var i=0;i<8;++i){
		var e = GUI.MenuButton(0.4,i*0.09+0.05," ");
		e.align_x = GUI.align_center;
		GUI.FilePanel.addChild(e);
		GUI.FilePanel.Elements[i] = e;
		e.callback = function(){
			var idx = this.parent.Elements.indexOf(this);
			if(this.parent.data && this.parent.data[idx]){
				Asset.importSaveGame(this.parent.data[idx]);
			}
		}
	}
	GUI.FilePanel.addToGUI(GUI.Elements);
	GUI.FilePanel.getData = function(folder, data){
		if(folder != 'savegames'){return;}
		this.data = data;
		for(var i=0;i<this.Elements.length;++i){
			if(i < data.length){
				var filename = data[i].split('.')[0];
				this.Elements[i].textElem.setText(filename);
			}else{
				this.Elements[i].setVisibility(false);
			}
		}
	}
	GUI.FilePanel.addToGUI(GUI.Elements);
	ipcRenderer.send('voor-load','savegames');
}

GUI.set_gui_customgame = function(map_folder){
	if(GUI.FilePanel){
		GUI.FilePanel.removeFromGUI(GUI.Elements);
		GUI.FilePanel = null;
		return;
	}else{
		GUI.remove_menu_tabs();
	}
	
	GUI.FilePanel = GUI.BlackPanel(0.1,0.1,0.8,0.8);
	GUI.FilePanel.addChild(GUI.TextElem(0.4,-0.05,16,"Select Map", GUI.align_center));

	GUI.FilePanel.data = [];
	GUI.FilePanel.folder = map_folder;
	GUI.FilePanel.Elements =[];
	
	GUI.FilePanel.addToGUI(GUI.Elements);
	GUI.FilePanel.getData = function(folder, data){
		console.log(folder,map_folder)
		if(folder != map_folder){return;}
		this.data = data;
		var buttonCount = 0;
		for(var i=0;i<data.length;++i){
			//first pass: insert map files
			if(buttonCount >= 28){break;}
			var splitName = data[i].split('.');
			var filename = splitName[0];
			var formatname = splitName[1];
			console.log(formatname)
			if(formatname == Asset.mapFormat){
				var buttonName = filename;
				if(buttonCount < 14){
					var e = GUI.MenuButton(0.05 ,buttonCount*0.05+0.05,buttonName,11);
				}else{
					var e = GUI.MenuButton(0.45,(buttonCount-14)*0.05+0.05,buttonName,11);
				}
				e.h *=0.6;e.w*=0.7;
				e.textElem.setPos(e.w/2,0.005);
				e.fullFileName = data[i];
				e.filename = filename;
				this.addChild(e);
				e.addToGUI(GUI.Elements);
				this.Elements[buttonCount] = e;
		
				if(EDITORMODE){
					e.callback = function(){
						Asset.importMap(GUI.FilePanel.folder+'/'+this.fullFileName);
					}
				}else{
					e.callback = function(){ 
						Gamestats.ExitZone(GUI.FilePanel.folder+'/'+this.fullFileName);
					}
				}
				buttonCount++;
			}
		}
	}
	GUI.FilePanel.addToGUI(GUI.Elements);
	ipcRenderer.send('voor-load', map_folder );
}

GUI.set_gui_creator = function(){
	if(GUI.CreatorPanel){
		GUI.CreatorPanel.removeFromGUI(GUI.Elements);
		GUI.CreatorPanel = null;
		return;
	}else{
		GUI.remove_menu_tabs();
	}
	
	GUI.CreatorPanel = GUI.BlackPanel(0.1,0.2,0.8,0.5);//(0.1,0.1,0.8,0.8);
	GUI.CreatorPanel.map_width = 64;
	GUI.CreatorPanel.map_height = 64;
	GUI.CreatorPanel.map_name = "Untitled";
	
	var b_create = GUI.MenuButton(0.4,0.1,"Create Map");
	b_create.align_x = GUI.align_center;
	b_create.callback = function(){
		EDITORMODE = true;
		M.Create(GUI.CreatorPanel.map_height, GUI.CreatorPanel.map_width, GUI.CreatorPanel.map_name);
	}
	GUI.CreatorPanel.addChild(b_create);
	
	/*var b_community = GUI.MenuButton(0.4,0.46,"Community Maps");
	b_community.align_x = GUI.align_center;
	b_community.callback = function(){GUI.set_gui_customgame('workshop')};
	GUI.CreatorPanel.addChild(b_community);
	
	var b_custom = GUI.MenuButton(0.4,0.55,"Custom Maps");
	b_custom.align_x = GUI.align_center;
	b_custom.callback = function(){GUI.set_gui_customgame('worldedit')};
	GUI.CreatorPanel.addChild(b_custom);
	
	var b_publish = GUI.MenuButton(0.4,0.64,"Publish Map");
	b_publish.align_x = GUI.align_center;
	b_publish.callback = GUI.set_gui_publish;
	GUI.CreatorPanel.addChild(b_publish);*/
	
	var inp1 = GUI.InputField(0.1,0.35);
	inp1.addLabel('Width');
	inp1.minValue = 16;
	inp1.maxValue = 256;
	var inp2 = GUI.InputField(0.4,0.35);
	inp2.addLabel('Height');
	inp2.minValue = 16;
	inp2.maxValue = 256;
	
	inp1.setBoundValue = function(){
		GUI.CreatorPanel.map_width = Math.floor(this.value/8)*8;}
	inp2.setBoundValue = function(){
		GUI.CreatorPanel.map_height = Math.floor(this.value/8)*8;}
	inp1.getBoundValue = function(){
		return GUI.CreatorPanel.map_width;}
	inp2.getBoundValue = function(){
		return GUI.CreatorPanel.map_height;}
		
	var inp3 = GUI.InputField(0.1,0.25);
	inp3.addLabel('Map Name');
	inp3.w = 0.6;
	inp3.maxLength = 50;
	inp3.numberOnly = false;
	inp3.setBoundValue = function(){
		GUI.CreatorPanel.map_name = this.value;}
	inp3.getBoundValue = function(){
		return GUI.CreatorPanel.map_name;}
		
	GUI.CreatorPanel.addChild(inp1);
	GUI.CreatorPanel.addChild(inp2);
	GUI.CreatorPanel.addChild(inp3);
	GUI.CreatorPanel.addToGUI(GUI.Elements);
}

//mode 0 = exit to desktop
//mode 1 = exit to menu
//mode 2 = restart map
GUI.set_gui_quit = function( mode ){
	if(GUI.QuitPanel){
		GUI.QuitPanel.removeFromGUI(GUI.Elements);
		GUI.QuitPanel = null;
		return;
	}else{
		GUI.remove_menu_tabs();
	}
	GUI.QuitPanel = GUI.BlackPanel(0.1,0.1,0.8,0.5);
	
	var b = GUI.MenuButton(0.4,0.3,"Yes!");
	b.align_x = GUI.align_center;
	if( mode == 0 ){
		GUI.QuitPanel.addChild(GUI.TextElem(0.4,0.1,16,"Exit to Desktop?\n\Are you sure, human?", GUI.align_center));
		b.callback = function(){
			ipcRenderer.send("voor-quit");
		}
	}else if(mode == 1){
		GUI.QuitPanel.addChild(GUI.TextElem(0.4,0.1,16,"Quit to Menu?\nAre you sure, human?", GUI.align_center));
		b.callback = Gamestats.Surrender;
	}else{
		GUI.QuitPanel.addChild(GUI.TextElem(0.4,0.1,16,"Restart map?\nAre you sure, human?", GUI.align_center));
		b.callback = Gamestats.RestartMap;
	}
	
	GUI.QuitPanel.addChild(b);
	GUI.QuitPanel.addToGUI(GUI.Elements);
}

GUI.set_gui_newGame = function(){
	if(GUI.NewGamePanel){
		GUI.NewGamePanel.removeFromGUI(GUI.Elements);
		GUI.NewGamePanel = null;
		return;
	}else{
		GUI.remove_menu_tabs();
	}

	var newGamePanel = GUI.BlackPanel(0.05,0.2,0.8,0.5);
	newGamePanel.addChild(GUI.TextElem(0.4,0.02,15,"Select a level",GUI.align_center));
	var levelCount = Gamestats.LevelNames.length;
	var buttonSpace = 0.09;
	/*if(!DESKTOP_VERSION){
		levelCount = 5;
		buttonSpace = 0.14;
	}*/
	for(var i=0;i<levelCount;++i){
		var levelButton = GUI.MenuButton(0.15,i*buttonSpace+0.1,Gamestats.LevelNames[i],15,0.5);
		levelButton.levelId = i;
		levelButton.callback = function(){
			if(this.levelId == 0){
				GUI.set_gui_story(0);
			}else{
				Gamestats.ExitZone( Gamestats.LevelPaths[this.levelId] );
			}	
		}
		
		newGamePanel.addChild(levelButton);
	}
	newGamePanel.addToGUI(GUI.Elements);
	GUI.NewGamePanel = newGamePanel;
}

GUI.set_gui_skirmish = function(){
	GUI.Elements = [];
	var panel = GUI.BlackPanel(0.5,0.0,1.4,1);
	panel.align_x = GUI.align_center;
	panel.addChild(GUI.TextElem(0.4,0.05,15,"Skirmish - Select a map",GUI.align_center));
	panel.selectedButton = null;
	panel.mapTitle = GUI.TextElem(1,0.05,15," ",GUI.align_center);
	panel.addChild(panel.mapTitle);
	panel.buttonList = [];

	panel.refresh = function(mapList){
		for(var i=0;i<this.buttonList.length;++i){
			this.buttonList[i].removeFromGUI(GUI.Elements);
			this.detachChild(this.buttonList[i]);
		}
		this.buttonList = [];
		var mapIndex = 0;
		for(var i=0;i<mapList.length;++i){
			var name_split = mapList[i].split('.'); //split into array of name+format
			if(!name_split[1] || !name_split[1].length){
				//file has no format, it is folder
				continue;
			}
			var levelButton = GUI.MenuButton(0.1,mapIndex*0.07+0.15, name_split[0] ,16,0.5);
			levelButton.mapName = mapList[i];
			levelButton.callback = function(){
				this.parent.selectedButton = this;
				this.parent.mapTitle.setText(this.mapName);
				ipcRenderer.send('voor-metadata',["maps" , this.mapName]);
			}
			this.addChild(levelButton);
			this.buttonList.push(levelButton);
			levelButton.addToGUI(GUI.Elements);
			mapIndex++;
		}
	}
	panel.getButtonByMapName = function(mapName){
		for(var i=0;i<this.buttonList.length;++i){
			if(this.buttonList[i].mapName === mapName){
				return this.buttonList[i];
			}
		}
		return null;
	}
	
	panel.thumbnail = GUI.Panel(0.75,0.1,0.2,0.2);
	panel.thumbnail.texture = Asset.texture.black;
	panel.mapSizeText = GUI.TextElem(0.21,0.18,10," ");
	panel.descriptionText = GUI.TextElem(0.21,0,8.5," ",GUI.align_left,0.4);
	panel.thumbnail.addChild(panel.mapSizeText);
	panel.thumbnail.addChild(panel.descriptionText);
	
	panel.addChild(panel.thumbnail);
	panel.refreshMetaData = function(data){
		this.mapSizeText.setText(data[1] + "x" + data[0]);
		if(data[3]){
			this.descriptionText.setText(data[3]);
		}else{
			this.descriptionText.setText("No description.");
		}
		
		if(data[4]){
			this.thumbnail.texture = Minimap.loadThumbnail(data[4]);
		}else{
			this.thumbnail.texture = Asset.texture.black;
		}
		if(data[5]){
			this.refreshPlayers(data[5]);
		}else{
			this.refreshPlayers(4);
		}
		
	}
	
	panel.playerList = [];
	panel.playerPanel = GUI.BlackPanel(0,0.22,0.6,0.45);
	panel.playerPanel.addChild(GUI.TextElem(0.03,0.03,10,"Enabled"));
	panel.playerPanel.addChild(GUI.TextElem(0.18,0.03,10,"Role"));
	panel.playerPanel.addChild(GUI.TextElem(0.34,0.03,10,"Team"));
	panel.playerPanel.addChild(GUI.TextElem(0.43,0.03,10,"Color"));
	
	panel.thumbnail.addChild(panel.playerPanel);
	panel.refreshPlayers = function(count){
		PlayerTeamEntry.BuildList(count);
		for(var i=0;i<this.playerList.length;++i){
			this.playerList[i].removeFromGUI(GUI.Elements);
			this.detachChild(this.playerList[i]);
		}
		this.playerList = [];
		for(var i=0;i<count;++i){
			//space out rows based on the number of players
			this.playerList[i] = GUI.SkirmishPlayerOptions(0.05,0.28+i*Math.min(0.1,0.35/count), i+1);
			this.thumbnail.addChild(this.playerList[i]);
			this.playerList[i].addToGUI(GUI.Elements);
		}
	}
	
	panel.update = function(){
		PlayerRoleEntry.UpdateList();
	}
	
	panel.transferSkirmishData = function(){
		for(var i=0;i<Players.length;++i){
			Players[i].skirmishRole = null;
		}
		for(var i=0;i<this.playerList.length;++i){
			this.playerList[i].transferSkirmishData();
		}
	}
	
	panel.getNetState = function(){
		var data = [];
		if(this.selectedButton){
			data[0] = this.selectedButton.mapName;
			var playerOps = [];
			for(var i=0;i<this.playerList.length;++i){
				var en = this.playerList[i].playerEnabled ? 1 : 0;
				var role = this.playerList[i].roleEntry.id;
				var team = this.playerList[i].teamEntry.value;
				var color = this.playerList[i].colorEntry.id;
				var connId = this.playerList[i].roleEntry.connId;
				playerOps[i] = [en,role,team, color, connId];
			}
			data[1] = playerOps;
		}
		
		return data;
	}
	
	panel.loadNetState = function(data){
		if(data[0]){
			if(!this.selectedButton || this.selectedButton.mapName !== data[0]){
				this.selectedButton = this.getButtonByMapName(data[0]);
				if(this.selectedButton){
					this.mapTitle.setText(data[0]);
					ipcRenderer.send('voor-metadata',["maps" , data[0] ]);
				}
			}else{
				for(var i=0; i<this.playerList.length;++i){
					var playerOps = data[1][i];
					if(!playerOps){continue;}
					this.playerList[i].playerEnabled = playerOps[0];
					this.playerList[i].roleEntry = PlayerRoleEntry.getById(playerOps[1]);
					this.playerList[i].teamEntry = PlayerTeamEntry.getById(playerOps[2]);
					this.playerList[i].colorEntry = Player.Colors[ playerOps[3] ];
					
					if(this.playerList[i].roleEntry == PlayerRoleEntry.Human){
						this.playerList[i].roleEntry = PlayerRoleEntry.Server
					}else if( this.playerList[i].roleEntry.isHuman ){ //other human
						if(Net.my_server_connId == playerOps[4] ){//this is me
							this.playerList[i].roleEntry = PlayerRoleEntry.Human
						}
					}
				}
				this.transferSkirmishData();
			}
		}
	}
	panel.setRole = function(playerOps, role){
		if(Net.isClient){return;}
		//only allow one of each human role
		if(role.isHuman){
			for(var i=0;i<this.playerList.length;++i){
				if(this.playerList[i].roleEntry == role){
					this.playerList[i].roleEntry = playerOps.roleEntry;
				}
			}
		}
		playerOps.roleEntry = role;
	}
	
	var startButton = GUI.MenuButton(0.75,0.88,"Start",16,0.3);
	startButton.callback = function(){
		if(this.parent.selectedButton){
			if(Net.isServer && Net.Connections.length <= 0){
				GUI.Alert("Can't start game alone");
			}else{
				this.parent.transferSkirmishData();
				Gamestats.ExitZone("maps/"+this.parent.selectedButton.mapName);
			}
		}
	}
	if(!Net.isClient){
		panel.addChild(startButton);
	}
	if(Net.online){
		if(Net.isServer){
			var str = "Address: "+Net.localIP+":"+Net.serverPort;
		}else{
			var str = "Your LAN IP: "+Net.localIP;
		}
		panel.addChild(GUI.TextElem(0.05,0.95,10, str));
		
		panel.userNameField = GUI.InputField(0.05,0.9);
		panel.userNameField.w = 0.3;
		panel.userNameField.setBoundValue = function(){
			Net.setUserName( this.value);
		}
		panel.userNameField.getBoundValue = function(){
			return Net.userName;
		}
		panel.userNameField.pasteInto( Net.userName );
		panel.userNameField.numberOnly = false;
		panel.userNameField.maxLength = 64;
		panel.userNameField.addLabel("User name");
		panel.addChild(panel.userNameField);
	}
	
	var backButton = GUI.MenuButton(1.05,0.88,"Quit",16,0.31)
	backButton.callback = function(){
		Net.quit();
		GUI.set_gui_menu();
	}
	panel.addChild(backButton);
	
	var resourceInput = GUI.InputField(0.8,0.81);
	resourceInput.addLabel("Start Money");
	resourceInput.defaultValue = 50;
	resourceInput.minValue = 50;
	resourceInput.maxValue = 99999;
	resourceInput.w = 0.15;
	resourceInput.getBoundValue = function(){
		return Gamestats.skirmishStartResource;
	}
	resourceInput.setBoundValue = function(){
		Gamestats.skirmishStartResource = this.value;
	}
	panel.addChild(resourceInput);
	
	panel.addToGUI(GUI.Elements);
	ipcRenderer.send('voor-load','maps');
	panel.refresh([]);
	GUI.ChatPanel.addToGUI(GUI.Elements);
	GUI.SkirmishPanel = panel;
	//GUI.NewGamePanel = panel;
}

GUI.SkirmishPlayerOptions = function(x,y,id){
	var e = GUI.Checkbox(x,y);
	e.playerId = id;
	e.w = e.h = 0.04;
	//e.defaultColor = Player.ColorsFloat[id]; 
	e.playerEnabled = true;
	e.teamEntry = PlayerTeamEntry.list[id-1];
	e.colorEntry = Player.Colors[id];
	if(id == 1){ //default to human player
		e.roleEntry = PlayerRoleEntry.Human;
	}else{ //default to Normal AI
		e.roleEntry = PlayerRoleEntry.Normal
	}
	
	e.setBoundValue = function(){
		this.playerEnabled = this.value;
	}
	e.getBoundValue = function(){
		return this.playerEnabled;
	}

	e.roleSelect = GUI.DropList(x+0.06,0.0, PlayerRoleEntry.list);
	e.roleSelect.w = 0.15;
	e.roleSelect.setBoundValue = function(){
		GUI.SkirmishPanel.setRole(this.parent, this.value);
	}
	e.roleSelect.getBoundValue = function(){
		return this.parent.roleEntry;
	}
	e.addChild(e.roleSelect);
	
	e.teamSelect = GUI.DropList(x+0.24,0.0, PlayerTeamEntry.list);
	e.teamSelect.w = 0.06;
	e.teamSelect.setBoundValue = function(){
		this.parent.teamEntry = this.value;
	}
	e.teamSelect.getBoundValue = function(){
		return this.parent.teamEntry;
	}
	e.addChild(e.teamSelect);
	
	e.colorSelect = GUI.DropList(x+0.32,0.0, Player.Colors.slice(1));
	e.colorSelect.w = 0.1;
	e.colorSelect.setBoundValue = function(){
		var oldColor = this.parent.colorEntry;
		this.parent.colorEntry = this.value;
		for(var i=0;i<this.parent.parent.parent.playerList.length;++i){
			var otherOps = this.parent.parent.parent.playerList[i];
			if(otherOps != this.parent && otherOps.colorEntry == this.parent.colorEntry){
				otherOps.colorEntry = oldColor;
			}
		}
	}
	e.colorSelect.getBoundValue = function(){
		this.textElem.defaultColor = this.parent.colorEntry.color_float;
		return this.parent.colorEntry;
	}
	e.addChild(e.colorSelect);
	
	e.transferSkirmishData = function(){
		var p = Players[this.playerId];
		p.skirmishTeam = this.teamEntry.value;
		p.skirmishRole = this.roleEntry;
		p.setColor( this.colorEntry.id );
		if(this.playerEnabled == false){
			p.skirmishRole = null;
		}
	}
	return e;
}

GUI.set_gui_story = function(briefingId){
	GUI.Elements = [];
	var panel = GUI.BlackPanel(0.5,0.03,1,0.9);
	panel.align_x = GUI.align_center;
	
	if(briefingId < Gamestats.LevelNames.length+1){
		if(briefingId == 0){
			var startButton = GUI.MenuButton(0.275,0.67,"Continue");
			var storyText = Gamestats.Story;
		}else{
			var startButton = GUI.MenuButton(0.275,0.4,"Continue");
			panel.h = 0.5; init9slice(panel,panel.border,panel.border);
			
			var storyText = "Level Cleared: " + Gamestats.LevelNames[briefingId-1] + "\n"+
			"Secrets Found: " +Gamestats.secrets_found +"/"+Gamestats.secrets_total+
			"\nKills: "+Players[2].unitsLost + "/"+Players[2].unitCount + "\n\n"
			+ Gamestats.Epilogue;
		}
		var textElem = GUI.TextElem(0.05,0.05,15,storyText,GUI.align_left,0.9);
		startButton.callback = function(){
			if(this.parent.briefingId >= Gamestats.LevelNames.length){//go to epilogue screen
				GUI.set_gui_story(this.parent.briefingId + 1); 
			}else{//go to next mission
				var nexLevelPath = Gamestats.LevelPaths[ Math.min(Gamestats.LevelPaths.length-1, this.parent.briefingId)];
				Gamestats.ExitZone( nexLevelPath );
			}				
		}
	}else{//end screen
		var startButton = GUI.MenuButton(0.275,0.83,"Back to Menu");
		var storyText = Gamestats.DemoText;
		var textElem = GUI.TextElem(0.05,0.05,12,storyText,GUI.align_left,0.9);
		var b1 = GUI.Button(0.05,0.61);
		b1.w = 0.4,b1.h=0.2;
		b1.callback = callback_steam;
		b1.mouseOverColor = GUI.color_mouseOver;
		b1.texture = Asset.texture.banners;
		b1.textureRect = [0,0.5,1,0.5];
		panel.addChild(b1);
		
		var b2 = GUI.Button(0.55,0.61);
		b2.w = 0.4,b2.h=0.2;
		b2.callback = callback_rum;
		b2.mouseOverColor = GUI.color_mouseOver;
		b2.texture = Asset.texture.banners;
		b2.textureRect = [0,0,1,0.5];
		panel.addChild(b2);
		startButton.callback = Gamestats.Surrender;
	}
	panel.briefingId = briefingId;
	panel.addChild(textElem);
	
	panel.addChild(startButton);
	panel.addToGUI(GUI.Elements);
	Music.ChangeTrack(1);
}

GUI.set_gui_properties = function(){
	if(GUI.PropertyPanel){
		GUI.PropertyPanel.removeFromGUI(GUI.Elements);
		GUI.PropertyPanel = null;
		return;
	}
	
	var s = Editor.selected[0];
	if(!s){return;}
	var p = GUI.Panel(0.25,0.2,0.7,0.5);
	p.linkedObject = s;
	var cancelButton = GUI.Button(0.7,0);
	GUI.setEditorButton(cancelButton, 24);
	cancelButton.callback = function(){
		GUI.PropertyPanel.removeFromGUI(GUI.Elements);
		GUI.PropertyPanel = null;
	}
	p.addChild(cancelButton);
	
	if(s.owner && s.owner.setTag){
		var tagInput = GUI.InputField(0.13,0.05);
		tagInput.addLabel("Tag ID");
		tagInput.wholeNumbers = true;
		tagInput.minValue = -1;
		tagInput.maxValue = 50;
		tagInput.setBoundValue = function(){this.parent.linkedObject.owner.setTag(this.value)};
		tagInput.getBoundValue = function(){return this.parent.linkedObject.owner.tagId};
		p.addChild(tagInput);
		
		var tagButton = GUI.Button(0.02,0.05);
		tagButton.addLabel("AutoTag");
		tagButton.callback = function(){this.parent.linkedObject.owner.setTag();}
		p.addChild(tagButton);
	}
	if(s.isTriggerActor){
		if(!s.influence){//not AI Point of Interest (POI)
			var delayInput = GUI.InputField(0.02,0.05);
			delayInput.addLabel("Delay");
			delayInput.maxValue = 3600; delayInput.wholeNumbers = true;
			delayInput.getBoundValue = function(){return this.parent.linkedObject.delay};
			delayInput.setBoundValue = function(){this.parent.linkedObject.delay = this.value};
			p.addChild(delayInput);
			
			var durationInput = GUI.InputField(0.15,0.05);
			durationInput.addLabel("Duration");
			durationInput.maxValue = 3600; durationInput.wholeNumbers = true;
			durationInput.getBoundValue = function(){return this.parent.linkedObject.duration};
			durationInput.setBoundValue = function(){this.parent.linkedObject.duration = this.value};
			p.addChild(durationInput);
		}else{
			var startLocInput = GUI.InputField(0.02,0.05);
			startLocInput.addLabel("Start Location (0 for random)");
			startLocInput.maxValue = Players.length+1;
			startLocInput.getBoundValue = function(){return this.parent.linkedObject.startLocationId};
			startLocInput.setBoundValue = function(){this.parent.linkedObject.startLocationId = this.value};
			p.addChild(startLocInput);
			
			var controlPointInput = GUI.Checkbox(0.02,0.15);
			controlPointInput.addLabel("Control Point");
			controlPointInput.setBoundValue = function(){
				this.parent.linkedObject.isControlPoint = this.value;}
			controlPointInput.getBoundValue = function(){
				return this.parent.linkedObject.isControlPoint;}
			p.addChild(controlPointInput);
		}
		
		
		if(s.message || s.isUnitSpawner){
			var conditionInput = GUI.InputField(0.28,0.05);
			conditionInput.addLabel("WhileCondition");
			conditionInput.wholeNumbers = true; conditionInput.maxValue = 49;
			conditionInput.getBoundValue = function(){return this.parent.linkedObject.conditionId};
			conditionInput.setBoundValue = function(){this.parent.linkedObject.conditionId = this.value;};
			p.addChild(conditionInput);
		}
		
		if(s.message){
			var messageInput = GUI.InputField(0.02,0.25);
			messageInput.addLabel("Message");
			messageInput.numberOnly = false;
			messageInput.h = 0.2;
			messageInput.w = 0.6;
			messageInput.dynamicHeight = true;
			messageInput.maxLength = 256;
			messageInput.defaultValue = "Drink!";
			messageInput.getBoundValue = function(){return this.parent.linkedObject.message};
			messageInput.setBoundValue = function(){this.parent.linkedObject.message = this.value};
			p.addChild(messageInput);
		}
		
		if(s.exitLevel){
			var exitInput = GUI.InputField(0.02,0.15);
			exitInput.addLabel("ExitLevel");
			exitInput.numberOnly = false;
			exitInput.w = 0.2;
			exitInput.maxLength = 256;
			exitInput.defaultValue = "tutorial";
			exitInput.getBoundValue = function(){return this.parent.linkedObject.exitLevel};
			exitInput.setBoundValue = function(){this.parent.linkedObject.exitLevel = this.value};
			p.addChild(exitInput);
			
			var exitXInput = GUI.InputField(0.25,0.15);
			exitXInput.addLabel("Exit X");
			exitXInput.maxValue = 512;
			exitXInput.getBoundValue = function(){return this.parent.linkedObject.exitLevelPos[0]};
			exitXInput.setBoundValue = function(){this.parent.linkedObject.exitLevelPos[0]= this.value};
			p.addChild(exitXInput);
			var exitYInput = GUI.InputField(0.38,0.15);
			exitYInput.addLabel("Exit Y");
			exitYInput.maxValue = 512;
			exitYInput.getBoundValue = function(){return this.parent.linkedObject.exitLevelPos[1]};
			exitYInput.setBoundValue = function(){this.parent.linkedObject.exitLevelPos[1] = this.value};
			p.addChild(exitYInput);
		}
	}
	
	if(s.isUnitSpawner || s.effectFilter){
		if(s.isUnitSpawner){
			var spawnTypeInput = GUI.DropList(0.02,0.15,UnitPrototype.Types);
			spawnTypeInput.w = 0.2;
			spawnTypeInput.addLabel("SpawnType");
			spawnTypeInput.getBoundValue = function(){return this.parent.linkedObject.spawnType};
			spawnTypeInput.setBoundValue = function(){this.parent.linkedObject.spawnType = this.value};
			p.addChild(spawnTypeInput);
			
			var spawnOwnerInput = GUI.InputField(0.25,0.15);
			spawnOwnerInput.addLabel("Owner");
			spawnOwnerInput.wholeNumbers = true;
			spawnOwnerInput.minValue = 1; spawnOwnerInput.maxValue = Players.length-1;
			spawnOwnerInput.getBoundValue = function(){return this.parent.linkedObject.spawnOwnerId};
			spawnOwnerInput.setBoundValue = function(){this.parent.linkedObject.spawnOwnerId = this.value};
			p.addChild(spawnOwnerInput);
			
			var spawnTagInput = GUI.InputField(0.51,0.15);
			spawnTagInput.addLabel("SpawnTag");
			spawnTagInput.wholeNumbers = true;
			spawnTagInput.getBoundValue = function(){return this.parent.linkedObject.spawnTag};
			spawnTagInput.setBoundValue = function(){this.parent.linkedObject.spawnTag = this.value};
			p.addChild(spawnTagInput);
			
			var tagButton = GUI.Button(0.02,0.05);
			tagButton.addLabel("AutoTag");
			tagButton.callback = function(){this.parent.linkedObject.spawnTag = TriggerTag.getFirstUnused();}
			p.addChild(tagButton);
			
			var spawnGroupInput = GUI.InputField(0.64,0.15);
			spawnGroupInput.addLabel("SpawnGroup");
			spawnGroupInput.wholeNumbers = true;
			spawnGroupInput.getBoundValue = function(){return this.parent.linkedObject.spawnGroup};
			spawnGroupInput.setBoundValue = function(){this.parent.linkedObject.spawnGroup = this.value};
			p.addChild(spawnGroupInput);
		}else{
			var effectTypeInput = GUI.DropList(0.02,0.15,SearchFilter.list);
			effectTypeInput.w = 0.2;
			effectTypeInput.addLabel("SpawnType");
			effectTypeInput.getBoundValue = function(){return this.parent.linkedObject.effectFilter};
			effectTypeInput.setBoundValue = function(){this.parent.linkedObject.effectFilter = this.value};
			p.addChild(effectTypeInput);
			
			var effectParamInput = GUI.InputField(0.51,0.15);
			effectParamInput.addLabel("EffectParam");
			effectParamInput.getBoundValue = function(){return this.parent.linkedObject.param};
			effectParamInput.setBoundValue = function(){this.parent.linkedObject.param = this.value};
			p.addChild(effectParamInput);
		}
		var periodInput = GUI.InputField(0.38,0.15);
		periodInput.addLabel("Period");
		periodInput.maxValue = 3600; periodInput.wholeNumbers = true;
		periodInput.getBoundValue = function(){return this.parent.linkedObject.spawnPeriod};
		periodInput.setBoundValue = function(){this.parent.linkedObject.spawnPeriod = this.value};
		p.addChild(periodInput);
	}
	
	p.addToGUI(GUI.Elements);
	GUI.PropertyPanel = p;
}

GUI.MenuButton = function(_x,_y,_text, _textsize, _w){
	var b = GUI.Button(_x, _y);
	b.mouseOverSound = SoundObject.mouseover;
	b.w = _w || 0.45;
	b.mouseOverColor = GUI.color_mouseOver ;
	b.texture= Asset.texture.gui;
	b.alphaBlended = true;
	b.textureRect = GUI.textureRect_menuButton;
	b.textElem = GUI.TextElem(b.w*0.5, 0.01, _textsize||16 , _text, GUI.align_center);
	b.addChild(b.textElem);
	return b;
}

GUI.AddSpeechText = function(x,y,z,size,duration,message){
	var t = GUI.TextElem(0,0, size, message, GUI.align_center);
	t.addToGUI(GUI.Elements);
	t.duration = duration;
	t.age = 0;
	t.worldX = x; t.worldY = y; t.worldZ = z;
	t.riseY = 0;
	t.riseX = 0;
	t.riseSpeed = 0;
	t.riseSpeedBoost = 0;
	t.visibilityConditionId = -1;
	t.deleteOnReset = true;
	var newPos = worldPointToGUI(t.worldX, t.worldY, t.worldZ);
	t.setPos(newPos[0], newPos[1]);
	t.conditionalOpacity = 1;
	t.parentTag = -1;
	t.needsBackground = true;
	t.update = function(){
		this.age += Render.frameDelta;
		if(this.needsBackground){
			this.needsBackground = false;
			var bgpanel = GUI.Panel(this.textBounds[0] -0.02,this.textBounds[1]-0.02,
			this.textBounds[2]-this.textBounds[0]+0.04,this.textBounds[3]-this.textBounds[1]+0.04);
			this.addChild(bgpanel);
			bgpanel.addToGUI_before(GUI.Elements, this);
			bgpanel.texture = Asset.texture.gui;
			bgpanel.textureRect  = GUI.textureRect_hint;
			bgpanel.alphaBlended = true;
			bgpanel.opacity = 0;
			bgpanel.update = function(){
				this.opacity = this.parent.opacity * 0.7;
			}
		}
		if(this.duration <= 0 && this.duration != -1){
			this.removeFromGUI(GUI.Elements);
		}else if(this.duration > 0){
			this.duration -= 0.5* Render.frameDelta;
			this.opacity = Math.min(1, Math.min(this.age*0.1, this.duration*0.05));
			if(this.duration == -1){ //fixes edge case where duration is decremented to -1, making it ifinite
				this.duration = -2;
			}
		}else{
			this.opacity = Math.min(1, this.age*0.1);
		}
		
		if(this.parentTag > -1){
			var parentActor = Trigger.Tags[this.parentTag].actor;
			if(parentActor){
				this.worldX = parentActor.x;
				this.worldY = parentActor.y;
				this.worldZ = parentActor.z+1.5+this.textBounds[3]*12;
			}
		}
		
		if(Trigger.checkConditionByTriggerId(this.visibilityConditionId)){
			this.conditionalOpacity = Math.min(this.conditionalOpacity + 0.1, 1);
		}else{
			this.conditionalOpacity = Math.max(this.conditionalOpacity - 0.1, 0);
		}

		this.opacity *= this.conditionalOpacity;
		
		var newPos = worldPointToGUI(this.worldX, this.worldY, this.worldZ);
		this.setPos(newPos[0] + this.riseX, newPos[1] +this.riseY);
		var riseDelta = this.riseSpeed + this.riseSpeedBoost;
		this.riseSpeedBoost *= 0.85;
		if(this.angle == 0){
			this.riseY -= riseDelta;
		}else{
			this.riseY-=Math.cos(this.angle*2)* riseDelta;
			this.riseX-=Math.sin(this.angle*2)* riseDelta;
		}
		
	}
	return t;
}

GUI.AddRisingText = function(x,y,z,message, color){
	var t = GUI.AddSpeechText(x,y,z,11,35,message);
	t.riseSpeed = 0.0005;
	t.needsBackground = false;
	t.riseSpeedBoost = 0.015;
	if(color === void 0){
		t.color = t.defaultColor = GUI.textColor_itemPickup;
	}else{
		t.color = t.defaultColor= color;
	}
	return t;
}

GUI.AddTagText = function(tag, x,y,z,size,message){
	var t = GUI.TextElem(0,0, size, message);
	t.addToGUI(GUI.Elements_Tags);
	t.tag = tag;
	t.worldX = x; t.worldY = y; t.worldZ = z;
	t.deleteOnReset = true;
	t.update = function(){
		this.visible = this.tag.actor.visible;
		this.worldX = this.tag.actor.x;
		this.worldY = this.tag.actor.y;
		this.worldZ = this.tag.actor.z + 1.5;
		var newPos = worldPointToGUI(this.worldX, this.worldY, this.worldZ);
		this.setPos(newPos[0], newPos[1]);
	}
	return t;
}

GUI.AddInfoText = function(_actor ){
	var t = GUI.TextElem(0,0, 8, "");
	t.addToGUI(GUI.Elements_Tags);
	t.owner = _actor;
	t.setText(t.owner.getInfoText());
	t.worldX = _actor.x; t.worldY = _actor.y; t.worldZ = _actor.z;
	t.deleteOnReset = true;
	t.update = function(){
		this.visible = this.owner.visible;
		this.worldX = this.owner.x;
		this.worldY = this.owner.y;
		this.worldZ = this.owner.z + 0.5;
		var newPos = worldPointToGUI(this.worldX, this.worldY, this.worldZ);
		this.setPos(newPos[0], newPos[1]);
		
		if(this.owner.isRemoved == true){
			this.removeFromGUI(GUI.Elements_Tags);
		}
		else if(this.visible == true ){
			this.setText(this.owner.getInfoText());
		}
		
		
	}
	return t;
}

GUI.AddOverlayText = function(_text, _delay, _life,_fontsize, subtitleText){
	var t = GUI.TextElem(0.5,0.25, _fontsize || 24, _text, GUI.align_center);
	if(GUI.currentOverlayText != null){
		GUI.currentOverlayText.removeFromGUI(GUI.InGame);
	}
	GUI.currentOverlayText = t;
	t.addToGUI(GUI.InGame);
	t.opacity = 1;
	t.age = 0;
	t.delay = _delay;
	t.life = _life || 250;
	t.textWidth = 1;
	t.deleteOnReset = true;
	t.prim_count_factor = 0;
	t.subtitleText = subtitleText;
	t.subtitle = null;
	//t.w = 0;
	t.update = function(){
		/*if(Gamestats.cinematicMode && this.age < this.delay){
			return;
		}*/
		this.age += Render.frameDelta;
		if(this.age>this.delay){
			this.prim_count_factor = Math.min(1,this.prim_count_factor+Render.frameDelta/120);
		}
		if(this.age>this.delay + 200){
			if(this.subtitleText && !this.subtitle){
				this.subtitle = GUI.TypedTextElem(0,0.25,this.fontSize*0.6, this.subtitleText, GUI.align_center);
				this.addChild(this.subtitle);
				this.subtitle.addToGUI_after(GUI.InGame,this);
			}
		}
		if(this.age > this.life+this.delay){
			this.opacity-=0.01;
			if(this.age > this.life+this.delay+100){
				this.removeFromGUI(GUI.InGame);
			}
		}
		if(this.subtitle){
			this.subtitle.opacity = this.opacity;
		}
	}
	return t;
}


GUI.AddDamageMarker = function(xx,yy, scale){
	var e=new GUIElem();
	e.w *= scale;
	e.h *= scale;
	e.setPos(xx ,yy );
	e.asset = GUI.asset_rectCenter
	e.addToGUI(GUI.InGame);
	e.duration = 35;
	e.alphaBlended = true;
	e.texture = Asset.texture.evilsign;
	e.deleteOnReset = true;
	e.mouseBlocker = false;
	e.update = function(){
		this.opacity *= 0.9;
		this.duration--;
		if(this.duration <= 0){
			this.removeFromGUI(GUI.InGame);
		}
		this.w += 0.01*Render.frameDelta;
		this.h += 0.01*Render.frameDelta;
	}
}


GUI.AddVictoryButton = function(){
	var b = GUI.MenuButton(0.5,0.6,"Continue");
	b.align_x = GUI.align_center;
	b.setPos(b.x,b.y);
	b.addToGUI(GUI.Elements);
	b.mapId = Gamestats.LevelPaths.indexOf(M.filename);
	b.deleteOnReset = true;
	b.callback = function(){
		if(this.mapId != 11){
			if(this.mapId >= 0 && this.mapId < 12){
				Gamestats.briefingPromise = this.mapId + 1;
			}
			Gamestats.Surrender();
		}else{
			Gamestats.ExitZone("maps/campaign/ending.txt");
		}
	}
	return b;
} 
GUI.AddDefeatButton = function(){
	var b = GUI.AddVictoryButton();
	b.callback = function(){
		Gamestats.briefingPromise = -1;
		Gamestats.Surrender();
	}
	return b;
}

GUI.Reset = function(){
	GUI.Elements_Actors = [];
	GUI.ObjectiveTimers = [];
	GUI.ActorGUI = [];
	GUI.DialogPanel.setVisibility(false);
	for(var i=GUI.InGame.length-1;i>=0;--i){
		if(i >= GUI.InGame.length){
			continue; //can only happen if 2 or more elements are removed from end of array
		}
		if(GUI.InGame[i].reset){
			GUI.InGame[i].reset();
		}
		if(GUI.InGame[i].deleteOnReset == true){
			GUI.InGame[i].removeFromGUI(GUI.InGame);
		}
	}
}


GUI.clickCheck = function(mouseButton){
	if(GUI.enabled == false){return;}
	var clickHappened = false;
	GUI.clickedElem = null;
	if(GUI.activeInputField != null){
		if(GUI.activeInputField.lose_focus_on_click){
			GUI.activeInputField.outOfFocus();
			GUI.activeInputField = null;
		}
	}
	
	for(var i=GUI.Elements.length-1; i>=0;--i){
		var e = GUI.Elements[i];
		if(e.mouseOverCheck() == true){
			clickHappened = true;
			
			if(mouseButton == 1){
				Control.leftMousePressed_GUI = true;
				if(e.callback != null){
					GUI.clickedElem = e;
					e.callback();
					return true;
				}
			}else if(mouseButton == 3){
				Control.rightMousePressed_GUI = true;
				if(e.callback_right != null){
					GUI.clickedElem = e;
					e.callback_right();
					return true;
				}
			}

		}
	}
	
	return clickHappened;
}

GUI.mouseWheelCheck = function( delta ){
	if(GUI.enabled == false){return false;}
	if(GUI.activeInputField != null){
		GUI.activeInputField.callback_scroll(delta);
		return true;
	}else{
		for(var i=GUI.Elements.length-1; i>=0;--i){
			var e = GUI.Elements[i];
			if(e.mouseOverCheck() == true){
				if(e.callback_scroll != undefined){
					e.callback_scroll(delta);
					return true;
				}
			}
		}
	}
	return false;
}

GUI.update_colors = function(){
	GUI.color_locked_phase+=0.1*Render.frameDelta;
	if(GUI.color_locked_phase > 6.28){
		GUI.color_locked_phase = 0;
	}
	var locked_color = Math.sin(GUI.color_locked_phase)*0.25;
	GUI.color_locked = [0.63+locked_color ,0.65+locked_color ,0.68+locked_color];
	GUI.color_unidentified = [0.73+locked_color ,0.63+locked_color ,0.53+locked_color];
}

GUI.draw = function(){
	GUI.buttonUnderCursor_last = GUI.buttonUnderCursor;
	GUI.buttonUnderCursor = null;
	GUI.keyOverrideElem = null;
	GUI.aspectRatio = GUI.getAspectRatio();
	GUI.update_colors();
	
	var mouseOver_candidate = null;
	for(var i=GUI.Elements.length-1; i>=0;--i){
		if(i >= GUI.Elements.length){
			continue; //this can happen when child is before the parent in the array
			//e.g. after using addToGUI_before
		}
		
		var e = GUI.Elements[i];
		
		if(e.mouseOverCheck() == true){
			e.color = e.mouseOverColor;
			if(e.isMouseOver == false){
				e.isMouseOver = true;
				if(e.mouseOverSound){
					e.mouseOverSound.play(0,0);
				}
			}
			
			if(e.key_override_condition && e.key_override_condition()){
				GUI.keyOverrideElem = e;
			}
			if(e.callback && !GUI.buttonUnderCursor){
				GUI.buttonUnderCursor = e;
			}
		}else{
			e.isMouseOver = false;
			e.color = e.defaultColor;
		}
		
		if(e.update != undefined){
			e.update();
		}
	}
	/*if(mouseOver_candidate){
		if(GUI.mouseOverElem != mouseOver_candidate){
			GUI.mouseOverElem = mouseOver_candidate;
			if(mouseOver_candidate.mouseOverSound){
				mouseOver_candidate.mouseOverSound.play(0,0);
			}
		}
	}else{
		GUI.mouseOverElem = null;
	}*/
	
	if(Control.gameState == Control.gameState_inEditor){
		for(var i=GUI.Elements_Tags.length-1; i>=0;--i){
			if(GUI.Elements_Tags[i].update){
				GUI.Elements_Tags[i].update();
			}
		}
		draw_ui( GUI.Elements_Tags);
	}
	
	draw_ui( GUI.Elements );
	
	for(var i=GUI.Elements_Alerts.length-1; i>=0;--i){
		if(GUI.Elements_Alerts[i].update){
			GUI.Elements_Alerts[i].update();
		}
	}
	draw_ui( GUI.Elements_Alerts);
}

GUI.clickedElemLoop = function(){
	if(this.clickedElem != null){
		this.clickedElem.clickedLoop();
	}
}

GUI.releaseClickedElem = function(){
	this.clickedElem = null;
}

GUI.restoreContext = function(){
	for(var i=0;i<GUI.Elements.length;++i){
		if(GUI.Elements[i].setText != undefined){
			GUI.Elements[i].setText(GUI.Elements[i].text);
		}
	}
}
GUI.refresh_all_positions = function(){
	for(var i=0;i<this.Elements.length;++i){
		if(this.Elements[i].parent == null){
			this.Elements[i].updatePos();
		}
		
	}
}