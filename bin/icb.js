#!/usr/bin/env node

const {chalk,semver,log,error} = require('@rist/cli-shared-utils');
const requireVersion = require('../package.json').engines.node;

function checkNodeVersion(wanted,id){
    if(!semver.satisfies(process.version,wanted)){
        log(chalk.red(
            'You are using Node ' + process.version + ', but this version of ' + id +
            ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
        ))
        process.exit(1)
    }
}
checkNodeVersion(requireVersion,'@rist/cli');
if (semver.satisfies(process.version, '9.x')) {
    log(chalk.red(
      `You are using Node ${process.version}.\n` +
      `Node.js 9.x has already reached end-of-life and will not be supported in future major releases.\n` +
      `It's strongly recommended to use an active LTS version instead.`
    ))
}

const fs = require('fs');
const path = require('path');
const slash = require('slash');
const minimist = require('minimist');
const program = require('commander');

program
    .version(`@icb/cli ${require('../package').version}`)
    .usage('<command> [options]')

program
    .command('add <schematics-name>')
    .description('add a schematic powered by icb-cli-service')
    .action((name, cmd) => {
        const options = cleanArgs(cmd)
        if(minimist(process.argv.slice(3))._.length > 1){
            log(chalk.yellow('\n Info: You provided more than one argument. The first one will be used as the schematic, the rest are ignored.'))
        }
        require('../lib/add')(name,options)
    })
program
    .command('remove <schematics-name>')
    .description('remove a schematic powered by icb-cli-service')
    .action((name, cmd) => {
        const options = cleanArgs(cmd)
        if(minimist(process.argv.slice(3))._.length > 1){
            log(chalk.yellow('\n Info: You provided more than one argument. The first one will be used as the schematic, the rest are ignored.'))
        }
        require('../lib/remove')(name,options)
    })    
program
    .command('run <name>')
    .description('run a command for schematic command')
    .option('-c, --command <commandName> [SchematicOptions]', 'Schematic command')
    .action((name, cmd) => {
        require('../lib/run')(minimist(process.argv.slice(3)))
    })

// add some useful info on help
program.on('--help', () => {
    console.log()
    console.log(`  Run ${chalk.cyan(`icb-cli <command> --help`)} for detailed usage of given command.`)
    console.log()
})
program.parse(process.argv)

function camelize(str){
    return str.replace(/-(\w)/g,(_,c)=> c ? c.toUpperCase():'')
}

function cleanArgs(cmd){
    const args = {}
    cmd.options.forEach(o => {
        const key = camelize(o.long.replace(/^--/,''))
        if(typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined'){
            args[key] = cmd[key]
        }
    })
    return args;
}
