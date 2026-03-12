// ============================
// LOGOUT FUNCTION
// ============================

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("loggedUser");
        window.location.href = "../index.html";
    }
}


// ============================
// USER DATA
// ============================

const users = [
    { name: "Manager User",  email: "manager",        contact: "+63 900 000 0002", role: "Manager" },
    { name: "Regular User",  email: "user@email.com", contact: "+63 900 000 0003", role: "User" }
];


// ============================
// RENDER USERS TABLE
// ============================

function renderUsers() {

    const tbody = document.getElementById("userTableBody");

    // Prevent errors if table doesn't exist on this page
    if (!tbody) return;

    tbody.innerHTML = "";

    users.forEach((user, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.contact}</td>
            <td>
                <span class="role-badge ${user.role.toLowerCase()}">
                    ${user.role}
                </span>
            </td>
        `;

        tbody.appendChild(row);

    });

}


// ============================
// AUTO LOAD USERS IF TABLE EXISTS
// ============================

document.addEventListener("DOMContentLoaded", function () {
    renderUsers();
});