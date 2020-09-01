var submit = document.getElementById("submit");
var form = document.getElementById("form");
const regex = /\S+@\S+\.\S+/;

function sendusmsg() {
    var email = document.getElementById("email").value;
    if (email.match(regex) != null) {
        window.alert("Message Successfully Sent!")
        console.log("New Message Sent!");
    }
}

function mailsub() {
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