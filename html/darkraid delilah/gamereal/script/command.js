function Move_Issued_Single(u, targetObject, ability){
	if(u.alive == false){
		return;
	}
	
	var targetUnit = targetObject.alive ? targetObject : null;
	var movePos = [targetObject.x, targetObject.y];
	u.formation = null;
	u.followUnit = null;
	var abilityInst = Unit.getAbilityInstance(u , ability);
	if(abilityInst != null){
		abilityInst.shots = abilityInst.proto.shots;
		if(targetUnit == null){
			if(u.stationary == false){
				u.setBaseTask(Task.Alone_Move_Task(u, new Point(movePos[0], movePos[1]), abilityInst));
			}
		}else{
			u.Stop();
			if(u.stationary == false){
				u.addSubTask( Task.ChaseTask_SingleTarget( u, targetUnit, abilityInst));
			}else{
				u.addSubTask( Task.AttackTask_Base( u, targetUnit, abilityInst));
			}
		}		
	}
}

/*function Move_Issued_Handler(arr, targetObject , ability ){
	var arrs = [[],[],[]];
		
	for(var i=0;i<arr.length;++i){
		arrs[arr[i].blockerCollisionTreshold].push(arr[i]);
	}

	if(arrs[0].length > 0){
		Move_Issued_CollisionCategory(arrs[0], Ability.lastTargetObject, ability); 
	}
	if(arrs[1].length > 0){
		Move_Issued_CollisionCategory(arrs[1], Ability.lastTargetObject, ability); 
	}
	if(arrs[2].length > 0){
		//Move_Issued_CollisionCategory(arrs[2], Ability.lastTargetObject, ability); 
	}
}*/

function Ai_Move_Handler(unitArr, targetObject , ability){
	Move_Issued_Handler(unitArr, targetObject , ability, null, true );
}

function Move_Issued_Handler(unitArr, targetObject , ability, formation, reconstructed ){
	if(Net.online && !reconstructed){
		//play the quote when player clicks, creates the illusion of responsiveness
		if(unitArr[0].selected && Control.selectionLeader && Control.selectionLeader.owner == Control.currentPlayer){
			Unit.quote_move(Control.selectionLeader);
		}
		Net.storeOrder(unitArr, targetObject , ability, formation);
		return;
	}
	var dragEndPoint_World = rayCastScreen(Control.mouseX, Control.mouseY, 0);
	var targetUnit = (targetObject && targetObject.alive) ? targetObject : null;
	var movePos = [targetObject.x, targetObject.y];
	
	if(unitArr.length > 0 && Pathfinder.getNodeAt(movePos[0],movePos[1]) != undefined){
		if(!Net.online && unitArr[0].selected && Control.selectionLeader && Control.selectionLeader.owner == Control.currentPlayer){
			//don't play it in online mode because it's already been played
			Unit.quote_move(Control.selectionLeader);
		}
		if(unitArr.length == 1){
			Move_Issued_Single(unitArr[0] ,targetObject, ability);
		}else if(ability.cast_by_only_one == false){
			var order =  new MoveOrder(Pathfinder,movePos[0], movePos[1], unitArr.length);
			Pathfinder.MoveOrders.push(order);
			for(var i =0;i<unitArr.length;++i){
				var u = unitArr[i];
				u.followUnit = null;
				
				if(u.alive == false){
					continue;
				}
				if(u.blockerCollisionTreshold != 0){
					Move_Issued_Single(u, targetObject, ability);
					continue;
				}
				
				var abilityInst = Unit.getAbilityInstance(u, ability);
				if(abilityInst == null){
					continue;
				}
				abilityInst.shots = abilityInst.proto.shots;
				/*if(unitArr[i].isStructure == true){
					continue;
				}*/
				if(u.stationary == false){
					var task = Task.OrderedMovementTask(u, targetUnit, abilityInst);
					u.setBaseTask(task);
					order.addMember(task);
				}else if(targetUnit != null){
					u.Stop();
					u.addSubTask( Task.AttackTask_Base( u, targetUnit, abilityInst));
				}				
			}
			if(targetUnit == null){
				//TODO: make formations deterministic
				if(!unitArr[0].owner.ai && formation){
					order.setFormationShape(formation.angle, formation.cols, formation.rows, formation.spread);
				}else{
					order.setFormationShape(unitArr[0].angle, 5, 8,0.1);
				}
				order.start(true);
			}else{
				order.setFormationShape(0, 0,0,0.1);
				order.start(false);
			}
		}else{
			//for abilities that should be cast only by one member of the group on a single target (e.g. Repulsion)
			var closestCaster = null;
			var closestDist = 99999;
			var overwriteCaster = null; //fallback unit, it will try casting same ability, just on another target
			var overwriteDist = 99999;
			for(var i =0;i<unitArr.length;++i){
				var u = unitArr[i];
				var dist = Utils.distance_xxyy(movePos[0],u.x,movePos[1],u.y);
				var ab = Unit.getAbilityInstance(u, ability);
				if(u.alive && ab && ab.cooldownCounter <= 0){
					if(u.task.ability == ability){//unit is already ordered to cast this ability, store it for fallback
						if(dist < overwriteDist){
							overwriteCaster = u;
							overwriteDist = dist;
						}	
					}else{
						if(dist < closestDist){
							closestDist = dist;
							closestCaster = u;
						}
					}	
				}
			}
			if(closestCaster){
				Move_Issued_Single(closestCaster, targetObject, ability);
			}else if(overwriteCaster){
				Move_Issued_Single(overwriteCaster, targetObject, ability);
			}
		}
	}
}
TrainingCancelOrder = function(u,id,reconstructed){
	if(reconstructed|| !Net.online){
		if(u.alive){
			if(u.trainingQueue && u.born){
				Unit.cancelTrainingId(u,id); 
			}else if(u.garrisonArray){
				Unit.ungarrisonId(u, id);
			}else if(!u.born && u.isStructure){
				Unit.cancelBuilding(u);
			}
		}
	}else{
		Net.storeOrder([u],id, Ability.NetTrainingCancel ,null);
	}
}
InstantOrder = function(unitArr, ability, reconstructed){
	var callHappened = false;
	for(var i=unitArr.length-1;i>=0;--i){
		sel_ab = Unit.getAbilityInstance(unitArr[i], ability);
		if(sel_ab != null){
			if(sel_ab.startCall() == true){
				callHappened = true;
				if(ability.targetMode == Ability.target_none 
				&& (reconstructed || ability.client_only || !Net.online )){
					sel_ab.cast( null ); //instant spellcast, without a target (or cast on self)
				}
			}
		}
	}
	if(ability.targetMode == Ability.target_none && !ability.client_only && !reconstructed && Net.online){
		Net.storeOrder(unitArr, null, ability , null);
	}
	return callHappened;
}

MinimapOrder = function(x,y){
	if(Selected.length > 0){
		Control.SetAbilityTarget(new Point(x,y), Ability.Move);
		Move_Issued_Handler(Selected, Ability.lastTargetObject, Ability.Move);
	}
}

function Command(){
	this.dragWorld = false;
	this.dragScreen = false;
	this.instant = false;
	
	this.leftClickRelease = function(){};
	this.rightClickRelease = function(){};
	this.leftClickPress = function(){};
	this.rightClickPress = function(){};
	this.loop = function(){};
	this.doubleClick = null;
	
	this.cursorTexture = Textures[7];
	this.cursorStyle = "textures/cursor.png";
	this.cursorStyle2 = "textures/cursor_highlight.png";
	this.cursorStyle3 = "textures/cursor_enemy.png";
	this.cursorOffset = [0,0];
	this.buildingCursor = false;
	this.ability = null;
}

Command.SelectUnit = function(){
	var c = new Command();
	c.cursorStyle = c.cursorStyle2;
	c.dragScreen = true;
	c.leftClickRelease = function(){
		//Control.Selection_End(false); 
		//Control.SetCommand(Command.Idle);
	};
	c.rightClickPress = function(){
		//Control.Selection_End(true); Control.SetCommand(Command.Idle);
	};	
	c.doubleClick = function(){
		/*Control.Selection_End(true); 
		if(Control.PlayerHasControlOverSelection() == true
		&& Selected.length == 1){
			//Control.SelectFormation();
			if(Control.GetUnitUnderCursor(Unit.isSelected)){
				Control.SelectSimilarVisible();
			}
		}
		Control.SetCommand(Command.Idle);*/
	;}
	return c;
}

Command.Idle = function(){
	var c = new Command();
	c.loop = function(){
	}
	
	c.rightClickPress = function(){
  
	};
	c.leftClickPress = function(){
		//Control.SetCommand(Command.SelectUnit);
	};
	
	c.mouseWheel = function(delta){
		Weapon.mouse_scroll(delta);
		//if(delta > 0){
		//}else{
		//}
	}
	
	return c;
}

Command.Idle_Editor = function(){
	var c = new Command();
	
	c.leftClickPress = function(){
		if(Editor.brushMode == Editor.brushMode_Select){
			Control.SetCommand(Command.Editor_Select);
		}else if(Editor.brushMode == Editor.brushMode_GenPlace){
			Editor.placeGenObject(Control.terrainCursorPos[0], Control.terrainCursorPos[1]);
		}else if(Editor.brushMode == Editor.brushMode_Draw){
			Editor.place_draw_point(Control.terrainCursorPos[0], Control.terrainCursorPos[1])
		}else{
			Editor.PaintStart(Control.terrainCursorPos[0], Control.terrainCursorPos[1]);
			Control.SetCommand(Command.Editor_Paint);
		}
	};
	
	c.rightClickPress = function(){
		if(Control.pressed[87] == true){
			Editor.ResetHeightSelection();
		//}else if(Control.pressed[66] == true || Control.pressed[78] == true){
		//	Editor.ResetBoundingBoxZ();
		}else {
			if(Editor.brushMode == Editor.brushMode_Select){
				Editor.setBrushMode( Editor.brushMode_Place);
			}else if(Editor.brushMode == Editor.brushMode_Place){
				Editor.setBrushMode( Editor.brushMode_Select);
			}else if(Editor.brushMode == Editor.brushMode_Draw){
				Editor.finish_drawing_stroke();
				Editor.setBrushMode( Editor.brushMode_Select);
			}else{
				Editor.PaintStart(Control.terrainCursorPos[0], Control.terrainCursorPos[1]);
				Control.SetCommand(Command.Editor_Erase);
			}
		}
		
		
		//Control.SetCommand(Command.Select_Editor);
	};
	
	c.mouseWheel = function(delta){
		if(Control.pressed[87] == true){
			Editor.SetZ_scroll(delta);
		}else{
			//cam.near += -delta*0.8;
			cam.distance += -delta;
			cam.distance = Math.max(0.01, cam.distance);
		}
	}
	
	return c;
}

Command.Editor_Select = function(){
	var c = new Command();
	
	c.dragScreen = true;
	c.leftClickRelease = function(){
		Editor.Selection_End(false); 
		Control.SetCommand(Command.Idle_Editor);
	};
	c.rightClickPress = function(){
		Editor.Selection_End(true); Control.SetCommand(Command.Idle_Editor);
	};

	return c;
}

Command.Editor_Paint = function(){
	var c = new Command();
	c.leftClickRelease = function(){
		Editor.PaintEnd();
		Control.SetCommand(Command.Idle_Editor);
	}
	c.loop = function(){Editor.MousePaint(Control.terrainCursorPos[0], Control.terrainCursorPos[1],1);}
	return c;
};

Command.Editor_Erase = function(){
	var c = new Command();
	c.rightClickRelease = function(){
		Editor.PaintEnd();
		Control.SetCommand(Command.Idle_Editor);
	}
	c.loop = function(){Editor.MousePaint(Control.terrainCursorPos[0], Control.terrainCursorPos[1],3);}
	return c;
};

Command.prototype.setCursorId = function(id){
	var style = this.cursorStyle;
	if(id == 2){
		style = this.cursorStyle2;
	}else if(id == 3){
		style = this.cursorStyle3;
	}
	if(Control.pointer_locked){
		Control.pointer_locked_elem.src = style;
	}else{
		canvas.style.cursor = "url("+style+") "+this.cursorOffset[0]+" "+this.cursorOffset[1]+", default"
	}
}
