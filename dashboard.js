function showSection(sectionId) {
        document.querySelectorAll('.main > .nav-section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(sectionId).classList.remove('hidden');

        document.querySelectorAll('.sidebar button').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
}


const transportData = {
        1: { temp: "26°C", hum: "52%", vent: "ON", route: "Manolo Farm → CDO Market", status: "Safe" },
        2: { temp: "30°C", hum: "60%", vent: "OFF", route: "Manolo Farm → Davao Market", status: "Warning" },
        3: { temp: "22°C", hum: "48%", vent: "ON", route: "Manolo Farm → General Santos Market", status: "Safe" }
};

function updateTransport() {
        const id = document.getElementById("transpo").value;
            if (!id) return;

        const t = transportData[id];

        document.getElementById("temperature").textContent = t.temp;
        document.getElementById("humidity").textContent = t.hum;
        document.getElementById("ventilation").textContent = t.vent;

        
        document.getElementById("d-id").textContent = "Transport " + id;
        document.getElementById("d-route").textContent = t.route;
        document.getElementById("d-status").textContent = t.status;

        document.getElementById("details").classList.remove("hidden");
        document.getElementById("monitorContainer").classList.add("show");
        document.getElementById("details").classList.add("show");
}

function logout() {
            if (confirm('Are you sure you want to logout?')) {
                 window.location.href="index.html"; 
              return;
            }
        }