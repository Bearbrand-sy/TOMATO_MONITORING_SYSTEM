const transportData = {
    1: { temp: "26°C", hum: "52%", vent: "ON",  product: "Tomatoes", route: "Manolo Farm → CDO Market",   status: "Safe"    },
    2: { temp: "30°C", hum: "60%", vent: "OFF", product: "Tomatoes", route: "Manolo Farm → Davao Market", status: "Warning" }
};

const users = [
    { name: "Sander",        email: "admin",          contact: "+63 900 000 0005", role: "Admin"   },
    { name: "Manager User",  email: "manager",        contact: "+63 900 000 0002", role: "Manager" },
    { name: "Regular User",  email: "user@email.com", contact: "+63 900 000 0003", role: "User"    }
];

function updateTransport() {
    const id = document.getElementById("transpo").value;
    if (!id) return;

    const t = transportData[id];

    document.getElementById("temperature").textContent = t.temp;
    document.getElementById("humidity").textContent    = t.hum;
    document.getElementById("ventilation").textContent = t.vent;

    document.getElementById("d-id").textContent      = "Transport " + id;
    document.getElementById("d-product").textContent = t.product;
    document.getElementById("d-route").textContent   = t.route;
    document.getElementById("d-status").textContent  = t.status;

    document.getElementById("details").classList.remove("hidden");
    document.getElementById("monitorContainer").classList.add("show");
    document.getElementById("details").classList.add("show");
}

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
        `;
        tbody.appendChild(row);
    });
}

function showSection(name, el) {
    // Hide all sections dynamically — works on any page
    document.querySelectorAll("[id^='section-']").forEach(sec => {
        sec.style.display = "none";
    });

    // Show the requested section
    const target = document.getElementById("section-" + name);
    if (target) target.style.display = "block";

    // Update active nav button
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    if (el) el.classList.add("active");

    // Render users table if needed
    if (name === "users") renderUsers();
}

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        window.location.href = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Auto-detect default section based on which one exists on the page
    const defaultSection = document.querySelector("[id^='section-']:not(#section-users)");
    if (defaultSection) {
        const name = defaultSection.id.replace("section-", "");
        const activeBtn = document.querySelector(".nav-btn.active");
        showSection(name, activeBtn);
    }
});