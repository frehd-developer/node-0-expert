const {getUsuario} = require('./usuarios/usuarios');

console.log('Start Program');
console.time('start');

getUsuario(1, usuario => {
    console.log(usuario);
})

getUsuario(2, usuario => {
    console.log(usuario);
    console.timeEnd('start');
})

console.log('End Program');