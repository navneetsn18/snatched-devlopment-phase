var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var admin = require("firebase-admin");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/public', express.static('public'));

var serviceAccount = require("./snatched-test-1-firebase-adminsdk-37s62-649b988237.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://snatched-test-1.firebaseio.com"
});

const db = admin.database();

app.post('/sendnews', function(req, res) {
    const regex = /\S+@\S+\.\S+/;
    const data = {
        email: req.body.email
    }
    if (req.body.email.match(regex) != null) {
        db.ref('Users').push(data);
        console.log("Subscribed");
        res.redirect("/next");
    } else {
        console.log("Email validataion failed.")
    }
})

app.get("/next", function(req, res) {
    res.sendFile('./public/next.html', {
        root: path.join(__dirname + '/')
    })
})

app.get('/', function(req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('./public/index.html');
}).listen(process.env.PORT || 3000);
console.log("server listening at port 3000");