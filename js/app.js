const memory = (function(){

    // define list of the selector for consistent usage
    const SELECTORS = {
        deck : '.deck',
        moves : '.moves',
        restart : '.restart',
        restartButton : '.restart-button',
        winnerText : '.win',
        time : '.time',
        finalTime : '.final-time',
        stars : '.stars',
        startIcon : '.fa-star',
        finalStars : '.final-stars'
    }

    // defined list of classes for consisten usage
    const CLASSES = {
        card : 'card',
        show : 'show',
        open : 'open',
        correct : 'correct',
        wrong : 'wrong',
        starFull : 'fa-star',
        starEmpty : 'fa-star-o'
    }

    // define card list
    const cards = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];

    // define variables and collect nodes
    let deck = document.querySelector(SELECTORS.deck),
        moveElement = document.querySelector(SELECTORS.moves),
        restartElement = document.querySelector(SELECTORS.restart),
        restartButton = document.querySelector(SELECTORS.restartButton),
        winnerText = document.querySelector(SELECTORS.winnerText),
        timeElement = document.querySelector(SELECTORS.time),
        finalTime = document.querySelector(SELECTORS.finalTime),
        stars = document.querySelector(SELECTORS.stars),
        finalStars = document.querySelector(SELECTORS.finalStars),
        seconds = 0,
        gameTimer,
        moveCounter,
        openCardStore = [],
        activePick = false,
        clicks = 0;

    // init the game and register event listeners
    function init() {
        appendCards();
        moveCounter = 1;

        restartElement.addEventListener('click', resetMemory);
        restartButton.addEventListener('click', restartMemory);

        deck.addEventListener('click', function(event) {
            if (event.target.classList.contains(CLASSES.card) && !activePick) {
                let currentCard = event.target;

                if (!gameTimer) {
                    gameTimer = setInterval(timer, 1000);
                }

                if (!event.target.classList.contains(CLASSES.open)) {
                    storeCard(currentCard);

                    if (((clicks - 1) % 2) === 0) {
                        activePick = true;
                    }
                    clicks++;
                }

                displaySymbol(currentCard);
            }
        });
    }

    // shuffle the cards and looping over the result then append it
    function appendCards() {
        let shuffledCards = shuffle(cards.concat(cards));

        for (let i = 0; i < shuffledCards.length; i++) {
            createCard(shuffledCards[i]);
        }
    }

    // create card html and append it to the deck
    function createCard(card) {
        let listItem = document.createElement('li'),
            icon = document.createElement('i');

        listItem.className = CLASSES.card;
        icon.className = 'fa fa-' + card;
        listItem.appendChild(icon);
        deck.appendChild(listItem);
    }

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

    // flip and show the card symbol
    function displaySymbol(card) {
        card.classList.add(CLASSES.show, CLASSES.open);
    }

    // flip back and hide the card symbol
    function removeSymbol(card) {
        card.classList.remove(CLASSES.show, CLASSES.open);
    }

    // stor the picked card if it's not in the store yet, if there is at least two cards in the store
    // or the amount of cards is even then run the matching logic. As weel as increase the movement
    // and check whether the user won the game.
    function storeCard(card) {
        if (openCardStore.indexOf(card) == -1) {
            openCardStore.push(card);
            if (openCardStore.length % 2 == 0) {
                if (findCard(card)) {
                    matchAnimation(card);
                } else {
                    mismatchAnimation(card);
                }
                incrementMovement();
            }
        }
        winTheGame();
    }

    // Run match animation if the user pick two equal cards, get the cards from the cardStore and add related classes.
    function matchAnimation(card) {
        let firstPick = openCardStore[openCardStore.indexOf(card) - 1];

        firstPick.classList.add(CLASSES.correct);
        card.classList.add(CLASSES.correct);
        card.style.webkitAnimationName = 'matchAnimation';
        firstPick.style.webkitAnimationName = 'matchAnimation';

        setTimeout(function(){
            activePick = false;
        }, 1000);
    }

    // Run mismatch animation if the second card in not equal to the first. As well as remove the cards from the card store.
    function mismatchAnimation(card) {
        let firstPick = openCardStore[openCardStore.indexOf(card) - 1];

        firstPick.classList.add(CLASSES.wrong);
        card.classList.add(CLASSES.wrong);
        card.style.webkitAnimationName = 'mismatchAnimation';
        firstPick.style.webkitAnimationName = 'mismatchAnimation';

        resetCardStore();

        setTimeout(function(){
            removeSymbol(card);
            removeSymbol(firstPick);

            firstPick.classList.remove(CLASSES.wrong);
            card.classList.remove(CLASSES.wrong);
            card.removeAttribute('style');
            firstPick.removeAttribute('style');
            activePick = false;
        }, 1000);
    }

    // As soon as the user accomplishes the game this method runs and display
    // the congratulation modal along with the result of the game.
    function winTheGame() {
        if (openCardStore.length == cards.length * 2) {
            clearInterval(gameTimer);

            finalTime.innerHTML = timeElement.innerHTML;
            finalStars.innerHTML = stars.innerHTML;

            setTimeout(function () {
                winnerText.style.display = 'flex';
            }, 500);
        }
    }

    // remove last two cards from the card store
    function resetCardStore() {
        openCardStore.splice(openCardStore.length - 2, 2);
    }

    // Check whether a given card has match in the cardstore
    function findCard(currentCard) {
        return openCardStore.find(function(card) {
            return card != currentCard && card.firstElementChild.classList[1] === currentCard.firstElementChild.classList[1];
        });
    }

    // increase the momvements
    function incrementMovement() {
        setStar(moveCounter);
        moveElement.innerHTML = moveCounter++;
    }

    // set stars based on user's performance
    function setStar(movement) {
        switch (movement) {
            case 20:
                switchStarsClass();
                break;
            case 30:
                switchStarsClass();
                break;
            default:
        }
    }

    // changing start classes, look up the last icon with full star and switch to empty star.
    function switchStarsClass() {
        let lastElement = stars.querySelectorAll(SELECTORS.startIcon);

        lastElement[lastElement.length - 1].classList.remove(CLASSES.starFull);
        lastElement[lastElement.length - 1].classList.add(CLASSES.starEmpty);
    }

    // reset stars
    function resetStars() {
        let childrenStars = stars.children;

        for (let i = 0; i < childrenStars.length; i++) {
            if (childrenStars[i].firstElementChild.classList.contains(CLASSES.starEmpty)) {
                childrenStars[i].firstElementChild.classList.remove(CLASSES.starEmpty);
                childrenStars[i].firstElementChild.classList.add(CLASSES.starFull);
            }
        }
    }

    // reset game's variables and reinit the game
    function resetMemory() {
        while (deck.firstChild) {
            deck.removeChild(deck.firstChild);
        }

        clearInterval(gameTimer);
        resetStars()
        moveElement.innerHTML = 0;
        openCardStore = [];
        timeElement.innerHTML = '00:00';
        seconds = 0;
        gameTimer = null;
        init();
    }

    // restart the game from the modal
    function restartMemory() {
        resetMemory();
        winnerText.style.display = 'none';
    }

    // set game time
    function timer(){
        seconds++;

        let minute = Math.floor((seconds - (Math.floor(seconds / 3600)) * 3600) / 60),
            second = seconds - (Math.floor(seconds / 3600)+ minute * 60),
            formatedMinute = minute == 0 ? '00' : (minute < 10 ? '0' + minute : minute),
            formatedSecond = second < 10 ? '0' + second : second;

        timeElement.innerHTML = formatedMinute + ':' + formatedSecond;
    }

    // game init method
    return {
        init: init
    }
})();

// init the game
memory.init();
