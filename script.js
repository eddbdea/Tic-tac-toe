let playerStatus = 1;

function gameStatus(div) {
    const currentElement = div.innerHTML;
    let playerTurn = document.getElementById('player-move');
    if (currentElement === '' && playerStatus === 1) {
        div.innerHTML = 'X';
        playerTurn.innerHTML = 'Player move: player 2';
        playerStatus = 2;
    } else if (currentElement === '' && playerStatus === 2) {
        div.innerHTML = 'O';
        playerTurn.innerHTML = 'Player move: player 1';

        playerStatus = 1;
    }
    console.log(currentElement);
}