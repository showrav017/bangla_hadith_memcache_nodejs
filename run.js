var Memcached = require('memcached');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
var memcached = new Memcached('162.243.118.37:11211');

/*app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
*/

/*

 memcached.set('foo', 'bar', 10, function (err) {
 memcached.get( "foo", function( err, result ){
 if( err ) console.error( err );
 console.dir( result );
 memcached.end();
 });
 });
*/

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/save_to_cache', function(req, res) {
    //var name = req.body.name,
    //    color = req.body.color;

    console.log(req.body);

    memcached.get( "foo", function( err, result ){
        if( err ){
            res.send("no data found");
        }else{
            res.send("the data is");
        }
        memcached.end();
    });

    //res.send('hi');
});


app.post('/retrive_from_cache', function(req, res) {
    //var name = req.body.name,
    //    color = req.body.color;

    console.log(req.body);
    res.send('Get data from cache');
});


app.listen(80, function () {
    console.log('Example app listening on port 80!');
});