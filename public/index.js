var submit = document.getElementById("submit");
var form = document.getElementById("form");
const regex = /\S+@\S+\.\S+/;

function fun(e) {
    var email = document.getElementById("email").value;
    console.log(email)
    if (email.match(regex) != null) {
        console.log("Subscribed");
    }
}