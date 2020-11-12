let row1 = 9; //defining row for grid
let col1 = 9; //defining column for grid
let grid = document.getElementById("grid"); //storing the dom element in grid
let bombs = []; //defining bombs array to store indices where bomb is present
let squares = []; //this array is used to store the total bombs on four sides of grid
let visited = []; //this array is used to store the visited cell
let gameover = false; //setting gameover initially to false
let bombcount = 10; //setting the total bomb count
let checkedCells = 0; //this variable tells how many cells were clicked without bombs
document.getElementById("count").innerHTML = "Your BombCount is " + bombcount;
//setting the visited matrix to false;
for (let Row = 0; Row < row1; Row++) {
  let duplicate = []; //initializing the duplicate array to store initially all cells are unvisited
  for (let Col = 0; Col < col1; Col++) {
    duplicate.push(false);
  }
  visited.push(duplicate);
}
//define reset function
let reset = () => {
  location.reload(); //reset the entire grid
};

//find bombs
//this function return whether bomb is present in that cell or not
let find = (i, j) => {
  let bomb = Number(i.toString() + j.toString());
  for (let i = 0; i < bombs.length; i++) {
    if (bombs[i] === bomb) {
      return true;
    }
  }
  return false;
};

/** function to create Bombs
 *here we can add unique bombs
 *when the generated bomb is present in the bombs array
 *then continue to the next iteration
 *without pushing the element into bombs array
 *when bombs array size is 10 then end the loop.
 *@bomb tells us the bomb index
 *@Bombfound tells us that the bomb index is already
 *present in the array and it will check for the
 *other element
 */

let createBombs = () => {
  while (bombs.length !== 10) {
    let bomb = Math.round(Math.random() * 88);
    if (bomb % 10 === 9) {
      continue;
    }
    let Bombfound = false;
    for (let i = 0; i < bombs.length; i++) {
      if (bombs[i] === bomb) {
        Bombfound = true;
        break;
      }
    }
    if (Bombfound) {
      continue;
    }
    bombs.push(bomb);
  }
  console.log(bombs);
};

/**
 * Whenever the user clicks on the bomb then
 * it will display the cells in which bombs are present
 * and it will set the game over to truesuch that the cells
 * are not clickable
 * @squares matrix is used to replace all the bomb cells
 * with bombs.
 * @setTimeout is used to display the statement after given
 * time interval
 */

let gameend = () => {
  gameover = true; // initialzing the gameover to true sothat other cells are not clickable
  for (let i = 0; i < bombs.length; i++) {
    let row = parseInt(bombs[i] / 10);
    let col = bombs[i] % 10;
    squares[row][col].innerHTML = "💣";
    squares[row][col].setAttribute("id", "red");
  }
  //setting timeout function
  setTimeout(() => {
    document.getElementById("grid").innerHTML = "You Lost";
  }, 1000);
};

//checkfor win
//[82, 24, 38, 57, 41, 65, 23, 45, 53, 4]
/**
 * this function checks every time when we click
 * on a valid cell whether the @checked is equal to 71
 * or not that is if @checked is equal to 71 then the game is
 * ended and the player has won the game
 * @flag says that when even you right click the mouse then
 * you can flag on any cell that you feel that it has
 * bomb in it, if it really has then the bomb count is reduced
 * by 1.
 * @checked1 says about the flag count that how many cells
 * has bombs in it
 * Here I'm using the stored @html elements in square matrix
 * and I'm checking whether it contains flag as well as bomb or
 * not.
 * @setTimeout resets the game after 1sec.
 */

let checkforwin = () => {
  console.log(checkedCells);
  let checkedBombs = 0;
  for (let i = 0; i < row1; i++) {
    for (let j = 0; j < col1; j++) {
      let doc = squares[i][j];
      if (doc.classList.contains("flag") && doc.classList.contains("bomb")) {
        checkedBombs++;
      }
    }
  }
  if ((checkedBombs === 10 && checkedCells === 71) || checked === 71) {
    gameover = true;
    document.getElementById("result").innerHTML = "You Won";
  }
  if (gameover) {
    setTimeout(() => {
      reset();
    }, 1000);
  }
};

//check function
/**
 *@Check function checks whether cell is visited already
 *or not which is used in opening the neighbouring cells
 *in the @deleteneighbouring cells function
 */

let check = (row, col) => {
  if (squares[row][col].classList.contains("checked") === true) {
    return true;
  }
  return false;
};

//output fundtion
/**
 * @output function takes two arguments @row @col where the @clicked
 * cell is present and it checks for whether the cell
 * is @visited already or not if it is visited then return
 * if not then replace the cell with @totalbombs present
 * at it surroundings.
 * Also add the style to the cell such that it appears
 * @green and also increment the @checked that it is a valid cell
 * Now check whether the checked cells are equal to
 * 71 or not.
 */
let output = (row, col) => {
  if (gameover) {
    return;
  }
  let doc = squares[row][col];
  if (doc.classList.contains("checked") || gameover || find(row, col)) {
    return;
  }
  let totalbombs = squares[row][col].getAttribute("count");
  squares[row][col].setAttribute("id", "green");
  squares[row][col].innerHTML = totalbombs;
  checkedCells++;
  checkforwin();
  //console.log(visited[row][col]);
};

//delete the squares surrounding
/**
 * @deletesquares basically a function that is used to
 * open the other eight or less than eight neighbouring
 * cells and here @row @col are the two arguments
 * which are passed to the function and at first
 * we need to check whether the cell is clicked already or not
 * @visited @squares manages the check
 * at the sametime we need to open the cells which are at the
 * surroundings of the cell and the cells which contains bombs
 * should not be executde it should be skipped.
 * @find function checks whether bomb is present in that cell or
 * not.@check function checks whether the cell is visited
 * already or not.
 * atlast adding the cell present at the given row and
 * column as checked.
 */

let deletesquares = (row, col) => {
  if (
    squares[row][col].classList.contains("checked") ||
    gameover ||
    visited[row][col]
  ) {
    return;
  }
  if (
    row - 1 >= 0 &&
    !find(row - 1, col) &&
    !check(row - 1, col) &&
    !visited[row - 1][col]
  ) {
    visited[row - 1][col] = true;
    output(row - 1, col);
  }
  if (
    col - 1 >= 0 &&
    !find(row, col - 1) &&
    !check(row, col - 1) &&
    !visited[row][col - 1]
  ) {
    visited[row][col - 1] = true;
    output(row, col - 1);
  }
  if (
    row + 1 < row1 &&
    !find(row + 1, col) &&
    !check(row + 1, col) &&
    !visited[row + 1][col]
  ) {
    visited[row + 1][col] = true;
    output(row + 1, col);
  }
  if (
    col + 1 < col1 &&
    !find(row, col + 1) &&
    !check(row, col + 1) &&
    !visited[row][col + 1]
  ) {
    visited[row][col + 1] = true;
    output(row, col + 1);
  }
  if (
    row - 1 >= 0 &&
    col - 1 >= 0 &&
    !find(row - 1, col - 1) &&
    !check(row - 1, col - 1) &&
    !visited[row - 1][col - 1]
  ) {
    visited[row - 1][col - 1] = true;
    output(row - 1, col - 1);
  }
  if (
    row - 1 >= 0 &&
    col + 1 < col1 &&
    !find(row - 1, col + 1) &&
    !check(row - 1, col + 1) &&
    !visited[row - 1][col + 1]
  ) {
    visited[row - 1][col + 1] = true;
    output(row - 1, col + 1);
  }
  if (
    row + 1 < row1 &&
    col - 1 >= 0 &&
    !find(row + 1, col - 1) &&
    !check(row + 1, col - 1) &&
    !visited[row + 1][col - 1]
  ) {
    visited[row + 1][col - 1] = true;
    output(row + 1, col - 1);
  }
  if (
    row + 1 < row1 &&
    col + 1 < col1 &&
    !find(row + 1, col + 1) &&
    !check(row + 1, col + 1) &&
    !visited[row + 1][col + 1]
  ) {
    visited[row + 1][col + 1] = true;
    output(row + 1, col + 1);
  }

  let doc = squares[row][col];
  doc.classList.add("checked");
};

//calculate bombs
//[47, 4, 84, 67, 54, 10, 55, 77, 87, 44]

/**
 * @calculate function basically calculates
 * howmany bombs are present in the neighbouring
 * cells to that cell and store them in a variable
 * @total
 * The @bomb check is performed by the @find function.
 * at last the bomb count is stored in the @squares
 * matrix which has the @html elements.
 */

let calculate = (row, col) => {
  let total = 0;
  if (row - 1 >= 0) {
    if (find(row - 1, col)) {
      total++;
    }
  }
  if (col - 1 >= 0) {
    if (find(row, col - 1)) {
      total++;
    }
  }
  if (row + 1 < row1) {
    if (find(row + 1, col)) {
      total++;
    }
  }
  if (col + 1 < col1) {
    if (find(row, col + 1)) {
      total++;
    }
  }
  if (row - 1 >= 0 && col - 1 >= 0) {
    if (find(row - 1, col - 1)) {
      total++;
    }
  }
  if (row - 1 >= 0 && col + 1 < col1) {
    if (find(row - 1, col + 1)) {
      total++;
    }
  }
  if (row + 1 < row1 && col - 1 >= 0) {
    if (find(row + 1, col - 1)) {
      total++;
    }
  }
  if (row + 1 < row1 && col + 1 < col1) {
    if (find(row + 1, col + 1)) {
      total++;
    }
  }
  squares[row][col].setAttribute("count", total);
};

//add flag
/**
 * @addflag is the function that has the
 * control over adding flag to the @DOM
 * whenever user gives @rightclick on the cell
 * if the user places @flag on the cell in which
 * bomb is present then @bombcount is reduced
 * saying him that bomb is present in that cell and
 * don't go for it.
 * the flag can also be removed by right-clicking
 * on the flag cell.
 */

let addflag = (row, col) => {
  if (gameover) {
    return;
  }
  let f = false;
  if (squares[row][col].classList.contains("flag")) {
    squares[row][col].innerHTML = "";
    squares[row][col].classList.remove("flag");
  } else {
    squares[row][col].innerHTML = " 🚩";
    squares[row][col].classList.add("flag");
    f = true;
  }
  if (find(row, col) && f === true) {
    bombcount--;
    document.getElementById("count").innerHTML =
      "Your BombCount is " + bombcount;
    squares[row][col].classList.add("bomb");
  }
  if (f === false && find(row, col)) {
    bombcount++;
    document.getElementById("count").innerHTML =
      "Your BombCount is " + bombcount;
    squares[row][col].classList.remove("bomb");
  }
};

//function to create a Board
/**
 * @createboard is used to create the grid
 * @createBombs is used to create a @bomb @array
 * immediately after @starting the game the @start
 * button is disabled.
 * @reset button is enabled.
 * @container is used to store all the cells in row
 * and the @container is pushed into the @grid html element
 * @cell stores a @div element
 * then  adding @css properties to the cell
 * like adding @class @cell which was defined in @index.css
 * @container element stores all the elements in the row
 * atlast @container is pushed to @grid
 * @addeventlistener is used whenever user clicks
 * on a cell if user clicks on a cell which has a
 * @bomb in it then @gameend is called
 * @checked in classlist says whether the cell
 * is @visited already or not.
 * @find is used whether bomb is present in that cell
 * or not.
 * @output function is used to display the total
 * @delete squares is used to open the valid neighbouring
 * squares.
 * @ontextmenu says when we give a @right click then
 * @addflag to the @row @col is called.
 * @container is pushed to @grid
 * @square holds all the row @html elements
 * @squares holds all @square
 * @calculate calculates total number of @bombs present
 * in the @neighbouring cells.
 */

let createBoard = () => {
  if (gameover === true) {
    return;
  }
  createBombs();
  document.getElementById("start").setAttribute("disabled", true);
  document.getElementById("reset").removeAttribute("disabled");
  for (let i = 0; i < row1; i++) {
    let container = document.createElement("div");
    container.setAttribute("class", "container");
    let square = [];
    for (let j = 0; j < col1; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("class", "cell");
      container.appendChild(cell);
      square.push(cell);
      cell.addEventListener("click", () => {
        if (find(i, j)) {
          gameend();
        } else {
          if (cell.classList.contains("checked")) {
            return;
          }
          output(i, j);
          deletesquares(i, j);
        }
      });
      cell.oncontextmenu = function (e) {
        e.preventDefault();
        addflag(i, j);
      };
    }
    grid.appendChild(container);
    squares.push(square);
  }
  for (let i = 0; i < row1; i++) {
    for (let j = 0; j < col1; j++) {
      if (find(i, j)) {
        continue;
      } else {
        calculate(i, j);
      }
    }
  }
};

checkforwin();
