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
});

function sendMail(){
    var auth = firebase.auth();
    var emailAddress = document.getElementById('email').value;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
    window.alert("Reset Mail Sent");
    window.location.assign("/profile");
    }).catch(function(error) {
        console.log("You are not a user.")
    });
}

