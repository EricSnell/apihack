$(document).ready(function(event) {

  /* ============ VARIABLES ============== */
  var baseUrl = 'http://gateway.marvel.com:80/v1/public/';
  var key = '6801b29bb8b5052bd8f877a6282a1119';
  var questionNumber = 0;
  var characterData;
  var comicData = [];
  var eventData = [];
  var seriesData = [];
  var storiesData = [];
  var quizForm = $('#quiz-form');
  var isAvailableArr = [false, false, false, false, false, false];


  hideQuiz();



  $('.game-button').click(function(event) {
    showQuiz();
    // First call to API to get a random character with something in all fields
    ajaxCall('characters', { apikey: key, nameStartsWith: randomLetter() })
      .done(
        function(result) {
          console.log('character call done.');
          var temp = randomItemFromArray(result.data.results);
          while (!(temp.comics.available && temp.events.available && temp.series.available && temp.stories.available)) {
            temp = randomItemFromArray(result.data.results);
          }
          console.log('Random characters id: ' + temp.id);
          characterData = temp;
          var endpointMap = {
            '/comics': comicData,
            '/events': eventData,
            '/series': seriesData,
            '/stories': storiesData
          };


          for (var endpoint in endpointMap) {
            /* Snapshot the current value of 'endpoint' using a closure - otherwise the callback wouldn't be able to use it */
            (function(ep) {
              ajaxCall('characters/' + characterData.id + ep, { apikey: key })
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

  });

  /* Listens for a click on the Next button */
  $('#quiz-form').submit(function(event) {
    event.preventDefault();
    $('label').empty();
    questionArray[questionNumber]();
    questionNumber++;
  });

  /*========= FUNCTIONS =========*/
  function runGame() {
    // var randLet = randomLetter();
    // ajaxCall('characters', { apikey: apiKey, nameStartsWith: randLet });
  }

  var questionArray = [question1, question2, question3, question4, question5, question6];

  function question1() {
    quizForm.find('p').text('Who is this character?');
    quizForm.find('h3').text('1 out of 6');
    quizForm.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(characterData.name);
    $('#left-image').attr('src', characterData.thumbnail.path + '.' + characterData.thumbnail.extension);
  }

  function question2() {
    console.log('Entering question2');
    if (!comicData.length) {
      console.log('comicData has not returned');
      comicData.push(question2); 
      return;
    }
    quizForm.find('p').text('What year was ' + comicData[0].title + ' published?');
    quizForm.find('h3').text('2 out of 6');
    quizForm.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(comicData[0].dates[0].date.substring(0, 4));
  }

  function question3() {
    console.log('Entering question3');
    console.log(comicData[0].creators.items);
    var creatorData = randomItemFromArray(comicData[0].creators.items);
    console.log(creatorData);
    quizForm.find('p').text('Who was a creator of ' + comicData[0].title + '?');
    quizForm.find('h3').text('3 out of 6');
    quizForm.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(creatorData.name);
  }

  function question4() {
    if (!eventData.length) {
      eventData.push(question4); 
      return;
    }
    quizForm.find('p').text('Which one of these events were they involved in?');
    quizForm.find('h3').text('4 out of 6');
    quizForm.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(eventData[0].name);
  }

  function question5() {
    if (!seriesData.length) {
      seriesData.push(question5); 
      return;
    }
    quizForm.find('p').text('Which one of these series were they a part of?');
    quizForm.find('h3').text('5 out of 6');
    quizForm.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(seriesData[0].name);
  }

  function question6() {
    if (!storiesData.length) {
      storiesData.push(question6); 
      return;
    }
    quizForm.find('p').text('Which one of these stories were they a part of?');
    quizForm.find('h3').text('6 out of 6');
    quizForm.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(storiesData[0].name);
  }


  function ajaxCall(endpoint, queryString) {
    return $.ajax({
      type: 'GET',
      url: baseUrl + endpoint,
      data: queryString
    });
  }
  // .done(function(result) {
  //   var temp = randomItemFromArray(result.data.results);
  //   while (!(temp.comics.available && temp.events.available && temp.series.available && temp.stories.available)) {
  //     temp = randomItemFromArray(result.data.results);
  //   } 
  //   characterData = temp;  
  // });
  //}

  function hideQuiz() {
    $('.quiz-area').hide();
    $('.toggle-hidden').show();
  }

  function showQuiz() {
    $('.toggle-hidden').hide();
    $('.quiz-area').show();
  }

  function randomLetter() {
    return String.fromCharCode(randomRangeInclusive('a'.charCodeAt(0), 'z'.charCodeAt(0)));
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
