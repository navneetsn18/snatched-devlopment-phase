window.addEventListener("DOMContentLoaded", () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCaFgbJl5ZukVqUvZER6EeNLhm-F2N1VEw",
        authDomain: "snatched-test-1.firebaseapp.com",
        databaseURL: "https://snatched-test-1.firebaseio.com",
        projectId: "snatched-test-1",
        storageBucket: "snatched-test-1.appspot.com",
        messagingSenderId: "649593189943",
    };

    firebase.initializeApp(firebaseConfig);

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    var db = firebase.firestore();

    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location.assign("/login");
        }
        else{
            var docRef = db.collection("users").doc(user.uid);
            docRef.get().then(function(doc) {
                if (doc.exists) {
                    document.getElementById('add1').value = doc.data()['Address1'];
                    document.getElementById('add2').value = doc.data()['Address2'];
                    document.getElementById('add3').value = doc.data()['Address3'];
                    document.getElementById('city').value = doc.data()['city'];
                    document.getElementById('pincode').value = doc.data()['pinCode'];
                    document.getElementById('phone').value = doc.data()['phone'];
                } else {
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
            document.getElementById('fname').value = user.displayName;
            document.getElementById('lname').value = user.displayName;
            document.getElementById('uid').value = user.uid;
            document.getElementById('email').value = user.email;
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