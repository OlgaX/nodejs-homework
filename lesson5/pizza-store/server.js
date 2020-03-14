const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./views');

const app = express();
const port = 8000;
const urlDb = 'mongodb+srv://admin:_Qwaszx2@cluster0-i2hxn.mongodb.net/pizzastore?retryWrites=true&w=majority';
const mongooseOptions = {
    useNewUrlParser   : true,
    useUnifiedTopology: true
};

app.use('/', express.static('public'));
app.use(bodyParser.json());

app.use(routes.ProductsRouter);
app.use(routes.OrdersRouter);
app.use(routes.OrderRouter);

mongoose.connect(urlDb, mongooseOptions, (err, client) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to db");

        process.on('SIGINT', () => {
            client.close();
            process.exit();
        });
    }
});

app.listen(port, () => console.log('Listening on port', port));