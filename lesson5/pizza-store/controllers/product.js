const models = require('../models');

const getAll = (req, res) => {
    models.Product.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(data).end();
        }
    });
};

module.exports = {
    getAll,
};