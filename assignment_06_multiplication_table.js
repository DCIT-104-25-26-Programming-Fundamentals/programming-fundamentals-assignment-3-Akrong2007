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

function printMultiplicationTable(number) {
  console.log(`Multiplication Table for ${number}:`);
  for (let i = 1; i <= 12; i++) {
    console.log(`${number}  x  ${i}  =  ${number * i}`);
  }
}

function printTablesUpToN(n) {
  for (let i = 1; i <= n; i++) {
    printMultiplicationTable(i);
    if (i < n) {
      console.log('---------------------------');
    }
  }
}

async function main() {
  const nInput = await askQuestion('Enter a number: ');
  const n = Number(nInput);

  if (n <= 0) {
    console.log('Error: N must be a positive integer.');
    rl.close();
    return;
  }

  printMultiplicationTable(n);
  console.log('');
  printTablesUpToN(n);

  rl.close();
}

main();

