const router = require('express').Router();
const system = require('../modules/system');

router.get('/api/sysParams', (req, res) => {
    let timeUp = system.getServerUpTime().viveData
    let temp = system.getCpuTemperature()
    res.json({
        'timeUp': timeUp,
        'temp': temp
    })
})

router.get('/api/reboot', (req, res) => {
    system.runShell()
})

module.exports = router;