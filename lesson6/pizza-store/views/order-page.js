const express = require('express');
const router = express.Router();

router.route('/order-page')
    .get((req, res) => res.sendFile('pages/order-page/', {root: 'public'}));

module.exports = router;