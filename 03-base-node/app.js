const { generateTableMult } = require('./helpers/generateTableMult');
const colors = require('colors');
const argv = require('./config/yargs');

const base = argv.base;
const listar = argv.listar;
const hasta = argv.hasta;


console.log('=============================='.yellow.bgBlue);
console.log(argv);

generateTableMult(base, listar, hasta)
    .then(fileCreated => console.log(fileCreated.trap, 'created'))
    .catch(err => console.log('An error have ocurred:', err));