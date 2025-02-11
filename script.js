const MAX_ELEMENTS = 8;
const MAX_LENGTH = 9;
let curentPlayer = 1;
let emptySpotsLeft = MAX_LENGTH;
const gameValues = Array(MAX_LENGTH).fill(null);
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

function createBoardGame() {
    for (let i = 0; i < MAX_LENGTH; ++i) {
        const divElem = document.createElement('div');
        document.getElementById('main-div').appendChild(divElem);
        divElem.classList.add('col', 'board-style');
        divElem.id = 'box' + i;
        divElem.onclick = () => {
            gameStatus(divElem);
        }
    }
}

createBoardGame();

function gameStatus(div) {
    const currentElement = div.innerHTML;
    const playerTurn = document.getElementById('player-move');
    const index = parseInt(div.id.replace('box', '')); 
    addGameSign(index, currentElement, div);
    const win = checkWin(gameValues, winConditions);
    gameWinStatus(win, playerTurn);
}

function checkWin(gameValues, winConditions) {
    return winConditions.some(winner => {
        const a = winner[0];
        const b = winner[1];
        const c = winner[2];
        return gameValues[a] && gameValues[a] === gameValues[b] 
        && gameValues[a] === gameValues[c];
    });
}

function addGameSign(index, currentElement, boxElement) {
    if (currentElement === '' && curentPlayer === 1) {
        boxElement.innerHTML = 'X';
        gameValues[index] = 'X';
    } else {
        boxElement.innerHTML = 'O';
        gameValues[index] = 'O';
    }
    --emptySpotsLeft;
}

function gameWinStatus(win, player) {
    if (win) {
        document.getElementById('restart').removeAttribute('hidden');
        emptySpotsLeft = MAX_LENGTH;
        return player.innerHTML = 'Player ' + curentPlayer + ' wins!';
    } else if (emptySpotsLeft === 0) {
        document.getElementById('restart').removeAttribute('hidden');
        emptySpotsLeft = MAX_LENGTH;
        return player.innerHTML = 'It`s a draw!';
    }
    if (curentPlayer === 1) {
        curentPlayer = 2;
    } else {
        curentPlayer = 1;
    }
    return player.innerHTML = 'Player move: player ' + curentPlayer;
}

function restartGame() {
    location.reload();
}