var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var express = require('express');
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded
    ({ extended: false });
var app = express();
var count = 0;
const url = 'mongodb://localhost:27017';
const dbName = 'travelguide';

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get('/showPune', function (req, res) {
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log("error connecting to database :" + err);
        } else {
            console.log("Connected to database");
            var db = client.db(dbName);
            db.collection("punePlaces").find().toArray(function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                    res.json(result);
                }
            });
            client.close();
        }
    });
});

app.get('/showMumbai', function (req, res) {
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log("error connecting to database :" + err);
        } else {
            console.log("Connected to database");
            var db = client.db(dbName);
            db.collection("mumbaiPlaces").find().toArray(function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                    res.json(result);
                }
            });
            client.close();
        }
    });
});


app.post('/addUser', urlencodedParser, function (req, res) {
    // this.count = this.count + 1;
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log("error connecting to database :" + err);
        }
        else {
            console.log("Connected to database");
            var data = req.body;
            console.log(data);
            var db = client.db(dbName);
            db.collection("users").insert(data, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                    res.json(result);
                }
            });
            client.close();
        }
    });
});


app.post('/editUser', urlencodedParser, function (req, res) {
    // this.count = this.count + 1;
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log("error connecting to database :" + err);
        }
        else {
            console.log("Connected to database");
            var data1 = req.body.email;
            var data2 = req.body.password;
            // console.log(data1);
            // console.log(data2);
            var myquery = { email: data1 };
            var newvalues = { $set: { password: data2 } };
            var db = client.db(dbName);
            db.collection("users").update(myquery, newvalues, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                    res.json(result);
                }
            });
            client.close();
        }
    });
});

app.get('/getData/:email', function (req, res) {
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log("error connecting to database :" + err);
        }
        else {
            console.log("Connected to database");
            var db = client.db(dbName);
            db.collection("users").count({ 'email': req.params.email }, function (error, result) {
                if (error) {
                    console.log(error);
                }
                else {
                    if (result > 0) {
                        console.log("User exists");
                        mes = "User exists";
                        res.json({ mes: mes });
                    }
                    else {
                        console.log("User doesn't exist");
                        mes = "User doesn't exist";
                        res.json({ mes: mes });
                    }
                    console.log(result);
                }
            })
            client.close();
        }
    });
});

app.listen(3000, () => console.log("Server Connecting"));