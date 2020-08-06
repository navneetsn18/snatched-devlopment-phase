var firebaseConfig = {
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
        window.location.assign("/profile");
    } else {
        //Do Nothing
    }
})


document
    .getElementById("signup")
    .addEventListener("submit", (event) => {
        event.preventDefault();
        const login = event.target.login.value;
        const password = event.target.password.value;

        firebase
            .auth()
            .createUserWithEmailAndPassword(login, password)
            .then(({
                user
            }) => {
                user.sendEmailVerification();
            })
            .then(() => {
                window.location.assign("/profile");
            });
        return false;
    });