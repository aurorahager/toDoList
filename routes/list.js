//requires
var router = require('express').Router();
var pool = require('./pool');
var bodyParser = require('body-parser');

//middleware
router.use(bodyParser.urlencoded({ extended: true }));

//sends list form database to client side
router.get('/', function (req, res){
    //connect ot database
    pool.connect(function(err, client, done){
        if(err) {
            console.log('Connection Error:', err);
            res.sendStatus(500);
        }//END if connection error
        else{
        client.query('SELECT * FROM list', function(quErr, resultObj){
            done();
            if(quErr){
                console.log('Query Error:', quErr);
                res.sendStatus(500);
            }//END if query error
            else{
                //send the list from the database to client side
                console.log('3. OBJECT resultObj', resultObj.rows);
                
                res.send(resultObj.rows);
            }//END else send
        })//END client.query
        }//END else send query
    })//END pool.connect
})//END router GET

//receive user input and send to database
router.post('/', function (req, res){
    //variable to store user input sent from client side
    sentItem = req.body.item;
    console.log('2. OBJECT sentItem:', sentItem);
    pool.connect(function(err, client, done){
        if(err){
            console.log('connection error:', err);
            res.sendStatus(500);
        }//END if connection error
        else {
            var queryToSend = 'INSERT INTO list (item) VALUES ($1);';
            var value = [sentItem];// to store as array
            //send query to database
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