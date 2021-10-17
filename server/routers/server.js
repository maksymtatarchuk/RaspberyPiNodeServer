const router = require('express').Router();
const system = require('../modules/system');

router.get('/api/sysParams', (req, res) => {
    let timeUp = system.getServerUpTime()
    let temp = system.getCpuTemperature()
    res.json({
        'timeUp': timeUp,
        'temp': temp
    })
})

module.exports = router;