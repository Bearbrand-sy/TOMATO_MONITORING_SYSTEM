function logout() {
            if (confirm('Are you sure you want to logout?')) {
                 window.location.href="index.html"; 
              return;
            }
        }
    
function filterLogs() {
        const filter = document.getElementById("timeFilter").value;
            alert("Filter set to: " + filter);
          
        }


// ============================
// LOAD LOGGED-IN USER
// ============================
(function loadUser() {
    try {
        const raw = localStorage.getItem("loggedUser");
        if (!raw) return;
        const user = JSON.parse(raw);

        // Avatar: first letter of name
        document.getElementById("userAvatar").textContent =
            (user.name || "?").charAt(0).toUpperCase();

        // Name
        document.getElementById("userName").textContent = user.name || "Unknown";

        // Role with colour
        const roleEl = document.getElementById("userRole");
        const role   = (user.role || "").toLowerCase();
        roleEl.textContent  = user.role || "";
        roleEl.className    = "user-role role-" + role;

    } catch (e) { /* silently ignore parse errors */ }
})();
