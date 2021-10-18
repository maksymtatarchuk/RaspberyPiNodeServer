
function numbToString(obj) {
    let result = {};
    for (let key in obj) {
        result[key] = obj[key] < 10 & key !== 'd' ? '0' + obj[key] : obj[key].toString();
    }

    return result
}


module.exports = {
    countTimer: function(seconds) {
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
}