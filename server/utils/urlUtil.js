const path = require('path');

const appDir = __dirname.includes('\\') ? __dirname.split('\\server\\utils')[0] : __dirname.split('/server/utils')[0]
const sysDir = path.resolve(appDir, 'sys')

module.exports = {
    'appDir' : appDir,
    'sysDir' : sysDir
}