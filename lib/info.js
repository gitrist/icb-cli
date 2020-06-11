const {execa, isWindows, logWithSpinner, stopSpinner } = require('@rist/cli-shared-utils')
const path = require('path')
const package = require('../package.json')["release-pkg"]

module.exports = async (name, option) => {
    try {
        // name = name || 'ls'
        logWithSpinner(`find packages info`)
        const { stdout: yarnGlobalDir } = await execa(isWindows ? 'npm.cmd' : 'npm', [name, '-g', '--depth=0', '--prefix', path.resolve(__dirname, '..', package)],
        { stdio: [process.stdin, process.stdout, process.stderr] })
    } catch (e) {
        stopSpinner()
    } finally {
        stopSpinner()
    }
}