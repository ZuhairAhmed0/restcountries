const main = document.querySelector('.main .contianer');
const mainBack = document.querySelector('.main .backIn');
const nav = document.querySelector('nav');
const inpShearch = document.querySelector('.search input');
const btnShearch = document.querySelector('.search button');
const regions = document.querySelectorAll('.filterByRegion li');
const mode = document.querySelector('.mode');
//https://restcountries.eu/rest/v2/all
//https://restcountries.eu/rest/v2/all?fields=name;population;region;capital

const loadDataSudan = async function () {
    const url = 'https://restcountries.eu/rest/v2/name/sudan?fields=name;population;region;capital;flag';
    const response = await fetch(url);
    const data = await response.json();
    update(data);
}
loadDataSudan();
const loadData = async function () {
    const url = 'https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag';
    const response = await fetch(url);
    const data = await response.json();
    update(data);
}
loadData();

btnShearch.addEventListener('click', async function () {
    let countryName = inpShearch.value;
    const url = `https://restcountries.eu/rest/v2/name/${countryName}`;
    const response = await fetch(url);
    const data = await response.json();
    if (countryName != '') {
        main.innerHTML = '';
        inpShearch.value = '';
        update(data);
    }
    
})

mainBack.addEventListener('click', function () {
    $('.back').click(async function () {
        main.innerHTML = '';
        loadData();
        loadDataSudan();
        $(function () {
            $(nav).show(700);
            $('.back').hide()
        });
    })
},true)

regions.forEach(function (region) {
    region.addEventListener('click', async function () {
        const url = `https://restcountries.eu/rest/v2/region/${region.textContent}`;
        const response = await fetch(url);
        const data = await response.json();
        main.innerHTML = '';
        update(data);
        $(function () {
            $('.filterByRegion').slideUp(700);
        });
    })
},true)

$(function() {
   $('.filter').click(function() {
      $('.filterByRegion').slideToggle(700);
   })

   function drakMode() {
      $('.mode').click(function() {
         $('*').css("transition", "background-color .5s linear")
         $('.bg-white, header').toggleClass('drak-mode')
         $('body').toggleClass('drak-body')
         $('.contianer, .search button, .search input').toggleClass('drak-contianer')
      })
   }
   setTimeout(drakMode,3000)
   
});

function update(data) {
    for (let i = 0; i <= data.length; i++) {
        main.innerHTML += 
        `<div class="country bg-white" data-delails="${data[i].name}">
            <img src="${data[i].flag}" alt="flag ${i}" />
            <div class="info">
                <h4>${data[i].name}</h4>
                <p>
                    <strong>Population: </strong>
                    <small>${new Intl.NumberFormat('en-SD')
                    .format(data[i].population)}
                    </small>
                </p>
                <p>
                    <strong>Region: </strong>
                    <small>${data[i].region}</small>
                </p>
                <p>
                    <strong>Capital: </strong>
                    <small>${data[i].capital}</small>
                </p>
            </div>
        </div>
        `
        if (i > 8) break;
    }
}

main.addEventListener('click', function (e) {
    $('.country').click(async function () {
        const url = `https://restcountries.eu/rest/v2/name/${this.dataset.delails}?fullText=true`;
        const response = await fetch(url);
        const allData= await response.json();
        const data = allData[0]
        $(function () {
            $(nav).hide(700);
        });
        let lang = [];
       data.languages.forEach(item => {
           lang.push(item.name);
        })
        mainBack.innerHTML = '<button class="back bg-white"><i class="fa fa-arrow-left"></i>back</button>'
        main.innerHTML =
        `<div class="country delails bg-white">
            <img src="${data.flag}" alt="" />
            <div class="info">
                <h4>${data.name}</h4>
                <p>
                    <strong>nativeName: </strong>
                    <small>${data.nativeName}</small>
                </p>
                <p>
                    <strong>Population: </strong>
                    <small>${new Intl.NumberFormat('en-SD')
                    .format(data.population)}
                    </small>
                </p>
                <p>
                    <strong>Region: </strong>
                    <small>${data.region}</small>
                </p>
                <p>
                    <strong>Sub Region: </strong>
                    <small>${data.subregion}</small>
                </p>
                <p>
                    <strong>Capital: </strong>
                    <small>${data.capital}</small>
                </p>
                <br>
                <p>
                    <strong>Top LevelDomain: </strong>
                    <small>${data.topLevelDomain}</small>
                </p>
                <p>
                    <strong>Currencies: </strong>
                    <small>${data.currencies[0].name}</small>
                </p>
                <p>
                    <strong>languages: </strong>
                    <small>${lang}</small>
                </p>
            </div>
        </div>`
    })
}, true)

