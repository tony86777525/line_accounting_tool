$(document).ready(() => {
    const liffID = '2005889130-qp2MMZPk';
    const gas = 'https://script.google.com/macros/s/AKfycbyij5xtv_l_l4jS0mWTju6ddB-AOHkQOsH-xGYChobJoick3wAQQSnw5pxFwrsgY5oJ/exec'
    $(document).ready(() => {
        const today = new Date().toISOString().substr(0, 10);
        $('#date').val(today);

        let data = {
            type: 'get_categories'
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
            let categories = data.values;

            $("#category").autocomplete({
                source: categories
            });
        })

        // let isLoggedIn = false;
        liff.init({
            liffId: liffID
        }).then(function() {
            console.log('LIFF init');

            // const isLoggedIn = liff.isLoggedIn();
            //
            // if(isLoggedIn) {
            //     liff.getProfile().then(profile => {
            //         $('#user').val(profile.displayName);
            //     })
            // }

        }).catch(function(error) {
            console.log(error);
        });
    });
    $('#accountingForm').on('submit', function(event) {
        event.preventDefault();
        const form = event.target;
        const data = convertFormToJSON(form);
        data.type = 'save';

        let settings = {
            method: 'POST',
            url: gas,
            body: JSON.stringify(data),
        };

        $('.mask').show();

        return fetch(
            settings.url,
            {
                method: settings.method,
                body: settings.body,
            },
        ).then(
            response => response.json()
        ).then(data => {
            liff.sendMessages([
                {
                    type: "text",
                    text: "記帳成功！",
                },
            ])
            .then(() => {
                liff.closeWindow();
            })
            .catch((err) => {
                liff.closeWindow();
            });

        })
    });
});

function convertFormToJSON(form) {
    return $(form)
        .serializeArray()
        .reduce(function (json, { name, value }) {
            json[name] = value;
            return json;
        }, {});
}