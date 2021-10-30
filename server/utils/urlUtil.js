const path = require('path');

const appDir = __dirname.includes('\\') ? __dirname.split('\\server\\utils')[0] : __dirname.split('/server/utils')[0];
const sysDir = path.resolve(appDir, 'sys');
const env = path.resolve(appDir, '.env')

const tlg = 'https://api.telegram.org/bot'

module.exports = {
    'appDir' : appDir,
    'sysDir' : sysDir,
    'env': env,
    'tlg': tlg
}