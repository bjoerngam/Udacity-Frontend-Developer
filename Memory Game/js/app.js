cardNames = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bomb', 'bicycle']
cardNames = cardNames.concat(cardNames);

//setup the basic letiables
let moves = 0; // number of  moves
let matched = 0; // number of pairs
let openCards = []; // number of flipped cards
let matchedCards = []; // number of matched cards
let seconds = 0; // number of seconds
let minutes = 0; // number of minutes
let timer;
let remainingStars = $(".stars li").length;
let stars = 3;

function shuffleCards() {
	// shuffles cards and creates html for each card
	shuffle(cardNames)
	cardNames.forEach(function(card) {
		let cardElem = '<li class="card"><i class="fa fa-' + card + '"></i></li>';
		$(".deck").append(cardElem);
	});
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function flip() {
	// flips cards when clicked by adding open show to the class,
	// and stores it in the openCards list.
	// stops you from clicking same card twice or more than two cards
	$('.card').click(function () {
		if ($( this ).hasClass('open show') || openCards.length == 2 || $( this ).hasClass('match')) {
			return;
		} if (openCards.length <= 2) {
			flipped = $( this ).addClass('open show');
			openCards.push(flipped.children().attr('class'));
			compareCards(openCards);
		}
	});
}
function flipBack() {
	// flips the cards back if they do not match.
	setTimeout(function() { // Sets a timer before it flips the cards back.
		openCards.splice(0,2); // Removes the cards from the openCards list.
		$('.card').removeClass('open show');  // flips the cards back.
	}, 800);
}
function compareCards() {
	// checks if the flipped cards match, if not it gets flipped back.
	if (openCards.length > 1) {
		firstCard = openCards[0];
		secondCard = openCards[1];
		countMoves();
		if (firstCard === secondCard) { // checks if the clicked cards match.
			matchedCards.push(firstCard, secondCard); // puts the matched cards in a new list
			openCards.splice(0,2); // removes it from the openCards list
			matched ++; // increment the amount of matches.
			$('.card.open').addClass('match');
			clicked = 0;
		} else {
			flipBack();
		}
		if (matched == 8) {
			clearInterval(timer);
			openModal();
		}
	}
}
function countMoves() {
	// counts the moves and removes star(s)
	moves++;
	$('.moves').html(moves);
	removeStars();
}
function removeStars() {
	// Removes stars after a number of moves.
	if (moves === 12) {
		stars -= 1;
		$(".stars li").eq(0).remove();
	} else if (moves === 24) {
		stars -= 1;
		$(".stars li").eq(0).remove();
	}
}
function restartGame() {
	// resets the game. Hides all the cards, and ets all the counts back to zero.
	$(".restart").click(function() {
		$(".card").remove();
		openCards = [];
		shuffleCards();
		flip();
		clearInterval(timer);
		moves = 0;
		$(".moves").html(moves);
		$(".timer").html(minutes + "m " + seconds + "s");
		matched = 0;
		seconds = 0;
		minutes = 0;
		clicked = 0;
		stars = 3;
		startTimer();
		$(".card").removeClass('match');
		$(".card").removeClass('open show');
		let remainingStars = $(".stars li").length;
		while (remainingStars < 3) { // Adding the stars back in the star-rating.
			$(".stars").append('<li><i class="fa fa-star"></i></li>');
			remainingStars++;
		}
	});
}
function restartFromModal() {
	// restart game from modal.
	clearInterval(timer);
	moves = 0;
	matched = 0;
	seconds = 0;
	minutes = 0;
	clicked = 0;
	stars = 3;
	startTimer();
	$(".card").removeClass('match');
	$(".card").removeClass('open show');
	let remainingStars = $(".stars li").length;
	while (remainingStars < 3) { // Adding the stars back in the star-rating.
		$(".stars").append('<li><i class="fa fa-star"></i></li>');
		remainingStars++;
  }
}
function startTimer() {
	// Starts the time after first click.
	$('.deck').one("click", function() {
		timer = setInterval(gameTimer, 1000);
	});
}
function gameTimer() {
	// counts the time the game has been active
	seconds ++;
	$(".timer").html(minutes + "m " + seconds + "s");
	gameMinutes();
	}
function gameMinutes() {
	// counts minutes.
	if (seconds === 60) {
		minutes++;
		seconds = 0;
	}
}
function openModal() {
	// Opens the modal when called.
	$('#modal').modal('show');
	$('.modal-body').html("You got " + stars + " stars with " + moves + " moves, after " + minutes + " minutes and " + seconds + " seconds!");
	$('.btn').click(function() { // Resets game and hides the modal if button is clicked.
		restartFromModal();
		$('#modal').hide();
	});
}
function startGame() {
	shuffleCards();
	startTimer();
	flip();
	restartGame();
}

startGame();
