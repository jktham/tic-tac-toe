const game = (() => {
    const board_container = document.querySelector(".board-container");
    const setup = document.querySelector(".setup");
    const start_button = document.querySelector("#start-button");
    const player1_name = document.querySelector("#player1-name");
    const player1_symbol = document.querySelector("#player1-symbol");
    const player2_name = document.querySelector("#player2-name");
    const player2_symbol = document.querySelector("#player2-symbol");
    
    let player;
    let player1;
    let player2;
    let board_state;

    const Player = (name, symbol, index) => {
        let points = 0;
        const getName = () => name;
        const getIndex = () => index;
        const getSymbol = () => symbol;
        const getPoints = () => points;
        const addPoints = (p) => {
            points += p;
        }

        return {
            getName,
            getIndex,
            getSymbol,
            getPoints,
            addPoints,
            
        }
    }

    const startGame = () => {
        if (player1_name.value && player1_symbol.value && player2_name.value && player2_symbol.value) {
            player1 = Player(player1_name.value, player1_symbol.value, 1);
            player2 = Player(player2_name.value, player2_symbol.value, 2);
            togglePlayer();
            createBoard();
        }
    }

    const togglePlayer = () => {
        if (player != player1) {
            player = player1;
        } else {
            player = player2;
        }
    }

    const createBoard = () => {
        board_state = Array.from(Array(3), () => new Array(3));
        setup.style.display = "none";
        let board = document.createElement("div");
        board.classList.add("board");
        board_container.appendChild(board);

        for (let i=0; i<3; i++) {
            const board_row = document.createElement("div");
            board_row.classList.add("board_row")
            for (let j=0; j<3; j++) {
                const board_cell = document.createElement("div");
                board_cell.classList.add("board_cell");
                board_cell.dataset.x = j;
                board_cell.dataset.y = i;
                board_cell.addEventListener("click", clickedCell);
                board_row.appendChild(board_cell);
            }
            board.appendChild(board_row);
        }
    }

    const clearBoard = () => {
        board_state = Array.from(Array(3), () => new Array(3));
        board_cells = Array.from(document.querySelectorAll(".board_cell"));
        for (let i=0; i<9; i++) {
            board_cells[i].innerHTML = "";
        }
    }

    const clickedCell = (e) => {
        board_state[e.target.dataset.y][e.target.dataset.x] = player.getIndex();
        e.target.innerHTML = player.getSymbol();
        togglePlayer();
    }
    
    start_button.addEventListener("click", startGame);

    return {
        startGame,
        createBoard,
        clearBoard,

    };
})();