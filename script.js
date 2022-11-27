/**
 * I made a mistake in the last lesson and I'm fixing it here.
 * 
 * 
 * Pass By Value -> Primitive Types (Number, String, Boolean)
 *      - When you pass a primitive type to a function, you are passing a copy of the value      
 *
 * Pass By Reference -> Objects (Array, Object, Function)
 *      - When you pass an object to a function, you are passing a reference to the object
 * 
 * 
 */

// this will be the functions we use to build the game
function reset() {
    // Reset the game
    for (let i = 0; i < buttonArray.length; i++) {
        buttonArray[i].textContent = "";
    }
    count = 0;
}

function resetScore() {
    // Reset the game score
    xWinCounter = 0;
    oWinCounter = 0;
    document.getElementById("gameScoreTable").rows[2].cells.namedItem("xWin").innerHTML = xWinCounter;
    document.getElementById("gameScoreTable").rows[2].cells.namedItem("oWin").innerHTML = oWinCounter;
}

function register(){
    let regPlayerOne = prompt ("Enter Player One Name");
    let regPlayerTwo = prompt ("Enter Player Two Name");
    document.getElementById("gameScoreTable").rows[1].cells.namedItem("playerX").innerHTML = regPlayerOne;
    document.getElementById("gameScoreTable").rows[1].cells.namedItem("playerO").innerHTML = regPlayerTwo;
}

function ArrayToMatrix(arr, num) {
    // Convert an array to a matrix for easier mental math
    let matrix = [], i, k;
    // k is the number of columns
    // i is the number of rows

    for (i = 0, k = -1; i < arr.length; i++) { // i is the number of rows and k is the number of columns
        if (i % num == 0) {
            k++;
            matrix[k] = [];
        }
        matrix[k].push(arr[i]);
    }
    return matrix;
}

function scoreUpdate(sym) {
    // update the game score
    switch (sym) {
        case "X":
            xWinCounter++;
            document.getElementById("gameScoreTable").rows[2].cells.namedItem("xWin").innerHTML = xWinCounter;
            alert("Player X won this Round");
            break;
        case "O":
            oWinCounter++;
            document.getElementById("gameScoreTable").rows[2].cells.namedItem("oWin").innerHTML = oWinCounter;
            alert("Player O won this Round");
            break;
    }
    reset();
}


function checkForWin(arg, sym) {
    // Check for a win
    if (chkDiagonal(arg, sym) == true) {
        setTimeout(function () { scoreUpdate(sym) }, 500);
    } else {
        if (chkDiagonalT(arg, sym) == true) {
            setTimeout(function () { scoreUpdate(sym) }, 500);
        } else {
            if (chkRow(arg, sym) == true) {
                setTimeout(function () { scoreUpdate(sym) }, 500);
            } else {
                if (chkCol(arg, sym) == true) {
                    setTimeout(function () { scoreUpdate(sym) }, 500);
                } else {
                    checkforTie(arg);
                }
            }
        }
    }
}


// Check for a diagonal win
function chkDiagonal(arg, sym) {
    let counter = 0;
    for (let i = 0; i < arg.length; i++) {
        if (arg[i][i].textContent == sym) {
            counter++;
        }
    }
    if (counter == arg.length) {
        return true;
    }
    return false;
}

// Check for a diagonalT win
function chkDiagonalT(arg, sym) {
    let counter = 0;
    for (let i = 0; i < arg.length; i++) {
        if (arg[arg.length - i - 1][i].textContent == sym) {
            counter++;
        }
    }
    if (counter == arg.length) {
        return true;
    }
    return false;
}

// Check for a row win
function chkRow(arg, sym) {
    let counter = 0;
    for (let i = 0; i < arg.length; i++) {
        for (let j = 0; j < arg.length; j++) {
            if (arg[i][j].textContent == sym) {
                counter++;
            }
            if (counter == arg.length) {
                return true;
            }
        }
        counter = 0;
    }
    return false;
}

// Check for a col win
function chkCol(arg, sym) {
    let counter = 0;
    for (let i = 0; i < arg.length; i++) {
        for (let j = 0; j < arg.length; j++) {
            if (arg[j][i].textContent == sym) {
                counter++;
            }
            if (counter == arg.length) {
                return true;
            }
        }
        counter = 0;
    }
    return false;
}

function checkforTie(arg) {
    // Check for a tie
    if (count == arg.length ** 2) {
        alert("No Winner In This Round");
        reset();
    }
}


// Game Logic
let count = 0; // Keep track of the number of turns
let xWinCounter = 0;
let oWinCounter = 0;
let buttonArray = document.querySelectorAll(".btn"); // Get all the buttons

let coArray = []; // Create an array to store the coordinates of the buttons
buttonArray.forEach((button) => {
    coArray.push(button); // Push the buttons to the array
});

let matrix = ArrayToMatrix(coArray, 3); // Convert the array to a matrix

console.log(matrix);


for (let i = 0; i < buttonArray.length; i++) { // Loop through the buttons and add an event listener to each one

    buttonArray[i].addEventListener("click",
        function () {
            let sym;
            if (count % 2 == 0 && buttonArray[i].textContent == "") {
                buttonArray[i].textContent = "X";
                count++;
                sym = "X";
                //checkForWin(matrix, sym);// -> This is where we will check for a win
            } else if (count % 2 != 0 && buttonArray[i].textContent == "") {
                buttonArray[i].textContent = "O";
                count++;
                sym = "O";
                //checkForWin(matrix, sym)// checkForWin(matrix); -> This is where we will check for a win
            } else {
                alert("This button is already clicked!");
            }
            checkForWin(matrix, sym);// -> This is where we will check for a win
        }
    );
}
