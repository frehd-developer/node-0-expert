const yargs = require('yargs');

const argv = require('yargs')
            .option('b', {
                alias: 'base',
                type: 'number',
                describe: 'Generate table from base'
            })
            .option('l', {
                alias: 'listar',
                type: 'boolean',
                default: false,
                describe: 'Show table for console'
            })
            .option('h', {
                alias: 'hasta',
                type: 'number',
                default: 12,
                describe: 'Generate table to hasta'
            })
            .check((argv, options) => {
                if (isNaN(argv.b)) {
                    throw 'La base tiene que ser de tipo numero'
                }
                return true;
            })
            .argv;

module.exports = argv;