$(document).ready(function(event) {

  /* ============ VARIABLES ============== */
  var baseUrl = 'http://gateway.marvel.com:80/v1/public/';
  var apiKey = '6801b29bb8b5052bd8f877a6282a1119';
  var gameCharacter;

  hideQuiz();



  $('.game-button').click(function(event) {
    showQuiz();
    runGame();
    // ajaxCall();

  });

  /* Listens for a click on the Next button */
  $('#quiz-form').submit(function(event) {
    event.preventDefault();
  });

  /*========= FUNCTIONS =========*/
  function runGame() {
  	var randLet = randomLetter();
    ajaxCall('characters', {apikey: apiKey, nameStartsWith: randLet});
  }
  

  function populateQuestion() {
    var quizForm = $('#quiz-form');
    quizForm.find('p').text('Who is this character?');
    quizForm.find('h3').text('1 out of 6');
    quizForm.find('label[for="' + randomRangeExclusive(0,4) + '"]').text(gameCharacter.name);
    $('#left-image').attr('src', gameCharacter.thumbnail.path + '.' + gameCharacter.thumbnail.extension);
  }

  function ajaxCall(endpoint, queryString) {

    $.ajax({
        type: 'GET',
        url: baseUrl + endpoint,
        data: queryString
      })
      .done(function(result) {
        var temp = randomItemFromArray(result.data.results);
        while (!(temp.comics.available && temp.events.available && temp.series.available && temp.stories.available)) {
          temp = randomItemFromArray(result.data.results);
        } 
        gameCharacter = temp;
        populateQuestion();     
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

function randomItemFromArray(array) {
  console.log(array);
  return array[randomRangeExclusive(0, array.length)];
}

});


/* loop through */
