const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./views');
const controllers = require('./controllers');

const app = express();
const port = 8000;
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const urlDb = 'mongodb+srv://admin:_Qwaszx2@cluster0-i2hxn.mongodb.net/pizzastore?retryWrites=true&w=majority';
const mongooseOptions = {
    useNewUrlParser   : true,
    useUnifiedTopology: true
};

app.use(express.static('public'));
app.use('/orders*', controllers.UserController.verify);
app.use(bodyParser.json());
app.use( (req, res, next) =>{
    req.io = io;
    next();
});

app.use(routes.LoginRouter);
app.use(routes.RegistrationRouter);
app.use(routes.ProductsRouter);
app.use(routes.OrderPageRouter);
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

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('error', (err) => {
        console.log("Socket.IO Error");
        console.log(err.stack);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

http.listen(port, () => console.log('Listening on port', port));