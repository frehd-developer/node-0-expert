// const { showMenu, pause } = require('./helpers/messages');

require('colors');
const Tasks = require('./models/tasks');

const { menu, pause, getInput, getTasksToDelete, getTaskToUpdate, confirm } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');

const main = async () => {
  let opt = '';
  const tasks = new Tasks();
  const tasksDB = readDB();
  
  if(tasksDB) {
    tasks.fetchTasks(tasksDB);
    // console.log('fetch', tasks);
  }

  do {
    opt = await menu();
    // console.log({opt});

    switch (opt) {
      case '1':
        const desc = await getInput('Description:')
        tasks.createTask(desc);
        break;
      case '2':
        tasks.fullList();
        break;
      case '3':
        tasks.getByState();
        break;
      case '4':
        tasks.getByState(false);
        break;
      case '5':
        const ids = await getTaskToUpdate(tasks.list);
        tasks.updateTasks(ids);
        break;
      case '6':
        const id = await getTasksToDelete(tasks.list);

        if (id !== '0') {
          const ok = await confirm('Are you sure?');
          if (ok) {
            tasks.deleteTask(id);
            console.log('Task deleted!');
          }
        }
        break;
    }

    saveDB(tasks.list);

    await pause();
  } while (opt !== '0');
};

main();