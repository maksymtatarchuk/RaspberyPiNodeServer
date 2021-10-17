
function rebuildDate(date) {
    for (var key in date) {
        if (date[key] < 10) {
            date[key] = '0' + date[key];
        } else {
            date[key] = date[key].toString();
        }
    }

    return date
}

function getViveData(data) {
    let result = '';

    for (let key in data) {
        result += key + ': ' + data[key] + ' ';
    }

    return result
}

module.exports = {
    countTimer: function(seconds) {
        let time = {};
        time.d = Math.floor(seconds / 86400);
        time.h = Math.floor(seconds / 3600 - time.d * 24);
        time.m = Math.floor(seconds / 60 - time.d * 1440 - time.h * 60);
        time.s = Math.floor(seconds - time.d * 86400 - time.h * 3600 - time.m * 60);

        time = rebuildDate(time);
        time.viveData = getViveData(time);

        return time
    },

    getTempVive: function(temp) {
        console.log(temp)
        return temp
    }
}