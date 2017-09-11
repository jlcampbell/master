


var s, 
SimonGame = {
  
  init: function() {
    //kick things off
    console.log("kick things off");
    s = this.settings;
    this.addEventListeners();

    this.turnSequence.playAll();
    this.turnSequence.updateDOM();
    //tell turn sequence to play sound and light of its first random turn
  },
  settings: {
    mode: "notstrict",
    sounds: {
    '1': 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
    '2': 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
    '3': 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
    '4': 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
    },
  },  
//game methods
  addEventListeners: function() {
    //simon buttons
    listenToSimonButtons = function(){
      var buttons = document.getElementsByClassName("gameButton");
      for (var i=0; i<buttons.length; i++){
        buttons[i].addEventListener('click', SimonGame.clickResponse, false);
      }  
    },
    //reset button
    listenToResetButton = function(){
      document.getElementById("resetButton").addEventListener('click', SimonGame.reset, false);
    },  
    //mode toggle
    listenToModeToggle = function(){
      document.getElementById("modeToggle").addEventListener('click', SimonGame.toggleMode, false);
    }
    listenToSimonButtons();
    listenToResetButton();
    listenToModeToggle();
  },  
  reset : function(){
    SimonGame.turnSequence.reset();
    SimonGame.turnSequence.updateDOM();
    SimonGame.playerSequence.reset();
    SimonGame.playerSequence.updateDOM();
    SimonGame.init();
  },
  toggleMode : function(){
    if (document.getElementById("modeToggle").checked){
      SimonGame.settings.mode = "strict";
      console.log(SimonGame.settings.mode);
    }
    else {
      SimonGame.settings.mode = "notStrict";
    }
  },
  //play sound for this button
  //make light show for this button
  playLightAndSound : function(x){
    playLight = (function(id){
      console.log("play light "+id);
      document.getElementById(id).classList.add("js_active");
      setTimeout(function(){document.getElementById(id).classList.remove("js_active")}, 250);
    })(x);
    playSound = (function(id){
      console.log("play sound"+id);
      var url = SimonGame.settings.sounds[id];
      var a = new Audio(url);
      a.play();
    })(x);
  },
  clickResponse: function(){
    id = Number(this.id);
    SimonGame.clickResponse2(id);
  },
  clickResponse2 : function(id){
    //light on,off
    //fire sound
    //add to player sequence compare this with same index of other array 
    console.log(this);
    //player-facing response:
    this.playLightAndSound(id);
    
    //internal response:
    this.playerSequence.addTo(id);
    this.playerSequence.updateDOM();
    console.log(this.playerSequence.get());
      //game logic to see if play fits in turn sequence
    analyze = (function(){
      
      //check to see if this turn is right
      var count = SimonGame.turnSequence.getCount();
      var playerCount = SimonGame.playerSequence.get().length-1;
      console.log("count "+count);
      console.log("pseq "+SimonGame.playerSequence.get());
      //if player pressed right button
      if (SimonGame.playerSequence.get()[playerCount] == SimonGame.turnSequence.get()[playerCount]){ 
        console.log(SimonGame.playerSequence.get()[count]);
        console.log(SimonGame.turnSequence.get()[count]);
        console.log("pressed right button")
        //if player has pressed all buttons right
        if (SimonGame.playerSequence.get().length == count){
          if (count == 20){
            alert("you win!!!");
            SimonGame.reset();
          }
          console.log("last item of sequence, adding new element to sequence");
          SimonGame.playerSequence.reset();
          SimonGame.turnSequence.newTurn();
        }
        //else: we expect player is still pressing buttons
      }
      //else: player hit wrong button
      else if (SimonGame.settings.mode == "strict" ){
        document.getElementById("count").innerText = "WRONG, GAME OVER TRY AGAIN";
        setTimeout(function(){ SimonGame.reset(); }, 500);
      }
      else if (SimonGame.settings.mode != "strict"){
        document.getElementById("count").innerText = "TRY AGAIN";
        SimonGame.playerSequence.reset();
        SimonGame.turnSequence.playAll();
      }
    })();  
  },
  //properties of game  
  turnSequence : (function () {
      var _randomMove = Math.floor(Math.random()*4)+1;
      var seq = [_randomMove];
      var _addTo = function (){
        _randomMove = Math.floor(Math.random()*4)+1;
        seq.push(_randomMove);
      };
      var _updateDOM = function(){
          document.getElementById("turnSequence").innerText = seq;
          document.getElementById("count").innerText = seq.length;
        };
      var _playAll = function(){        
        for (i=0; i<seq.length; i++){
          (function(seq,i,time){
            setTimeout(function(){
              SimonGame.playLightAndSound(seq[i]);
            }, time);  
        })(seq,i,500+(500*i));
        
        }
      }
      
      return {
        reset: function(){
          _randomMove = Math.floor(Math.random()*4)+1;
          seq = [_randomMove];
        },
        getCount: function(){
          return seq.length;
        },
        get: function(){
          return seq;
        },
        updateDOM: function(){
          _updateDOM();
        },
        newTurn: function(){  
        _addTo();
        _playAll();
        _updateDOM();
        },
        playAll: function(){
          _playAll();
        }
      };
    })(),
  playerSequence : (function () {
      var seq = [];
      
      return {
        addTo: function(x){
          seq.push(x);  
        },
        reset: function(){
          seq = [];
        },
        get: function(){
          return seq;
        },
        updateDOM: function(){
          document.getElementById("playerSequence").innerText = seq;
        },
        
        
      };
    })(),
    
  
  
};

SimonGame.init();