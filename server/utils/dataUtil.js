
function numbToString(obj) {
    let result = {};
    for (let key in obj) {
        result[key] = obj[key] < 10 & key !== 'd' ? '0' + obj[key] : obj[key].toString();
    }

    return result
}


module.exports = {
    countTimer: function(seconds) {
        let time = {};

        seconds >= 86400 ? time.d = Math.floor(seconds / 86400) : 0;
        seconds >= 3600 ? time.h = Math.floor(seconds / 3600 - time.d * 24) : 0;
        seconds >= 60 ? time.m = Math.floor(seconds / 60 - time.d * 1440 - time.h * 60) : 0;
        time.s = Math.floor(seconds - time.d * 86400 - time.h * 3600 - time.m * 60);

        time.viveData = numbToString(time);

        return time
    }
}