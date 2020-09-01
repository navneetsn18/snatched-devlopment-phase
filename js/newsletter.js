var submit = document.getElementById("submit");
var form = document.getElementById("form");
const regex = /\S+@\S+\.\S+/;

function fun() {
    var email = document.getElementById("email").value;
    if (email.match(regex) != null) {
        window.alert("Successfully Subscribed To Newsletters")
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