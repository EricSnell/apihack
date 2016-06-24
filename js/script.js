$(document).ready(function(event) {

      /* ============ VARIABLES ============== */
      var baseUrl = 'http://gateway.marvel.com:80/v1/public/';
      var key = '6801b29bb8b5052bd8f877a6282a1119';
      var questionNumber = 0;
      var characterData;
      var comicData;
      var eventData;
      var seriesData;
      var creatorData;
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
                  var endpointArray = ['/comics', '/events', '/series', '/stories'];


                 for (var i = 0; i < endpointArray.length; i++) {
                    ajaxCall('characters/' + characterData.id + endpointArray[i], { apikey: key})
                      .done(
                        function(result) {
                          console.log(endpointArray[i]);
                          console.log(result);
                          
                        });
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
          comicData = randomItemFromArray(characterData.comics.items);
          console.log(comicData);
          quizForm.find('p').text('What year was ' + comicData.name + ' published?');
          quizForm.find('h3').text('2 out of 6');
          quizForm.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(comicData.dates[0].date.substring(0, 4));
        }

        function question3() {
          creatorData = randomItemFromArray(comicData.creators); 
          quizForm.find('p').text('Who was a creator of ' + comicData.name + '?');
          quizForm.find('h3').text('3 out of 6');
          quizForm.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(creatorData);
        }

        function question4() {
          eventData = randomItemFromArray(characterData.events.items);
          quizForm.find('p').text('Which one of these events were they involved in?');
          quizForm.find('h3').text('4 out of 6');
          quizForm.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(eventData.name);
        }

        function question5() {
          seriesData = randomItemFromArray(characterData.series.items);
          quizForm.find('p').text('Which one of these series were they a part of?');
          quizForm.find('h3').text('5 out of 6');
          quizForm.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(seriesData.name);
        }

        function question6() {
          storiesData = randomItemFromArray(characterData.stories.items);
          quizForm.find('p').text('Which one of these stories were they a part of?');
          quizForm.find('h3').text('6 out of 6');
          quizForm.find('label[for="' + randomRangeExclusive(0, 4) + '"]').text(storiesData.name);
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
