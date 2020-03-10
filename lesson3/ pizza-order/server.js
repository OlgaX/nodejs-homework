const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;

app.use('/', express.static('public'));

app.use(bodyParser.json());

app.use((req, res, next) => {
    fs.readFile(path.join(__dirname, 'db/pizza.json'), (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.locals.dbPizza = JSON.parse(data.toString());
        }
        next();
    })
});

app.use((req, res, next) => {
    fs.readFile(path.join(__dirname, 'db/orders.json'), (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.locals.dbOrders = JSON.parse(data.toString());
        }
        next();
    })
});

app.route('/products/pizza')
    .get((req, res) => res.status(200).json(res.locals.dbPizza));

app.route('/orders')
    .get((req, res) => res.status(200).json(res.locals.dbOrders))
    .post((req, res) => {
        const orders = res.locals.dbOrders;

        if (!orders.list) {
            orders.list = [];
        }

        const lastItem = orders.list[orders.list.length - 1];
        const id = lastItem ? +lastItem.id + 1 : 1;
        const order = {id, productIds: req.body.productIds};

        orders.list.push(order);

        fs.writeFile(path.join(__dirname, 'db/orders.json'), JSON.stringify(orders), (err) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(order);
            }
        });
    });

app.route('/orders/:id')
    .get((req, res) => {
        const orders = res.locals.dbOrders.list;
        let order = {};

        if (orders.length) {
            order = res.locals.dbOrders.list.find((i) => i.id === +req.params.id);
        }

        res.status(200).json(order)
    })
    .put((req, res) => {
        const id = +req.params.id;
        const orders = res.locals.dbOrders;
        const order = orders.list.find((i) => i.id === id);

        if (order) {
            order.productIds = req.body.productIds;
        }

        console.log(order);

        fs.writeFile(path.join(__dirname, 'db/orders.json'), JSON.stringify(orders), (err) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(order);
            }
        });
    })
    .delete((req, res) => {
        const id = +req.params.id;
        const orders = res.locals.dbOrders;
        orders.list = orders.list.filter((i) => i.id !== id);

        console.log(orders);

        fs.writeFile(path.join(__dirname, 'db/orders.json'), JSON.stringify(orders), (err) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json({id});
            }
        });
    });

app.listen(port, () => console.log('Listening on port', port));