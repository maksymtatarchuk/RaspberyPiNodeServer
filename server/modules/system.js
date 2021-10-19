const os = require('os');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const exec = require('child_process').exec;

const urlUtil = require('../utils/urlUtil');

const dataUtil = require('../utils/dataUtil');

function commandExecutor(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(stdout);
    })
}

function numbToString(obj) {
    let result = {};
    for (let key in obj) {
        result[key] = obj[key] < 10 & key !== 'd' ? '0' + obj[key] : obj[key].toString();
    }

    return result
}

function countTimer(seconds) {
    let time = {}

    let d = Math.floor(seconds / 86400)
    let h = Math.floor(seconds / 3600 - d * 24)
    let m = Math.floor(seconds / 60 - d * 1440 - h * 60)
    let s = Math.floor(seconds - d * 86400 - h * 3600 - m * 60)

    seconds / 86400 >= 1 ? time.d = d : '';
    seconds / 3600 >= 1 ? time.h = h : '';
    seconds / 60 >= 1 ? time.m = m : '';
    time.s = s;

    time.viveData = numbToString(time)

    return time
}

function getTempValue(temp) {
    temp = temp.toString().split('.')
    let a = parseInt(temp[0]) < 10 ? '0' + temp[0] : temp[0]
    let b = parseInt(temp[1]) < 10 ? '0' + temp[1] : temp[1]

    return a + '.' + b + ' C'
}

module.exports = {
    'getServerUpTime': function() {
        let upTime = os.uptime();
        let serverUptime = countTimer(upTime);
        return serverUptime
    },

    'getCpuTemperature': function() {
        let temp = {};

        try {
            temp.value = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
            temp.value = Math.round(temp.value/10)/100;

            if (temp.value > 70) {
                temp.status = 'danger';
            } else if (temp.value > 60) {
                temp.status = 'warning';
            } else {
                temp.status = 'success';
            };

            temp.value = getTempValue(temp.value)

            return temp
        } catch (e) {
            temp.value = 'Raspberry Pi only!';
            temp.status = 'danger'
            return temp
        }
    },

    executeCommand: function(command) {
        if (command === '' || command === undefined) {
            console.log('Input command');
        } else {
            commandExecutor(command);
        }

        // console.log('getTest()')
    },

    runShell: function(src) {
        if (os.arch() === 'arm') {
            shell.exec(src)
        }
        return os.arch() + ' ' + src !== undefined ? src : '??'
    }
}

