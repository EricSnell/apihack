$(document).ready(function(event) {
  hideQuiz();

  console.log(randomLetter());
 
  console.log(randomItemFromArray([1,4,56,8]));


  $('.game-button').click(function(event) {
    showQuiz();
    ajaxCall();

  });

  $('#quiz-form').submit(function(event) {
    event.preventDefault();

  });

  /*========= FUNCTIONS =========*/
  function runGame() {
  	var randLet = randomLetter();
  	var currentCharacter;

  }


  function ajaxCall() {

    $.ajax({
        type: 'GET',
        url: 'http://gateway.marvel.com:80/v1/public/events/37?apikey=6801b29bb8b5052bd8f877a6282a1119'

      })
      .done(function(result) {
        var temp = randomItemFromArray(result.data.results);
        console.log(temp);
      });
  }

  function hideQuiz() {
    $('.quiz-area').hide();
    $('.toggle-hidden').show();
  }

  function showQuiz() {
    $('.toggle-hidden').hide();
    $('.quiz-area').show();
  }

  function randomLetter() {
    var possible = "abcdefghijklmnopqrstuvwxyz";
<<<<<<< HEAD
    return possible.charAt(Math.floor(Math.random() * possible.length));
  } // 66 through 90 or 97 through 122

  function randomRange(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
=======
    return possible.charAt(Math.floor(Math.random() * (possible.length - 1)));
    
>>>>>>> 71c8ff4bedc443ce7ee8527f757970b85e5ce391
  }

  function randomItemFromArray(itemArray) {
  	return itemArray[ randomRange(0, itemArray.length - 1) ];
  }


});
