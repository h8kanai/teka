const cardsArray = [
  "images/photo1.JPG", "images/photo1.JPG",
  "images/photo2.JPG", "images/photo2.JPG",
  "images/photo3.JPG", "images/photo3.JPG",
  "images/photo4.JPG", "images/photo4.JPG",
  "images/photo5.JPG", "images/photo5.JPG"
];

const gameBoard = document.getElementById("game-board");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  shuffle(cardsArray);
  gameBoard.innerHTML = "";
  matchedPairs = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  message.classList.add("hidden");
  gameBoard.style.filter = "none";

  cardsArray.forEach((imgSrc, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.img = imgSrc;
    card.dataset.index = index;

    card.innerHTML = `<img src="${imgSrc}" alt="Card image" class="card-image" />`;

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard(e) {
  if (lockBoard) return;
  const clickedCard = e.currentTarget;
  if (clickedCard === firstCard || clickedCard.classList.contains("matched")) return;

  clickedCard.classList.add("flipped");

  if (!firstCard) {
    firstCard = clickedCard;
    return;
  }

  secondCard = clickedCard;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.img === secondCard.dataset.img) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedPairs++;

    resetTurn();

    if (matchedPairs === cardsArray.length / 2) {
      endGame();
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function endGame() {
  message.classList.remove("hidden");
  gameBoard.style.filter = "blur(4px)";
}

restartBtn.addEventListener("click", () => {
  createBoard();
});

// Initialize game on load
createBoard();
