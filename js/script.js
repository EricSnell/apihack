$(document).ready(function(event){


	$.ajax({
		type: 'GET',
		url: 'http://gateway.marvel.com:80/v1/public/events/37?apikey=6801b29bb8b5052bd8f877a6282a1119'

	})
	.done(function(result){
		console.log(result);
	});





})


// Creators

// Events

// Characters

// Comic books

// Series

// Stories 
