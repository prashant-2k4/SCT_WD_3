let board;
let currentPlayer;
let isGameActive;
let againstComputer = false;

const playerX = 'X';
const playerO = 'O';
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = Array.from({ length: 9 }, (_, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', onCellClick);
    return cell;
});

const gameBoard = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');
const pvpButton = document.getElementById('pvp');
const pvcButton = document.getElementById('pvc');

gameBoard.append(...cells);

function initializeGame() {
    board = Array(9).fill('');
    currentPlayer = playerX;
    isGameActive = true;
    statusDisplay.style.color = 'white';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

function onCellClick(event) {
    const cellIndex = event.target.dataset.index;

    if (board[cellIndex] !== '' || !isGameActive) return;

    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = 'Game ends in a draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

    if (againstComputer && currentPlayer === playerO) {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    const availableCells = board
        .map((val, index) => val === '' ? index : null)
        .filter(index => index !== null);

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomIndex] = playerO;
    cells[randomIndex].textContent = playerO;

    if (checkWin()) {
        statusDisplay.textContent = `Player ${playerO} wins!`;
        isGameActive = false;
    } else if (!board.includes('')) {
        statusDisplay.textContent = 'Game ends in a draw!';
        isGameActive = false;
    } else {
        currentPlayer = playerX;
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

resetButton.addEventListener('click', initializeGame);
pvpButton.addEventListener('click', () => {
    againstComputer = false;
    initializeGame();
});
pvcButton.addEventListener('click', () => {
    againstComputer = true;
    initializeGame();
});

initializeGame();
