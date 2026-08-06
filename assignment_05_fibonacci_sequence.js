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

function generateFibonacciTerms(n) {
  const sequence = [];

  if (n <= 0) {
    return sequence;
  }

  let first = 0;
  let second = 1;

  for (let i = 0; i < n; i++) {
    sequence.push(first);
    const next = first + second;
    first = second;
    second = next;
  }

  return sequence;
}

function isFibonacciNumber(value) {
  if (value < 0) {
    return false;
  }

  let first = 0;
  let second = 1;

  while (first < value) {
    const next = first + second;
    first = second;
    second = next;
  }

  return first === value;
}

async function main() {
  const nInput = await askQuestion('How many terms? ');
  const n = Number(nInput);

  if (n <= 0) {
    console.log('Error: N must be a positive integer.');
    rl.close();
    return;
  }

  const sequence = generateFibonacciTerms(n);
  console.log(`Fibonacci sequence: ${sequence.join(' ')}`);

  const numberInput = await askQuestion('Enter a number to check: ');
  const number = Number(numberInput);
  if (isFibonacciNumber(number)) {
    console.log(`${number} is a Fibonacci number.`);
  } else {
    console.log(`${number} is NOT a Fibonacci number.`);
  }

  rl.close();
}

main();

