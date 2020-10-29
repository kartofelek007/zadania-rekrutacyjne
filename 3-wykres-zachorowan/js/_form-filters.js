import { formatZero } from "./_utility";
import { loadCharData } from "./_chart";

const form = document.querySelector("form");
const inputFrom = document.querySelector("#from");
const inputTo = document.querySelector("#to");
const d = new Date();

//ustawiam min i max dla inputów
//dzięki temu nie powinno się móc wybrać innych dat
inputFrom.min = `2020-01-01`;
inputFrom.max = `${d.getFullYear()}-${formatZero(d.getMonth()+1)}-${formatZero(d.getDay())}`;
inputTo.min = `2020-01-01`
inputTo.max = `${d.getFullYear()}-${formatZero(d.getMonth()+1)}-${formatZero(d.getDay())}`;

form.addEventListener("submit", e => {
    e.preventDefault();
    let dateFrom = inputFrom.value;
    let dateTo = inputTo.value;

    //sprawdź czy wartość w polach była poprawna
    if (isNaN(new Date(dateFrom))) dateFrom = "2020-01-01";
    if (isNaN(new Date(dateTo))) dateTo = "2020-12-31";

    //jeżeli data początkowa jest większa od końcowej zamień je
    if (new Date(dateFrom) > new Date(dateTo)) {
        [dateFrom, dateTo] = [dateTo, dateFrom];
        inputFrom.value = dateFrom;
        inputTo.value = dateTo;
    }

    //zamieniam na prawidłowy zapis
    dateFrom = new Date(dateFrom).toISOString();
    dateTo = new Date(dateTo).toISOString();

    //odejmuje godzinę bo jeżeli jest do równo obecnej daty to API
    //zwraca cały zakres od pierwszego dnia do ostatniego, zamiast w wybranym zakresie
    if (new Date(dateTo) > new Date()) {
        let d = new Date();
        d.setHours(d.getHours() - 1);
        dateTo = d.toISOString();
    }

    const citiesList = document.querySelector(".cities-list");
    const chk = citiesList.querySelectorAll("input");
    const names = [...chk].filter(el => el.checked).map(el => el.value)
    if (!names.length) {
        alert("Wybierz jakieś państwo");
    } else {
        loadCharData(names, dateFrom, dateTo);
    }
})

