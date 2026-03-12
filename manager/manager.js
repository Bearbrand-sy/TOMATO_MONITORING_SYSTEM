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
// TRANSPORT DATA
// ============================
const transportData = {
    1: {
        id: "TR-001",
        product: "Tomatoes",
        route: "Farm → Davao Market",
        status: "In Transit",
        tempMin: 15,
        tempMax: 30,
        humidityMin: 50,
        humidityMax: 60
    },
    2: {
        id: "TR-002",
        product: "Lettuce",
        route: "Farm → Cold Storage",
        status: "Arrived",
        tempMin: 10,
        tempMax: 20,
        humidityMin: 60,
        humidityMax: 75
    }
};

let monitorInterval = null;

// ============================
// UPDATE TRANSPORT
// ============================
function updateTransport() {
    const selected = document.getElementById("transpo").value;

    if (!selected) {
        stopMonitoring();
        return;
    }

    const data = transportData[selected];

    // show details section
    document.getElementById("details").classList.remove("hidden");

    // update transport info
    document.getElementById("d-id").innerText = data.id;
    document.getElementById("d-product").innerText = data.product;
    document.getElementById("d-route").innerText = data.route;
    document.getElementById("d-status").innerText = data.status;

    // start updating sensor values
    startMonitoring(data);
}

// ============================
// START MONITORING
// ============================
function startMonitoring(data) {
    if (monitorInterval) clearInterval(monitorInterval);

    // update immediately
    updateSensors(data);

    // then every 5 seconds
    monitorInterval = setInterval(() => {
        updateSensors(data);
    }, 5000);
}

// ============================
// UPDATE SENSOR VALUES
// ============================
function updateSensors(data) {
    const humidity = random(data.humidityMin - 5, data.humidityMax + 5);
    const temperature = random(data.tempMin - 5, data.tempMax + 5);

    document.getElementById("humidity").innerText = humidity + "%";
    document.getElementById("temperature").innerText = temperature + "°C";

    // ventilation auto ON if temp exceeds max
    const ventilation = temperature > data.tempMax ? "ON" : "OFF";
    document.getElementById("ventilation").innerText = ventilation;

    // apply warning colors
    applyWarnings(humidity, temperature, data);
}

// ============================
// STOP MONITORING
// ============================
function stopMonitoring() {
    clearInterval(monitorInterval);

    document.getElementById("humidity").innerText = "--%";
    document.getElementById("temperature").innerText = "--°C";
    document.getElementById("ventilation").innerText = "--";

    // hide details
    document.getElementById("details").classList.add("hidden");
}

// ============================
// RANDOM NUMBER GENERATOR
// ============================
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ============================
// WARNING COLORS
// ============================
function applyWarnings(humidity, temperature, data) {
    const tempEl = document.getElementById("temperature");
    const humEl = document.getElementById("humidity");

    tempEl.style.color = (temperature > data.tempMax || temperature < data.tempMin) ? "red" : "lime";
    humEl.style.color = (humidity > data.humidityMax || humidity < data.humidityMin) ? "red" : "lime";
}