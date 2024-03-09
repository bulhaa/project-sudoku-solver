'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if(!req.body.value || !req.body.puzzle || !req.body.coordinate){
        res.json({ error: 'Required field(s) missing' });
      }

      const validationResult = solver.validate(req.body.puzzle)
      if(!validationResult.valid){
        res.json({ error: validationResult.error });
      }

      if(!req.body.coordinate.match(/^[A-I][1-9]$/)){
        res.json({ error: 'Invalid coordinate' });
      }

      if(!req.body.value.match(/^[1-9]$/g)){
        res.json({ error: 'Invalid value' });
      }

      const row = req.body.coordinate.split('')[0].charCodeAt(0) - 'A'.charCodeAt(0);
      const column = Number(req.body.coordinate.split('')[1]) - 1;

      const puzzleString = req.body.puzzle
      const value = req.body.value
      if(puzzleString[row * 9 + column] == value){
        res.json({ valid: true });
      }

      const colResult = solver.checkColPlacement(req.body.puzzle, row, column, req.body.value);
      const regResult = solver.checkRegionPlacement(req.body.puzzle, row, column, req.body.value);
      const rowResult = solver.checkRowPlacement(req.body.puzzle, row, column, req.body.value);
      const result = {
        valid: colResult && regResult && rowResult,
        conflict: []
      }

      if (!colResult) {
        result.conflict.push('column');
      }

      if (!regResult) {
        result.conflict.push('region');
      }

      if (!rowResult) {
        result.conflict.push('row');
      }

      res.json(result);
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if(!req.body.puzzle){
        res.json({ error: 'Required field missing' });
      }

      const validationResult = solver.validate(req.body.puzzle)
      if(!validationResult.valid){
        res.json({ error: validationResult.error });
      }

      try {
        const result = solver.solve(req.body.puzzle);
        if(!result){
          res.json({ error: 'Puzzle cannot be solved' });  
        }
        res.json({ solution: result });
        
      } catch (error) {
        res.json({ error: 'Puzzle cannot be solved' });  
      }
    });
};
