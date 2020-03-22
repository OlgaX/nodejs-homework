const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.route('/products')
    .get(controllers.ProductController.getAll);

module.exports = router;