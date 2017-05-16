const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://root:root@ds137101.mlab.com:37101/mongoose');

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

module.exports = router;