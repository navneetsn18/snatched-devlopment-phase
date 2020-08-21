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
            document.getElementById('lname').value = user.displayName;
            document.getElementById('uid').value = user.uid;
            document.getElementById('email').value = user.email;
            document.getElementById('fname').value = user.displayName;
            document.getElementById('add1').value = "B 66";
            document.getElementById('add2').value = "Uttam Nagar";
            document.getElementById('add3').value = "East";
            document.getElementById('city').value = "Delhi";
            document.getElementById('pincode').value = "110059";
            document.getElementById('phone').value = "1234567890";
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
function funChangePass(){
    var newPassword = document.getElementById('newPassword').value;
    var user = firebase.auth().currentUser;
    user.updatePassword(newPassword).then(function() {
        window.alert("Password Changed Successfully.")
    }).catch(function(error) {
        window.alert("Password cannot be changed for Google or Facebook Login. Please Contact your provider.")
    });
}