const $ = require('jquery');
const express = require ('express');
const path = require('path');
const system = require('./server/modules/system');
const colors = require('colors');
const serverRouters = require('./server/routers/server')


var PORT = 3000;

// try {
//     PORT = process.env.PORT ?? 3000;
// } catch (e) {
    // PORT = 3000;
// }

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'server', 'templates'));

app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js/'));
app.use('/bootstrap/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use(serverRouters);

app.get('/', (req, res) => {
    // system.executeCommand('node -v');
    res.render('index', {
        'serverUpTime': system.getServerUpTime().viveData,
        'cpuTemperature': system.getCpuTemperature(),
        'sysArch' : system.getSysArch()
    })
});

app.listen(PORT, () => console.log(colors.bold('Started')));
