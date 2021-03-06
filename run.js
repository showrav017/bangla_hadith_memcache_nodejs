var Memcached = require('memcached');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json({limit: '50mb'}));       // to support JSON-encoded bodies
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

var ExpiredSeconds = 10000;

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/save_to_cache', function(req, res) {
    //var name = req.body.name,
    //    color = req.body.color;
    console.log("------------------------\n");
    console.log("-----------save_to_cache-------------\n");
    console.log("------------------------\n");
    console.log(req.body);

    memcached.set(req.body.key, req.body.value, ExpiredSeconds, function( err, result ){
        if( err ) console.error( err );

        res.setHeader('Content-Type', 'application/json');

        if(result){


            console.log("---------Saved---------------\n");

            res.send(JSON.stringify({
                success:true,
                data:result
            }, null, 3));

        }else{


            console.log("---------Not Saved---------------\n");

            res.send(JSON.stringify({
                success:false,
                message:"No data saved"
            }, null, 3));

        }

        memcached.end();
    });


    //res.send('hi');
});


app.post('/retrive_from_cache', function(req, res) {

    console.log("------------------------\n");
    console.log("-----------retrive_from_cache-------------\n");
    console.log("------------------------\n");
    console.log(req.body);

    memcached.get(req.body.key,function(err, result)
    {
        if( err ) console.error( err );

        res.setHeader('Content-Type', 'application/json');

        if(result){

            console.log("---------Found---------------\n");

            res.send(JSON.stringify({
                id:1,
                success:true,
                data:result
            }, null, 3));

        }else{

            console.log("---------Not Found---------------\n");

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