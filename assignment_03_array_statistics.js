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

function calculateSum(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

function calculateAverage(numbers) {
  return calculateSum(numbers) / numbers.length;
}

function calculateMaximum(numbers) {
  let maximum = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > maximum) {
      maximum = numbers[i];
    }
  }
  return maximum;
}

function calculateMinimum(numbers) {
  let minimum = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < minimum) {
      minimum = numbers[i];
    }
  }
  return minimum;
}

async function main() {
  const nInput = await askQuestion('How many numbers? ');
  const n = Number(nInput);

  if (n <= 0) {
    console.log('Error: N must be a positive integer.');
    rl.close();
    return;
  }

  const numbers = [];
  for (let i = 0; i < n; i++) {
    const value = await askQuestion(`Enter number ${i + 1}: `);
    numbers.push(Number(value));
  }

  console.log('\nResults:');
  console.log(`Sum:     ${calculateSum(numbers)}`);
  console.log(`Average: ${calculateAverage(numbers).toFixed(1)}`);
  console.log(`Maximum: ${calculateMaximum(numbers)}`);
  console.log(`Minimum: ${calculateMinimum(numbers)}`);

  rl.close();
}

main();

