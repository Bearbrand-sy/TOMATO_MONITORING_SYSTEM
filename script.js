const validUserEmail = "admin";
const validUserPass = "12345";

function login() {

    const userEmail = document.getElementById("Email").value;
    const userPass = document.getElementById("Password").value;

    if (userEmail === validUserEmail && userPass === validUserPass) {
        alert("Login Successful");
        window.location.href = "./dashboard/dashboard.html";
    } else {
        alert("Invalid username or password");
    }
}