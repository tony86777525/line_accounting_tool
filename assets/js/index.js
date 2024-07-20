$(document).ready(function() {
    const liffID = '2005889130-qp2MMZPk';
    const gas = 'https://script.google.com/macros/s/AKfycbyij5xtv_l_l4jS0mWTju6ddB-AOHkQOsH-xGYChobJoick3wAQQSnw5pxFwrsgY5oJ/exec'
    $(document).ready(() => {
        const today = new Date().toISOString().substr(0, 10);
        $('#date').val(today);

        // 類別的模糊搜尋
        let categories = ["飲食", "交通", "娛樂", "醫療", "保險", "教育", "衣服", "旅遊", "房貸", "水電", "其他"];
        $("#category").autocomplete({
            source: categories
        });

        let isLoggedIn = false;
        liff.init({
            liffId: liffID
        }).then(function() {
            console.log('LIFF init');

            const isLoggedIn = liff.isLoggedIn();

            if(isLoggedIn) {
                liff.getProfile().then(profile => {
                    $('#user').val(profile.displayName);
                })
            }

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
        console.log(settings);
        return fetch(
            settings.url,
            {
                method: settings.method,
                body: settings.body,
            },
        ).then(
            response => response.json()
        ).then(data => {
            alert('Success');
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