const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {
    test('Logic handles a valid puzzle string of 81 characters', function () {
        const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        const result = solver.validate(input)
        assert.strictEqual(result.valid, true);
      });

    

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function () {
        const input = '.a9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        const result = solver.validate(input)
        assert.deepEqual(result, { valid: false, error: 'Invalid characters in puzzle' });
    });

    test('Logic handles a puzzle string that is not 81 characters in length', function () {
        const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..';
        const result = solver.validate(input)
        assert.deepEqual(result, { valid: false, error: 'Expected puzzle to be 81 characters long' });
    });

    test('Logic handles a valid row placement', function () {
        const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        const result = solver.checkRowPlacement(puzzle, 0, 0, 7)
        assert.strictEqual(result, true);
    });

    test('Logic handles an invalid row placement', function () {
        const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        const result = solver.checkRowPlacement(puzzle, 0, 0, 9)
        assert.strictEqual(result, false);
    });

    test('Logic handles a valid column placement', function () {
        const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        const result = solver.checkColPlacement(puzzle, 0, 0, 7)
        assert.strictEqual(result, true);
    });

    test('Logic handles an invalid column placement', function () {
        const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        const result = solver.checkColPlacement(puzzle, 0, 0, 1)
        assert.strictEqual(result, false);
    });

    test('Logic handles a valid region (3x3 grid) placement', function () {
        const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        const result = solver.checkRegionPlacement(puzzle, 0, 0, 7)
        assert.strictEqual(result, true);
    });

    test('Logic handles an invalid region (3x3 grid) placement', function () {
        const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        const result = solver.checkRegionPlacement(puzzle, 0, 0, 9)
        assert.strictEqual(result, false);
    });

    test('Valid puzzle strings pass the solver', function () {
        const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        const result = solver.solve(input)
        assert.isString(result);
    });

    test('Invalid puzzle strings fail the solver', function () {
        const input = '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        const result = solver.solve(input)
        assert.strictEqual(result, false);
    });

    test('Solver returns the expected solution for an incomplete puzzle', function () {
        const input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        const result = solver.solve(input)
        assert.strictEqual(result, '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
    });

});
