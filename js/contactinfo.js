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
        if (!user) {
            window.location.assign("/login");
        }
        else{
            document.getElementById('fname').value = user.displayName;
            document.getElementById('uid').value = user.uid;
            document.getElementById('email').value = user.email;
            document.getElementById('add1').value = "Temp";
            document.getElementById('add2').value = "Temp";
            document.getElementById('add3').value = "Temp";
            document.getElementById('phone').value = "123";
        }
    })
});

function signout() {
    firebase.auth().signOut().then(function() {
        window.location.assign("/login");
    }, function(error) {
        console.log(error);
    });
}

function updateUser(){
    var uname = document.getElementById("fname").value;
    var userdet = firebase.auth().currentUser;
    userdet.updateProfile({
        displayName: uname,
        }).then(function() {
            window.alert("Success");
           }).catch(function(error) {
            window.alert("Something went wrong");
        });
}