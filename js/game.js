document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game-container');
    const toggleButton = document.getElementById('toggle-button');
    const bombCounter = document.getElementById('bomb-counter');
    const rows = 10;
    const cols = 10;
    const minesCount = 20;
    let mines = [];
    let revealedCells = 0;
    let firstClick = true;
    let isFlagging = false;
    let flagsCount = 0;

    toggleButton.addEventListener('click', function() {
        isFlagging = !isFlagging;
        toggleButton.textContent = isFlagging ? 'Switch to Digging' : 'Switch to Flagging';
        console.log(`Mode changed: ${isFlagging ? 'Flagging' : 'Digging'}`);
    });

    function initGame() {
        gameContainer.innerHTML = ''; // Clear the game container
        mines = []; // Reset mines array
        createGrid();
        revealedCells = 0;
        firstClick = true;
        isFlagging = false;
        flagsCount = 0;
        updateBombCounter();
        toggleButton.textContent = 'Switch to Flagging';
        console.log('Game initialized');
    }

    function generateMines(excludeRow, excludeCol) {
        let mines = [];
        while (mines.length < minesCount) {
            const mine = [Math.floor(Math.random() * rows), Math.floor(Math.random() * cols)];
            if (!mines.some(m => m[0] === mine[0] && m[1] === mine[1]) && !isAdjacent(excludeRow, excludeCol, mine[0], mine[1])) {
                mines.push(mine);
            }
        }
        console.log('Mines generated:', mines);
        return mines;
    }

    function isAdjacent(row1, col1, row2, col2) {
        return Math.abs(row1 - row2) <= 1 && Math.abs(col1 - col2) <= 1;
    }

    function createGrid() {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.addEventListener('click', handleCellClick);
                gameContainer.appendChild(cell);
            }
        }
        console.log('Grid created');
    }

    function handleCellClick(event) {
        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        console.log(`Cell clicked: (${row}, ${col})`);

        if (firstClick) {
            mines = generateMines(row, col);
            firstClick = false;
        }

        if (isFlagging) {
            toggleFlag(cell);
        } else {
            if (isMine(row, col)) {
                revealMines();
                alert('Game Over!');
                initGame();
            } else {
                revealCell(cell, row, col);
                if (revealedCells === rows * cols - minesCount) {
                    alert('You Win!');
                    initGame();
                }
            }
        }
    }

    function toggleFlag(cell) {
        if (cell.classList.contains('flagged')) {
            cell.classList.remove('flagged');
            cell.textContent = '';
            flagsCount--;
        } else {
            cell.classList.add('flagged');
            cell.textContent = '🚩';
            flagsCount++;
        }
        updateBombCounter();
        console.log('Flag toggled:', cell);
    }

    function updateBombCounter() {
        bombCounter.textContent = `Bombs remaining: ${minesCount - flagsCount}`;
    }

    function isMine(row, col) {
        return mines.some(m => m[0] === row && m[1] === col);
    }

    function revealMines() {
        document.querySelectorAll('.cell').forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            if (isMine(row, col)) {
                cell.classList.add('mine');
                cell.textContent = '💣';
            }
        });
        console.log('Mines revealed');
    }

    function revealCell(cell, row, col) {
        if (cell.classList.contains('revealed') || cell.classList.contains('flagged')) return;
        cell.classList.add('revealed');
        revealedCells++;
        const mineCount = countAdjacentMines(row, col);
        if (mineCount > 0) {
            cell.textContent = mineCount;
        } else {
            revealAdjacentCells(row, col);
        }
        console.log('Cell revealed:', cell);
    }

    function countAdjacentMines(row, col) {
        let count = 0;
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                if (isMine(row + r, col + c)) {
                    count++;
                }
            }
        }
        return count;
    }

    function revealAdjacentCells(row, col) {
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                const newRow = row + r;
                const newCol = col + c;
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                    const cell = document.querySelector(`.cell[data-row='${newRow}'][data-col='${newCol}']`);
                    revealCell(cell, newRow, newCol);
                }
            }
        }
    }

    initGame();
});
