const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const restartBtn = document.querySelector('.restart-btn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleCellClick = (e) => {
  const cell = e.target;
  const index = parseInt(cell.getAttribute('data-cell'));

  if (gameState[index] !== '' || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(`player-${currentPlayer}`);

  checkWinner();
  checkDraw();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWinner = () => {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      gameState[a] !== '' &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      gameActive = false;
      status.textContent = `${currentPlayer} wins!`;
      break;
    }
  }
};

const checkDraw = () => {
  if (!gameState.includes('') && gameActive) {
    gameActive = false;
    status.textContent = 'It\'s a draw!';
  }
};

const restartGame = () => {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  status.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('player-X', 'player-O');
  });
};

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', restartGame);
