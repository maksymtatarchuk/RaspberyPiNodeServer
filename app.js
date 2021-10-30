// Import node_modules
const express = require ('express');
const path = require('path');
const colors = require('colors');
const bodyParser = require("body-parser");

//  Import modules
const system = require('./server/modules/system');

//  Import routers
const serverRouters = require('./server/routers/server')
const botRouters = require('./server/routers/bot')

// Set IP address and PORT
var PORT = 3000;
var currentIP = system.getCurrentIP()['Wi-Fi'];

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'server', 'templates'));

app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js/'));
app.use('/bootstrap/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  Use routers
app.use(serverRouters);
app.use(botRouters);

app.get('/', (req, res) => {
    res.render('index', {
        'serverUpTime': system.getServerUpTime().viveData,
        'cpuTemperature': system.getCpuTemperature(),
        'sysArch' : system.getSysArch()
    })
});

app.listen(PORT, () => console.log(colors.bold(`Started on http://${currentIP}:${PORT}`)));
