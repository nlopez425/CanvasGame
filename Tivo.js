(function(){

	"use strict";

	function Tivo(imagePath){
		//call to super
		createjs.BitmapAnimation.call(this);

		//var
		var _this = this;
		_this.life = 100;
		_this.leftPress = false;
		_this.rightPress = false;
		_this.walkingLeft = false;
		_this.walkingRight = false;

		//set sprite data
		_this.spriteData = new createjs.SpriteSheet({
			images:[imagePath],
			frames:{width:85,height:85},
			animations:{idle:[0],walkRight:[1,13],walkLeft:[14,26]}
			
		});

		//initializiation
		_this.initialize(_this.spriteData);
		_this.gotoAndPlay("idle");


		//add event listeners
		_this.addEventListener('tick',handleTick.bind(_this));
		document.addEventListener('keydown',handleKeyDown.bind(_this));
		document.addEventListener('keyup',handleKeyUp.bind(_this));

	}

	/*prototype behaviors*/
	Tivo.prototype.constructor = "Tivo";
	Tivo.prototype = Object.create(createjs.BitmapAnimation.prototype);


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

	/*Event Handlers*/
	function handleTick(e){

			var _this = this;

			////////////////////////////////control tivo sprite
	        if(_this.leftPress == true && _this.rightPress == false){
	            if(_this.x < 0){
	              null;
	            }else{
	              _this.x -= 5;
	              _this.walkLeft();
	            }
	          //console.log('left');
	        }else if(_this.rightPress == true && _this.leftPress == false){
	            if(_this.x > 939){
	              null;
	            }else{
	              _this.x += 5;
	              _this.walkRight();
	            }
	
	        }
	}

	function handleKeyDown(e){

			var _this = this;

			switch(e.keyCode){
				case 37: _this.leftPress = true;
				break;
				
				case 39: _this.rightPress = true;
				break;
			}
		}//end of keydown
		
		function handleKeyUp(e){

			var _this = this;

			switch(e.keyCode){
				case 37: _this.leftPress = false;_this.isWalkingLeft = false;
				break;
				
				case 39: _this.rightPress = false;_this.isWalkingRight = false;
				break;
			}
			
			if(_this.leftPress == false && _this.rightPress == false){_this.gotoAndPlay("idle");}
		}//end of keyUp

	//expose to global scope
	window.Tivo = Tivo;
}());