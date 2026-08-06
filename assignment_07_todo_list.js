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

let tasks = [];

async function addTask() {
  const task = await askQuestion('Enter task: ');
  tasks.push(task);
  console.log(`Task added: "${task}"`);
}

function viewTasks() {
  if (tasks.length === 0) {
    console.log('No tasks yet.');
    return;
  }

  console.log('Your Tasks:');
  for (let i = 0; i < tasks.length; i++) {
    console.log(`${i + 1}. ${tasks[i]}`);
  }
}

async function deleteTask() {
  if (tasks.length === 0) {
    console.log('No tasks to delete.');
    return;
  }

  viewTasks();
  const taskNumberInput = await askQuestion('Enter task number to delete: ');
  const taskNumber = Number(taskNumberInput);

  if (taskNumber < 1 || taskNumber > tasks.length) {
    console.log('Error: Invalid task number.');
    return;
  }

  const removedTask = tasks.splice(taskNumber - 1, 1)[0];
  console.log(`Task "${removedTask}" has been removed.`);
}

async function main() {
  while (true) {
    console.log('============================');
    console.log('TO-DO LIST MENU');
    console.log('============================');
    console.log('1. Add task');
    console.log('2. View tasks');
    console.log('3. Delete task');
    console.log('4. Quit');

    const choiceInput = await askQuestion('Enter your choice (1-4): ');
    const choice = Number(choiceInput);

    if (choice === 1) {
      await addTask();
    } else if (choice === 2) {
      viewTasks();
    } else if (choice === 3) {
      await deleteTask();
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

