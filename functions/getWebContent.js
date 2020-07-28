const https = require('https');
const utils = require('./utils.js');

module.exports.getRouteList = () => {
    utils.logger("Retrieving route list...");

    return new Promise((resolve, reject) => {
        var options = {
            'method': 'POST',
            'hostname': 'myrapidbus.prasarana.com.my',
            'path': '/main/ajax/get_dropdown_route',
            'headers': {
                'X-Requested-With': 'XMLHttpRequest'
            },
            'maxRedirects': 20
        };

        var req = https.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                resolve(body.toString());
            });

            res.on("error", function (error) {
                console.error(error);
                reject(error);
            });
        });

        req.end();

    })

}

