window.addEventListener("DOMContentLoaded", () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCaFgbJl5ZukVqUvZER6EeNLhm-F2N1VEw",
        authDomain: "snatched-test-1.firebaseapp.com",
        databaseURL: "https://snatched-test-1.firebaseio.com",
        projectId: "snatched-test-1",
        storageBucket: "snatched-test-1.appspot.com",
        messagingSenderId: "649593189943",
        appId: "1:649593189943:web:70067fa59de352d0d8b1b2",
        measurementId: "G-X771WGGH89"
    };

    firebase.initializeApp(firebaseConfig);

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            document.getElementById('uid').value = user.uid;
            var verifiedEmail = user.emailVerified;
            if (verifiedEmail === false) {
                document.getElementById("userEmail").style.display = "block";
            } else {
                document.getElementById("userEmail").style.display = "none";
            }
            if (user.displayName != null) {
                document.getElementById("user").innerHTML = `Hello ${user.displayName}`;
            } else {
                window.location.assign("/contactinfo");
            }
        } else {
            window.location.assign("/login");
        }
    })

});

function mailNow() {
    window.alert("Mail Sent");
    firebase.auth().onAuthStateChanged(function(user) {
        user.sendEmailVerification();
    })
}

function signout() {
    firebase.auth().signOut().then(function() {
        window.location.assign("/login");
    }, function(error) {
        console.log(error);
    });
}

var submit = document.getElementById("submit");
var form = document.getElementById("form");
const regex = /\S+@\S+\.\S+/;

function fun() {
    var email = document.getElementById("email").value;
    if (email.match(regex) != null) {
        console.log("Subscribed");
    }
}

function inputData() {
    var email = document.getElementById("email").value;
    if (email.match(regex) != null) {
        submit.disabled = false;
    } else {
        submit.disabled = true;
    }
}