/**
 * @author Noel's
 */
(function(){
		
	var Tivo = function(imagePath){
		//public vars
		this.life = 100;
		
		//private vars
		var tivo = this;
		var leftPress = false;
		var rightPress = false;
		var walkingLeft = false;
		var walkingRight = false;
		var spriteData = new createjs.SpriteSheet({
			images:[imagePath],
			frames:{width:85,height:85},
			animations:{idle:[0],walkRight:[1,13],walkLeft:[14,26]}
			
		});
		
		tivo.initialize(spriteData);
		tivo.gotoAndPlay("idle");
		
		//event listeners
		tivo.addEventListener('tick',handleTick);
		document.addEventListener('keydown',handleKeyDown);
		document.addEventListener('keyup',handleKeyUp);
		
		//event handlers
		function handleTick(e){
			////////////////////////////////control tivo sprite
	        if(leftPress == true && rightPress == false){
	            if(tivo.x < 0){
	              null;
	            }else{
	              tivo.x -= 5;
	              tivo.walkLeft();
	            }
	          //console.log('left');
	        }else if(rightPress == true && leftPress == false){
	            if(tivo.x > 939){
	              null;
	            }else{
	              tivo.x += 5;
	              tivo.walkRight();
	            }
	
	        }
		}//end of handleTick
		
		function handleKeyDown(e){
			switch(e.keyCode){
				case 37: leftPress = true;
				break;
				
				case 39: rightPress = true;
				break;
			}
		}//end of keydown
		
		function handleKeyUp(e){
			switch(e.keyCode){
				case 37: leftPress = false;tivo.isWalkingLeft = false;
				break;
				
				case 39: rightPress = false;tivo.isWalkingRight = false;
				break;
			}
			
			if(leftPress == false && rightPress == false){tivo.gotoAndPlay("idle");}
		}//end of keyUp
	
	}//end of constructor
	
	Tivo.prototype.constructor = Tivo;	
	Tivo.prototype = new createjs.BitmapAnimation();
	
	Tivo.prototype.walkLeft = function(){
		if(!this.isWalkingLeft){
            this.gotoAndPlay("walkLeft");
            this.isWalkingLeft= true;
          }else{
            null;
          }
	}
	
	Tivo.prototype.walkRight = function(){
		if(!this.isWalkingRight){
            this.gotoAndPlay("walkRight");
            this.isWalkingRight= true;
          }else{
            null;
          }
	}
	
	Tivo.prototype.removeLife = function(item){
		this.life -= item.damage;
	}
	
	Tivo.prototype.getLife = function(){
		return this.life;
	}
	
	//allow access to tivo
	window.Tivo = Tivo;
})();
