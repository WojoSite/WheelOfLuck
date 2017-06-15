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

  // ======== Letters ========
    // Consonants Array
    // Vowels Array

// +++++++++++++++ Methods +++++++++++++++
  // ======== Initialize App ========
    // Fire Add Listeners method
    // Fire Start Game method

  // ======== Add Listeners ========
    // "Contestant Add" form: on submit fires Contestant Constructor
      // If Contestants Array <= 3, tell user that there are already three players, and to click start game
        // Fire Clear Construtor method
      // Fire Clear Construtor method
    // "Start Game" Button: click fires Game Board Creator method
      // If the Contestants Array = 0, ask user to enter at least one contestant to play

  // ======== Game Board Creator ========
    // Create contestant divs based on Contestants Object Array
    // Randomly select object from Phrase Object Array
      // Place selected phrase in Current Phrase object
      // Display phrase in Phrase Hint Display div
    // Create Phrase Letter divs in Phrase Board Container
    // Hide Start Game Container
    // Show Game Board container

  // ======== Contestant Constructor ========
    // Constructor that creates Contestants with the following members:
      // id, name, pts (set to zero)
      // add Contestant to Contestants Array

  // ======== Contestant Constructor ========
    // clear Contestant Constructor form

  // ======== Start Game ========
    // Fire Round method

  // ======== Round ========
    // For each contestant in Contestant object array:
      // Fire Turn method

    // Ask person to guess a letter
      // Fire Guess Check method

  // ======== Turn ========
    // Fire Spin Wheel method
    // Fire Buy Vowel method
    // Fire Guess Check method

  // ======== Spin Wheel ========
    // produce random number between 1 and 11
    // grab the object in the Wheel Object Array whose index corresponds to the random number
    // return the randomly selected object

  // ======== Buy Vowel ========
    // Ask Current Contestant if they would like to buy a vowel
    // Yes: subtract 1 pt from their total points. else:

  // ======== Guess Check ========
    // Take value provided from user input, make it lowercase
    // check to see if the letter is in the phrase
      // Yes?
        // Update display to show guessed letter where applicable
        // add points to the contestant score,
        // update pt total in display
        // Fire Spin Wheel method
      // No?
        // If there are more contestants,

  // ======== Clear/New Game ========

$(document).ready(function($) {

  var WheelofFortune = {
    init: function(){
      console.log("Let's play Wheel of Fortune!");
    }

  }
  WheelofFortune.init();
});
