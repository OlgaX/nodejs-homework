const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.route('/orders')
    .get(controllers.OrderController.getAll)
    .post(controllers.OrderController.post);

module.exports = router;