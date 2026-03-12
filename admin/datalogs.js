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