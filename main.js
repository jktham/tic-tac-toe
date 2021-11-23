const boardController = (() => {
    const main = document.querySelector(".main");
    const setup = document.querySelector(".setup");
    
    let board_state;

    const createBoard = () => {
        board_state = Array.from(Array(3), () => new Array(3));
        setup.style.display = "none";
        main.style.display = "block";
        let board = document.createElement("div");
        board.classList.add("board");
        main.prepend(board);

        for (let i=0; i<3; i++) {
            const board_row = document.createElement("div");
            board_row.classList.add("board_row")
            for (let j=0; j<3; j++) {
                const board_cell = document.createElement("div");
                board_cell.classList.add("board_cell");
                board_cell.dataset.x = j;
                board_cell.dataset.y = i;
                board_cell.addEventListener("click", gameController.clickedCell);
                board_row.appendChild(board_cell);
            }
            board.appendChild(board_row);
        }
    };

    const clearBoard = () => {
        board_state = Array.from(Array(3), () => new Array(3));
        board_cells = Array.from(document.querySelectorAll(".board_cell"));
        for (let i=0; i<9; i++) {
            board_cells[i].innerHTML = "";
        }
    };

    const setCell = (cell, user) => {
        board_state[cell.dataset.x][cell.dataset.y] = user.getIndex();
        cell.innerHTML = user.getSymbol();
    };

    const checkLegal = (x, y) => {
        if (!board_state[x][y]) {
            return true;
        }
    };

    const checkWin = () => {
        let str = "";
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                if (!board_state[i][j]) {
                    str += ".";
                } else {
                    str += board_state[i][j];
                }
            }
        }
        if (str.match("^(?:[12]..[12]..[12]..|.[12]..[12]..[12].|..[12]..[12]..[12]|[12][12][12]......|...[12][12][12]...|......[12][12][12]|[12]...[12]...[12]|..[12].[12].[12]..)$")) {
            return true;
        }
    
    };

    const checkStalemate = () => {
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                if (!board_state[i][j]) {
                    return false;
                }
            }
        }
        return true;
    };

    return {
        createBoard,
        clearBoard,
        setCell,
        checkLegal,
        checkWin,
        checkStalemate,

    };
})();

const gameController = (() => {
    const start_button = document.querySelector("#start-button");
    const player1_name = document.querySelector("#player1-name");
    const player1_symbol = document.querySelector("#player1-symbol");
    const player2_name = document.querySelector("#player2-name");
    const player2_symbol = document.querySelector("#player2-symbol");
    const status_text = document.querySelector("#status-text");

    let player;
    let player1;
    let player2;

    const startGame = () => {
        if (player1_name.value && player1_symbol.value && player2_name.value && player2_symbol.value) {
            player1 = Player(player1_name.value, player1_symbol.value, 1);
            player2 = Player(player2_name.value, player2_symbol.value, 2);
            togglePlayer();
            boardController.createBoard();
        }
    };

    const endGame = () => {
        
    };

    const togglePlayer = () => {
        if (player != player1) {
            player = player1;
        } else {
            player = player2;
        }
        status_text.innerHTML = player.getName() + "<br>" + player.getSymbol();
    };
    
    const clickedCell = (e) => {
        if (boardController.checkLegal(e.target.dataset.x, e.target.dataset.y)) {
            boardController.setCell(e.target, player);

            if (boardController.checkWin()) {
                status_text.innerHTML = player.getName() + "won!";
                endGame();
            } else if (boardController.checkStalemate()) {
                status_text.innerHTML = "Stalemate";
            } else {
                gameController.togglePlayer();
            }
        }
    };

    start_button.addEventListener("click", startGame);

    return {
        startGame,
        togglePlayer,
        clickedCell,

    };
})();

const Player = (name, symbol, index) => {
    let points = 0;
    const getName = () => name;
    const getIndex = () => index;
    const getSymbol = () => symbol;
    const getPoints = () => points;
    const addPoints = (p) => {
        points += p;
    };

    return {
        getName,
        getIndex,
        getSymbol,
        getPoints,
        addPoints,
        
    };
};