const transportData = {
    1: { temp: "26°C", hum: "52%", vent: "ON",  product: "Tomatoes", route: "Manolo → CDO",    status: "Safe" },
    2: { temp: "30°C", hum: "60%", vent: "OFF", product: "Tomatoes", route: "Manolo → Davao", status: "Warning" },
    3: { temp: "22°C", hum: "48%", vent: "ON",  product: "Tomatoes", route: "Manolo → Gensan", status: "Safe" }
};

function updateTransport() {
    const id = document.getElementById("transpo").value;
    if (!id) return;

    const t = transportData[id];

    document.getElementById("temperature").textContent = t.temp;
    document.getElementById("humidity").textContent = t.hum;
    document.getElementById("ventilation").textContent = t.vent;

    document.getElementById("d-id").textContent = "Transport " + id;
    document.getElementById("d-product").textContent = t.product;
    document.getElementById("d-route").textContent = t.route;
    document.getElementById("d-status").textContent = t.status;

    document.getElementById("details").classList.remove("hidden");
}

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        window.location.href = "index.html";
    }
}
