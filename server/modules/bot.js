require('dotenv').config();
const { Telegraf } = require('telegraf');


let startBot = (token) => {
    var bot = new Telegraf(token)

    bot.start((ctx) => {
        console.log('bot.start((ctx) => { ', ctx.chat)
    });
    bot.action('/start');
    bot.launch();

    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

let sendMessage = (token, data) => {
    var bot = new Telegraf(token)
    bot.telegram.sendMessage('-1001784902701', data)
}


module.exports = {
    startBot: startBot,
    botStop: startBot,
    sendMessage: sendMessage
}