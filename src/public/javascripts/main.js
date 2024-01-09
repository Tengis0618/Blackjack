function generateDeck () {
    const deck = [];
    const suits = ['♠️', '❤️', '♣️', '♦️'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    for (const suit of suits) {
      for (const rank of ranks) {
        const card = {
          suit: suit,
          rank: rank
        };
        deck.push(card);
      }
    }
    return deck;
}

const shuffle = (deck) => {
    let currentIndex = deck.length, randomIndex;
    const deck1 = [...deck];

    while (currentIndex > 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [deck1[currentIndex], deck1[randomIndex]] = [deck1[randomIndex], deck1[currentIndex]];
  }

  return deck1;
}; 

const setTopCards = (deck, userInput) => {
    if (userInput) {
      const topCards = userInput.split(',');
      for (let i = 0; i < topCards.length; i++) {
        deck[i].suit = '❤️';
        deck[i].rank = topCards[i];
      }
    }
    return deck; // Return the modified deck
  };

const dealCards = (deck) => {
    const userHand = [];
    const computerHand = [];
    let cnt = 2;
    while(cnt > 0){
      computerHand.push(deck.shift()); // Deal cards to the computer
      userHand.push(deck.shift()); // Deal cards to the player
      cnt--;
    }
    return { userHand, computerHand };
  };

function createCardElement(card, isRevealed) {
  const cardElement = document.createElement('div');
  cardElement.className = 'card';
  if (!isRevealed) {
    cardElement.classList.add('card-back');
    const cardValue1 = document.createElement('p');
  const cardValue2 = document.createElement('p');
  cardValue1.textContent = `${card.rank} ${card.suit}`;
  cardValue2.textContent = `${card.rank} ${card.suit}`;
  cardValue2.classList = 'card-bottom';
  cardValue1.className = 'card-top';
  cardValue1.classList.add('hidden');
  cardValue2.classList.add('hidden');
  cardElement.appendChild(cardValue1);
  cardElement.appendChild(cardValue2);
  } else {
    const cardValue1 = document.createElement('p');
  const cardValue2 = document.createElement('p');
  cardValue1.textContent = `${card.rank} ${card.suit}`;
  cardValue2.textContent = `${card.rank} ${card.suit}`;
  cardValue2.classList = 'card-bottom';
  cardValue1.className = 'card-top';
  cardElement.appendChild(cardValue1);
  cardElement.appendChild(cardValue2);
  }
  return cardElement;
}

function calculateHandTotal(hand) {
  let total = 0;
  let aceCount = 0;
  for (const card of hand) {
    if (card.rank === 'A') {
      aceCount++;
    }
    if (card.rank === 'A') {
      total += 11;
    } else if (card.rank === 'J' || card.rank === 'Q' || card.rank === 'K') {
      total += 10;
    } else {
      total += parseInt(card.rank);
    }
  }
  while (total > 21 && aceCount > 0) {
    total -= 10;
    aceCount--;
  }
  return total;
}

function hit(deck, hand){
  hand.push(deck.pop());
}

function gameInit(userHand, computerHand){
  const computerCardsContainer = document.createElement('div');
  const msgc = document.createElement('h3');
  msgc.textContent = 'Computer Hand:';
  computerCardsContainer.appendChild(msgc);
  computerCardsContainer.className = 'cards-container';
  computerCardsContainer.classList.add('computer');
  let counter = 1;
  computerHand.forEach(card => {
    if (counter === 1){
      const cardElement = createCardElement(card, false);
      computerCardsContainer.appendChild(cardElement);
      counter++;
      } else {
      const cardElement = createCardElement(card, true);
      computerCardsContainer.appendChild(cardElement);
      }
    });
    const userCardsContainer = document.createElement('div');
    const msgu = document.createElement('h3');
    msgu.textContent = 'User Hand:';
    userCardsContainer.appendChild(msgu);
    userCardsContainer.className = 'cards-container';
    userCardsContainer.classList.add('user');
    userHand.forEach(card => {
      const cardElement = createCardElement(card, true);
      userCardsContainer.appendChild(cardElement);
    });     

    const userTotal = calculateHandTotal(userHand);

    const computerTotalElement = document.createElement('h3');
    computerTotalElement.textContent = 'Total: ?';
    computerTotalElement.classList.add('computer-total');

    const userTotalElement = document.createElement('h3');
    userTotalElement.textContent = `Total: ${userTotal}`;
    userTotalElement.classList.add('user-total');
    const gameDiv = document.querySelector('.game');
    gameDiv.appendChild(computerCardsContainer);
    gameDiv.appendChild(userCardsContainer);
    computerCardsContainer.appendChild(computerTotalElement);
    userCardsContainer.appendChild(userTotalElement);
}

function computerWin(computerTotal, userCurrentTotal) {
  if (computerTotal > 21) {
    return 'You win! Computer busted.';
  } else if (computerTotal > userCurrentTotal) {
    return 'Computer wins.';
  } else if (computerTotal === userCurrentTotal) {
    return 'It\'s a tie.';
  } else {
    return 'You win!';
  }
}

function hideButtonsAndShowResult(result) {
  const hitButton = document.querySelector('.hitButton');
  const standButton = document.querySelector('.standButton');
  const buttonContainer = document.querySelector('.button-container');

  hitButton.style.display = 'none'; 
  standButton.style.display = 'none'; 

  const resultText = document.createElement('h2');
  resultText.textContent = result; 
  buttonContainer.appendChild(resultText); 
}

function main() {
    document.querySelector('.playBtn').addEventListener('click', (event) => {
        event.preventDefault();
        const form = document.querySelector('.start');
        form.classList.add('hidden');
        const userInput = document.getElementById('startValues').value;
        let deck = generateDeck();
        const shuffledDeck = shuffle(deck);
        deck = setTopCards(shuffledDeck, userInput);
        const {userHand, computerHand} = dealCards(deck);
        gameInit(userHand, computerHand);
        const hitButton = document.createElement('button');
        hitButton.classList.add('hitButton');
        hitButton.textContent = 'Hit';

        const standButton = document.createElement('button');
        standButton.classList.add('standButton');
        standButton.textContent = 'Stand';
        
        const buttonContainer = document.createElement('div');
        buttonContainer.appendChild(hitButton);
        buttonContainer.appendChild(standButton);
        buttonContainer.classList.add('button-container');
        const gameDiv = document.querySelector('.game');
        gameDiv.appendChild(buttonContainer);
        let userCurrentTotal = calculateHandTotal(userHand);
        const computerCurrentTotal = calculateHandTotal(computerHand);

        document.querySelector('.hitButton').addEventListener('click', () => {
          hit(deck, userHand);
          const addedCard = createCardElement(userHand[userHand.length-1], true);
          const userContainer = document.querySelector('.user');
          const usertotal = document.querySelector('.user-total');
          userContainer.insertBefore(addedCard, usertotal);
          userCurrentTotal = calculateHandTotal(userHand);
          usertotal.textContent = `Total: ${userCurrentTotal}`;
          if (userCurrentTotal > 21){
            const hitbutton = document.querySelector('.hitButton');
            const standbutton = document.querySelector('.standButton');
            hitbutton.classList.add('hidden');
            standbutton.classList.add('hidden');
            hideButtonsAndShowResult('Computer Wins');
            const backCard = document.querySelector('.card-back');
            backCard.classList.remove('card-back');
            const showTop = document.querySelector('.card-top');
            const showBot = document.querySelector('.card-bottom');
            showTop.classList.remove('hidden');
            showBot.classList.remove('hidden');
            const computerText = document.querySelector('.computer-total');
            computerText.textContent = `Total: ${computerCurrentTotal}`;
          } 
        });
        document.querySelector('.standButton').addEventListener('click', () => {
          let computerTotal = calculateHandTotal(computerHand);
          while (computerTotal < 17) {
            hit(deck, computerHand); // Deal a card to the computer
            computerTotal = calculateHandTotal(computerHand);
          }
          const result = computerWin(computerTotal, userCurrentTotal);
          if (result){
            const backCard = document.querySelector('.card-back');
            backCard.classList.remove('card-back');
            const showTop = document.querySelector('.card-top');
            const showBot = document.querySelector('.card-bottom');
            showTop.classList.remove('hidden');
            showBot.classList.remove('hidden');
            const computerText = document.querySelector('.computer-total');
            const computerContainer = document.querySelector('.computer');
            let i=2;
            while (i < computerHand.length) {
              const card = createCardElement(computerHand[i], true); // Create a card element for each card in the computer's hand
              computerContainer.insertBefore(card, computerText); // Add the card to the computer's hand container
              i++;
            }
            const computerTotal = calculateHandTotal(computerHand);
            computerText.textContent = `Total: ${computerTotal}`;
            hideButtonsAndShowResult(result);
          }
        });
    });
}

document.addEventListener('DOMContentLoaded', main);