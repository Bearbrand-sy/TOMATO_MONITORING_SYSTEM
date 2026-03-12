// ============================
// TRANSPORT DATA
// ============================

const transportData = {
    1: { temp: "26°C", hum: "52%", vent: "ON", product: "Tomatoes", route: "Manolo Farm → CDO Market", status: "Safe" },
    2: { temp: "30°C", hum: "60%", vent: "OFF", product: "Tomatoes", route: "Manolo Farm → Davao Market", status: "Warning" }
};


// ============================
// USER DATA
// ============================

let users = [
    { name: "Sander", email: "admin", contact: "+63 900 000 0005", role: "Admin" },
    { name: "Manager User", email: "manager", contact: "+63 900 000 0002", role: "Manager" },
    { name: "Regular User", email: "user@email.com", contact: "+63 900 000 0003", role: "User" }
];


// ============================
// UPDATE TRANSPORT DATA
// ============================

function updateTransport() {

    const select = document.getElementById("transpo");
    if (!select) return;

    const id = select.value;
    if (!id) return;

    const t = transportData[id];

    const temp = document.getElementById("temperature");
    const hum = document.getElementById("humidity");
    const vent = document.getElementById("ventilation");

    const did = document.getElementById("d-id");
    const product = document.getElementById("d-product");
    const route = document.getElementById("d-route");
    const status = document.getElementById("d-status");
    const details = document.getElementById("details");

    if (temp) temp.textContent = t.temp;
    if (hum) hum.textContent = t.hum;
    if (vent) vent.textContent = t.vent;

    if (did) did.textContent = "Transport " + id;
    if (product) product.textContent = t.product;
    if (route) route.textContent = t.route;
    if (status) status.textContent = t.status;

    if (details) details.classList.remove("hidden");

}


// ============================
// RENDER USERS TABLE
// ============================

function renderUsers() {

    const tbody = document.getElementById("userTableBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    users.forEach((user, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.contact}</td>
            <td><span class="role-badge ${user.role.toLowerCase()}">${user.role}</span></td>
            <td>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>
        `;

        tbody.appendChild(row);

    });

}


// ============================
// ADD USER
// ============================

function addUser() {

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const contact = document.getElementById("contact");
    const role = document.getElementById("role");

    if (!name || !email || !contact || !role) return;

    if (name.value === "" || email.value === "" || contact.value === "") {
        alert("Please fill all fields");
        return;
    }

    users.push({
        name: name.value,
        email: email.value,
        contact: contact.value,
        role: role.value
    });

    renderUsers();

    name.value = "";
    email.value = "";
    contact.value = "";
}


// ============================
// DELETE USER
// ============================

function deleteUser(index) {

    if (confirm("Delete this user?")) {

        users.splice(index, 1);

        renderUsers();

    }

}


// ============================
// LOGOUT
// ============================

function logout() {

    if (confirm("Are you sure you want to logout?")) {
        window.location.href = "index.html";
    }

}


// ============================
// AUTO LOAD USERS ON ACCOUNT PAGE
// ============================

document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("userTableBody")) {
        renderUsers();
    }

});