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

let students = [];

function calculateAverage(scores) {
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  return sum / scores.length;
}

async function addStudent() {
  const name = await askQuestion('Student name: ');
  const idInput = await askQuestion('Student ID: ');
  const countInput = await askQuestion('How many scores? ');
  const id = Number(idInput);
  const count = Number(countInput);
  const scores = [];

  for (let i = 1; i <= count; i++) {
    const value = await askQuestion(`Enter score ${i}: `);
    scores.push(Number(value));
  }

  students.push({ name, id, scores });
  console.log(`Student "${name}" added successfully.`);
}

function displayStudents() {
  if (students.length === 0) {
    console.log('No students have been added yet.');
    return;
  }

  console.log('Name\tID\tScores\tAverage');
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const average = calculateAverage(student.scores).toFixed(2);
    console.log(`${student.name}\t${student.id}\t${student.scores.join(', ')}\t${average}`);
  }
}

async function calculateAverageScore() {
  const idInput = await askQuestion('Enter student ID: ');
  const id = Number(idInput);

  for (let i = 0; i < students.length; i++) {
    if (students[i].id === id) {
      console.log(`${students[i].name}'s average score: ${calculateAverage(students[i].scores).toFixed(2)}`);
      return;
    }
  }

  console.log('Error: Student ID not found.');
}

async function main() {
  while (true) {
    console.log('===============================');
    console.log('STUDENT RECORD SYSTEM MENU');
    console.log('===============================');
    console.log('1. Add student');
    console.log('2. Display all students');
    console.log('3. Calculate average score');
    console.log('4. Quit');

    const choiceInput = await askQuestion('Enter your choice (1-4): ');
    const choice = Number(choiceInput);

    if (choice === 1) {
      await addStudent();
    } else if (choice === 2) {
      displayStudents();
    } else if (choice === 3) {
      await calculateAverageScore();
    } else if (choice === 4) {
      console.log('Goodbye!');
      rl.close();
      break;
    } else {
      console.log('Error: Invalid choice.');
    }
  }
}

main();

