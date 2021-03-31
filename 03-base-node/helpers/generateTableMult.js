const fs = require('fs');
const colors = require('colors');

const generateTableMult = (base = 5, listar = false, hasta = 12) => {
    
    let output = '';
    let message = '';
    
    for (let i = 0; i <= hasta; i++) {
        output += `${base} x ${i} = ${base*i}\n`;
        message += `${base} ${colors.red('x')} ${i} ${'='.magenta} ${base*i}\n`;
    }
    
    if (listar) {
        // console.clear();
        console.log('======================='.green);
        console.log('       table :', colors.bgBlue(base));
        console.log('======================='.green);
        console.log(message);
    }    

    return new Promise((res, rej) => {
        fs.writeFile(`./outputs/table-${base}.txt`, output, (err) => {
            if (err) { 
                rej(err)
                return;
            };
            console.log(`${colors.random(`table-${base}.txt`)} ${colors.rainbow('has been created')}`);
            res(`table-${base}.txt`);
        });
    })
    
}

module.exports = {
    generateTableMult
} 