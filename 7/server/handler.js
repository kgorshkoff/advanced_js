const fs = require('fs');
const cart = require('./cart');
const moment = require('moment');
const os = require('process');

const actions = {
    add: cart.add,
    change: cart.change,
    del: cart.del,
};

const handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            logger(req.url, data, action);
            const newCart = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    });
};

const logger = (url, cartJson, action, logfile = "./server/db/stats.json") => {
    fs.readFile(logfile, 'utf-8', (err, data) => {
        url = parseInt(url.substring(1));
        cartJson = JSON.parse(cartJson);

        if (!url) {return};

        if (err) {
            data = [];
            console.log(err);
        } else {
            data = JSON.parse(data);
        };

        let result = {
            timestamp: moment().unix(),
            action: action,
            product: cartJson.contents.find(el => el.id_product === url).product_name
        }
        data.push(result);
        fs.writeFile(
            logfile,
            JSON.stringify(data, null, 4), 'utf-8',
            (err1 => console.log(err1)));
    });
}

module.exports = handler;
