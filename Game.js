/**
 * @author Noel's
 */
(function(){
	var Game = function(canvasID){
		var canvas = document.getElementById(canvasID);
		var stage = new createjs.Stage(canvas);
		stage.width = canvas.width;
		stage.height = canvas.height;
		var tivo = new Tivo("images/tivoSprite.png");
		var dvr;
		var mini;
		var xloc = 0;
		var DVRcounter = 30;
      	var MiniCounter = 60;
      	var EnemyCounter = 20;
      	
      	//scoring
      	var score = 0;
     	var scoreDisplay = new createjs.Text("Score:","20px Arial","#000");
      	var scoreTrack = new createjs.Text("0","20px Arial","#000");
		
		stage.addChild(scoreDisplay);
      	stage.addChild(scoreTrack);
     
      
      	scoreDisplay.x = canvas.width - 130;
      	scoreDisplay.y = 5;

      	scoreTrack.x = canvas.width - 70;
      	scoreTrack.y = 5;
		
		//add tivo to stage
		stage.addChild(tivo);
		tivo.x = canvas.width/2 - tivo.getBounds().width/2;
		tivo.y = canvas.height - tivo.getBounds().height;
		
		
		//create the tick
		createjs.Ticker.setInterval(20);
		createjs.Ticker.setFPS(52);
		
		//event listeners
		createjs.Ticker.addEventListener('tick',handleStageTick);
      	
      	//event handlers
      	function handleStageTick(e){
      		//count down to place objects on stage
  			if(DVRcounter == 0){
  				makeDvr();
  				DVRcounter = 30;
  			}
  			
  			if(MiniCounter == 0){
	           makeMini();
	           MiniCounter = 60;
	        }
  			
  			DVRcounter --;
  			MiniCounter --;
      		
      		stage.update();
      	}//end of handleStageTick
      	
      	function detectCrash(e){
      		var object = e.target;
      		var collision = ndgmr.checkPixelCollision(object,tivo,.5);
      		if(collision){
      			score += object.getPoints();
      			scoreTrack.text = score;
      		}
      	}
      	//functions
      	function makeDvr(){
      		 dvr = new DVR("images/box_anim.png",stage,tivo);
      		 dvr.x = xloc;
	         dvr.y = -150;
	         xloc = Math.random() * canvas.width - 180;
	         if(xloc < 0){
	          xloc = 0;
	         }
	         
	         dvr.addEventListener('tick',detectCrash);
	         stage.addChild(dvr);
      	}
      	
      	function makeMini(){
      		 mini = new Mini("images/miniSprite.png",stage,tivo);
      		 mini.x = xloc;
	         mini.y = -150;
	         xloc = Math.random() * canvas.width - 180;
	         if(xloc < 0){
	          xloc = 0;
	         }
	         
	         mini.addEventListener('tick',detectCrash);
	         stage.addChild(mini);
      	}
      	
		console.log("game active");
		console.log(stage.getNumChildren());
		
	}//end of constructor
	
	
	window.Game = Game;
})()
