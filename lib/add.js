const { chalk, semver, log, error, execa, isWindows } = require('@rist/cli-shared-utils')
const path = require('path')
const package = require('../package.json')["release-pkg"]
const fs = require('fs-extra')

module.exports = async (name, option) => {
    console.log(name, log, isWindows,__dirname)
    if(!fs.existsSync(package)){
        fs.mkdir(package)
    }
    const {stdout: yarnGlobalDir} = await execa(isWindows ? 'npm.cmd' : 'npm', ['i','-g',name,'--prefix',path.resolve(__dirname,'..',package)])
    console.log(yarnGlobalDir)
    
}