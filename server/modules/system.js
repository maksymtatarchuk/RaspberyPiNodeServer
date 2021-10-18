const os = require('os');
const fs = require('fs');
// const shell = require('shelljs');
const exec = require('child_process').exec;

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
};

module.exports = {
    'getServerUpTime': function() {
        let upTime = os.uptime();
        let serverUptime = dataUtil.countTimer(upTime);
        console.log(upTime)
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

            temp.value += ' C'
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


        // console.log(os.arch())
        // console.log('getTest()')
    }
}

