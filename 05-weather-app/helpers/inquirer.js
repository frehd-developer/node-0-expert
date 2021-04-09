const inquirer  = require('inquirer');
require('colors');

const getInput = async message => {
  const question = [
    {
      type: 'input',
      name: 'text',
      message
    }
  ];

  const {text} = await inquirer.prompt(question);
  return text;
};

const getMainOption = async () => {
  const choices = [
    {
      value: 1,
      name: `${'1.'.blue} Search city`
    },
    {
      value: 2,
      name: `${'2.'.blue} Record`
    },
    {
      value: 0,
      name: `${'0.'.blue} Exit`
    },
  ];

  const question = [
    {
      type: 'list',
      name: 'option',
      message: 'Select an option:',
      choices
    }
  ];

  console.clear();
  console.log('================================'.blue);
  console.log('         Select an option'.white);
  console.log('================================\n'.blue);

  const {option} = await inquirer.prompt(question);
  return option;
}

const listPlaces = async (places = []) => {
  const choices = places.map((place, index) => ({
    value: place.id,
    name: `${`${index + 1}`.blue} ${place.name}`
  }));
  
  choices.unshift({
    value: '0',
    name: `${'0'.blue} Cancel`
  });

  const question = [
    {
      type: 'list',
      name: 'id',
      message: 'Select one option',
      choices
    }
  ];

  const {id} = await inquirer.prompt(question);
  return id;
}

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'pause',
      message: `Press ${'ENTER'.blue} to continue`
    }
  ];

  await inquirer.prompt(question);
}

module.exports = {
  getInput,
  getMainOption,
  listPlaces,
  pause,
}