var express = require("express");
var bodyParser = require("body-parser");
var admin = require("firebase-admin");
var ejs = require("ejs");
var app = express();

app.use(bodyParser.json());
app.engine("html", require("ejs").renderFile);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/views', express.static('views'));
app.use('/js', express.static('js'));
var serviceAccount = require("./snatched-test-1-firebase-adminsdk-37s62-649b988237.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://snatched-test-1.firebaseio.com"
});

const db = admin.database();

app.get("/next", function(req, res) {
    res.render("next.html");
})

app.get("/login", function(req, res) {
    res.render("login.html");
});

app.get("/signup", function(req, res) {
    res.render("signup.html");
});

app.get("/profile", function(req, res) {

    res.render("profile.html");
});

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
        console.log("Email validataion failed.");
        res.redirect("/profile");
    }
})

app.get("/sessionLogout", (req, res) => {
    res.redirect("/login");
});

app.get('/', function(req, res) {
    res.render("index.html");
});

app.use(function(req, res, next) {
    res.status(404);
    res.render("404.html");
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server listening at port 3000");
});