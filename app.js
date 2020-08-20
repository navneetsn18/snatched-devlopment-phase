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
});

const db = admin.firestore();

app.get("/signup", function(req, res) {
    res.render("signup.html");
});


app.get("/login", function(req, res) {
    res.render("login.html");
});


app.get("/contactinfo", function(req, res) {
    res.render("./contactinfo.html");
})

app.post("/updateUserInfo",function(req,res){
    const uid = req.body.uid;
    const userEmail = req.body.userEmail;
    const data = {
        email: req.body.email
    }
    if (req.body.email.match(regex) != null) {
        const docRef = db.collection('users').doc(uid).doc('Subscribed Mails');
        docRef.set(data);
        console.log("Subscribed");
        res.redirect("/next");
    } else {
        console.log("Email validataion failed.");
        res.redirect("/profile");
    }
})

app.get("/profile", function(req, res) {
    res.render("profile.html");
});

app.get("/next", function(req, res) {
    res.render("next.html");
})

app.post('/sendnews', function(req, res) {
    const regex = /\S+@\S+\.\S+/;
    const uid = req.body.uid;
    const data = {
        email: req.body.email
    }
    if (req.body.email.match(regex) != null) {
        const docRef = db.collection('subMails').doc(uid).doc('Subscribed Mails');
        docRef.set(data);
        console.log("Subscribed");
        res.redirect("/next");
    } else {
        console.log("Email validataion failed.");
        res.redirect("/profile");
    }
});

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