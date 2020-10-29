import Chart from 'chart.js';
import { formatZero } from "./_utility";

const canvas = document.getElementById("myChart");
const ctx = canvas.getContext("2d");

//przy wybraniu nowych danych (filtrowaniu) generuję na nowo
//obiekt opcji i ustawiam go jako data wykresu (64, 112)
function newCharOptionsData() {
    return {
        labels : [],
        datasets: []
    }
}

const colors = [
    "229,58,64",
    "88,201,185",
    "48,169,222",
    "239,220,5",
    "255,188,66",
    "79,176,198",
    "132,177,237",
    "198,81,70",
    "212,223,230",
    "53,56,102",
    "249,192,12",
    "242,109,91",
    "255,201,82",
    "249,78,63",
    "119,145,157",
    "249,161,27",
    "237,229,116",
    "203,232,107",
    "73,10,61",
    "214,42,157",
    "31,78,95",
    "58,197,105",
    "241,64,75",
    "3,166,255",
]

const myChart = new Chart(ctx, {
    type: 'line',
    scales: {
        xAxes: [{
            type: 'time'
        }]
    },
    options: {
        legend: {
            position: "top",
            align: "start",
        },
        maintainAspectRatio: false,
        // responsive: false,
        aspectRatio: 1,

        tooltips: {
            mode: 'index',
            itemSort: (a, b, data) => b.yLabel - a.yLabel
        },
    },
    data : newCharOptionsData()
});

export async function loadData(name="poland", from="2020-01-01T00:00:00Z", to="2020-12-30T00:00:00Z") {
    const xhr = await fetch(`https://api.covid19api.com/country/${name}/status/confirmed?from=${from}&to=${to}`);
    if (xhr.ok) {
        const data = await xhr.json();
        return data
    } else {
        return Promise.reject(xhr.status);
    }
}

export async function loadCharData(names, from, to, color, colorBg) {
    let loadedData = "";
    try {
        loadedData = await Promise.all(names.map(el => loadData(el, from, to)));
        const newData = newCharOptionsData();

        loadedData[0].forEach(el => {
            const date = new Date(el.Date);
            newData.labels.push(`${date.getUTCFullYear()}-${formatZero(date.getMonth()+1)}-${formatZero(date.getDate())}`)
        })

        loadedData.forEach((country, i) => {
            if (country.length) {
                const h = Math.floor(Math.random()*360);
                const color = `rgb(${colors[i]}, 1)`;

                const data = country.map(el => ({
                    t : el.Date,
                    y : el.Cases
                }));

                const dataset = {
                    label : country[0].Country,
                    backgroundColor : color,
                    borderColor : color,
                    fill: false,
                    pointRadius: 2,
                    borderWidth: 1,
                    data : data
                }

                newData.datasets.push(dataset);
            }
        })

        myChart.data = newData;
        myChart.update();
    } catch(err) {
        if (err === 429) {
            alert("Api zwróciło błąd: zbyt dużo zapytań na raz. Odczekaj chwilę i spróbuj jeszcze raz, lub zmniejsz liczbę wybranych państw")
        } else {
            alert("Wystąpiła błąd: " + err);
        }
    }
}

loadCharData(["poland"]);