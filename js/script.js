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
    return String.fromCharCode(randomRangeInclusive('a'.charCodeAt(0),'z'.charCodeAt(0)));
  } 

/* Random number from min (inclusive) to max (exclusive). 
   There is a chance min will appear as a random number, but max will never be returned. */
function randomRangeExclusive(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; 
}

/* Random number from min (inclusive) to max (inclusive).
   Both max and min have a chance of appearing as the random number.*/
function randomRangeInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



});
