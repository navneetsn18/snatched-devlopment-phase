var express = require("express");
var bodyParser = require("body-parser");
var admin = require("firebase-admin");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
var store = require("store");

var app = express();
const csrfMiddleware = csrf({ cookie: true });

app.use(bodyParser.json());
app.engine("html", require("ejs").renderFile);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/views', express.static('views'));
app.use(cookieParser());
app.use(csrfMiddleware);

app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});

var serviceAccount = require("./snatched-test-1-firebase-adminsdk-37s62-649b988237.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://snatched-test-1.firebaseio.com"
});

const db = admin.database();

app.get("/next", function(req, res) {
    const sessionCookie = req.cookies.session || "";
    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */ )
        .then(() => {
            res.render("next.html");
        })
        .catch((error) => {
            res.redirect("/login");
        });
})

app.get("/login", function(req, res) {
    res.render("login.html");
});

app.get("/signup", function(req, res) {
    res.render("signup.html");
});

app.get("/profile", function(req, res) {
    const sessionCookie = req.cookies.session || "";
    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */ )
        .then(() => {
            res.render("profile.html", { csrfTokenFromServer: req.csrfToken() });
        })
        .catch((error) => {
            res.redirect("/login");
        });
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

app.post("/sessionLogin", (req, res) => {
    const idToken = req.body.idToken.toString();
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then(
            (sessionCookie) => {
                const options = { maxAge: expiresIn, httpOnly: true };
                res.cookie("session", sessionCookie, options);
                res.end(JSON.stringify({ status: "success" }));
            },
            (error) => {
                res.status(401).send("UNAUTHORIZED REQUEST!");
            }
        );
});

app.get("/sessionLogout", (req, res) => {
    res.clearCookie("session");
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