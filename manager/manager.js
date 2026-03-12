// ============================
// LOGOUT
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
    1: { id: "TR-001", product: "Tomatoes", route: "Farm → Davao Market",   status: "In Transit", tempMin: 15, tempMax: 30, humidityMin: 50, humidityMax: 60 },
    2: { id: "TR-002", product: "Lettuce",  route: "Farm → Cold Storage",   status: "Arrived",    tempMin: 10, tempMax: 20, humidityMin: 60, humidityMax: 75 }
};

let monitorInterval = null;
let currentData = null;

// ============================
// UPDATE TRANSPORT (called by select)
// ============================
function updateTransport() {
    const selected = document.getElementById("transpo").value;

    stopMonitoring();               // always clear first

    if (!selected) {
        showIdle();
        return;
    }

    currentData = transportData[selected];
    showMonitor(currentData);
    startMonitoring(currentData);
}

// ============================
// SHOW / HIDE STATES
// ============================
function showIdle() {
    document.getElementById("idleState").classList.remove("hidden");
    document.getElementById("cardGrid").classList.add("hidden");
    document.getElementById("details").classList.add("hidden");
    document.getElementById("alertBar").classList.remove("show");
    document.getElementById("liveDot").classList.remove("active");
}

function showMonitor(data) {
    document.getElementById("idleState").classList.add("hidden");
    document.getElementById("cardGrid").classList.remove("hidden");
    document.getElementById("details").classList.remove("hidden");
    document.getElementById("liveDot").classList.add("active");

    // populate details
    document.getElementById("d-id").textContent      = data.id;
    document.getElementById("d-product").textContent = data.product;
    document.getElementById("d-route").textContent   = data.route;

    const statusEl = document.getElementById("d-status");
    const isTransit = data.status === "In Transit";
    statusEl.innerHTML = `<span class="badge ${isTransit ? 'transit' : 'arrived'}">${data.status}</span>`;
}

// ============================
// START / STOP MONITORING
// ============================
function startMonitoring(data) {
    updateSensors(data);                              // immediate first read
    monitorInterval = setInterval(() => updateSensors(data), 4000);
}

function stopMonitoring() {
    if (monitorInterval) {
        clearInterval(monitorInterval);
        monitorInterval = null;
    }
    // reset card values
    document.getElementById("humidity").textContent    = "--";
    document.getElementById("temperature").textContent = "--";
    document.getElementById("ventilation").textContent = "--";
    ["card-humidity","card-temp","card-vent"].forEach(id => {
        const el = document.getElementById(id);
        el.classList.remove("ok","warn");
    });
    ["humidity","temperature","ventilation"].forEach(id => {
        document.getElementById(id).className = "card-value";
    });
}

// ============================
// UPDATE SENSOR VALUES
// ============================
function updateSensors(data) {
    const humidity    = random(data.humidityMin - 6, data.humidityMax + 6);
    const temperature = random(data.tempMin - 5,    data.tempMax + 5);
    const ventOn      = temperature > data.tempMax;

    // Humidity
    const humOk = humidity >= data.humidityMin && humidity <= data.humidityMax;
    setCard("card-humidity", "humidity", humidity + "%", humOk,
        humOk ? `Safe range ${data.humidityMin}–${data.humidityMax}%` : "⚠ Out of range!");

    // Temperature
    const tempOk = temperature >= data.tempMin && temperature <= data.tempMax;
    setCard("card-temp", "temperature", temperature + "°C", tempOk,
        tempOk ? `Safe range ${data.tempMin}–${data.tempMax}°C` : "⚠ Out of range!");

    // Ventilation
    setCard("card-vent", "ventilation", ventOn ? "ON" : "OFF", !ventOn,
        ventOn ? "Auto-triggered" : "Standby");

    // Global alert
    const anyWarn = !humOk || !tempOk;
    document.getElementById("alertBar").classList.toggle("show", anyWarn);
}

function setCard(cardId, valueId, value, isOk, statusText) {
    const card  = document.getElementById(cardId);
    const valEl = document.getElementById(valueId);

    card.classList.remove("ok","warn");
    card.classList.add(isOk ? "ok" : "warn");

    valEl.textContent = value;
    valEl.className   = "card-value " + (isOk ? "ok" : "warn");

    const statusEl = card.querySelector(".card-status");
    if (statusEl) statusEl.textContent = statusText;
}

// ============================
// HELPERS
// ============================
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}