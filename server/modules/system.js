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
        return serverUptime
    },

    'getCpuTemperature': function() {
        try {
            let temp = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
            temp = temp/1000;

            return temp
        } catch (e) {
            console.log('ERROR: CPU temp on Raspberry Pi only!')
            return '!ERR'
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

