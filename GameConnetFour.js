
/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const hiegth = 6;
const width = 7;
let board = []   // array of rows, each row is array of cells  (board[y][x])
currentPlayer = 1   // active player: 1 or 2

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
     // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    for (let y = 0; y < hiegth; y++) {
      board.push(Array.from({ length: width }));
    }
}

    /** makeHtmlBoard: make HTML table and row of column tops. */

function createGameTable(){
      // TODO: get "CreateGameTable" variable from the item in HTML with ID of "gameTable"
    //   TODO: create the top row of the connect four game
    const tableRow = document.getElementById('gameTable')
    const headRow = document.createElement('tr')
    tableRow.append(headRow)
    for (let row = 0; row < width; row++){
        const topRow = document.createElement('th')
        topRow.setAttribute('id', row)
        headRow.append(topRow)
    }
    // adding event listener on each cell of the top row
    headRow.addEventListener('click', handleClick)
     
    // TODO: create main part of game html table
    for (let y=0; y < hiegth; y++){
        const row = document.createElement('tr')
        tableRow.append(row)
        for (let x=0; x < width; x++){
            const col = document.createElement('td')
            col.setAttribute('id', `${y}-${x}`)
            row.append(col)
        }
    }
}

// finding the column spot of the top cell row when we click on it. it retrun null if it is not empty.
function findColumnSpot(column){
    for (let row = hiegth -1; row >= 0; row --){
        if (!board[row][column]) {
            return row;
        }
    }
    return null;
}
// create div and adding class to each div and place it in each cell
function placeInTable(row, column){
    const cell = document.createElement('div')
    cell.classList.add('taken')
    cell.classList.add(`p${currentPlayer}`)
    cell.style.top = -50 * (row + 2)

    const spot = document.getElementById(`${row}-${column}`)
    spot.append(cell)
}

// alert end of Game
function endGame(msg){
    alert(msg)
}

// handle click on each cell of top row and place players colors in the cells 
function handleClick(event){
    const column = Number(event.target.id);
    
    // finding empty spot or next spot in column (if null, ignor the click )
    const row = findColumnSpot(column)
        if (row === null){
            return
        }
    // place cell in board and add to HTML table
  // TODO: add line to update in-memory board
    board[row][column] = currentPlayer
    placeInTable(row, column)

    // check for  win
    if (checkForWin()){
        return endGame(`Player ${currentPlayer} Won!!!`)
    }


    // check for tie 
    const gameTie = board.every((row)=> row.every(column => column))
    if (gameTie === true){
        return endGame('Game Tie')
    }

    // switching player
    currentPlayer = currentPlayer === 1 ? 2 : 1
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin(){
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer
    
        return cells.every(
          ([row, column]) =>
            row >= 0 &&
            row < hiegth &&
            column >= 0 &&
            column < width &&
            board[row][column] === currentPlayer
        );
    }
    
    for (let row = 0; row < hiegth; row++) {
        for (let column = 0; column < width; column++) {
          // get "check list" of 4 cells (starting here) for each of the different
          // ways to win
          const horiz = [[row, column], [row, column + 1], [row, column + 2], [row, column + 3]];
          const vert = [[row, column], [row + 1, column], [row + 2, column], [row + 3, column]];
          const diagDR = [[row, column], [row + 1, column + 1], [row + 2, column + 2], [row + 3, column + 3]];
          const diagDL = [[row, column], [row + 1, column - 1], [row + 2, column - 2], [row + 3, column - 3]];
    
          // find winner (only checking each win-possibility as needed)
          if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
            return true;
          }
        }
    }
}


makeBoard()
createGameTable()