const users = [
    { email: "admin", pass: "12345", redirect: "dashboard.html" },
    { email: "manager", pass: "manager123", redirect: "manager.html" },
    { email: "user@email.com", pass: "user1234", redirect: "user.html" }
];

function login() {
    const userEmail = document.getElementById("Email").value;
    const userPass = document.getElementById("Password").value;

    const match = users.find(u => u.email === userEmail && u.pass === userPass);

    if (match) {
        alert("Login Successful");
        window.location.href = match.redirect;
    } else {
        alert("Invalid username or password");
    }
}