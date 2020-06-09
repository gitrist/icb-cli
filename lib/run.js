const { chalk, semver, log, error, execa, isWindows } = require('@rist/cli-shared-utils')
const path = require('path')
const package = require('../package.json')["release-pkg"]
const fs = require('fs-extra')

module.exports = async (option) => {
    const schema = isWindows ? (option.c +'.cmd') : option.c;
    const cmd = path.resolve(__dirname,'..','package',schema);
    console.log(option.c,option._[0],cmd)
    if(fs.existsSync(cmd)){
        try {
            const runWS = execa(cmd,[...option._],{stdio: [process.stdin, process.stdout, process.stderr]})
        } catch (e){
            error(e)
        }
    }else{
        error(`Schematic ${option.c}  not found, you can icb add it`)
    }  
}