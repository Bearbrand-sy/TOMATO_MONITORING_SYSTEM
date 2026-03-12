const users = [
    { email: "admin@gmail.com", pass: "12345", redirect: "admin/dashboard.html" },
    { email: "manager@gmail.com", pass: "12345", redirect: "manager/manager.html" },
    { email: "user@gmail.com", pass: "12345", redirect: "user/user.html" }
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