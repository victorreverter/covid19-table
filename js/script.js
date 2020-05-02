// Access to the Globa Data

const GLOBAL_URL = 'https://api.covid19api.com/summary';

axios.get(GLOBAL_URL)
    .then(response => {
        // Global Data Call
        globalData(response.data);

        // Date Call
        dateConfig(response.data.Date);

        // Filter Data Table

        // console.log(response.data);

        const SEARCH_INPUT = document.querySelector('#search');
        const SEARCH_BTN = document.querySelector('.icon-search');
        const COUNTRIES_DATA_SEARCH = response.data.Countries;
        const TBODY_SELECTOR_FILTER = document.querySelector('#allCountry table tbody');

        // Search by Input
        SEARCH_INPUT.addEventListener("input", function () {
            // console.log(SEARCH_INPUT.value);

            if (SEARCH_INPUT.value === '') {
                sortTable(response.data.Countries, "TotalConfirmed");
            } else {
                // console.log(SEARCH_INPUT.value);
                executeSearch();
            }
        });

        // Search by Click
        SEARCH_BTN.addEventListener("click", function () {
            executeSearch();
        });

        // Search by Enter key
        SEARCH_INPUT.addEventListener("keypress", function (event) {
            if (event.key === 'Enter') {
                // console.log("dede");
                executeSearch();
            }
        });

        function executeSearch() {
            console.log(SEARCH_INPUT.value);

            COUNTRIES_DATA_SEARCH.filter(function (item) {
                if (SEARCH_INPUT.value === item.Country) {

                    // console.log(item);

                    TBODY_SELECTOR_FILTER.innerHTML = '<tr id="' + item.Slug + '">' +
                        '<td class="country">' + item.Country + '</td>' +
                        '<td>' + item.NewConfirmed + '</td>' +
                        '<td>' + item.TotalConfirmed + '</td>' +
                        '<td class="n-deaths">' + item.NewDeaths + '</td>' +
                        '<td class="t-deaths">' + item.TotalDeaths + '</td>' +
                        '<td>' + item.NewRecovered + '</td>' +
                        '<td>' + item.TotalRecovered + '</td>' +
                        // '<td class="more"></td>' +
                        '</tr>';
                };
            });
        }

        // Sort by Default (Total Confirmed)

        sortTable(response.data.Countries, "TotalConfirmed");

        // Sort by New Confirmed

        const NEW_CONFIRMED_SORT = document.querySelector("#newConfirmed");

        NEW_CONFIRMED_SORT.addEventListener("click", function () {

            const HEAD_VAL = document.querySelector('#newConfirmed');

            removeHeadClass("th-selected"); // remove precedent class selection
            HEAD_VAL.classList.add("th-selected"); // add class selection

            sortTable(response.data.Countries, "NewConfirmed");
        });

        // Sort by Total Confirmed

        const TOTAL_CONFIRMED_SORT = document.querySelector("#totalConfirmed");

        TOTAL_CONFIRMED_SORT.addEventListener("click", function () {

            const HEAD_VAL = document.querySelector('#totalConfirmed');

            removeHeadClass("th-selected"); // remove precedent class selection
            HEAD_VAL.classList.add("th-selected"); // add class selection

            sortTable(response.data.Countries, "TotalConfirmed");
        });

        // Sort by New Deaths

        const NEW_DEATHS_SORT = document.querySelector("#newDeaths");

        NEW_DEATHS_SORT.addEventListener("click", function () {

            const HEAD_VAL = document.querySelector('#newDeaths');

            removeHeadClass("th-selected"); // remove precedent class selection
            HEAD_VAL.classList.add("th-selected"); // add class selection

            sortTable(response.data.Countries, "NewDeaths");
        });

        // Sort by Total Deaths

        const TOTAL_DEATHS_SORT = document.querySelector("#totalDeaths");

        TOTAL_DEATHS_SORT.addEventListener("click", function () {

            const HEAD_VAL = document.querySelector('#totalDeaths');

            removeHeadClass("th-selected"); // remove precedent class selection
            HEAD_VAL.classList.add("th-selected"); // add class selection

            sortTable(response.data.Countries, "TotalDeaths");
        });

        // Sort by New Recovered

        const NEW_RECOVERED_SORT = document.querySelector("#newRecovered");

        NEW_RECOVERED_SORT.addEventListener("click", function () {

            const HEAD_VAL = document.querySelector('#newRecovered');

            removeHeadClass("th-selected"); // remove precedent class selection
            HEAD_VAL.classList.add("th-selected"); // add class selection

            sortTable(response.data.Countries, "NewRecovered");
        });

        // Sort by Total Recovered

        const TOTAL_RECOVERED_SORT = document.querySelector("#totalRecovered");

        TOTAL_RECOVERED_SORT.addEventListener("click", function () {

            const HEAD_VAL = document.querySelector('#totalRecovered');

            removeHeadClass("th-selected"); // remove precedent class selection
            HEAD_VAL.classList.add("th-selected"); // add class selection

            sortTable(response.data.Countries, "TotalRecovered");
        });


    });

// UPDATE GLOBAL DATA ----------------------------------

function globalData(covidData) {
    // console.log(response);

    // const covidData = response.data;
    const COVID_GLOBAL_DATA = covidData.Global;
    const COVID_DATA_DATE = covidData.Date;

    // console.log(covidData);
    // console.log(COVID_GLOBAL_DATA);

    const NEW_CONFIRMED = document.querySelector('#new-confirmed h2');
    const TOTAL_CONFIRMED = document.querySelector('#total-confirmed h2');
    const NEW_DEATHS = document.querySelector('#new-deaths h2');
    const TOTAL_DEATHS = document.querySelector('#total-deaths h2');
    const NEW_RECOVERED = document.querySelector('#new-recovered h2');
    const TOTAL_RECOVERED = document.querySelector('#total-recovered h2');

    // console.log(`+ ${COVID_GLOBAL_DATA.NewConfirmed}`);
    // console.log(COVID_GLOBAL_DATA.TotalConfirmed);
    // console.log(`+ ${COVID_GLOBAL_DATA.NewDeaths}`);
    // console.log(COVID_GLOBAL_DATA.TotalDeaths);
    // console.log(`+ ${COVID_GLOBAL_DATA.NewRecovered}`);
    // console.log(COVID_GLOBAL_DATA.TotalRecovered);

    NEW_CONFIRMED.innerText = `+ ${COVID_GLOBAL_DATA.NewConfirmed}`;
    TOTAL_CONFIRMED.innerText = COVID_GLOBAL_DATA.TotalConfirmed;
    NEW_DEATHS.innerText = `+ ${COVID_GLOBAL_DATA.NewDeaths}`;
    TOTAL_DEATHS.innerText = COVID_GLOBAL_DATA.TotalDeaths;
    NEW_RECOVERED.innerText = `+ ${COVID_GLOBAL_DATA.NewRecovered}`;
    TOTAL_RECOVERED.innerText = COVID_GLOBAL_DATA.TotalRecovered;
}

// LAST UPDATE -----------------------------------------

function dateConfig(date) {
    let dateArr = [];
    dateArr = date.split("");

    // console.log(date);
    // console.log(dateArr);

    const dateUpdate = document.querySelector("#last-update span");
    const monthData = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const monthUpdate = Number(dateArr[5] + dateArr[6]);
    const dayUpdate = Number(dateArr[8] + dateArr[9]);
    const timeUpdate = dateArr[11] + dateArr[12] + dateArr[13] + dateArr[14] + dateArr[15];
    // console.log(monthData[monthUpdate - 1]);

    // console.log(`${monthData[monthUpdate - 1]} ${dayUpdate} - ${timeUpdate}`);

    dateUpdate.innerText = `${monthData[monthUpdate - 1]} ${dayUpdate} - ${timeUpdate}`;

}

// REMOVE SELECTED TABLE HEAD OPTION -------------------

function removeHeadClass(classVal) {
    const ALL_TH = document.querySelectorAll('thead tr th');

    // console.log(ALL_TH);

    for (let i = 0; i < ALL_TH.length; i++) {
        const element = ALL_TH[i];
        element.classList.remove(classVal);
    }
}

// SORT THE TABLE ---------------------------------------

function sortTable(countries, compareVal) {
    const COUNTRIES_DATA = countries;
    const TBODY_SELECTOR = document.querySelector('#allCountry table tbody');

    // var countriesDataSorted = [];

    // console.log(compareVal);
    // console.log("boom");

    COUNTRIES_DATA.sort((valOne, valTwo) => {
        // console.log(a.TotalConfirmed);
        // console.log(valOne);
        // console.log(valOne.TotalConfirmed);
        // console.log(valOne["TotalConfirmed"]);

        if (valOne[compareVal] < valTwo[compareVal]) {
            return 1
        } else {
            return -1
        }
    });


    // console.log(COUNTRIES_DATA);

    TBODY_SELECTOR.innerHTML = '';

    COUNTRIES_DATA.map((item) => {
        TBODY_SELECTOR.innerHTML += '<tr id="' + item.Slug + '">' +
            '<td class="country">' + item.Country + '</td>' +
            '<td>' + item.NewConfirmed + '</td>' +
            '<td>' + item.TotalConfirmed + '</td>' +
            '<td class="n-deaths">' + item.NewDeaths + '</td>' +
            '<td class="t-deaths">' + item.TotalDeaths + '</td>' +
            '<td>' + item.NewRecovered + '</td>' +
            '<td>' + item.TotalRecovered + '</td>' +
            // '<td class="more"></td>' +
            '</tr>';
    })
}

// ======================================================

// DATA PER COUNTRY SHOWCASE

const TBODY_COUNTRIES = document.querySelector('#countries-bar');

const SECTION_COUNTRIES = document.querySelector('#allCountry');
const SECTION_COUNTRY = document.querySelector('#specificCountry');

TBODY_COUNTRIES.addEventListener('click', function (event) {

    var slugSearch = event.target.parentNode.id;
    // var countryText = event.target.parentNode.children[0].innerText;
    // var countryAdaptedSearch = countryText.replace(/ /g, '-').toLowerCase(); // Convert country from United States to united-states

    // console.log(event.target);
    // console.log(event.target.parentNode);
    // console.log(event.target.parentNode.id);
    // console.log(event.target.parentNode.children[0]);
    // console.log(event.target.parentNode.children[0].innerText);

    // event.target.parentNode.style = "background: red";

    // NO APPLICATION ERROR API DATA GIVEN =================================

    // SECTION_COUNTRIES.style = 'display: none';
    // SECTION_COUNTRY.style = 'display: block';

    // console.log(countryText);
    // console.log(countryAdaptedSearch);

    // SEARCH DATA BY COUNTRIES ===========================================

    const SEARCH_BY_COUNTRY = `https://api.covid19api.com/dayone/country/${slugSearch}`;

    console.log(SEARCH_BY_COUNTRY);

    specificSearch(SEARCH_BY_COUNTRY);
});

// COUNTRY SPECIFIC DATA

function specificSearch(url) {
    // console.log('Executed ' + url);
    // const REQUESTED = axios.get(url);

    axios.get(url).then(response => {
        // console.log('Executed');
        const COUNTRY_SPECIFIC_DATA = response.data;
        console.log(COUNTRY_SPECIFIC_DATA);
    });
}

// axios.get('https://api.covid19api.com/dayone/country/italy').then(response => {
//     console.log('Executed');
//     console.log(response);
// });

// CLOSE SECTION 2

const CLOSE_SECTION_TWO = document.querySelector('#closeSpecific');

CLOSE_SECTION_TWO.addEventListener('click', function () {
    SECTION_COUNTRY.style = 'display: none';
    SECTION_COUNTRIES.style = 'display: block';
})