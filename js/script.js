$(document).ready(function(event){
	hideQuiz();

	$('.game-button').click(function(event){
		showQuiz();
		ajaxCall();
	});

	$('#quiz-form').submit(function(event){
		event.preventDefault();

	});


	





/*========= FUNCTIONS =========*/

	function ajaxCall() {

		$.ajax({
			type: 'GET',
			url: 'http://gateway.marvel.com:80/v1/public/events/37?apikey=6801b29bb8b5052bd8f877a6282a1119'

		})
		.done(function(result){
			console.log(result);
		});
	}

	function hideQuiz(){
		$('.quiz-area').hide();
		$('.toggle-hidden').show();
	}

	function showQuiz(){
		$('.toggle-hidden').hide();
		$('.quiz-area').show();
	}











});