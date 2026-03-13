document.addEventListener("DOMContentLoaded", function () {

const rows = document.querySelectorAll("#logsBody tr");

let safe = 0;
let warning = 0;

rows.forEach(row => {

const status = row.cells[5].innerText;

if(status === "Safe"){
safe++;
}

if(status === "Warning"){
warning++;
}

});

const ctx = document.getElementById("logsChart");

new Chart(ctx, {

type: "pie",

data: {
labels: ["Safe", "Warning"],

datasets: [{
data: [safe, warning],

backgroundColor: [
"#4CAF50",
"#FF9800"
]
}]
},

options: {
responsive: true,

plugins: {
legend: {
position: "bottom"
}
}

}

});

});
