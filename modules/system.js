const os = require('os');
const fs = require('fs');

module.exports = {
    'getServerUpTime': function() {
        let upTime = os.uptime();
        let serverUpTime = {};

        serverUpTime.d = Math.floor(upTime / 86400);
        serverUpTime.h = Math.floor(upTime / 3600 - serverUpTime.d * 24);
        serverUpTime.m = Math.floor(upTime / 60 - serverUpTime.d * 1440 - serverUpTime.h * 60);
        serverUpTime.s = Math.floor(upTime - serverUpTime.d * 86400 - serverUpTime.h * 3600 - serverUpTime.m * 60);

        return serverUpTime
    },

    'getCpuTemperature': function() {
        try {
            let isWindows = os.version();
            if (isWindows) return 'Not available'
        } catch(e) {
            console.log('Windows ERROR: ', e)
        }

        try {
            let temp = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
            temp = Math.round(temp/1000) + 'C';
            return temp
        } catch (e) {
            console.log('Raspberry Pi  ERROR: ', e)
        }
    }
}

