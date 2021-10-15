var express = require ('express');
var path = require('path');
var system = require('./server/modules/system');
var colors = require('colors');

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

app.get('/', (req, res) => {
    res.render('index', {
        'serverUpTime': system.getServerUpTime(),
        'cpuTemperature': system.getCpuTemperature()
    })
})

app.listen(PORT, () => console.log(colors.bold('Started')));
