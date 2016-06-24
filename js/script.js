$(document).ready(function(event) {

  /* ============ VARIABLES ============== */
  var baseUrl = 'http://gateway.marvel.com:80/v1/public/';
  var apiKey = '6801b29bb8b5052bd8f877a6282a1119';
  var gameCharacter;
  var quizForm = $('#quiz-form');
  var questionNumber = 0;

  hideQuiz();



  $('.game-button').click(function(event) {
    showQuiz();
    runGame();
    // ajaxCall();

  });

  /* Listens for a click on the Next button */
  $('#quiz-form').submit(function(event) {
    event.preventDefault();
    questionArray[questionNumber]();
    questionNumber++;
  });

  /*========= FUNCTIONS =========*/
  function runGame() {
  	var randLet = randomLetter();
    ajaxCall('characters', {apikey: apiKey, nameStartsWith: randLet});
  }
  
  var questionArray = [question1, question2, question3, question4, question5];

  function question1() { 
    quizForm.find('p').text('Who is this character?');
    quizForm.find('h3').text('1 out of 6');
    quizForm.find('label[for="' + randomRangeExclusive(0,4) + '"]').text(gameCharacter.name);
    $('#left-image').attr('src', gameCharacter.thumbnail.path + '.' + gameCharacter.thumbnail.extension);
  }

  function question2() {
    var comic = randomItemFromArray(gameCharacter.comics.items);
    quizForm.find('p').text('What year was ' + comic.name + ' published?');
    quizForm.find('h3').text('2 out of 6');
    quizForm.find('label[for="' + randomRangeExclusive(0,4) + '"]').text("19 bladdy blah");
  }

  function question3(){
    var event = randomItemFromArray(gameCharacter.events.items);
    quizForm.find('p').text('Which one of these events were they involved in?');
    quizForm.find('h3').text('3 out of 6');
    quizForm.find('label[for="' + randomRangeExclusive(0,4) + '"]').text(event.name);
  }

  function question4(){
    var series = randomItemFromArray(gameCharacter.series.items);
    quizForm.find('p').text('Which one of these series were they a part of?');
    quizForm.find('h3').text('4 out of 6');
    quizForm.find('label[for="' + randomRangeExclusive(0,4) + '"]').text(series.name);
  }

  function question5(){
    var stories = randomItemFromArray(gameCharacter.stories.items);
    quizForm.find('p').text('Which one of these stories were they a part of?');
    quizForm.find('h3').text('5 out of 6');
    quizForm.find('label[for="' + randomRangeExclusive(0,4) + '"]').text(stories.name);
  }

  function question6(){

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
        question1();     
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


/* API Calls 
  Question 1: who is this character
    GET /v1/public/characters
      returns a list of characters, choose random character with something for all catagories
  Question 2: which comic did the character come from?
    GET /v1/public/characters/{characterId}/comics
      returns a list of comics a character was featured in, choose a random comic from this list
  Question 3: creator
    Can use data from previous call to find creator 
  Question 4: events
    GET /v1/public/characters/{characterId}/events
      returns a list of comics a character was featured in, choose a random event from this list
  Question 5: series
    GET /v1/public/characters/{characterId}/series
      returns a list of series the character was featured in, choose a random series from this list
  Question 6: stories
    GET /v1/public/characters/{characterId}/stories
      returns a list of stories the character was featured in, choose a random story from this list
*/

