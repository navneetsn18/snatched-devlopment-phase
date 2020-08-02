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

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    var auth = firebase.auth();
    auth.onAuthStateChanged(user => {
        console.log(user);
    });
    if (user) {
        document.getElementById("userEmail").innerHTML = "Welcome " + user.email;
        var verifiedmail = user.emailVerified;

        if (verifiedmail) {
            document.getElementById("emailverorn").style.display = "none";
            document.getElementById("verify").style.display = "none";
            submit.style.display = "block";
            form.style.display = "block";
        }
    }

    function verifymail(event) {
        console.log("1");
        event.preventDefault();
        user.sendEmailVerification().then(function() {
            window.alert("Mail verification sent! ")
        }).catch(function(error) {
            window.alert(error);
        })
    }
});