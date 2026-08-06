// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => resolve(answer));
  });
}

function displayMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    let line = '';
    for (let j = 0; j < matrix[i].length; j++) {
      line += matrix[i][j].toString().padStart(4, ' ');
    }
    console.log(line);
  }
}

async function readMatrix(rows, columns) {
  const matrix = [];

  for (let i = 0; i < rows; i++) {
    const rowInput = await askQuestion(`Enter row ${i + 1}: `);
    const values = rowInput.trim().split(/\s+/).map(Number);
    matrix.push(values);
  }

  return matrix;
}

function transposeMatrix(matrix) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const transposed = [];

  for (let col = 0; col < columns; col++) {
    const newRow = [];
    for (let row = 0; row < rows; row++) {
      newRow.push(matrix[row][col]);
    }
    transposed.push(newRow);
  }

  return transposed;
}

function addMatrices(matrixA, matrixB) {
  if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
    return null;
  }

  const result = [];
  for (let i = 0; i < matrixA.length; i++) {
    const row = [];
    for (let j = 0; j < matrixA[i].length; j++) {
      row.push(matrixA[i][j] + matrixB[i][j]);
    }
    result.push(row);
  }

  return result;
}

function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const rowsB = matrixB.length;
  const colsB = matrixB[0].length;

  if (colsA !== rowsB) {
    return null;
  }

  const result = [];
  for (let i = 0; i < rowsA; i++) {
    const row = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      row.push(sum);
    }
    result.push(row);
  }

  return result;
}

async function main() {
  console.log('Matrix Operations Menu');
  console.log('1. Transpose matrix');
  console.log('2. Add two matrices');
  console.log('3. Multiply two matrices');
  console.log('4. Quit');

  const choiceInput = await askQuestion('Enter your choice (1-4): ');
  const choice = Number(choiceInput);

  if (choice === 1) {
    const rowsInput = await askQuestion('Enter number of rows: ');
    const columnsInput = await askQuestion('Enter number of columns: ');
    const rows = Number(rowsInput);
    const columns = Number(columnsInput);
    const matrix = await readMatrix(rows, columns);
    console.log('\nOriginal Matrix:');
    displayMatrix(matrix);
    console.log('\nTransposed Matrix:');
    displayMatrix(transposeMatrix(matrix));
  } else if (choice === 2) {
    const rowsInput = await askQuestion('Enter number of rows: ');
    const columnsInput = await askQuestion('Enter number of columns: ');
    const rows = Number(rowsInput);
    const columns = Number(columnsInput);
    console.log('Enter Matrix A:');
    const matrixA = await readMatrix(rows, columns);
    console.log('Enter Matrix B:');
    const matrixB = await readMatrix(rows, columns);
    const sum = addMatrices(matrixA, matrixB);

    if (sum === null) {
      console.log('Error: The matrices must have the same dimensions.');
    } else {
      console.log('\nResult:');
      displayMatrix(sum);
    }
  } else if (choice === 3) {
    const rowsAInput = await askQuestion('Enter number of rows for matrix A: ');
    const columnsAInput = await askQuestion('Enter number of columns for matrix A: ');
    const rowsA = Number(rowsAInput);
    const columnsA = Number(columnsAInput);
    const matrixA = await readMatrix(rowsA, columnsA);
    const rowsBInput = await askQuestion('Enter number of rows for matrix B: ');
    const columnsBInput = await askQuestion('Enter number of columns for matrix B: ');
    const rowsB = Number(rowsBInput);
    const columnsB = Number(columnsBInput);
    const matrixB = await readMatrix(rowsB, columnsB);
    const product = multiplyMatrices(matrixA, matrixB);

    if (product === null) {
      console.log('Error: The number of columns in matrix A must equal the number of rows in matrix B.');
    } else {
      console.log('\nProduct:');
      displayMatrix(product);
    }
  } else if (choice === 4) {
    console.log('Goodbye!');
  } else {
    console.log('Error: Invalid choice.');
  }

  rl.close();
}

main();

