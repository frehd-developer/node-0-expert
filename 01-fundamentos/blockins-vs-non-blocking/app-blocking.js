const {getUsuarioSync} = require('./usuarios/usuarios');

console.log('Start program');
console.time('start');

const usuario1 = getUsuarioSync(1);
console.log(usuario1);

const usuario2 = getUsuarioSync(2);
console.log(usuario2);

console.timeEnd('start');
console.log('End program');