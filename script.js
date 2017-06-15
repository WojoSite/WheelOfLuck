
// Properties:
  // ======== Contestants Array ========
    // Contains each contestant from the contestant constructor
    // max length: 3
  // ======== Wheel Object Array ========
    // Holds objects representing the wheel and pt values
    // 12 objects
    // key: values
      // 'points': 'X'
      // 2-of-12 objects: "bankrupt" and "lose a turn"
  // ======== Phrase Array ========
    // Array of phrases (1 to start, 3 total)

  // Consonants
  // Vowels

// Functions:
  // ======== Contestant Constructor ========
    // Create Contestants with the following members:
      // id, name
      // add Contestant to Contestants Array
  // ======== Spin Wheel ========
    // produce random number between 1 and 11
    // grab the index corresponding to the random number
    // add point
  // ======== Buy A Vowel ========
    // costs X pts
  // ======== Guess ========
    // correct guess? Go again

$(document).ready(function($) {

  var WheelofFortune = {
    init: function(){
      console.log("Let's play Wheel of Fortune!");
    }

  }
  WheelofFortune.init();
});
