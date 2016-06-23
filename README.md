# Basic Discription
A six question quiz game using information pulled from the Marvel API to populate and randomize the content. The questions will from the following catagories: creators, events, characters, comic books, series, and stories. 

## Wirefram
* Start Quiz: ![screenshot](http://imgur.com/UBJ4te8.png)
* Question Display: ![screenshot](http://imgur.com/Qu0gQr1.png)
* Play Again: ![screenshot](http://imgur.com/EU5aTr5.png)

# Minimum Requirments
* Use AJAX to access data on the Marvel API
* Show questions in set order:
  * Characters
    - Question: "Name the character?" 
  * Comics
    - Question: "What year was this comic released?"
  * Creators
    - Question: "Who is this creator?"
  * Events
    - Question: "Name this event?"
  * Series
    - Question: "Which of these series did {creator} create?"
  * Stories 
    - Question: "Which of these characters appeared in this {story}?"
* Dynamically add content to questions
* Wrong answers will be drawn from a hardcoded pool of possible answers
* Ask the user six questions, one at a time.
* Keep track of user score
* Restart the quiz, with same questions

# Additional Features
* Show a picture related to user's final score, e.g. a bad score will receive a sad image 
* Have a help section that overlays the screen when clicked
* Display questions in random order
* Wrong answer pool will be dynamically generated 