const models = require('../models');
const jwt = require('jsonwebtoken');
const secretKey = "$jT0*uX0A&T0";

const create = (req, res) => {
    models.User.create(req.body, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(`User '${data.name}' was created`).end();
        }
    })
};

const login = (req, res) => {
    models.User.findOne({email: req.body.email}, (err, data) => {
        if (err) {
            console.log(err);
        } else if (data && req.body.password === data.password) {
            const token = jwt.sign({email: data.email}, secretKey, {expiresIn: '15m'});
            res.status(200).json({token}).end();
        } else {
            res.status(404).json('User not found').end();
        }
    });
};

const verify = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    if (token) {
        jwt.verify(token, secretKey, (err, data) => {
            if (err) {
                console.log(err);
                res.status(401).send('User unauthorized').end();
            } else {
                next();
            }
        });
    } else {
        res.status(401).send('User unauthorized').end();
    }
};

module.exports = {
    create,
    login,
    verify,
};