function pvp() {
    toggle = 1;
    console.log("pvp")
}

toggle = 0;
const pvpButton = document.getElementById("pvp");
pvpButton.addEventListener("click", () => {
    if(toggle == 0) {
        pvp();
    }
    else {
        console.log("you already pressed this")
    }
})

const player = (playerSign) => {
    let sign = playerSign;
    let moves = [0, 0, 0,
                 0, 0, 0,
                 0, 0, 0];
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

const cells = document.querySelectorAll(".cell");
let currentPlayer = 1;
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        fillCell(cell);
        currentPlayer = -currentPlayer;
    }, {once: true})
})