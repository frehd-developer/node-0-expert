require('colors');
const Task = require("./task");

class Tasks {
  _list = {};

  constructor() {
    this._list = {};
  }

  get list() {
    // return Object.keys(this._list)
            // .reduce((acum, key) => [...acum, this._list[key]], []);
    const list = [];
    Object.keys(this._list).forEach( key => {
        const task = this._list[key];
        list.push( task );
    });

    return list;
  }

  createTask(desc = '') {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  fetchTasks(tasks = []) {
    // const tasksObj = tasks.reduce((obj, task) => ({...obj, [task.id]: {...task}}),{});
    // console.log('Task Object:', tasksObj);
    // this._list = {tasksObj};
    tasks.forEach(task => {
      this._list[task.id] = task; 
    });
  }

  fullList() {
    this.list.map((task, index) => {
      console.log(`${`${index + 1}`.green} ${task.desc} :: ${task.completedAt ? 'Complete'.green : 'Pending'.red}`);
    });
  }

  getByState(completed = true) {
    let taskFilters = [];
    if (completed) {
      taskFilters = this.list.filter(task => task.completedAt);
    } else {
      taskFilters = this.list.filter(task => !task.completedAt);
    }

    taskFilters.map((task, index) => {
      console.log(`${`${index + 1}`.green} ${task.desc} ${task.completedAt ? task.completedAt : ''}`);
    });
  }

  deleteTask(id = '') {
    delete this._list[id];
  }

  updateTasks(ids = []) {
    ids.map(id => {
      if (!this._list[id].completedAt) {
        this._list[id].completedAt = new Date().toISOString();
      }
    });

    this.list.map(task => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedAt = null;
      }
    });
  }
}

module.exports = Tasks;