const cityTitle = document.querySelector("#cities-list-title");
const citiesList = document.querySelector(".cities-list");

//tylko wybrane państwa, ponieważ część zwraca
//zniekształcone lub puste dane
const countriesArr = [
    {name: "Germany", slug : 'germany'},
    {name: "France", slug : 'france'},
    {name: "Poland", slug: "poland"},
    {name: "Slovakia", slug: "Slovakia"},
    {name: "Slovenia", slug: "Slovenia"},
    {name: "Greece", slug: "Greece"},
    {name: "Belgium", slug: "Belgium"},
    {name: "Brazil", slug: "Brazil"},
    {name: "Bulgaria", slug: "Bulgaria"},
    {name: "Croatia", slug: "Croatia"},
    {name: "Denmark", slug: "Denmark"},
    {name: "czech-republic", slug: "czech-republic"},
    {name: "India", slug: "india"},
    {name: "Japan", slug: "japan"},
    {name: "Italy", slug: "italy"},
    {name: "Portugal", slug: "portugal"},
    {name: "Romania", slug: "romania"},
    {name: "Serbia", slug: "serbia"},
    {name: "Spain", slug: "spain"},
    {name: "Swaziland", slug: "swaziland"},
    {name: "Sweden", slug: "Sweden"},
    {name: "Switzerland", slug: "switzerland"},
    {name: "Turkey", slug: "turkey"},
    {name: "Ukraine", slug: "ukraine"},
    {name: "United Kingdom", slug: "united-kingdom"},
]

function generateCountriesCheckboxesList() {
    countriesArr.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    countriesArr.forEach(el => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" value="${el.slug}" ${el.slug==="poland"?"checked":""}> ${el.name}`;
        citiesList.append(label);
    })

    const chk = citiesList.querySelectorAll("input");
    chk.forEach(el => {
        el.addEventListener("click", el => {
            const count = [...chk].filter(el => el.checked).length;
            cityTitle.innerText = `Państwa (${count})`;
        });
    })
}

generateCountriesCheckboxesList();