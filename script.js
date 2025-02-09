const MAX_ELEMENTS = 8;
const MAX_LENGTH = 9;
let playerStatus = 1;
let gameValues = Array(MAX_LENGTH).fill(null);
let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function gameStatus(div) {
    const currentElement = div.innerHTML;
    const playerTurn = document.getElementById('player-move');
    const index = parseInt(div.id.replace('box', '')); 
    addGameSign(index, currentElement, div);
    let win = checkWin(gameValues, winConditions);
    gameWinStatus(win, playerTurn, index);
}

function checkWin(gameValues, winConditions) {
    return winConditions.some(winner => {
        let a = winner[0];
        let b = winner[1];
        let c = winner[2];
        return gameValues[a] && gameValues[a] === gameValues[b] && gameValues[a] === gameValues[c];
    });
}

function addGameSign(index, currentElement, boxElement) {
    if (currentElement === '' && playerStatus === 1) {
        boxElement.innerHTML = 'X';
        gameValues[index] = 'X';
    } else if (currentElement === '' && playerStatus === 2) {
        boxElement.innerHTML = 'O';
        gameValues[index] = 'O';
    }
}

function gameWinStatus(win, player, index) {
    if (win) {
        player.innerHTML = 'Player ' + playerStatus + ' wins!';
        document.getElementById('restart').removeAttribute('hidden');
    } else if (index === MAX_ELEMENTS) {
        player.innerHTML = 'It`s a draw!';
        document.getElementById('restart').removeAttribute('hidden');
    } else {
        if (playerStatus === 1) {
            playerStatus = 2;
        } else if (playerStatus === 2) {
            playerStatus = 1;
        }
        player.innerHTML = 'Player move: player ' + playerStatus;
    }
}

function restartGame() {
    location.reload();
}