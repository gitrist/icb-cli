const { chalk, semver, log, error, execa, isWindows } = require('@rist/cli-shared-utils')
const path = require('path')
const package = require('../package.json')["release-pkg"]
const fs = require('fs-extra')

module.exports = async (option) => {
    const schema = isWindows ? (option.c +'.cmd') : option.c
    console.log(option.c,option._[0],path.resolve('package',option._[0]))
    if(fs.existsSync(path.resolve('package',schema))){
        // return await execa(schema, [...option._],{cwd:process.cwd()})
        try {
            const runWS = await execa(path.resolve('package',schema),[...option._],{stdio: ['pipe', process.stdout, process.stderr]})
        } catch (e){
            error(e)
        }
        // console.log(runWS)
        // runWS.stdout.on('message',(data)=>{
        //     console.log(data);
        // })
    }else{
        error(`Schematic ${option.c}  not found, you can icb add it`)
    }  
}