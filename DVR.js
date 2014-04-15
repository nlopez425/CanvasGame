/**
 * @author Noel's
 */
(function (){
	
	var DVR = function(imagePath,stageObject,collisionObject){
		this.pointValue = 10;
		
		//private vars
		var dvr = this;
		var stage = stageObject ;
		var drop;
		var collision;
		var pointScored = false;
		var spriteData = new createjs.SpriteSheet({
			images:[imagePath],
			frames:{width:193,height:83},
			animations:{idle:[0],points:[1,5]}
		});
		
		dvr.initialize(spriteData);
		dvr.gotoAndPlay("idle");
		
		//event listeners
		dvr.addEventListener('tick',handleTick);
		dvr.addEventListener('animationend',handleAnimationFinish);
		
		//animation
		drop = TweenMax.to(dvr,2.15,{y:stage.height, ease:Power3.easeIn,onComplete:finished,onReverseComplete:finished});
		
		
		
		//handlers
		function handleTick(e){
			
			 collision = ndgmr.checkPixelCollision(dvr,collisionObject,0.75);
			 
			 if(collision){
			 	drop.reverse();
			 	dvr.gotoAndPlay("points");
			 }
			 

		}
		
		function finished(){
			stage.removeChild(dvr);
		}
		
		function handleAnimationFinish(e){
			dvr.stop();
		}
		
	}//end of constructor
	
	DVR.prototype.constructor = DVR;
	DVR.prototype = new createjs.BitmapAnimation();
	
	
	
	window.DVR = DVR;
})();
