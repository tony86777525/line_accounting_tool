$(document).ready(() => {
    const gas = 'https://script.google.com/macros/s/AKfycbyij5xtv_l_l4jS0mWTju6ddB-AOHkQOsH-xGYChobJoick3wAQQSnw5pxFwrsgY5oJ/exec'
    $(document).ready(() => {

        let data = {
            type: 'get_records'
        };

        let settings = {
            method: 'POST',
            url: gas,
            body: JSON.stringify(data),
        };
        fetch(
            settings.url,
            {
                method: settings.method,
                body: settings.body,
            },
        ).then(
            response => response.json()
        ).then(data => {
            let records = data.values;
            console.log(records);
        })
    });
});