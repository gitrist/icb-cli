const { chalk, semver, log, error, execa, isWindows, logWithSpinner, stopSpinner } = require('@rist/cli-shared-utils')
const path = require('path')
const package = require('../package.json')["release-pkg"]
const fs = require('fs-extra')

module.exports = async (name, option) => {
    if(!fs.existsSync(package)){
        fs.mkdir(package)
    }
    try{
        logWithSpinner(`delete ${name}`)
        const {stdout: yarnGlobalDir} = await execa(isWindows ? 'npm.cmd' : 'npm', ['uninstall',name,'--prefix',path.resolve(__dirname,'..',package)])
        stopSpinner()
    }catch(e){
        error(e)
        stopSpinner()
    }
}