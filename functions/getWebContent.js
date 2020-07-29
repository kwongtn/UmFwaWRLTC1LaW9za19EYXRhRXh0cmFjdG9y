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

/**
 * Retrieves KML file and returns it.
 * @param {string} routeName Route Name to get KML File.
 * @return {Promise<string>}
 */
module.exports.getKML = (routeName) => {
    utils.logger("Retrieving KML File for route " + routeName);

    return new Promise((resolve, reject) => {
        var options = {
            'method': 'GET',
            'hostname': 'myrapidbus.prasarana.com.my',
            'path': '/assets/map/'.concat(routeName).concat(".kml"),
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

    });
}

/**
 * Retrieves the route stop list and returns it.
 * @param {int} routeKey Key value for route.
 * @return {Promise<JSON>}
 */
module.exports.getStopList = (routeKey) => {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'GET',
            'hostname': 'myrapidbus.prasarana.com.my',
            'path': '/kiosk?route=' + routeKey,
            'maxRedirects': 20
        };

        var req = https.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);

                // Process the response into JSON Format
                body = /var bstp.*;/m.exec(body).toString('utf-8');
                body = body.replace(/var bstp .*= /, "").replace(/;$/, "");

                resolve(JSON.parse(body), null, 2);
            });

            res.on("error", function (error) {
                console.error(error);
                reject(error);
            });
        });

        req.end();

    });
}