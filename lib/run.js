const { chalk, semver, info,done, error, execa, isWindows } = require('@rist/cli-shared-utils')
const path = require('path')
const package = require('../package.json')["release-pkg"]
const fs = require('fs-extra')


module.exports = async (option) => {
    let options = [...option._];
    const schema = isWindows ? (options[0] +'.cmd') : options[0];
    const cmd = path.resolve(__dirname,'..','package',schema);
    const SchematicOptions = options.slice(1);
    if(fs.existsSync(cmd)){
        try {
            const runWS = execa(cmd,[...SchematicOptions],{stdio: [process.stdin, process.stdout, process.stderr]})
        } catch (e){
            error(e)
        }
    }else{
        error(`Schematic ${option.c}  not found, you can icb add it`)
    }  
}