/**
 * @author Noel's
 */
/**
 * @author Noel's
 */
(function (){
	
	var Mini = function(imagePath,stageObject,collisionObject){
		this.pointValue= 5;
		
		//private vars
		var mini = this;
		var stage = stageObject;
		var drop;
		var collision;
		var pointScored = false;
		var spriteData = new createjs.SpriteSheet({
			images:[imagePath],
			frames:{width:117,height:135},
			animations:{idle:[0],points:[1,9]}
		});
		
		mini.initialize(spriteData);
		mini.gotoAndPlay("idle");
		
		//event listeners
		mini.addEventListener('tick',handleTick);
		mini.addEventListener('animationend',handleAnimationFinish);
		
		//animation
		drop = TweenMax.to(mini,2.15,{y:stage.height, ease:Power3.easeIn,onComplete:finished,onReverseComplete:finished});
		
		
		
		//handlers
		function handleTick(e){
			
			 collision = ndgmr.checkPixelCollision(mini,collisionObject,0.75);
			 
			 if(collision){
			 	drop.reverse();
			 	mini.gotoAndPlay("points");
			 }
			 

		}
		
		function finished(){
			stage.removeChild(mini);
		}
		
		function handleAnimationFinish(e){
			mini.stop();
		}
		
	}//end of constructor
	
	Mini.prototype.constructor = Mini;
	Mini.prototype = new createjs.BitmapAnimation();
	
	Mini.prototype.getPoints = function(){
		return this.pointValue;
	}
	
	window.Mini = Mini;
})();
