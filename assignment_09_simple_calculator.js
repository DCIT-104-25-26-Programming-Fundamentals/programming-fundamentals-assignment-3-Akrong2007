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

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return null;
  }
  return a / b;
}

function modulus(a, b) {
  return a % b;
}

function exponentiate(a, b) {
  return a ** b;
}

async function main() {
  while (true) {
    console.log('============================');
    console.log('SIMPLE CALCULATOR');
    console.log('============================');
    console.log('1. Addition');
    console.log('2. Subtraction');
    console.log('3. Multiplication');
    console.log('4. Division');
    console.log('5. Modulus');
    console.log('6. Exponentiation');
    console.log('7. Quit');

    const choiceInput = await askQuestion('Select an operation (1-7): ');
    const choice = Number(choiceInput);

    if (choice === 7) {
      console.log('Goodbye!');
      rl.close();
      break;
    }

    const firstInput = await askQuestion('Enter first number: ');
    const secondInput = await askQuestion('Enter second number: ');
    const firstNumber = Number(firstInput);
    const secondNumber = Number(secondInput);

    let result;
    let symbol;

    if (choice === 1) {
      result = add(firstNumber, secondNumber);
      symbol = '+';
    } else if (choice === 2) {
      result = subtract(firstNumber, secondNumber);
      symbol = '-';
    } else if (choice === 3) {
      result = multiply(firstNumber, secondNumber);
      symbol = '*';
    } else if (choice === 4) {
      if (secondNumber === 0) {
        console.log('Error: Cannot divide by zero.');
        continue;
      }
      result = divide(firstNumber, secondNumber);
      symbol = '/';
    } else if (choice === 5) {
      result = modulus(firstNumber, secondNumber);
      symbol = '%';
    } else if (choice === 6) {
      result = exponentiate(firstNumber, secondNumber);
      symbol = '**';
    } else {
      console.log('Error: Invalid choice.');
      continue;
    }

    console.log(`Result: ${firstNumber} ${symbol} ${secondNumber} = ${result.toFixed(2)}`);
  }
}

main();

