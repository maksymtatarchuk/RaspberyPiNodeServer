
function showDisconnectBTN(data) {
    $('.input-token-group').attr('hidden', 'hidden');
    $('.js-connect-button').attr('hidden', 'hidden');
    $('.js-disconnect-button').removeAttr('hidden');

    $('.bot-name').removeAttr('hidden');
    $('.bot-name').text(data.first_name);
    $('.bot-name').attr('token', data.token);
}

// Show 'connect' button
$('#bot-api').on('keyup', () => {
    if ($('#bot-api').val() === '') {
        $('.js-connect-button').attr('hidden', 'hidden')
    } else {
        $('.js-connect-button').removeAttr('hidden')
    }
})

// Disconnect with bot
$('.js-disconnect-button').on('click', () => {
    let token = $('.bot-name').attr('token')
    $.post('/bot/botStop', {token: token})
})

//  Send TOKEN and run BOT
$('.js-connect-button').on('click', () => {
    let token = $('#bot-api').val();
    let bot;

    $.get(`https://api.telegram.org/bot${token}/getMe`, 'json')
    .fail(() => {
        alert(token + ` - is wrong bots token!`)
    })
    .done(data => {
        bot = data.result;
        bot.token = token;
        $.post('/bot/sendToken', bot, 'json')
        .done((data) => {
            showDisconnectBTN(data)
        });
    })
    .then(() => {
        // console.log(bot)
    })


})

//  TEST sending message link
$('#send-massage').on('click', () => {
    $.post('/bot/sendMassage', {'message': 'test message from #send-massage on /bot/sendMassage'}, 'json')
})

