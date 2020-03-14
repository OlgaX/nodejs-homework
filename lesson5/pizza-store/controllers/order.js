const models = require('../models');

const getAll = (req, res) => {
    models.Order.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(data).end();
        }
    });
};

const post = (req, res) => {
    models.Order.create(req.body, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Order id ${data._id} was created`);
            res.status(200).send(data).end();
        }
    });
};

const getById = (req, res) => {
    models.Order.findById(req.params.id, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(data);
        }
    });
};

const putById = (req, res) => {
    models.Order.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Order id ${data._id} was updated`);
            res.status(200).json(data);
        }
    });
};

const delById = (req, res) => {
    models.Order.findByIdAndDelete(req.params.id,  (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Order id ${data._id} was deleted`);
            res.status(200).json(data);
        }
    });
};

module.exports = {
    getAll,
    post,
    getById,
    putById,
    delById,
};