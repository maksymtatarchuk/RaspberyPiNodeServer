const router = require('express').Router();
const fs = require('fs');
const urlUtil = require('../utils/urlUtil');
const bot = require('../modules/bot');

const botMiddleware = require('../middlewares/bot')
router.use(botMiddleware.getMessageText);

var TOKEN = '';

//  Send bot API
router.post('/bot/sendToken', (req, res) => {
    let botInfo = req.body;
    TOKEN = botInfo.token;
    bot.startBot(TOKEN);
    botInfo.botStatus = 'started';
    res.json(botInfo);
})

//  Send bot API
router.post('/bot/botStop', (req, res) => {
    let data = req.body.token;
    bot.botStop('stopTheBot');
    res.json({botStatus: 'stopped'});
})

// Send the message
router.post('/bot/sendMassage', (req, res) => {
    let data = req.body.message;
    bot.sendMessage(TOKEN, data);
    res.json(data);
})

module.exports = router