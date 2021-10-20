

let timerToggle;

function updateSererDataMonitoringBar() {
    timerToggle = setInterval(() => {
        $.get('/api/sysParams', (data) => {

            // Update timer
            $(`.js-server-up-time`).remove()
            for (let key in data.timeUp) {
                $('.js-timer').append(`
                    <span class="js-server-up-time badge badge-primary">${data.timeUp[key]} ${key}</span>
                `)
            }

            // Update temperature
            $('.js-server-temp').text(data.temp.value)
            let newTempClass = $('.js-server-temp').attr('class').split(' ').slice(0, 2).join(' ') + ' badge-' + data.temp.status;
            $('.js-server-temp').attr('class', newTempClass)
        })
    }, 1000)
}

$('#server-data-monitoring').on('click', (e) => {
    let data = $('#server-data-monitoring').attr('status')
    if (data === 'off') {
        data = 'on'
        updateSererDataMonitoringBar()
    } else if (data === 'on') {
        data = 'off'
        clearInterval(timerToggle)
    }
    $('#server-data-monitoring').attr('status', data)
})

$('.sys-shell-command').on('click', (e) => {
    let command = e.target.id.split('sys-shell-')[1];
    let msg = confirm(`Are you sure that you want to run command "${command}" for the server?`);
    if (msg) {
        $.post('/api/shellCommand', {'command':command}, (data) =>  {
            console.log(data)
        }, 'json')
    }
})