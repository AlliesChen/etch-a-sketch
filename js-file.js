const container = document.querySelector('#container');
let primeColor = 0; // for realizing 10% darken in 10 steps
addCells();

// Use event listener on the clearCanvas button
const resetButton = document.querySelector('#resetButton');

resetButton.addEventListener('click', () => {
    removeCells();
    // Base on the number, to create a num*num grids plate. 
    setPlate(getGridNum());
});

// the functions

// Assign the grid box corresponded to user's input
function setPlate(gridNum) {
    container.style.cssText = `grid-template-rows: repeat(${gridNum}, 1fr); grid-template-columns: repeat(${gridNum}, 1fr)`;
    addCells(gridNum);
}

// Use a prompt for the user to enter a number among 1 to 100.
function getGridNum () {
    let userInput = prompt('Enter an integer among 1 to 100 to create a x*x grids plate');
    let grids = Number(userInput);

    if (!Number.isInteger(grids) || grids < 1 || grids > 100) getGridNum()
    return grids;
}

function removeCells() {
    const cells = document.querySelectorAll('#container > div');
    cells.forEach(cell => cell.parentNode.removeChild(cell));
    // Another way to do is
    // const canvas = document.getElementsByClassName('cell');
    // while(canvas.length > 0){
    //     canvas[0].parentNode.removeChild(canvas[0]);
    // }
    // querySelectorAll won't work on the way mentioned above due to its a static list
}

function darkenColor(currentColors) {
    // start from the highest value in the array
    let highestVal = maxValue(currentColors);
    let newHighestVal = Math.round(highestVal - Math.min(primeColor * 0.1, highestVal));
    // decreasing the other values by the same fraction
    let decreaseFrac = (highestVal - newHighestVal) / highestVal;

    for (let i = 0; i < 3; i++) {
        if (currentColors[i] == highestVal) {
            currentColors[i] = newHighestVal;
        } else {
            currentColors[i] = Math.round(currentColors[i] * (1 - decreaseFrac));
        }
    }
    return(`rgb(${currentColors.join(',')})`);
}

// just see a comment says this got a better run-time than Math.max
function maxValue(arr) {
    let max = arr[0];
  
    for (let val of arr) {
      if (val > max) max = val;
    }
    return max;
}

// use for making random RGB colors
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createColorSet(valueArray) {
    // if the color hasn't been set, make one
    if (!valueArray.length) {

        for (let i = 0; i < 3; i++) {
            valueArray[i] = getRandom(1, 255);
        }
        primeColor = maxValue(valueArray);
        return(`rgb(${valueArray.join(',')})`);

    } else { // 10% darken the color
        return darkenColor(valueArray);
    }
}

function colorMouseover() {
    const cells = document.querySelectorAll('#container > div');
    let rgbValue = [];

    cells.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = `${createColorSet(rgbValue)}`;
            console.log(`rgb(${rgbValue.join(',')})`);
        });
    });
}

function addCells(gridNum) {

    let i = (gridNum*gridNum) || (16 * 16);

    for (;i > 0; i--) {
        const cell = document.createElement('div');
        // The stylesheet draws borders base on class
        cell.classList.add('cell');
        container.appendChild(cell);
    }
    colorMouseover()
}