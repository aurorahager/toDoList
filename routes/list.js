//requires
var router = require('express').Router();
var pool = require('./pool');
var bodyParser = require('body-parser');

//middleware
router.use(bodyParser.urlencoded({
    extended: true
}));

//sends list form database to client side
router.get('/', function (req, res) {
    //connect ot database
    pool.connect(function (err, client, done) {
        //error handling
        if (err) {
            console.log('Connection Error:', err);
            res.sendStatus(500);
        } //END if connection error
        else {
            client.query('SELECT * FROM list', function (quErr, resultObj) {
                done();
                //error handling
                if (quErr) {
                    console.log('Query Error:', quErr);
                    res.sendStatus(500);
                } //END if query error
                else {
                    //send the list from the database to client side
                    res.send(resultObj.rows);
                } //END else send
            }) //END client.query
        } //END else send query
    }) //END pool.connect
}) //END router GET

//receive user input and send to database
router.post('/', function (req, res) {
    //variable to store user input sent from client side
    sentItem = req.body.item;
    pool.connect(function (err, client, done) {
        //error handling
        if (err) {
            console.log('connection error:', err);
            res.sendStatus(500);
        } //END if connection error
        else {
            var queryToSend = 'INSERT INTO list (item) VALUES ($1);';
            var value = [sentItem]; // to store as array
            //send query to database
            client.query(queryToSend, value, function (quErr, resultObj) {
                done();
                //error handling
                if (quErr) {
                    console.log('query error:', quErr);
                    res.sendStatus(500);
                } //END if query error
                else {
                    res.sendStatus(201);
                } //END else no query error
            }) //END client.query
        } //END else send query
    }) //END pool.connect
}) //END router POST

//delete item from database 
router.delete('/:id', function (req, res) {
    //variable to store id
    var dataId = req.params.id;
    console.log('req.params:', dataId);
    pool.connect(function (err, client, done) {
        //error handling
        if (err) {
            console.log('connection error:', err);
            res.sendStatus(500);
        } //END if connection error
        //else send delete query
        else {
            client.query('DELETE FROM list WHERE id=$1;', [dataId], function (quErr, results) {
                done();
                //error handling
                if (quErr) {
                    console.log('query error:', quErr);
                    res.sendStatus(500);
                } //END if query error
                else {
                    res.sendStatus(202);
                } //END else successful
            }) //END client.connect function 
        } //END else send query
    }) //END pool.connect
}) //END router DELETE

//update database
router.put('/:id', function (req, res) {
    //variable to store id
    var dataId = req.params.id;
    console.log('PUT req.params:', dataId);
    pool.connect(function (err, client, done) {
        //error handling
        if (err) {
            console.log('connection error:', err);
            res.sendStatus(500);
        } //END if connection error
        else {
            client.query('UPDATE list SET complete=true WHERE id=$1;', [dataId], function (quErr, results) {
                done();
                //error handling
                if (quErr) {
                    console.log('query error:', quErr);
                    res.sendStatus(500);
                } //END if query error
                else {
                    res.sendStatus(202);
                } //END else successful
            }) //END client.connect function 
        } //END else send query
    }) //END pool.connect
});//END router PUT

module.exports = router;