import './assets/styles/reset.css'
import './assets/styles/style.css'
import Search from './assets/images/search.png'

//GIPHY API Key = r44Ss44HzU3t5v9EEYIEjY8WGzrFmDkt

//OpenWeather API Key = 11652fc51470764e7d0282d884bd3840
//types of mainWeather: 
/**
 * 1) Clear Sky (sun.png)
 * 2) Few Clouds (few-clouds.png)
 * 3) Scattered Clouds (cloud.png)
 * 4) Broken Clouds (cloud.png)
 * 5) Shower Rain (shower-rain.png)
 * 6) Rain (rain.png)
 * 7) Thunderstorm
 * 8) Snow (snow.png)
 * 9) Mist
 */

let isFahrenheit = false;

const DOMCache = (function () {
    const mainWrapper = document.querySelector('.main-wrapper')
    const name = document.querySelector('.name')
    const countryCode = document.querySelector('.country-code')
    const searchButton = document.querySelector('.search-image')
    const locationInput = document.querySelector('#location')
    const feelsLikeDesc = document.querySelector('.feels-like-description')
    const avgTempDesc = document.querySelector('.average-temp-description')
    const minTempDesc = document.querySelector('.min-temp-description')
    const maxTempDesc = document.querySelector('.max-temp-description')
    const humidityDesc = document.querySelector('.humidity-description')
    const convertUnitsButton = document.querySelector('#convert-units-button')
    const mainWeather = document.querySelector('.main-weather')
    const weatherDesc = document.querySelector('.weather-description')
    const weatherInfoWrapper = document.querySelector('.weather-info-wrapper')

    return {
        weatherInfoWrapper,
        name,
        countryCode,
        searchButton,
        locationInput,
        feelsLikeDesc,
        avgTempDesc,
        minTempDesc,
        maxTempDesc,
        humidityDesc,
        convertUnitsButton,
        mainWeather,
        weatherDesc,
        mainWrapper
    };
})();

async function getWeather(location) {
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?units=imperial&q=${location}&id=524901&appid=11652fc51470764e7d0282d884bd3840`)
    let data = await response.json();
    console.log(data)
    return {
        country: data['sys']['country'],
        name: data['name'],
        mainWeather: data['weather'][0]['main'],
        weatherDesc: data['weather'][0]['description'],
        minTemp: data['main']['temp_min'],
        maxTemp: data['main']['temp_max'],
        avgTemp: data['main']['temp'],
        humidity: data['main']['humidity'],
        feelsLike: data['main']['feels_like'],
        coordinates: data['coord'],
    }
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * (5 / 9);
}

DOMCache.convertUnitsButton.addEventListener('click', () => {
    isFahrenheit = !isFahrenheit;
    isFahrenheit
        ? DOMCache.convertUnitsButton.innerText = 'Fahrenheit'
        : DOMCache.convertUnitsButton.innerText = 'Celcius'
    console.log(isFahrenheit)
})

async function render() {
    DOMCache.weatherInfoWrapper.style.opacity = 1;
    try {
        let weatherObject = await getWeather(DOMCache.locationInput.value).then(data => data)
        console.log(weatherObject);

        //others
        DOMCache.name.innerText = weatherObject.name
        DOMCache.countryCode.innerText = weatherObject.country
        DOMCache.weatherDesc.innerText = weatherObject.weatherDesc
        DOMCache.humidityDesc.innerText = weatherObject.humidity
        DOMCache.mainWeather.innerText = weatherObject.mainWeather

        //temperatures
        if (isFahrenheit) {
            DOMCache.feelsLikeDesc.innerText = weatherObject.feelsLike
            DOMCache.avgTempDesc.innerText = weatherObject.avgTemp
            DOMCache.minTempDesc.innerText = weatherObject.minTemp
            DOMCache.maxTempDesc.innerText = weatherObject.maxTemp
        } else {
            DOMCache.feelsLikeDesc.innerText = fahrenheitToCelsius(weatherObject.feelsLike).toFixed(2)
            DOMCache.avgTempDesc.innerText = fahrenheitToCelsius(weatherObject.avgTemp).toFixed(2)
            DOMCache.minTempDesc.innerText = fahrenheitToCelsius(weatherObject.minTemp).toFixed(2)
            DOMCache.maxTempDesc.innerText = fahrenheitToCelsius(weatherObject.maxTemp).toFixed(2)
        }
    }
    catch (error) {
        resetDisplay();
        throw new Error('Invalid Location')
    }
}

DOMCache.searchButton.addEventListener('click', render)

function resetDisplay() {
    DOMCache.name.innerText = 'Location Name'
    DOMCache.countryCode.innerText = 'Country'
    DOMCache.weatherDesc.innerText = ''
    DOMCache.humidityDesc.innerText = ''
    DOMCache.mainWeather.innerText = ''
    DOMCache.feelsLikeDesc.innerText = ''
    DOMCache.avgTempDesc.innerText = ''
    DOMCache.minTempDesc.innerText = ''
    DOMCache.maxTempDesc.innerText = ''
    DOMCache.feelsLikeDesc.innerText = ''
    DOMCache.avgTempDesc.innerText = ''
    DOMCache.minTempDesc.innerText = ''
    DOMCache.maxTempDesc.innerText = ''
}

// Global 'Enter' key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        render();
    }
})

// GLOW EFFECT FOLLOWING CURSOR
// DOMCache.mainWrapper.addEventListener("mousemove", (e) => {
//     let { x, y } = DOMCache.mainWrapper.getBoundingClientRect();
//     DOMCache.mainWrapper.style.setProperty("--x", e.clientX - x);
//     DOMCache.mainWrapper.style.setProperty("--y", e.clientY - y);
// });
