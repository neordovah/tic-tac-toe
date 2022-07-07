const WINNING_COMBO = [
   [1, 1, 1, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 1, 1, 1, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 1, 1, 1],
   [1, 0, 0, 1, 0, 0, 1, 0, 0],
   [0, 1, 0, 0, 1, 0, 0, 1, 0],
   [0, 0, 1, 0, 0, 1, 0, 0, 1],
   [1, 0, 0, 0, 1, 0, 0, 0, 1],
   [0, 0, 1, 0, 1, 0, 1, 0, 0]
]

const player = (playerSign) => {
    let sign = playerSign;
    let moves = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    return {sign, moves};
}

let player1 = player('X');
let player2 = player('O');

function fillCell(cell) {
    if(currentPlayer == 1) sign = player1.sign;
    else sign = player2.sign;
    cell.classList.add(`player${sign}`);
    cell.innerHTML = `<p style='font-size: 70px; margin: 0; padding: 0;'>${sign}</p>`;
}

function isWin() {
    let found = 1;
    if(currentPlayer == 1) checkedPlayer = player1;
    else checkedPlayer = player2;
    for(let j = 0; j < 8; j++) {
        let combination = WINNING_COMBO[j];
        found = 1;
        for(let i = 0; i < 9; i++) {
            if(combination[i] == 1 && checkedPlayer.moves[i] == 0) {
                found = 0;
            }
        }
        if(found == 1) return currentPlayer;
    }
    if(found == 0) return false;
}

function checkDraw() {
    let isDraw = 1;
    for(let i = 0; i < 9; i++) {
        if(player1.moves[i] == 0 && player2.moves[i] == 0) {
            isDraw = 0;
        }
    }
    if(isDraw == 1) {
        return 1;
    }
}

const winnerMessage = document.getElementById("winnerMessage");
function checkWin() {
    let result = isWin();
    let winnerPlayer;
    if (result == 1) {
        winnerPlayer = player1;
        toggleWin = 1;
    }
    else if (result == -1) {
        winnerPlayer = player2;
        toggleWin = 1;
    }

    if(toggleWin == 1) {
        winnerMessage.innerText = `${winnerPlayer.sign} WINS`;
    }
    if(toggleWin == 0) {
        if(checkDraw()) {
            winnerMessage.innerText = `IT'S A DRAW`;
            toggleWin = 1;
        }
    }
}

function updatePlayer(cell) {
    if(currentPlayer == 1) {
        player1.moves[cell.id] = 1;
    }
    else player2.moves[cell.id] = 1;
}

const cells = document.querySelectorAll(".cell");
let currentPlayer = 1;
let toggleWin = 0;



const resetButton = document.getElementById("reset");
function resetGame() {
    cells.forEach(cell => {
        cell.classList.remove("playerX");
        cell.classList.remove("playerO");
        cell.innerText = '';
        player1.moves = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        player2.moves = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        currentPlayer = 1;
        winnerMessage.innerHTML = `&nbsp`;
    })
}
resetButton.addEventListener("click", () => {
    resetGame();
    pvp();
})



function pvp() {
    toggleWin = 0;
    toggleGame = 1;
    pvpButton.classList.add("clickedButton");
    cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if(toggleWin == 0 && player1.moves[cell.id] == 0 && player2.moves[cell.id] == 0) {
            fillCell(cell);
            updatePlayer(cell);
            checkWin();
            currentPlayer = -currentPlayer;
        }
    })
})
}

toggleGame = 0;
const pvpButton = document.getElementById("pvp");
pvpButton.addEventListener("click", () => {
    if(toggleGame == 0) {
        pvp();
    }
})



pvp();


