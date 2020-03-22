const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.route('/registration')
    .get((req, res) => res.sendFile('pages/registration/', {root: 'public'}))
    .post(controllers.UserController.create);

module.exports = router;