class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return { valid: false, error: 'Expected puzzle to be 81 characters long' };
    }

    if(puzzleString.match(/[^1-9.]/)) {
      return { valid: false, error: 'Invalid characters in puzzle' };
    }

    return { valid: true, error: '',  };
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowString = puzzleString.substring(row * 9, row * 9 + 9);
    if (rowString.includes(value)) {
      return false;
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let colString = ''
    for (let i = 0; i < 9; i++) {
      colString += puzzleString[i * 9 + column];
    }
    if (colString.includes(value)) {
      return false;
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let regionString = '';
    row = Math.floor(row / 3) * 3;
    column = Math.floor(column / 3) * 3;
    for (let i = row; i < row + 3; i++) {
      regionString += puzzleString.substring(i * 9 + column, i * 9 + column + 3)
    }


    if (regionString.includes(value)) {
      return false;
    }
    return true;
  }

  solve(puzzleString) {
    try {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const el = puzzleString[row * 9 + col]; 
          if(el === '.') {
            let possibleValues = []
            for (let val = 1; val <= 9; val++) {
              if (this.checkRowPlacement(puzzleString, row, col, val) &&
                this.checkColPlacement(puzzleString, row, col, val) &&
                this.checkRegionPlacement(puzzleString, row, col, val)) {
                
                possibleValues.push(val)
                  
  
              }
            }
  
            if(possibleValues.length == 1){
              puzzleString = puzzleString.split('')
              puzzleString[row * 9 + col] = possibleValues[0];
              puzzleString = puzzleString.join('')
            }
          }
        }
      }
  
      if(puzzleString.includes('.'))
        return this.solve(puzzleString);
  
      return puzzleString;    
      
    } catch (error) {
      return false;
    }
  }
}

module.exports = SudokuSolver;

