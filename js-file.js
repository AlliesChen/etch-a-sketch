const container = document.querySelector('#container');
addCells();

// Use event listener on the clearCanvas button
const resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click', () => {
    removeCells();
    // Base on the number, to create a num*num grids plate. 
    setPlate(getGridNum());
});

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

function colorMouseover() {
    const cells = document.querySelectorAll('#container > div');
    cells.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = '#000';
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
