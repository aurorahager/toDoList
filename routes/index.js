//Requires
var router = require('express').Router();
var path = require('path');


router.get('/', function (req, res) {
    var basePath = path.join(__dirname, '../public/views/index.html');
    res.sendFile(basePath);
}); //END get base url

module.exports = router;