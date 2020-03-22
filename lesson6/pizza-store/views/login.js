const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.route('/login')
    .get((req, res) => res.sendFile('pages/login/', {root: 'public'}))
    .post(controllers.UserController.login);

module.exports = router;