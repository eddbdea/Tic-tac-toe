const MAX_ELEMENTS = 8;
const MAX_LENGTH = 9;
let curentPlayer = 1;
let emptySpotsLeft = MAX_LENGTH;
const gameValues = [];
const winConditions = [];
const verticalIncrement = 3;
const diagonalIncrement = 2;
let winIndex = 0;


function createWinConditionsArray() {
    for (let horizontal = 0; horizontal <= MAX_ELEMENTS - 2; horizontal+=3) {
        winConditions[winIndex] = [horizontal, horizontal + 1, horizontal + 2];
        ++winIndex;
    }
    for (let vertical = 0; vertical <= 2; ++vertical) {
        winConditions[winIndex] = [vertical, vertical + verticalIncrement, vertical + 2*verticalIncrement];
        ++winIndex;
    }
    for (let diagonal = 0; diagonal <= 2; diagonal+=2) {
        if (diagonal === 0) {
            winConditions[winIndex] = [diagonal, diagonal + 2*diagonalIncrement, diagonal + 4*diagonalIncrement];
            ++winIndex;
        } else {
            winConditions[winIndex] = [diagonal, diagonal + diagonalIncrement, diagonal + 2*diagonalIncrement];
        }
    }
}

createWinConditionsArray();

function createBoardGame() {
    for (let i = 0; i < MAX_LENGTH; ++i) {
        const divElem = document.createElement('div');
        document.getElementById('main-div').appendChild(divElem);
        divElem.classList.add('col', 'board-style');
        divElem.id = 'box' + i;
        divElem.onclick = () => {
            gameStatus(divElem);
        };
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
        return gameValues[a] && 
               gameValues[a] === gameValues[b] && 
               gameValues[a] === gameValues[c];
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