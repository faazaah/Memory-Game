
//Image Courtesy: www.pixabay.com
const cardList = [
	'images/bus.png',
	'images/house.png',
	'images/smile.png',
	'images/smiley.png',
	'images/alien.png',
	'images/alien1.png',
	'images/wink.png',
	'images/apt.png',
	'images/bus.png',
	'images/house.png',
	'images/smile.png',
	'images/smiley.png',
	'images/alien.png',
	'images/alien1.png',
	'images/wink.png',
	'images/apt.png'
];


//openCards[] holds the cards which are open. Max limit is 2 at a time
let openCards = [];
//matchedCards[] holds matched cards
const mCards = [];
const matchedCards = [];
let begin;
startGame();


//Function that starts the game, listens to click on every card, starts timer
function startGame() {
	const shuffledCards = shuffle(cardList);
	//list[] holds all cards in the deck
	const elem = document.querySelector(".card-deck");
	const list = elem.getElementsByTagName("li");
	//Creating and appending <img> element for every <li> element
	for (let i=0; i<list.length; i++) {
		 const iTags = document.createElement("img");
		list[i].appendChild(iTags);
	}
	//Set id, src and class attribute for each <img> element
	const iTags = elem.getElementsByTagName("img");
	for (let i=0; i<iTags.length; i++) {
		iTags[i].setAttribute("id", "list" + i);
		iTags[i].setAttribute("class", "image");
		for (let j=0; j<shuffledCards.length; j++) {
			iTags[i].setAttribute("src", shuffledCards[i]);
		}
	}
	startTimer();
 	//Adding Event Listeners to each card
	for (let i=0; i<iTags.length; i++) {
		let clikedCard = iTags[i];
		clikedCard.addEventListener("click", showCard);
	}
}


function startTimer() {
		begin = setInterval(timer, 1000);
	}


//Function to display card on click event
function showCard(e) {
	//Ensures that max 2 cards are open at a time
	if (openCards.length < 2) {
		e.target.style.opacity = '1';
		if (openCards.length > 0) {
			if (openCards[0].getAttribute("id") === e.target.getAttribute("id")) {
					return;
			}
		}
		openCardsFunction(e.target);  //open cards are moved to openCards[]
	}
	console.log(openCards);
	//confirms that same card clicked is not compared
	if ((openCards.length > 1) && (!sameCard())) {
		//call move counter
		movesCounter();
		//call compare cards function
		compareCards();
	}
	else {
		return;
	}
}


//Move the card clicked to the list of open cards
function openCardsFunction(x) {
	openCards.push(x);
}


//Comparing 2 cards to check if they match
function compareCards() {
	//if the 2 cards match
	if (openCards[0].getAttribute("src") === openCards[1].getAttribute("src")) {
		displayCards();
	}
	//if the 2 cards do not match
	else {
		setTimeout(hideCards,800);
	}
}


function stopTimer() {
	clearInterval(begin);
}


//Function to lock matched cards in open position
function displayCards() {
	for (let i=0; i <= openCards.length; i++) {
		mCards[i] = openCards.pop(); //moving mathched cards to mCards array
	}
	matchedCards.push(mCards);
	console.log(mCards);
	console.log(openCards);
	console.log(matchedCards);
	//Check conditions for Game Winner
	if ((matchedCards.length === 8)) {
		stopTimer();
		winModal();
	}
}


//Function to hide unmatched cards
function hideCards() {
	openCards[0].style.opacity = "0";
	openCards[1].style.opacity = "0";
	openCards.pop();
	openCards.pop();
}


//Condition checks if same card is being clicked
function sameCard() {
	if (openCards[0].getAttribute("id") === openCards[1].getAttribute("id")) {
		return true;
	}
	else {
		return false;
	}
}


//Function to count number of moves
let counter = 0;
function movesCounter() {
	++counter;
	console.log('count is ' + counter);
	document.querySelector(".display-count").innerHTML = counter;
	starRating(counter);
}


//Timer function
let m = 0;
let s = 0;
function timer(){
	s++;
	if (s == 60) {
		s = 0;
		m++ ;
	}

	if (s<10) {
		document.getElementById("time").innerText = '0' + m +':'+ '0' + s;
	}
	else if (m<10) {
		document.getElementById("time").innerText = '0' + m +':'+ s;
	}
	else {
		document.getElementById("time").innerText = m +':'+ s;
	}
}


//Star-Rating funtion
function starRating(s) {
	const stars = [...document.getElementsByTagName("img")];
	if ((s >= 9) && (s <= 12)) {
		stars[4].style.display = 'none';
		stars.pop();
	}
	else if ((s >= 13) && (s <= 17)) {
		stars[3].style.display = 'none';
		stars.pop();
	}
	else if ((s >= 18) && (s <= 20)) {
		stars[2].style.display = 'none';
		stars.pop();
	}
	else if ((s >= 21) && (s <= 23)) {
		stars[1].style.display = 'none';
		stars.pop();
	}
	else {
		return;
	}
}


//Restart Game Button function
const restart = document.querySelector(".restart-button");
restart.addEventListener("click", restartGame);


//Funtion to restart game
function restartGame() {
	counter = 0;
	openCards = [];
	window.location.reload();
	startGame();
}


//Shuffle function from the starter code provided
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


function displayStarRating(r,m) {
	if ((r >= 9) && (r <= 12)) {
		m.querySelector(".star-data").innerText = 'You get ' + 4 + ' stars';
	}
	else if ((r >= 13) && (r <= 17)) {
		m.querySelector(".star-data").innerText = 'You get ' + 3 + ' stars';
	}
	else if ((r >= 18) && (r <= 20)) {
		m.querySelector(".star-data").innerText = 'You get ' + 2 + ' stars';
	}
	else if (r >= 21) {
		m.querySelector(".star-data").innerText = 'You get ' + 1 + ' stars';
	}
}


//Modal function
function winModal() {
	const modal = document.querySelector("#win-modal");
	modal.style.display = 'block';
	modal.querySelector(".moves").innerText = 'Total number of moves made: ' + counter;
	modal.querySelector(".time-data").innerText = 'Total time: ' + m + 'm:' + s + 's';
	displayStarRating(counter,modal);
	const yes = modal.querySelector(".play-yes");
	yes.addEventListener("click", restartGame);
	const no = modal.querySelector(".play-no");
	no.addEventListener("click", function(){
		modal.style.display = 'none';
	});
	const close = document.querySelector(".close-button");
	close.addEventListener("click", function() {
		modal.style.display = 'none';
	});
	// window.addEventListener("click", function(evt) {
	// 	if (evt.target == modal) {
	// 		modal.style.display = "none";
	// 	}
	// });
}


