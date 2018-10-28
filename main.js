var http = require("http");
url = "http://hn.algolia.com/api/v1/search_by_date?query=nodejs";
var request = require("request");
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var urlMongo = "mongodb://localhost:27017/";
let express = require('express')
let apiRoutes = require("./api-routes")
let app = express();

app.use(bodyParser.urlencoded({
    extended: true
 }));
 app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true }, function(err, res) {
    if(err) {
      console.log('ERROR: connecting to Database. ' + err);
    }
});
var db = mongoose.connection;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var port = process.env.PORT || 8080;
app.get('/', (req, res) => res.send('Hello World with Express 4'));
app.use('/api', apiRoutes)

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});




function populate() {
    var request2 = request({
        url: url,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    },function(error, response, body){
        if(!error && response.statusCode == 200){
            console.log('sucess!');
           data = JSON.parse(body);
            console.log(data.query)
            MongoClient.connect(urlMongo, function(err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                /*
                dbo.collection('tests', {}, function(err, test) {
                    test.remove({}, function(err, result) {
                        if (err) {
                            console.log(err);
                        }
                        console.log("eliminados");
                        db.close();
                    });
                });
                */
                dbo.createCollection("tests", function(err, res) {
                    if (err) throw err;
                    console.log("Collection created!");
                    db.close();
                  });
                var myObj = data.hits;
                dbo.collection("tests").insertMany(myObj, function(err, res) {
                    if (err) throw err;
                    console.log("Number of documents inserted: " + res.insertedCount);
                    db.close();
                  });
              });
              
        }else{
            console.log('error' + response.statusCode);
        }
    });
}

db.collection('tests').count(function(err, count) {
    if (count == 0) {
        populate();
    }
})

 var requestLoop = setInterval(function(){
    populate();
  }, 3600000);
