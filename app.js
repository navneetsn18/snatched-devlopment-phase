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
app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
app.use('/icon-fonts', express.static('icon-fonts'));

var serviceAccount = require("./snatched-test-1-firebase-adminsdk-37s62-649b988237.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.get("/contact", function(req, res) {
    res.render("contact.html");
});

app.get("/signup", function(req, res) {
    res.render("signup.html");
});


app.get("/login", function(req, res) {
    res.render("login.html");
});

app.get("/passreset", function(req, res) {
    res.render("passreset.html");
});

app.get("/contactinfo", function(req, res) {
    res.render("./contactinfo.html");
})

app.post("/updateUserInfo", function(req, res) {
    const uid = req.body.uid;
    const data = {
        uid: req.body.uid,
        name: req.body.lname,
        email: req.body.email,
        Address1: req.body.add1,
        Address2: req.body.add2,
        Address3: req.body.add3,
        city: req.body.city,
        pinCode: req.body.pincode,
        phone: req.body.phone,
    }
    const docRef = db.collection('users').doc(uid);
    docRef.set(data);
    console.log("Updated");
    res.redirect("/contactinfo");
})

app.get("/profile", function(req, res) {
    res.render("profile.html");
});

app.post('/sendmsg', function(req, res) {
    var datetime = new Date();
    const regex = /\S+@\S+\.\S+/;
    const data = {
        name: req.body.username,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    }
    if (req.body.email.match(regex) != null) {
        const docRef = db.collection('messages').doc(String(datetime));
        docRef.set(data);
        console.log("New Message Recieved.");
        res.redirect("/contact");
    } else {
        console.log("Email validataion failed.");
        res.redirect("/contact");
    }
});

app.post('/sendnews', function(req, res) {
    var datetime = new Date();
    const regex = /\S+@\S+\.\S+/;
    const data = {
        email: req.body.email
    }
    if (req.body.email.match(regex) != null) {
        const docRef = db.collection('subMails').doc(String(datetime));
        docRef.set(data);
        console.log("Subscribed");
        res.redirect("/");
    } else {
        console.log("Email validataion failed.");
        res.redirect("/");
    }
});

app.post('/sendnews-contact', function(req, res) {
    var datetime = new Date();
    const regex = /\S+@\S+\.\S+/;
    const data = {
        email: req.body.email
    }
    if (req.body.email.match(regex) != null) {
        const docRef = db.collection('subMails').doc(String(datetime));
        docRef.set(data);
        console.log("Subscribed");
        res.redirect("/contact");
    } else {
        console.log("Email validataion failed.");
        res.redirect("/contact");
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