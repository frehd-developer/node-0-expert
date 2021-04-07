require('colors');
const inquirer = require('inquirer');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What would you like to do?',
    choices: [
      {
        value: '1',
        name: `${'1'.green}. Create task`
      },
      {
        value: '2',
        name: `${'2'.green}. List tasks`
      },
      {
        value: '3',
        name: `${'3'.green}. List completed tasks`
      },
      {
        value: '4',
        name: `${'4'.green}. List pending tasks`
      },
      {
        value: '5',
        name: `${'5'.green}. Complete task(s)`
      },
      {
        value: '6',
        name: `${'6'.green}. Delete task`
      },
      {
        value: '0',
        name: `${'0'.green}. Exit`
      },
    ]
  }
];

const menu = async () => {
  console.clear();
  console.log('======================'.green);
  console.log('   Select 1 option'.green);
  console.log('======================\n'.green);
  
  const {option} = await inquirer.prompt(questions);
  return option;
};

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'pause',
      message: `Press ${'ENTER'.green} to continue`,
    }
  ];

  const opt = await inquirer.prompt(question);
  return opt;
};

const getInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if(value.length === 0) return 'Please enter value';
        return true;
      }
    }
  ];

  const {desc} = await inquirer.prompt(question);
  return desc;
}

const getTasksToDelete = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    return {
      value: task.id,
      name: `${`${index + 1}.`.green} ${task.desc}`
    }
  });

  choices.unshift({ value: '0', name: `${'0.'.green} Cancelar`});

  const question = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices
    }
  ];

  const {id} = await inquirer.prompt(question);
  return id;
};

const getTaskToUpdate = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    return {
      value: task.id,
      name: `${`${index + 1}`.green} ${task.desc}`,
      checked: (task.completedAt) ? true : false
    }
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select',
      choices
    }
  ];

  const {ids} = await inquirer.prompt(question);
  return ids;
};

const confirm = async message => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const {ok} = await inquirer.prompt(question);
  return ok;
};

module.exports = {
  menu,
  pause,
  getInput,
  getTasksToDelete,
  getTaskToUpdate,
  confirm,
}