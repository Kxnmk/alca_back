var express = require('express');
var router = express.Router();
var R = require('../models/rol');

router.get('/', function (req, res, next) {
    R.getAllRoles(req, res);
});

module.exports = router;