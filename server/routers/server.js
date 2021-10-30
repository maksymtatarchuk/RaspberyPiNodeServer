const router = require('express').Router();
const path = require('path');
const urlUtil = require('../utils/urlUtil');
const system = require('../modules/system');

router.get('/api/sysParams', (req, res) => {
    let timeUp = system.getServerUpTime().viveData
    let temp = system.getCpuTemperature()
    res.json({
        'timeUp': timeUp,
        'temp': temp
    })
})

router.post('/api/shellCommand', (req, res) => {
    let data = req.body['command']
    system.runShell('sh ' + path.resolve(urlUtil.sysDir, data + '.sh'))
    res.json(data)

})

module.exports = router;