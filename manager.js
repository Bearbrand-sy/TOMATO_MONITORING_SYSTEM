
function logout() {
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", renderUsers);

function showSection(name) {
    document.getElementById("section-monitoring").style.display = name === "monitoring" ? "block" : "none";
    document.getElementById("section-users").style.display     = name === "users"      ? "block" : "none";

    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
}

const users = [
    { name: "Manager User",  email: "manager",       contact: "+63 900 000 0002", role: "Manager" },
    { name: "Regular User",  email: "user@email.com",contact: "+63 900 000 0003", role: "User" }
];

function renderUsers() {
    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";

    users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.contact}</td>
            <td><span class="role-badge ${user.role.toLowerCase()}">${user.role}</span></td>
        `;
        tbody.appendChild(row);
    });
}
