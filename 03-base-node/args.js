const args = process.argv;

const [,,myArg] = process.argv;

const [,arg] = myArg.split('=');

console.log(args);
console.log(myArg);
console.log(arg);