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

function isPrime(number) {
  if (number < 2) {
    return false;
  }

  if (number === 2) {
    return true;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

async function main() {
  const input = await askQuestion('Enter a number: ');
  const number = Number(input);

  if (isPrime(number)) {
    console.log(`${number} is a prime number.`);
  } else {
    console.log(`${number} is NOT a prime number.`);
  }

  rl.close();
}

main();

