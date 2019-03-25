$(document).ready(function() {
	console.log( "ready!" );
	$(document).click(function () {
		console.log("music!")
		$('#audio')[0].play();
	
	});

    var questionCounter = 0;
    var time = 20;
    var correctGuesses = 0;
    var incorrectGuesses = 0;
    var questions = [
    {
        question: "Which fruit comes from the Nahuatl word ahuacatl meaning testicle?",
        choices: ["apple", "avocado", "apricot", "honeydew melon"],
        correctAnswer: "avocado",
        image: "<img src='https://media.giphy.com/media/OgfejiBYdTHXO/giphy.gif' height='300px' width='300px'/>"
    },
    {
        question: "Which word got its origin from a ball of yarn?",
        choices: ["clue", "ball", "hank", "barn"],
        correctAnswer: "clue",
        image: "<img src='https://media.giphy.com/media/l4hLFO94MQCETLUDS/giphy.gif'height='300px' width='300px'>"
    },
    {
        question: "What was originally a gender neutral term?",
        choices: ["humankind", "woman", "man", "creature"],
        correctAnswer: "man",
        image: "<img src='https://media.giphy.com/media/pL7rhSZ6kkYNi/giphy.gif'height='300px' width='300px'>"
    },
    {
        question: "What word meant female who is sexually active, socially her own person and not bound by any man?",
        choices: ["goddess", "wifman", "hussey", "virgin"],
        correctAnswer: "virgin",
        image: "<img src='https://media.giphy.com/media/gwa3tD0nCJL6U/giphy.gif'height='300px' width='300px'>"
    },
    {
        question: "Which word originally meant 'observe the stars'?",
        choices: ["astronomy", "astrology", "consider", "observitory"],
        correctAnswer: "consider",
        image: "<img src='https://media.giphy.com/media/XN8pBJ6HrLTOM/giphy.gif'height='300px' width='300px'>"
    },
    {
        question: "Which place was known as 'a place where we were naked'?",
        choices: ["sauna", "gymnasium", "shower", "pool"],
        correctAnswer: "gymnasium",
        image: "<img src='https://media.giphy.com/media/11aJifhO2Mvn3y/giphy.gif'height='300px' width='300px'>"
    },
    {
        question: "Which word has an orgin of a story of a man using cow puss to fight small pox?",
        choices: ["penicillin", "vaccine", "tylenol", "tentus"],
        correctAnswer: "vaccine",
        image: "<img src='https://media.giphy.com/media/3o7TKw1miUvF2Y3xT2/giphy.gif'height='300px' width='300px'>"
    },
    {
        question: "What word means the 'pain of returning home'?",
        choices: ["nostalgia", "institution", "property", "family"],
        correctAnswer: "nostalgia",
        image: "<img src='https://data.whicdn.com/images/214490284/large.jpg'height='300px' width='300px'>"
    }];

 
	function questionContent() {
	
    	$("#gameScreen").append("<p><strong>" + 
    		questions[questionCounter].question + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[0] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[1] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[2] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[3] + 
    		"</strong></p>");
	}


	function userWin() {
		$("#gameScreen").html("<p>You got it right!</p>");
		correctGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}


	function userLoss() {
		$("#gameScreen").html("<p>Nope, that's not it!</p>");
		incorrectGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	function userTimeout() {
		if (time === 0) {
			$("#gameScreen").html("<p>You ran out of time!</p>");
			incorrectGuesses++;
			var correctAnswer = questions[questionCounter].correctAnswer;
			$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
				correctAnswer + 
				"</span></p>" + 
				questions[questionCounter].image);
			setTimeout(nextQuestion, 4000);
			questionCounter++;
		}
	}

	
	function resultsScreen() {
		if (correctGuesses === questions.length) {
			var endMessage = "Perfection!";

		}
		else if (correctGuesses > incorrectGuesses) {
			var endMessage = "Good work! But not quite perfect!";
		}
		else {
			var endMessage = "You gotta brush up on your history";
			
		}
		$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + 
			correctGuesses + "</strong> right.</p>" + 
			"<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
		$("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
		gameReset();
		$("#start").click(nextQuestion);
	}

	
	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				userTimeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}


	function nextQuestion() {
		if (questionCounter < questions.length) {
			time = 15;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}
	console.log(questionCounter);
	console.log(questions[questionCounter].correctAnswer);
	}

	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	}

    function startGame() {
    	$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    	$("#start").hide();
		questionContent();
    	timer();
    	userTimeout();
    }

  
    $("#start").click(nextQuestion);

	$("#gameScreen").on("click", ".choices", (function() {
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});