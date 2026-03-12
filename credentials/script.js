const users = [
    { email: "admin@gmail.com",   pass: "12345", name: "Admin",        role: "Admin",   redirect: "admin/dashboard.html" },
    { email: "manager@gmail.com", pass: "12345", name: "Manager",      role: "Manager", redirect: "manager/dashboard.html" },
    { email: "user@gmail.com",    pass: "12345", name: "User",         role: "User",    redirect: "user/user.html" }
];

function login() {
    const userEmail = document.getElementById("Email").value.trim();
    const userPass  = document.getElementById("Password").value;

    const match = users.find(u => u.email === userEmail && u.pass === userPass);

    if (match) {
        // Save logged-in user info for all pages to read
        localStorage.setItem("loggedUser", JSON.stringify({
            name:  match.name,
            email: match.email,
            role:  match.role
        }));
        window.location.href = match.redirect;
    } else {
        // Trigger shake error on login page
        if (typeof showLoginError === "function") {
            showLoginError();
        } else {
            alert("Invalid username or password");
        }
    }
}