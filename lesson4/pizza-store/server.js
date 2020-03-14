const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();
const port = 8000;
const urlDb = 'mongodb+srv://admin:_Qwaszx2@cluster0-i2hxn.mongodb.net/test?retryWrites=true&w=majority';

app.use('/', express.static('public'));

app.use(bodyParser.json());

MongoClient.connect(urlDb, (err, client) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to db");

        const products = client.db('pizzastore').collection('products');
        app.locals.dbProducts = products;

        const orders = client.db('pizzastore').collection('orders');
        app.locals.dbOrders = orders;

        process.on('SIGINT', () => {
            client.close();
            process.exit();
        });
    }
});

app.route('/products')
    .get((req, res) => {
        app.locals.dbProducts.find({}).toArray((err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(data).end();
            }
        });
    });

app.route('/orders')
    .get((req, res) => {
        app.locals.dbOrders.find({}).toArray((err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(data).end();
            }
        });
    })
    .post((req, res) => {
        app.locals.dbOrders.insertOne(req.body, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Order id ${data.insertedId} was created`);
                res.send(data.ops[0]).end();
            }
        });
    });

app.route('/orders/:id')
    .get((req, res) => {
        app.locals.dbOrders.findOne({_id: ObjectID(req.params.id)}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(data);
            }
        });
    })
    .put((req, res) => {
        app.locals.dbOrders.findOneAndUpdate(
            {_id: ObjectID(req.params.id)},
            {$set: req.body},
            {returnNewDocument: false},
            (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Order id ${data.value._id} was updated`);
                    res.status(200).json(data.value);
                }
            });
    })
    .delete((req, res) => {
        app.locals.dbOrders.findOneAndDelete({_id: ObjectID(req.params.id)}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Order id ${data.value._id} was deleted`);
                res.status(200).json(data.value);
            }
        });
    });

app.listen(port, () => console.log('Listening on port', port));