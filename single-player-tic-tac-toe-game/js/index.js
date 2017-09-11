//chane symbol by having switches that toggle currentPlayer.symbol and game.mode 

Set.prototype.isSuperset = function(subset) {
    for (var elem of subset) {
        if (!this.has(elem)) {
            return false;
        }
    }
    return true;
}

let waysToWin = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];


function Game() {
  function toggleXO(){
      var input = document.getElementById("input");
      if (input.checked){
        player1.symbol = "o";
        player2.symbol = "x";
        }
      else{
        player1.symbol = "x";
        player2.symbol = "o";
      }
  }
  this.initialize = function () {
      mode = "single";
      player1 = new User("player1","x");
      //make computer subclass of player
      if (mode=="single"){
          player2 = new User("computer","o")}
      if (mode=="double"){
          player2 = new User("player2","o");
        };
      toggleXO();
      state = {player1:[], player2:[], remaining:[1,2,3,4,5,6,7,8,9]}
      turnCount = 1;
      currentPlayer = player1;
//      state = {};
      addEventListenersToBoard();
  }
   document.getElementById("input").addEventListener("click", toggleXO);
    
  allSquares = document.getElementsByClassName('square');
  addEventListenersToBoard = function (){for (var i=0; i<allSquares.length; i++) {
    allSquares[i].addEventListener('click', playTurn, false);
    }}
  
  this.switchPlayer = function () {
    if (currentPlayer == player1) {
      currentPlayer = player2;
    }
    else {
      currentPlayer = player1;
    }
  }
  let dplay = function(id){
    thisSquare = document.getElementById(id);
    currentPlayer.addSquare(id);
    index=state.remaining.indexOf(parseInt(id));
    state.remaining.splice(index,1);
    thisSquare.removeEventListener("click", playTurn, false);
    turnCount++;
    thisSquare.className += ' '+ currentPlayer.name;
    thisSquare.innerText = currentPlayer.symbol;
    if (turnCount > 5 ){
      let w = currentPlayer.checkWins();
      if (w==true) {
        alert(currentPlayer.symbol+" wins!!!")
        game.initialize();
        game.clearXAndO();
      }
      else if (turnCount == 10) {
        game.initialize();
        game.clearXAndO();
      } 
      else {  
        game.switchPlayer();
        if (mode == "single"&& currentPlayer.name != "player1"){
          game.computerPlay();
      } 
      }
    }
    else {
      game.switchPlayer();
      if (mode == "single"&& currentPlayer.name != "player1"){
        game.computerPlay();
      }  
    }
  }
  
  this.computerPlay = function () {
    max = state.remaining.length;
    randomIndex=Math.floor(Math.random()*(max));
    randomSquare = state.remaining[randomIndex];
    randomSquareId = randomSquare;
    dplay(randomSquareId);
  }
  this.clearXAndO = function () {for (var i=0; i<allSquares.length; i++){
    allSquares[i].classList.remove(player1.name);
    allSquares[i].classList.remove(player2.name);
    allSquares[i].innerText = "";
  }}
  let playTurn = function () {
    id = this.id;
    dplay(id);
  }
  this.initialize();                              
}

function User(name,symbol){
  this.symbol = symbol;
  this.name = name;
//  this.color = color;
  this.squares = [];
  this.addSquare = function(squareId){
    this.squares.push(parseInt(squareId));
  }
  this.checkWins = function(){
    let setA = new Set (this.squares);
    let winFound = waysToWin.filter(function(win){
      let setB = new Set(win);
      return setA.isSuperset(setB);
    })
    if (winFound.length>0){
      return true;
    }
  } 
}

let game = new Game;