
// fetch('/api/sysParams')
//     .then(res => res.json())
//     .then(data => console.log(data))

// class="spinner-border"

// $.get('/api/sysParams', (data) => {
//     timeUp = data.timeUp
//     temp = data.temp
    // console.log(timeUp)
    // console.log(temp)
// })

$('#server-data-monitoring').on('click', (e) => {
    let data = $('#server-data-monitoring').attr('status');
    if (data === 'off') {
        data = 'on';
        $('#server-data-bar-spinner').addClass('spinner-border text-primary');
    } else if (data === 'on') {
        data = 'off';
        $('#server-data-bar-spinner').removeClass();
    }

    $('#server-data-monitoring').attr('status', data);
})
