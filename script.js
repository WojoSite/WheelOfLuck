$(document).ready(function($) {
  var WheelofLuck = {
    contestantArray: [],
    currentContestant: null,
    phraseArray: [
      {phrase: "SEVENTH INNING STRETCH", hint: "Baseball Break"},
      {phrase: "SECRETARY OF STATE", hint: "Fourth in Line"},
      {phrase: "WEINER SCHNITZEL", hint: "A Little Vienna Cut"}
    ],
    currentPhrase: null,
    wheel: [1,1,1,1,1,2,2,2,2,3,3,3,3,4,4,5,"Lose Turn", "Bankrupt"],
    consonants: ["B","C","D","F","G","H","J","K","L","M","N","P","Q","R","S","T","V","W","X","Y","Z"],
    vowels: ["A","E","I","O","U"],
    currentGuess: null,
    multiplier: [],
    guessedLetters: [],
    currentSpinVal: null,
    roundCounter: 0,
    init: function(){
      console.log("Let's play Wheel of Luck!");
        WheelofLuck.addListeners();
    },
    // ======== Add Listeners ========
    addListeners: function(){
      var addBtn = document.getElementById("contestant-add-btn");
      addBtn.addEventListener("click", WheelofLuck.addContestant);
      var addBtn = document.getElementById("load-game-btn");
      addBtn.addEventListener("click", WheelofLuck.zeroContestantCheck);
      var startBtn = document.getElementById('start-game-btn');
      startBtn.addEventListener("click", WheelofLuck.gamePlay);
    },
    addContestant: function(){
      var msg;
      if (WheelofLuck.contestantArray.length == 3) {
        msg = "You have added the maximum amount of players (3). Load your game!";
        WheelofLuck.msgModalFire(msg);
      } else if ($('#name-input').val() == "") {
        msg = "You must enter a name before adding a player.";
        WheelofLuck.msgModalFire(msg);
      }else{
      var userNameInput = $('#name-input').val();
      var nameId = Math.floor(Math.random()*100000+1);
      var nextContestant = new WheelofLuck.Contestant(userNameInput, nameId);
      $('#load-game-btn').fadeIn();
      WheelofLuck.clearForm();
      WheelofLuck.displayContestantAmt();
      }
    },
    displayContestantAmt: function(){
      $('#added-contestants').html("Contestants: " + WheelofLuck.contestantArray.length);
      var contestantDiv = document.getElementById("added-contestants-container");
      var addedContestant = WheelofLuck.contestantArray[WheelofLuck.contestantArray.length-1];
      var nameH2 = document.createElement("h2");
      nameH2.className = "added-contestant";
      nameH2.innerHTML = addedContestant.name;
      contestantDiv.appendChild(nameH2);
    },
    zeroContestantCheck: function(){
      var msg;
      if (WheelofLuck.contestantArray.length == 0){
        msg = "You must enter at least one contestant to play.";
        WheelofLuck.msgModalFire(msg);
      } else {
        WheelofLuck.gameBoardCreator();
      }
    },
    gameBoardCreator: function(){
      $('#load-game-container').slideUp();
      $('#start-game-container').slideDown();
      var contestantsContainer = document.getElementById('contestants-container');
      for (var i = 0; i < WheelofLuck.contestantArray.length; i++) {
        var contestantTable = document.getElementById('contestants-table');
        var tableRow = document.createElement("tr");
        tableRow.className = "turn-off";
        tableRow.setAttribute("id", WheelofLuck.contestantArray[i].name+i);
        var contestantTd = document.createElement("td");
        contestantTd.className = "contestant-name";
        contestantTd.innerHTML = WheelofLuck.contestantArray[i].name;
        var contestantPts = document.createElement("td");
        contestantPts.className = "pts";
        contestantPts.innerHTML = WheelofLuck.contestantArray[i].points;
        contestantPts.setAttribute('id', WheelofLuck.contestantArray[i].id + "pts");
        tableRow.appendChild(contestantTd);
        tableRow.appendChild(contestantPts);
        contestantTable.appendChild(tableRow);
      }
      var randomNumber = Math.floor((Math.random() * 3));
      $('#phrase-hint').html("Hint: "+WheelofLuck.phraseArray[randomNumber].hint);
      WheelofLuck.currentPhrase = WheelofLuck.phraseArray[randomNumber].phrase;
      console.log(WheelofLuck.currentPhrase);
      var PhraseBdCont = document.getElementById('phrase-board-container');
      for (var i = 0; i < WheelofLuck.currentPhrase.length; i++) {
        if (WheelofLuck.currentPhrase[i] == " ") {
          var phraseBdDiv = document.createElement("br");
          PhraseBdCont.appendChild(phraseBdDiv);
        } else {
          var phraseBdDiv = document.createElement("div");
          phraseBdDiv.className = "phrase-letter-div";
          var phraseBdP = document.createElement("p");
          phraseBdP.className = "letter";
          phraseBdP.id = i;
          phraseBdP.innerHTML = WheelofLuck.currentPhrase.charAt(i);
          phraseBdDiv.appendChild(phraseBdP);
          PhraseBdCont.appendChild(phraseBdDiv);
        }
      }
    },
    Contestant: function(name, id){
      this.name = name;
      this.id = id;
      this.points = 0;
      WheelofLuck.contestantArray.push(this);
    },
    clearForm: function(){
      var nameAddForm = document.getElementById("name-input-form");
      nameAddForm.reset();
      return false
    },
    gamePlay: function(){
      $('#start-game-container').slideUp();
      $('#gameboard-container').slideDown();
      WheelofLuck.currentContestant = WheelofLuck.contestantArray[0];
      WheelofLuck.roundCounter++;
      $('#spin-btn').on('click', WheelofLuck.spinWheel);
      $('#solve-submit').on('click', WheelofLuck.puzzleSolve);
      $('#consonant-submit').on('click', WheelofLuck.consonantEntry);
      $('#vowel-submit').on('click', WheelofLuck.buyVowel);
      $('#current-turn-name').html("Turn: " + WheelofLuck.currentContestant.name);
      $('#round').html("Round: " + WheelofLuck.roundCounter);
    },
    doTurn: function(){
      WheelofLuck.roundCheck();
      console.log("Do Turn Fired!");
      WheelofLuck.clearBoth();
      $('#spin-btn').on('click', WheelofLuck.spinWheel);
      $('#current-turn-name').html("Turn: " + WheelofLuck.currentContestant.name);
      $('#round').html("Round: " + WheelofLuck.roundCounter);
    },
    roundCheck: function(){
      var msg;
      if (WheelofLuck.roundCounter == 6){
        if (WheelofLuck.contestantArray.length == 1){
          msg = "Since it's a solo game, you win!";
          WheelofLuck.msgModalFire(msg);
        } else {
          var contestant1Pts = WheelofLuck.contestantArray[0].points;
          var contestant2Pts = WheelofLuck.contestantArray[1].points;
          var contestant3Pts = WheelofLuck.contestantArray[2].points;
          if (contestant1Pts > contestant2Pts && contestant1Pts > contestant3Pts){
            msg = WheelofLuck.contestantArray[0].name + " wins with " + WheelofLuck.contestantArray[0].points + "points!";
          } else if (contestant2Pts > contestant1Pts && contestant2Pts > contestant3Pts){
            msg = WheelofLuck.contestantArray[1].name + " wins with " + WheelofLuck.contestantArray[1].points + "points!";
          } else {
            msg = WheelofLuck.contestantArray[2].name + " wins with " + WheelofLuck.contestantArray[2].points + "points!";
          }
          WheelofLuck.msgModalFire(msg);
        }
      }
    },
    spinWheel: function(){
      $('#spin-btn').css('animation', 'spin 2s');
      console.log("Spin wheel fired!");
      var randomNumber = Math.floor((Math.random() * 18));
      var loseTurn = "Lose Turn!"
      var bankrupt = "Bankrupt!"
      var nextTurnMsg = "Next player is up."
      var makeGuessMsg = "Choose a letter!"
      WheelofLuck.currentSpinVal = WheelofLuck.wheel[randomNumber];
      var spinResult = WheelofLuck.currentContestant.name + " spun a " + WheelofLuck.currentSpinVal;
      $('#spin-word').html(WheelofLuck.currentSpinVal);
      if (WheelofLuck.currentSpinVal == "Lose Turn"){
        WheelofLuck.spinModalFire(loseTurn, nextTurnMsg);
        WheelofLuck.nextContestant();
      } else if (WheelofLuck.currentSpinVal == "Bankrupt") {
        WheelofLuck.spinModalFire(bankrupt, nextTurnMsg);
        for (var i = 0; i < WheelofLuck.contestantArray.length; i++){
          if (WheelofLuck.contestantArray[i].id == WheelofLuck.currentContestant.id){
            WheelofLuck.contestantArray[i].points = 0;
            var ptSelector = '#' +WheelofLuck.currentContestant.id + "pts";
            $(ptSelector).html(WheelofLuck.contestantArray[i].points);
          }
        }
        $('#spin-btn').off('click');
        WheelofLuck.nextContestant();
      } else {
        $('#guess-consonant').off('click');
        $('#guess-vowel').off('click');
        $('#solve-puzzle').off('click');
        WheelofLuck.spinModalFire(spinResult, makeGuessMsg);
        $('#guess-consonant').on('click', WheelofLuck.consonantModalFire);
        $('#guess-vowel').on('click', WheelofLuck.vowelModalFire);
        $('#solve-puzzle').on('click', WheelofLuck.solveModalFire);
        $('#spin-btn').off('click');
      }
    },
    buyVowel: function(){
      var msg;
      console.log("Buy vowel click success");
      var vowelEntry = $('#vowel-input').val().toUpperCase();
      WheelofLuck.currentGuess = vowelEntry;
      if ($.inArray(WheelofLuck.currentGuess, WheelofLuck.vowels) == -1){
        msg = "Please enter a vowel.";
        WheelofLuck.msgModalFire(msg);
      } else if ($.inArray(WheelofLuck.currentGuess, WheelofLuck.guessedLetters) != -1){
        msg = WheelofLuck.currentGuess + " has already been guessed. Next player's turn!";
        WheelofLuck.msgModalFire(msg);
        WheelofLuck.nextContestant();
      } else {
        for (var i = 0; i < WheelofLuck.contestantArray.length; i++){
          if (WheelofLuck.contestantArray[i].id == WheelofLuck.currentContestant.id){
            WheelofLuck.contestantArray[i].points = WheelofLuck.contestantArray[i].points - 1;
            var ptSelector = '#' +WheelofLuck.currentContestant.id + "pts";
            $(ptSelector).html(WheelofLuck.contestantArray[i].points);
          }
        }
        WheelofLuck.guessedLetters.push(WheelofLuck.currentGuess);
        console.log(WheelofLuck.guessedLetters);
        WheelofLuck.checkGuess();
      }
      $('.vowel-modal-bg').css("display", "none");
    },
    consonantEntry: function(){
      var msg;
      console.log("Consonant Entry!");
      WheelofLuck.currentGuess = $('#consonant-input').val().toUpperCase();
      if ($.inArray(WheelofLuck.currentGuess, WheelofLuck.consonants) == -1){
        msg = "Please enter a valid consonant.";
        WheelofLuck.msgModalFire(msg);
      } else if ($.inArray(WheelofLuck.currentGuess, WheelofLuck.guessedLetters) != -1){
        mag = WheelofLuck.currentGuess + " has aleady been guessed. Next player's turn!";
        WheelofLuck.msgModalFire(msg);
        WheelofLuck.nextContestant();
      } else {
        WheelofLuck.guessedLetters.push(WheelofLuck.currentGuess);
        WheelofLuck.checkGuess();
      }
      $('.consonant-modal-bg').css("display", "none");
    },
    checkGuess: function(){
      console.log("Checking Guess");
      if ($.inArray(WheelofLuck.currentGuess, WheelofLuck.currentPhrase) !== -1){
        WheelofLuck.handleSuccess();
      } else {
        WheelofLuck.handleFail();
      }
    },
    handleSuccess: function() {
      var msg;
      console.log("Handle Success Fired!");
      for (var i = 0; i < WheelofLuck.currentPhrase.length; i++) {
        if (WheelofLuck.currentPhrase[i] == WheelofLuck.currentGuess){
          WheelofLuck.multiplier.push(WheelofLuck.currentPhrase[i]);
          var letterBox = document.getElementById(i);
          letterBox.style.color = "white";
        }
      }
      var letterMultiplier = WheelofLuck.multiplier.length;
      var pointsAwarded = (WheelofLuck.currentSpinVal * letterMultiplier);
      if (letterMultiplier == 1){
        msg = "There is one " + WheelofLuck.currentGuess + "!";
        WheelofLuck.msgModalFire(msg);
      } else {
        msg = "There are " + letterMultiplier + " " + WheelofLuck.currentGuess + "'s !";
        WheelofLuck.msgModalFire(msg);
      }
      if ($.inArray(WheelofLuck.currentGuess, WheelofLuck.vowels) != -1){
      } else {
        for (var i = 0; i < WheelofLuck.contestantArray.length; i++){
          if (WheelofLuck.contestantArray[i].id == WheelofLuck.currentContestant.id){
            WheelofLuck.contestantArray[i].points = WheelofLuck.contestantArray[i].points += pointsAwarded;
            var ptSelector = '#' +WheelofLuck.currentContestant.id + "pts";
            $(ptSelector).html(WheelofLuck.contestantArray[i].points);
          }
        }
      }
      WheelofLuck.doTurn();
    },
    handleFail: function(){
      var msg;
      console.log("Handle Fail fired :(");
      msg = "Sorry, there are no " + WheelofLuck.currentGuess + "'s";
      WheelofLuck.msgModalFire(msg);
      WheelofLuck.handleGuessedLetter();
      WheelofLuck.nextContestant();
    },
    nextContestant: function(){
      console.log("Fired: Next Contestant");
        var nextContestant;
        for (var i = 0; i < WheelofLuck.contestantArray.length; i++) {
          if (WheelofLuck.contestantArray[i].id == WheelofLuck.currentContestant.id){
            nextContestant = i+1;
            if (nextContestant >= WheelofLuck.contestantArray.length){
              WheelofLuck.currentContestant = WheelofLuck.contestantArray[0];
              $('#current-turn-name').html(WheelofLuck.currentContestant.name);
              WheelofLuck.roundCounter++;
              WheelofLuck.doTurn();
              break
            } else {
              WheelofLuck.currentContestant = WheelofLuck.contestantArray[nextContestant];
              $('#current-turn-name').html(WheelofLuck.currentContestant.name);

              WheelofLuck.doTurn();
              break
            }
          }
        }
    },
    handleGuessedLetter: function(){
      console.log("Handle Guessed Letter Fired");
      var guessedLtrContainer = document.getElementById("guessed-letters-container");
      var mostRecentGuessedLetter = WheelofLuck.guessedLetters[WheelofLuck.guessedLetters.length-1];
      var guessedLtrBox = document.createElement("div");
      guessedLtrBox.className = "guessed-letter-box";
      var guessedLtr = document.createElement("p");
      guessedLtr.className = "guessed-letter";
      guessedLtr.innerHTML = mostRecentGuessedLetter;
      guessedLtrBox.appendChild(guessedLtr);
      guessedLtrContainer.appendChild(guessedLtrBox);
    },
    puzzleSolve: function(){
      var solveGuess = $('#solve-input').val().toUpperCase();
      console.log(solveGuess);
      var msg;
      var phrase;
      if (solveGuess == WheelofLuck.currentPhrase.toUpperCase()){
        msg = "Correct! You win!";
        phrase = WheelofLuck.currentPhrase.toUpperCase();
        var ltr = $('.letter');
        console.log(ltr);
        $('.letter').css("color", "white");


        WheelofLuck.msgModalFire(msg, phrase);
      } else {
        msg = "Sorry, that is incorrect. Next player's turn!";
        WheelofLuck.msgModalFire(msg);
        WheelofLuck.nextContestant();
      }
      $('.solve-modal-bg').css("display", "none");
    },
    clearBoth: function(){
    console.log("Clear!");
        $('#vowel-input').val(null);
        $('#consonant-input').val(null);
        $('#spin-word').html("Spin!");
        $('#guess-consonant').off('click');
        $('#guess-vowel').off('click');
        $('#solve-puzzle').off('click');
        $('#guess-consonant').on('click', console.log("guess-consonant clicked"));
        var msg = "Spin!"
        $('#guess-consonant').on('click', function(){
          WheelofLuck.msgModalFire(msg);
        });

        WheelofLuck.multiplier = [];
        WheelofLuck.currentSpinVal = null;
        WheelofLuck.currentGuess = null;
        document.getElementById('spin-btn').style.removeProperty('animation');
    },
    spinModalFire: function(x,y){
      $('#spin-result-text').html(x);
      $('#spin-result-message').html(y);
      $('.spin-modal-bg').show();
      window.setTimeout(function() {
        $('.spin-modal-bg').hide();
      }, 1500);
    },
    consonantModalFire: function(){
      $('#consonant-input').val("");
      $('.consonant-modal-bg').show();
      $('#consonant-closer').on('click',function(){
        $('.consonant-modal-bg').css("display", "none");
      });
    },
    vowelModalFire: function(){
      $('#vowel-input').val("");
      $('.vowel-modal-bg').show();
      $('#vowel-closer').on('click',function(){
        $('.vowel-modal-bg').css("display", "none");
      });
    },
    solveModalFire: function(){
      $('#solve-input').val("");
      $('.solve-modal-bg').show();
      $('#solve-closer').on('click',function(){
        $('.solve-modal-bg').css("display", "none");
      });
    },
    msgModalFire: function(x,y){
      $('#message').html(x);
      $('#sub-message').html(y);
      $('.msg-modal-bg').show();
      window.setTimeout(function() {
        $('.msg-modal-bg').hide();
      }, 1500);
    }
  }
  WheelofLuck.init();
});
