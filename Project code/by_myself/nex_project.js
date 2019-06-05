const ELEMENT_SEARCH_BUTTON = document.querySelector('button');
const ELEMENT_SEARCHED_CITY = document.querySelector('#city');

const ELEMENT_LOADING_TEXT = document.querySelector('#load');
const ELEMENT_WEATHER_BOX = document.querySelector('#weather');

const ELEMENT_WEATHER_CITY = ELEMENT_WEATHER_BOX.firstElementChild;
const ELEMENT_WEATHER_DESCRIPTION = document.querySelector('#weatherDescription');
const ELEMENT_WEATHER_TEMPERATURE = ELEMENT_WEATHER_BOX.lastElementChild;

const APP_ID = '059cf2b6f2741f27e2b1644ca23d139d';

async function searchWeather() {
    const CITY_NAME = ELEMENT_SEARCHED_CITY.value.trim();
    if (CITY_NAME.length === 0) {
        return alert('Please enter a city name');
    }

    const URL = 'http://api.openweathermap.org/data/2.5/weather?q='+ CITY_NAME + '&units=metric&appid=' + APP_ID;
    let response = await fetch(URL);
    let parsed = await response.json();
    return parsed;
}

ELEMENT_SEARCH_BUTTON.onclick = async function () {
    try {
        let data = await searchWeather();
        console.log(data);

        console.log(`${data.weather[0].description} `);

        ELEMENT_WEATHER_DESCRIPTION.innerHTML = `${data.weather[0].description} `;
        ELEMENT_WEATHER_CITY.innerHTML = `${data.name}`;
        ELEMENT_WEATHER_TEMPERATURE.innerHTML = (data.main.temp).toFixed() + '&#176C';

        ELEMENT_WEATHER_BOX.style.display = 'block';
        ELEMENT_LOADING_TEXT.style.display = 'none';
    } catch (error) {
        console.log(error);
        ELEMENT_WEATHER_BOX.style.display = 'none';
        ELEMENT_LOADING_TEXT.style.display = 'block';
    }
};


// .then(responseData => {
//     const WEATHER_DATA = new WeatherData(CITY_NAME, responseData.weather[0].description.toUpperCase());
//     const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
//     WEATHER_PROXY.temperature = responseData.main.temp;
//     updateWeather(WEATHER_PROXY);
// })
// .catch(error => alert(error));
