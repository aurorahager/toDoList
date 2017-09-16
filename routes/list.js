//requires
var router = require('express').Router();
var pool = require('./pool');

//receive user input and send to database
router.post('/', function (req, res){
    sentItem = req.body.item;
    pool.connect(function(err, client, done){
        if(err){
            console.log('connection error:', err);
            res.sendStatus(500);
        }//END if connection error
        else {
            var queryToSend = 'INSERT INTO list (item) VALUES ($1);';
            var value = [sentItem];
            client.query(queryToSend, value, function (quErr, resultObj){
                done();
                if(quErr) {
                    console.log('query error:', quErr);
                    res.sendStatus(500);
                }//END if query error
                else {
                    res.sendStatus(201);
                }//END else no query error
            })//END client.query
        }//END else send query
    })//END pool.connect
})//END router POST

module.exports = router;