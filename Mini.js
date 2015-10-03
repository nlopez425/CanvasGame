(function(){

	"use strict";
	
	function Mini(imagePath,stageObject,collisionObject){
		
		//call to super
		createjs.BitmapAnimation.call(this);
		
		//vars
		var _this = this;
		_this.pointValue = 5;
		_this.stage = stageObject;
		_this.collisionObj = collisionObject;
		_this.drop;
		_this.collision;
		_this.pointScored = false;
		
		_this.spriteData = new createjs.SpriteSheet({
			images:[imagePath],
			frames:{width:117,height:135},
			animations:{idle:[0],points:[1,9]}
		});
		
		_this.initialize(_this.spriteData);
		_this.gotoAndPlay("idle");
		
		//event listeners
		_this.addEventListener('tick',handleTick.bind(_this));
		_this.addEventListener('animationend',handleAnimationFinish.bind(_this));
		
		//animation
		_this.drop = TweenMax.to(_this,2.15,{y:_this.stage.height, ease:Power3.easeIn,onComplete:finished.bind(_this),onReverseComplete:finished.bind(_this)});
	}
	
	/*Prototype Properties*/
	Mini.prototype.constructor = "Mini";
	Mini.prototype = Object.create(createjs.BitmapAnimation.prototype);
	
	Mini.prototype.getPoints = function(){
		
		return this.pointValue;
		
	}
	
	/*Event Handlers*/
	function handleTick(e){
		
		var _this = this;
		
		 _this.collision = ndgmr.checkPixelCollision(_this,_this.collisionObj,0.75);
		 
		 if(_this.collision){
		 	_this.drop.reverse();
		 	_this.gotoAndPlay("points");
		 }
		 

	}
	
	function finished(){
		
		var _this = this;
		
		_this.stage.removeChild(_this);
		
	}
	
	function handleAnimationFinish(e){
		
		var _this = this;
		
		_this.stop();
		
	}
	//expose to global scope
	window.Mini = Mini;
}());