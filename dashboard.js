function showSection(sectionId) {
        document.querySelectorAll('.main > .section').forEach(section => {
            section.classList.add('hidden');
        });
            document.getElementById(sectionId).classList.remove('hidden');
            document.querySelectorAll('.sidebar button').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
        }

function logout() {
            if (confirm('Are you sure you want to logout?')) {
                 window.location.href="index.html"; 
              return;
            }
        }