function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = "index.html";
    }
}

function filterTransport() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const timeFilter = document.getElementById('timeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const table = document.getElementById('transportBody');
    const rows = table.getElementsByTagName('tr');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const text = row.textContent.toLowerCase();
        const dateStr = row.getAttribute('data-date');
        const status = row.getAttribute('data-status');
        
        const matchesSearch = text.includes(searchInput);
        
        let matchesTime = true;
        if (timeFilter !== 'all' && dateStr) {
            const rowDate = new Date(dateStr);
            rowDate.setHours(0, 0, 0, 0);
            
            const diffTime = today - rowDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (timeFilter === 'daily') {
                matchesTime = diffDays === 0;
            } else if (timeFilter === 'weekly') {
                matchesTime = diffDays <= 7;
            } else if (timeFilter === 'monthly') {
                matchesTime = diffDays <= 30;
            }
        }
        
        const matchesStatus = statusFilter === 'all' || status === statusFilter;
        if (matchesSearch && matchesTime && matchesStatus) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

function viewDetails(transportId) {
    const modal = document.getElementById('detailsModal');
    const modalBody = document.getElementById('modalBody');
    
    const details = {
        'TR-001': {
            id: 'TR-001',
            date: '2026-02-05',
            plant: 'Tomato',
            origin: 'Manolo Farm',
            destination: 'CDO Market',
            temperature: '26°C',
            humidity: '52%',
            status: 'Delivered',
            driver: 'Juan Dela Cruz',
            vehicle: 'Truck-101'
        },
        'TR-002': {
            id: 'TR-002',
            date: '2026-02-05',
            plant: 'Tomato',
            origin: 'Manolo Farm',
            destination: 'Davao Market',
            temperature: '30°C',
            humidity: '60%',
            status: 'In Transit',
            driver: 'Pedro Santos',
            vehicle: 'Truck-205'
        }
    };
    
    const data = details[transportId] || details['TR-001'];
    
    modalBody.innerHTML = `
        <div class="detail-row">
            <span class="detail-label">Transport ID:</span>
            <span class="detail-value">${data.id}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Date:</span>
            <span class="detail-value">${data.date}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Plant Name:</span>
            <span class="detail-value">${data.plant}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Origin:</span>
            <span class="detail-value">${data.origin}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Destination:</span>
            <span class="detail-value">${data.destination}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Temperature:</span>
            <span class="detail-value">${data.temperature}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Humidity:</span>
            <span class="detail-value">${data.humidity}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Status:</span>
            <span class="detail-value"><span class="status-${data.status.toLowerCase().replace(' ', '-')}">${data.status}</span></span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Driver:</span>
            <span class="detail-value">${data.driver}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Vehicle:</span>
            <span class="detail-value">${data.vehicle}</span>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('detailsModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('detailsModal');
    if (event.target === modal) {
        closeModal();
    }
}