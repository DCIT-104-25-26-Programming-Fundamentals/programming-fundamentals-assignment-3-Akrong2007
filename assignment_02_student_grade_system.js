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

function getGrade(score) {
  if (score < 0 || score > 100) {
    return null;
  }

  if (score >= 80) {
    return 'A';
  } else if (score >= 70) {
    return 'B';
  } else if (score >= 60) {
    return 'C';
  } else if (score >= 50) {
    return 'D';
  } else {
    return 'F';
  }
}

async function main() {
  const input = await askQuestion('Enter student score (0-100): ');
  const score = Number(input);
  const grade = getGrade(score);

  if (grade === null) {
    console.log('Error: Score must be between 0 and 100.');
  } else {
    console.log(`Grade: ${grade}`);
  }

  rl.close();
}

main();

