const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.route('/orders/:id')
    .get(controllers.OrderController.getById)
    .put(controllers.OrderController.putById)
    .delete(controllers.OrderController.delById);

module.exports = router;