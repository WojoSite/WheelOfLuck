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
    // Fire Start Game method

  // ======== Contestant Constructor ========
    // Constructor that creates Contestants with the following members:
      // id, name, pts (set to zero)
      // add Contestant to a Contestants Array

  // ======== Clear Contestant Constructor ========
    // clear Contestant Constructor form

  // ======== Start Game ========
    // Fire Round method
    // Fire Round method
    // Fire Round method
    // Game Over method

  // ======== Round ========
    // For each contestant in Contestant object array:
      // Fire Turn method


  // ======== Turn ========
    // Fire Spin Wheel method
    // Fire Buy Vowel method
    // Fire Guess and Check method

  // ======== Spin Wheel ========
    // produce random number between 1 and 11
    // grab the object in the Wheel Object Array whose index corresponds to the random number
    // display value ("current spin: user, result: x")
    // return the randomly selected object

  // ======== Buy Vowel ========
    // Ask Contestant if they would like to buy a vowel
    // Yes: subtract 1 pt from their total points. else: return

  // ======== Guess and Check ========
    // Prompt user for a guess
      // validate that it is indeed a letter
    // Take value provided from user input, make it lowercase
    // check to see if the letter is in the Already Guessed Letters Array
      // If so, alert the user that they already guessed that letter
      // Fire Guess and Check
    // check to see if the letter is in the phrase
      // Yes?
        // add relevant points from current spin value to the contestant score
        // Update display to show guessed letter where applicable (Phrase Board/Guessed Letter)
        // update point total in display
        // Fire Spin Wheel method
      // No?
        // If there are more contestants
          // return,
          // else: Fire Spin Wheel

  // ======== Game Over ========
    // interate through contestant array
      // if Contestant array.length = 1
        // if the Contestant's score is > 10
          // modal text: congrats you win!, Click to play again
        // else: modal-text: too bad. play again!
        // modalm pops up with start new game function that reloads the page
      // else:
        // gather contestant scores
        // compare contestant scores
        // whoever has the highest score wins.

  // ======== Solve ========

  // ======== Clear/New Game ========

$(document).ready(function($) {
  var WheelofLuck = {
    // Contain each contestant from the contestant constructor
    contestantArray: [],
    // ======== Phrase Object Array ========
    phraseArray: [
      {phrase: "Seventh Inning Stretch", hint: "Baseball Break"},
      {phrase: "Secretary of State", hint: "Fourth in line"},
      {phrase: "Wiener Schnitzel", hint: "A Little Vienna Cut"}
    ],
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

      // "Start Game" Button: click fires Game Board Creator method,
      var addBtn = document.getElementById("start-game-btn");
      addBtn.addEventListener("click", WheelofLuck.zeroContestantCheck);

    },
    addContestant: function(){
      // before firing:
        // If Contestants Array <= 3, tell user that there are already three players, and to click start game (or disable "add" or "submit" button)
      if (WheelofLuck.contestantArray.length == 3) {
        alert("You have added the maximum amount of players (3). You can start playing!");
        //make add button disabled, too!
      } else if ($('#name-input').val() == "") {
        alert("You must enter a name before adding a player.")
      }else{
      var userNameInput = $('#name-input').val();
      var nameId = Math.floor(Math.random()*100000+1);
      var nextContestant = new WheelofLuck.Contestant(userNameInput, nameId);
      // Fire Clear Construtor method
      WheelofLuck.clearForm();
      WheelofLuck.displayContestantAmt();
      }
    },
    // display # of contestants added.
    displayContestantAmt: function(){
      $('#added-contestants').html("Contestants: " + WheelofLuck.contestantArray.length);
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
      console.log("gameBoardCreator!");
      // var txt3 = document.createElement("p");
      // txt3.innerHTML = "Text.";
      // $("body").append(txt1, txt2, txt3);

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

        nameDiv.appendChild(nameP);
        ptsDiv.appendChild(ptsP);
        contestantDiv.appendChild(nameDiv);
        contestantDiv.appendChild(ptsDiv);
        contestantsContainer.appendChild(contestantDiv);
      }

      // Randomly select object from Phrase Object Array
      var randomNumber = Math.floor((Math.random() * 3));
      $('#phrase-hint').html('Phrase Hint: ' + WheelofLuck.phraseArray[randomNumber].hint);



    },

      // ======== Contestant Constructor ========
        // Constructor that creates Contestants with the following members:
          // id, name, pts (set to zero)
          // add Contestant to a Contestants Array
    Contestant: function(name, id){
      this.name = name;
      this.id = id;
      this.points = 0;
      console.log(this);
      WheelofLuck.contestantArray.push(this);
    },

    // ======== Clear Contestant Constructor ========
      // clear Contestant Constructor form
    clearForm: function(){
      var nameAddForm = document.getElementById("name-input-form");
      nameAddForm.reset();
      return false
    }
  }
  WheelofLuck.init();
});
