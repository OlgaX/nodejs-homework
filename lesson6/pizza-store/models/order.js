const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    productIds: {
        type: [String],
        required: true
    },
});

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;