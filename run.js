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

var ExpiredSeconds = 10;

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/save_to_cache', function(req, res) {
    //var name = req.body.name,
    //    color = req.body.color;

    console.log(req.body);

    memcached.set(req.body.key, req.body.value, ExpiredSeconds, function( err, result ){
        if( err ) console.error( err );

        res.setHeader('Content-Type', 'application/json');

        if(result){

            res.send(JSON.stringify({
                success:true,
                data:result
            }, null, 3));

        }else{

            res.send(JSON.stringify({
                success:false,
                message:"no data exists"
            }, null, 3));

        }

        memcached.end();
    });


    //res.send('hi');
});


app.get('/retrive_from_cache', function(req, res) {

    console.log(req.body);

    memcached.get(req.body.key,function(err, result)
    {
        if( err ) console.error( err );

        res.setHeader('Content-Type', 'application/json');

        if(result){

            res.send(JSON.stringify({
                success:true,
                data:result
            }, null, 3));

        }else{

            res.send(JSON.stringify({
                success:false,
                message:"no data exists"
            }, null, 3));

        }

        memcached.end();
    });

});


app.listen(80, function () {
    console.log('Example app listening on port 80!');
});