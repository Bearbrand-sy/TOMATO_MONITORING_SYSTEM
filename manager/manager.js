// ============================
// LOAD LOGGED-IN USER
// ============================

(function loadUser() {
    try {
        const raw = localStorage.getItem("loggedUser");
        if (!raw) return;

        const user = JSON.parse(raw);

        // Avatar
        document.getElementById("userAvatar").textContent =
            (user.name || "?").charAt(0).toUpperCase();

        // Name
        document.getElementById("userName").textContent = user.name || "Unknown";

        // Role
        const roleEl = document.getElementById("userRole");
        const role = (user.role || "").toLowerCase();

        roleEl.textContent = user.role || "";
        roleEl.className = "user-role role-" + role;

    } catch (e) {
        console.error("User load error:", e);
    }
})();


// ============================
// LOGOUT
// ============================

function logout(){

if(confirm("Are you sure you want to logout?")){

localStorage.removeItem("loggedUser");

window.location.href="../index.html";

}

}



// Manolo Fortich → CDO Market
const start = [8.3697, 124.8647]; // Manolo Fortich Farm
const end = [8.4822, 124.6475];   // CDO Market

const map = L.map('map').setView(start, 10);


// MAP TILES

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{

attribution:'© OpenStreetMap'

}).addTo(map);


// MARKERS

L.marker(start).addTo(map).bindPopup("Manolo Farm");

L.marker(end).addTo(map).bindPopup("CDO Market");


// ROUTE LINE

fetch(`https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`)

.then(res=>res.json())

.then(data=>{

const route=data.routes[0].geometry;

L.geoJSON(route,{

style:{
color:"#22c55e",
weight:5
}

}).addTo(map);

});