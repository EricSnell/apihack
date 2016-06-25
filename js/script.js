$(document).ready(function(event) {

  /* ============ VARIABLES ============== */
  var BASEURL = 'http://gateway.marvel.com:80/v1/public/';
  var KEY = '6801b29bb8b5052bd8f877a6282a1119';
  var QUIZFORM = $('#quiz-form');

  var questionNumber = 0;
  var characterData;
  var comicData = [];
  var eventData = [];
  var seriesData = [];
  var storiesData = [];

  /* =========== Main Code Area ================= */
  hideQuiz();
  makeAJAXRequests();

  $('.game-button').click(function(event) {
    showQuiz();
  });

  /* Listens for a click on the Next button */
  $('#quiz-form').submit(function(event) {
      event.preventDefault();
      if (questionNumber === 6) {
        $('');
        showResults();        

      } else {
        $('label').empty();
        questionArray[questionNumber]();
        questionNumber++;
        console.log(questionNumber);
      }
  });

  /* Listes for a click on the Play Again button */
  $('.replay-button').click(function(event) {
      playAgain();
  });

  /* Checks if radio button is selected, compares to correct answer, and adjusts score */
  function checkAnswer() {
    
  }

  /* Resets game, clears data */
  function playAgain() {
    questionNumber = 0;
    characterData = [];
    comicData = [];
    eventData = [];
    seriesData = [];
    storiesData = [];
    hideQuiz();
  }


  /*========= FUNCTIONS =========*/
  function runGame() {
    // var randLet = randomLetter();
    // ajaxCall('characters', { apikey: apiKey, nameStartsWith: randLet });
  }

  /* Populates empty labels with random items from wrong answer array */
  function wrongAnswers(arrayName) {
    $('#test').each(function() {
      if (this.text === '') {
        this.text(randomItemFromArray(arrayName));
        console.log(arrayName);
      } 
    });
  }

  var questionArray = [question1, question2, question3, question4, question5, question6];


  function question1() {
    var wrongCharacter = ['Batman', 'Godzilla', 'Morgan Freeman', 'Howard the Duck'];
    QUIZFORM.find('p').text('Name the character(s)...');
    QUIZFORM.find('h3').text('1 out of 6');
    QUIZFORM.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(characterData.name);
    $('#left-image').attr('src', characterData.thumbnail.path + '.' + characterData.thumbnail.extension);
    }

  function question2() {
    console.log('Entering question2');
    if (!comicData.length) {
      console.log('comicData has not returned');
      comicData.push(question2); 
      return;
    }
    var wrongComic = ['Beetle Bailey', 'Dilbert', 'Garfield', 'Peanuts'];
    QUIZFORM.find('p').text('They were featured in the comic ' + comicData[0].title + ', which was published in what year?');
    QUIZFORM.find('h3').text('2 out of 6');
    QUIZFORM.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(comicData[0].dates[0].date.substring(0, 4));
    $('#left-image').attr('src', comicData[0].thumbnail.path + '.' + comicData[0].thumbnail.extension);
  }

  function question3() {
    console.log('Entering question3');
    console.log(comicData[0].creators.items);
    var creatorData = randomItemFromArray(comicData[0].creators.items);
    var wrongCreator = ['Matt Groening', 'Mike Judge', 'Papa John', 'Walt Disney'];
    console.log(creatorData);
    QUIZFORM.find('p').text('Who was a creator of ' + comicData[0].title + '?');
    QUIZFORM.find('h3').text('3 out of 6');
    QUIZFORM.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(creatorData.name);
  }

  function question4() {
    console.log('Entering question4');
    if (!eventData.length) {
      console.log('eventData has not returned');
      eventData.push(question4); 
      return;
    }
    console.log(eventData);
    var wrongEvent = ['EDC', 'Sundance', 'Burning Man', 'E3'];
    QUIZFORM.find('p').text('Which one of these events were they involved in?');
    QUIZFORM.find('h3').text('4 out of 6');
    QUIZFORM.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(eventData[0].title);
    $('#left-image').attr('src', characterData.thumbnail.path + '.' + characterData.thumbnail.extension);
  }

  function question5() {
    console.log('Entering question5');
    if (!seriesData.length) {
      console.log('seriesData has not returned');
      seriesData.push(question5); 
      return;
    }
    console.log(seriesData);
    var wrongSeries = ['Family Matters', 'Full House', 'Hogans Heroes', 'The Golden Girls'];
    QUIZFORM.find('p').text('Which one of these series were they a part of?');
    QUIZFORM.find('h3').text('5 out of 6');
    QUIZFORM.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(seriesData[0].title);
  }

  function question6() {
    console.log('Entering question6');
    if (!storiesData.length) {
      console.log('storiesData has not returned');
      storiesData.push(question6); 
      return;
    }
    console.log(storiesData);
    var wrongStories = ['The Giving Tree', 'Grimms Fairy Tales', 'Stinky Cheese Man', 'Goosebumps'];
    QUIZFORM.find('p').text('Which one of these stories were they a part of?');
    QUIZFORM.find('h3').text('6 out of 6');
    QUIZFORM.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(storiesData[0].title);
  }

  function ajaxCall(endpoint, queryString) {
    return $.ajax({
      type: 'GET',
      url: BASEURL + endpoint,
      data: queryString
    });
  }

  function toggleDisable(button) {
    if( button.is(':disabled') ) {
      button.prop('disabled', false);
      button.text('Next');
    } else {
      button.prop('disabled', true);
      button.text('loading');
    }
  }

  /*
   * Start the five AJAX requests necessary to retrieve the necessary information for the quiz. 
   */
  function makeAJAXRequests() {
      toggleDisable($('.game-button'));
     // First call to API to get a random character with something in all fields
    ajaxCall('characters', { apikey: KEY, nameStartsWith: randomLetter() })
      .done(
        function(result) {
          console.log('character call done.');
          do {
            characterData = randomItemFromArray(result.data.results);
          } while (!(characterData.comics.available && characterData.events.available && characterData.series.available && characterData.stories.available));
          console.log('Random characters id: ' + characterData.id);
          toggleDisable($('.game-button'));
          var endpointMap = {
            '/comics': comicData,
            '/events': eventData,
            '/series': seriesData,
            '/stories': storiesData
          };

          for (var endpoint in endpointMap) {
            /* Snapshot the current value of 'endpoint' using a closure - otherwise the callback wouldn't be able to use it */
            (function(ep) {
              ajaxCall('characters/' + characterData.id + ep, { apikey: KEY })
                .done(
                  function(result) {
                    endpointMap[ep].push(randomItemFromArray(result.data.results));
                    /* If we are still waiting for a response the appropriate function will be in the array
                       Remove it and call immediately. 
                    */
                    if(endpointMap[ep].length === 2) {
                      endpointMap[ep].shift()();
                    }
                  });
            })(endpoint);
          }
        });
  }

  function hideQuiz() {
    $('.quiz-area').hide();
    $('.results').hide();
    $('.intro-screen').show();
  }

  function showQuiz() {
    $('.intro-screen').hide();
    $('.quiz-area').show();
  }

  function showResults() {
    $('.results').show();
    $('.quiz-area').hide();
  }

  /* ========================== HELPER FUNCTIONs ================== */


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
    return array[randomRangeExclusive(0, array.length)];
  }

  function randomLetter() {
    return String.fromCharCode(randomRangeInclusive('a'.charCodeAt(0), 'z'.charCodeAt(0)));
  }

});
