const board = document.querySelector(".board")

function createBoard(size) {
    for (let i=0; i<size; i++) {
        const board_row = document.createElement("div");
        board_row.classList.add("board_row")
        for (let j=0; j<size; j++) {
            const board_cell = document.createElement("div");
            board_cell.classList.add("board_cell");
            board_cell.addEventListener("mousedown", clickedCell);
            board_row.appendChild(board_cell);
        }
        board.appendChild(board_row);
    }
}

function clickedCell(e) {
    e.target.innerHTML = "O";
}

createBoard(3);