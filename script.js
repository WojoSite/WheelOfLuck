
// +++++++++++++++ Methods +++++++++++++++

$(document).ready(function($) {
  var WheelofLuck = {
    // Contain each contestant from the contestant constructor
    contestantArray: [],
    // create Current Player property
    currentContestant: null,
    // ======== Phrase Object Array ========
    phraseArray: [
      {phrase: "SEVENTH INNING STRETCH", hint: "Baseball Break"},
      {phrase: "SECRETARY OF STATE", hint: "Fourth in Line"},
      {phrase: "WEINER SCHNITZEL", hint: "A Little Vienna Cut"}
    ],
    currentPhrase: null,
    // ======== Wheel Object Array ======== Holds objects representing wheel pieces and corresponding pt values
    wheel: [1,1,1,2,2,2,3,3,4,4,5,"Lose Turn", "Bankrupt"],
    consonants: ["B","C","D","F","G","H","J","K","L","M","N","P","Q","R","S","T","V","W","X","Y","Z"],
    vowels: ["A","E","I","O","U"],
    currentGuess: null,
    multiplier: [],
    guessedLetters: [],
    currentSpinVal: null,
    // create round counter property
    roundCounter: 0,
    // ======== Initialize App ========
    init: function(){
      console.log("Let's play Wheel of Luck!");

        // Fire Add Listeners method
        WheelofLuck.addListeners();
    },
    // ======== Add Listeners ========
    addListeners: function(){
      // "Contestant Add" form: on submit fires Contestant Constructor
      var addBtn = document.getElementById("contestant-add-btn");
      addBtn.addEventListener("click", WheelofLuck.addContestant);

      // "Load Game" Button: click fires Game Board Creator method,
      var addBtn = document.getElementById("load-game-btn");
      addBtn.addEventListener("click", WheelofLuck.zeroContestantCheck);

      // Start Game
      var startBtn = document.getElementById('start-game');
      startBtn.addEventListener("click", WheelofLuck.gamePlay);
    },
    addContestant: function(){

      // before firing:
        // If Contestants Array <= 3, tell user that there are already three players, and to click start game (or disable "add" or "submit" button)

      if (WheelofLuck.contestantArray.length == 3) {
        alert("You have added the maximum amount of players (3). Load your game!");
        //make add button disabled, too!
      } else if ($('#name-input').val() == "") {
        alert("You must enter a name before adding a player.")
      }else{
      var userNameInput = $('#name-input').val();
      var nameId = Math.floor(Math.random()*100000+1);
      var nextContestant = new WheelofLuck.Contestant(userNameInput, nameId);
      // Fire Clear Construtor method
      $('#load-game-btn').fadeIn();
      $('#start-page-message').css('display', 'none');
      WheelofLuck.clearForm();
      WheelofLuck.displayContestantAmt();
      }
    },
    // display # of contestants added.
    displayContestantAmt: function(){
      $('#added-contestants').html("Contestants: " + WheelofLuck.contestantArray.length);
      var contestantDiv = document.getElementById("added-contestants-container");
      var addedContestant = WheelofLuck.contestantArray[WheelofLuck.contestantArray.length-1];
      var nameP = document.createElement("p");
      nameP.className = "added-contestant";
      nameP.innerHTML = addedContestant.name;
      contestantDiv.appendChild(nameP);
    },
     // If the Contestants Array = 0, ask user to enter at least one contestant to play (or disable "add" or "submit" button)
    zeroContestantCheck: function(){
      if (WheelofLuck.contestantArray.length == 0){
        alert("You must enter at least one contestant to play.");
      } else {
        WheelofLuck.gameBoardCreator();
      }
    },
    gameBoardCreator: function(){
      $('#load-game-container').slideUp();
      $('#start-game-container').slideDown();
      // $('#gameboard-container').slideDown("slow");
//

      // HIDE THE START GAME CONTAINER
      var contestantsContainer = document.getElementById('contestants-container');

      for (var i = 0; i < WheelofLuck.contestantArray.length; i++) {
        var contestantDiv = document.createElement("div");
        contestantDiv.className = "contestant";
        contestantDiv.setAttribute('id', WheelofLuck.contestantArray[i].id);

        var nameDiv = document.createElement("div");
        nameDiv.className = "contestant-name";
        var nameP = document.createElement("p");
        nameP.className = "name";
        nameP.innerHTML = WheelofLuck.contestantArray[i].name;

        var ptsDiv = document.createElement("div");
        ptsDiv.className = "contestant-points";
        var ptsP = document.createElement("p");
        ptsP.className = "pts";
        ptsP.innerHTML = WheelofLuck.contestantArray[i].points;
        ptsP.setAttribute('id', WheelofLuck.contestantArray[i].id + "pts");

        nameDiv.appendChild(nameP);
        ptsDiv.appendChild(ptsP);
        contestantDiv.appendChild(nameDiv);
        contestantDiv.appendChild(ptsDiv);
        contestantsContainer.appendChild(contestantDiv);
      }

      // Randomly select object from Phrase Object Array
      var randomNumber = Math.floor((Math.random() * 3));
      $('#phrase-hint').html("Hint: "+WheelofLuck.phraseArray[randomNumber].hint);

      WheelofLuck.currentPhrase = WheelofLuck.phraseArray[randomNumber].phrase;
      console.log(WheelofLuck.currentPhrase);

      var PhraseBdCont = document.getElementById('phrase-board-container');

      // make words go onto new lines at spaces

      for (var i = 0; i < WheelofLuck.currentPhrase.length; i++) {

        if (WheelofLuck.currentPhrase[i] == " ") {
          var phraseBdDiv = document.createElement("br");
          // phraseBdDiv.className = "phrase-space-div";
          PhraseBdCont.appendChild(phraseBdDiv);

        } else {
          var phraseBdDiv = document.createElement("div");
          phraseBdDiv.className = "phrase-letter-div";

          var phraseBdP = document.createElement("p");
          phraseBdP.className = "letter";
          phraseBdP.id = i;

          phraseBdDiv.appendChild(phraseBdP);
          PhraseBdCont.appendChild(phraseBdDiv);
        }
      }
    },
    // ======== Contestant Constructor ========
    Contestant: function(name, id){
      this.name = name;
      this.id = id;
      this.points = 0;
      WheelofLuck.contestantArray.push(this);
    },
    // ======== Clear Contestant Constructor ========
      // clear Contestant Constructor form
    clearForm: function(){
      var nameAddForm = document.getElementById("name-input-form");
      nameAddForm.reset();
      return false
    },
    gamePlay: function(){
      $('#start-game-container').slideUp();
      $('#gameboard-container').slideDown();
      // add contestant at index 0 to Current Player property
      WheelofLuck.currentContestant = WheelofLuck.contestantArray[0];
      WheelofLuck.roundCounter++;
      // Spin
      $('#spin-btn').on('click', WheelofLuck.spinWheel);
      WheelofLuck.doTurn();
      $('#solve-puzzle').on('click', WheelofLuck.puzzleSolve);
      WheelofLuck.doTurn();
      $('#vowel-submit').on('click', WheelofLuck.buyVowel);

    },
    // ======== Do Turn ========
    doTurn: function(){
      WheelofLuck.roundCheck();
      console.log("Do Turn Fired!");
      WheelofLuck.clearBoth();
      // display name and current round at top of gameplay div
      $('#current-turn-name').html("Turn: " + WheelofLuck.currentContestant.name);
      $('#round').html("Round: " + WheelofLuck.roundCounter);
      // listen for spin wheel click
    },
    roundCheck: function(){
      // stop game after 5 rounds
      if (WheelofLuck.roundCounter == 6){
        if (WheelofLuck.contestantArray.length = 1){
          alert("Since it's a solo game, you win!")
        } else {
          var contestant1Pts = WheelofLuck.contestantArray[0].points;
          var contestant2Pts = WheelofLuck.contestantArray[1].points;
          var contestant3Pts = WheelofLuck.contestantArray[2].points;
          if (contestant1Pts > contestant2Pts && contestant1Pts > contestant3Pts){
            alert(WheelofLuck.contestantArray[0].name + " wins with " + WheelofLuck.contestantArray[0].points + "points!");
          } else if (contestant2Pts > contestant1Pts && contestant2Pts > contestant3Pts){
            alert(WheelofLuck.contestantArray[1].name + " wins with " + WheelofLuck.contestantArray[1].points + "points!");
          } else {
            alert(WheelofLuck.contestantArray[2].name + " wins with " + WheelofLuck.contestantArray[2].points + "points!");
          }
        }
      }
    },
    spinWheel: function(){
      console.log("Spin wheel fired!");
      // produce random number between 1 and 11
      var randomNumber = Math.floor((Math.random() * 13));

      // grab the object in the Wheel Object Array whose index corresponds to the random number
      // place value in currentSpinVal
      WheelofLuck.currentSpinVal = WheelofLuck.wheel[randomNumber];
      // display currentSpinVal in gameplay div
      $('#spin-result').html("Spin Result: " + WheelofLuck.currentSpinVal);

      // if currentSpinVal = "lose turn"
      if (WheelofLuck.currentSpinVal == "Lose Turn"){
        alert("Result: Lose Turn! Next!");

        WheelofLuck.nextContestant();
      } else if (WheelofLuck.currentSpinVal == "Bankrupt") {
        alert("Result: Bankrupt! Next!");
        for (var i = 0; i < WheelofLuck.contestantArray.length; i++){
          if (WheelofLuck.contestantArray[i].id == WheelofLuck.currentContestant.id){
            WheelofLuck.contestantArray[i].points = 0;
            var ptSelector = '#' +WheelofLuck.currentContestant.id + "pts";
            $(ptSelector).html(WheelofLuck.contestantArray[i].points);
          }
        }
        // update points total of current player in contestant array to 0.
        WheelofLuck.nextContestant();
      } else {
        $('#consonant-submit').on('click', WheelofLuck.consonantEntry);
        // make button live when enabled (add class)
      }
    },
    buyVowel: function(){
      console.log("Buy vowel click success");
      var vowelEntry = $('#vowel-input').val().toUpperCase();
      WheelofLuck.currentGuess = vowelEntry;
      if ($.inArray(WheelofLuck.currentGuess, WheelofLuck.vowels) == -1){
        alert("Please enter a vowel.");
      } else if ($.inArray(WheelofLuck.currentGuess, WheelofLuck.guessedLetters) != -1){
        alert(WheelofLuck.currentGuess + " has already been guessed. Next player's turn!");
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
    },
    consonantEntry: function(){
      console.log("Consonant Entry!");
        // grab value from consonant input, to lowercase
        var consonantInput = $('#consonant-input').val().toUpperCase();
        WheelofLuck.currentGuess = consonantInput;
        if ($.inArray(WheelofLuck.currentGuess, WheelofLuck.consonants) == -1){
          alert("Please enter a valid consonant.");
        } else if ($.inArray(WheelofLuck.currentGuess, WheelofLuck.guessedLetters) != -1){
          alert(WheelofLuck.currentGuess + " has aleady been guessed. Next player's turn!");
          WheelofLuck.nextContestant();
        } else {
          WheelofLuck.guessedLetters.push(WheelofLuck.currentGuess);
          WheelofLuck.checkGuess();
        }
    },
    checkGuess: function(){
      console.log("Check Guess Success!");
      if ($.inArray(WheelofLuck.currentGuess, WheelofLuck.currentPhrase) != -1){
        WheelofLuck.handleSuccess();
      } else {
        WheelofLuck.handleFail();
      }
    },
    handleSuccess: function() {
      console.log("Handle Success Fired!");
      // tell user that there are X letters! and to spin again
      for (var i = 0; i < WheelofLuck.currentPhrase.length; i++) {
        if (WheelofLuck.currentPhrase[i] == WheelofLuck.currentGuess){
          WheelofLuck.multiplier.push(WheelofLuck.currentPhrase[i]);
          // show letter in Phrase Board
          var letterBox = document.getElementById(i);
          letterBox.innerHTML = WheelofLuck.currentGuess;
        }
      }
      var letterMultiplier = WheelofLuck.multiplier.length;
      var pointsAwarded = (WheelofLuck.currentSpinVal * letterMultiplier);
      if (letterMultiplier == 1){
        alert("There is one " + WheelofLuck.currentGuess + "!");
      } else {
        alert("There are " + letterMultiplier + " " + WheelofLuck.currentGuess + "'s !");
      }
      // if current guessed letter is in the vowels array
      if ($.inArray(WheelofLuck.currentGuess, WheelofLuck.vowels) != -1){
          WheelofLuck.doTurn();
      } else {
        for (var i = 0; i < WheelofLuck.contestantArray.length; i++){
          if (WheelofLuck.contestantArray[i].id == WheelofLuck.currentContestant.id){
            WheelofLuck.contestantArray[i].points = WheelofLuck.contestantArray[i].points += pointsAwarded;
            var ptSelector = '#' +WheelofLuck.currentContestant.id + "pts";
            $(ptSelector).html(WheelofLuck.contestantArray[i].points);
            WheelofLuck.doTurn();
          }
        }
      }
    },
    handleFail: function(){
      console.log("Handle Fail fired");
        alert("Sorry, there are no " + WheelofLuck.currentGuess + "'s")
        WheelofLuck.handleGuessedLetter();
        WheelofLuck.nextContestant();
    },
    nextContestant: function(){
      console.log("Fired: Next Contestant");
      // ======== Next Contestant Handler ========
        var nextContestant;
        // loop through player array
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
      // on solve-puzzle btn click
      // get value of solve-input
      if (solveGuess == WheelofLuck.currentPhrase.toUpperCase()){
        alert("Correct! You win!");

      } else {
        alert("Sorry, that is incorrect. Next player's turn!");
        WheelofLuck.nextContestant();
      }
    },
    clearBoth: function(){
      console.log("Clear!");
          $('#vowel-input').val('');
          $('#consonant-input').val('');
          $('#spin-result').html('');
          WheelofLuck.multiplier = [];
          WheelofLuck.currentSpinVal = null;

          $('#consonant-submit').off('click');
          return false
    }
  }
  WheelofLuck.init();
});

// ||||||||||| PSEUDO CODE |||||||||||

// +++++++++++++++ Properties +++++++++++++++
  // ======== Contestants Array ========
    // Contains each contestant from the contestant constructor
    // max length: 3

  // ======== Wheel Object Array ========
    // Holds objects representing wheel pieces and corresponding pt values
    // 12 objects
    // key: values
      // 'points': 'X'
      // 2-of-12 objects: "bankrupt" and "lose a turn" values

  // ======== Phrase Object Array ========
    // Array of phrases (1 to start, 3 total)
    // key: values:
      // 'phrase': 'X'
      // 'hint': "X"

  // ======== Current Phrase Object ========
    // Stores the current phrase being used for the current game

  // ======== Current Spin Value ========
    // stores the value of the current array for easy access

  // ======== Letters ========
    // Consonants Array
    // Vowels Array

  // ======== Current Game Guessed Letters ========
    // an empty array so you can compare what's been guessed already and alert the user

// +++++++++++++++ Methods +++++++++++++++
  // ======== Initialize App ========
    // Fire Add Listeners method

  // ======== Add Listeners ========
    // "Contestant Add" form: on submit fires Contestant Constructor
    // display # of contestants added.
    // before firing:
      // If Contestants Array <= 3, tell user that there are already three players, and to click start game (or disable "add" or "submit" button)
        // Fire Clear Construtor method
    // "Start Game" Button: click fires Game Board Creator method, but first:
      // If the Contestants Array = 0, ask user to enter at least one contestant to play (or disable "add" or "submit" button)

  // ======== Game Board Creator ========

    // Create contestant divs based on Contestants Object Array
    // Randomly select object from Phrase Object Array
      // Place selected phrase in Current Phrase object
      // Display phrase in Phrase Hint Display div
    // Create Phrase Letter/Guessed divs in Phrase Board Container
    // Hide Start Game Container
    // Show Game Board container


  // ======== Contestant Constructor ========
    // Constructor that creates Contestants with the following members:
      // id, name, pts (set to zero)
      // add Contestant to a Contestants Array

  // ======== Clear Contestant Constructor ========
    // clear Contestant Constructor form

    // ======== Game Play ========
        // add contestant at index 0 to Current Player property
        // round++
        // Fire Do Turn

// ======== Do Turn ========
    // Fire Clear method
    // display name and current round at top of gameplay div
    // listen for spin wheel click
      // fires Spin Wheel method
      // add listener to Buy a Vowel Click
        // make button live when enabled (add class)
      // add listener to Consonant Enry Click
        // make button live when enabled (add class)

    // Listen: Buy a Vowel on click
    // if buy a vowel is clicked
      // grab vowel input value, to lowercase
      // if vowel is in guessed letters array
        // alert: [X] has aleady been guessed. [Next player in array's turn!]
        // Fire Next Contestant method
      // if current player pt value = 0
        // alert: player cannot buy a vowel
      //else:
        // loop through vowel array
          // match input value
          // deduct one point from player's total
        // fire Check Guess Method

    // Listen: Consonant entry on click
    // If guess consonant is clicked
      // grab value from consonant input, to lowercase
      // for loop through consonants array
        // if input value not in consonants array
          //  alert user to please enter a consonant
      // else if consonant is in guessed letters array
        // alert: [X] has aleady been guessed. [Next player in array's turn!]
        // Fire Next Contestant method
      // else
        // loop through consonant array
          // match input value ensure a valid entry was provided

  // ======== Spin Wheel ========
    // produce random number between 1 and 11
    // grab the object in the Wheel Object Array whose index corresponds to the random number
    // place value in currentSpinVal
    // display currentSpinVal in gameplay div
      // if currentSpinVal = "lose turn"
        // alert("Result: Lose Turn! Next!")
        // fire Next Contestant Handler
      // else if currentSpinVal = "bankrupt"
        // alert("Result: Bankrupt! Next!")
        // update points total of current player in contestant array to 0.
        // fire Next Contestant Handler
      // else
        // display currentSpinVal in gameplay div

  // ======== Check Guess ========
    // if the value is in the currently displayed phrase
      // Fire Handle Success method
    // if the value is not in the currently displayed phrase
      // fire Handle Fail method

  // ======== Handle Success ========
    // tell user that there are X letters! and to spin again
    // show letter in Phrase Board
    // add letter to Guessed letters array
    // display guessed letter in Guessed Letter div
    // loop through current guessed letters
      // if current guessed letter is in the vowels array
        // Fire Do Turn method
      // else
        // grab how many times the letter appears in the phrase
        // multiply current spin val by how many times the letter appears in the phrase
        // add to player's total
        // Fire Do Turn method

  // ======== Handle Fail ========
    // alert user that there are no letters of that type on the board. + [Next Contestant's] turn!
    // add letter to Guessed letters array
    // display guessed letter in Guessed Letter div
    // Fire Next Contestant Handler

  // ======== Next Contestant Handler ========
    // round++
    // loop through player array
      // match index to current player property index
      // contestantNext = iteration+1
        // if contestantNext >= Contestant Array length
          // WheelofLuck.currentSong = array[0]
          // Fire Do Turn method
        // else:
          // WheelofLuck.currentSong = array[nextContestant];
          // Fire Do Turn method

  // ======== Clear ========
    // select the input fields and clear/reset each one
    // set the current spin val to null
    // set the spin value display to ""

  // solve-puzzle
    // on solve-puzzle btn click
    // get value of solve-input
    // if solve value is equal to the current phrase
      // alert user that the guess is correct and that they win!
    // else
      // alert user that the guess is incorrect
      // fire next contestant
