const container = document.querySelector('#container');

addCells();
const cells = document.querySelectorAll('#container > div');

cells.forEach(cell => {
    cell.classList.add('cell');
    cell.addEventListener('mouseover', () => {
        cell.style.backgroundColor = 'DarkGoldenrod';
    });
});

function addCells() {
    let i = 16 * 16;
    for (;i > 0; i--) {
        const cell = document.createElement('div');
        container.appendChild(cell);
    }
}

function removeCells() {
    cells.forEach(cell => cell.parentNode.removeChild(cell));
    // Another way to do is
    // const canvas = document.getElementsByClassName('cell');
    // while(canvas.length > 0){
    //     canvas[0].parentNode.removeChild(canvas[0]);
    // }
    // querySelectorAll won't work on the way mentioned above due to its a static list
}

// Use event listener on the clearCanvas button
// Use a prompt for the user to enter a number among 1 to 100.
// Base on the number, to create a num*num grids plate. 