var Memcached = require('memcached');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.urlencoded());

/*
var memcached = new Memcached('162.243.118.37:11211');
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

    console.log(req.body)
});



app.listen(3350, function () {
    console.log('Example app listening on port 3000!');
});