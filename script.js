let playerStatus = 1;
let gameValues = Array(9).fill(null);
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
    let playerTurn = document.getElementById('player-move');
    let index = parseInt(div.id.replace('box', '')); 
    if (currentElement === '' && playerStatus === 1) {
        div.innerHTML = 'X';
        gameValues[index] = 'X';
        let win = checkWin(gameValues, winConditions);
        if (win) {
            document.getElementById('player-move').innerHTML = 'Player 1 wins!';
            document.getElementById('restart').removeAttribute('hidden');
        } else {
            playerTurn.innerHTML = 'Player move: player 2';
            playerStatus = 2;
        }
    } else if (currentElement === '' && playerStatus === 2) {
        div.innerHTML = 'O';
        gameValues[index] = 'O';
        let win = checkWin(gameValues, winConditions);
        if (win) {
            document.getElementById('player-move').innerHTML = 'Player 2 wins!';
            document.getElementById('restart').removeAttribute('hidden');
        } else {
            playerTurn.innerHTML = 'Player move: player 1';
            playerStatus = 1;
        }
    }
}

function checkWin(gameValues, winConditions) {
    return winConditions.some(winner => {
        let a = winner[0];
        let b = winner[1];
        let c = winner[2];
        return gameValues[a] && gameValues[a] === gameValues[b] && gameValues[a] === gameValues[c];
    });
}

function restartGame() {
    location.reload();
}