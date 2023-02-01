import './assets/styles/reset.css'
import './assets/styles/style.css'
import Search from './assets/images/search.png'
import Loading from './assets/images/loading.gif'
import DOMCache from './DOMCache'

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

async function getWeather(location) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${location}&id=524901&appid=11652fc51470764e7d0282d884bd3840`)
    let data = await response.json();
    return {
        country: data['sys']['country'],
        name: data['name'],
        mainWeather: data['weather'][0]['main'],
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
    if (DOMCache.locationInput.value !== '') {
        render()
    }
})

async function render() {
    showDisplay();
    DOMCache.loading.style.display = 'block'
    try {
        let weatherObject = await getWeather(DOMCache.locationInput.value).then(data => data)
        console.log(weatherObject);
        DOMCache.invalidLocation.style.display = 'none'
        DOMCache.loading.style.display = 'none'
        //others
        DOMCache.name.innerText = weatherObject.name
        DOMCache.countryCode.innerText = weatherObject.country
        DOMCache.humidityDesc.innerText = weatherObject.humidity
        DOMCache.mainWeather.innerText = weatherObject.mainWeather

        //temperatures
        if (isFahrenheit) {
            DOMCache.feelsLikeDesc.innerHTML = weatherObject.feelsLike + '&#8457;'
            DOMCache.avgTempDesc.innerHTML = weatherObject.avgTemp + '&#8457;'
            DOMCache.minTempDesc.innerHTML = weatherObject.minTemp + '&#8457;'
            DOMCache.maxTempDesc.innerHTML = weatherObject.maxTemp + '&#8457;'
        } else {
            DOMCache.feelsLikeDesc.innerHTML = fahrenheitToCelsius(weatherObject.feelsLike).toFixed(2) + '&#8451;';
            DOMCache.avgTempDesc.innerHTML = fahrenheitToCelsius(weatherObject.avgTemp).toFixed(2) + '&#8451;';
            DOMCache.minTempDesc.innerHTML = fahrenheitToCelsius(weatherObject.minTemp).toFixed(2) + '&#8451;';
            DOMCache.maxTempDesc.innerHTML = fahrenheitToCelsius(weatherObject.maxTemp).toFixed(2) + '&#8451;';
        }
    }
    catch (error) {
        hideDisplay();
        DOMCache.invalidLocation.style.display = 'block'
        throw new Error('Invalid Location')
    }
}

DOMCache.searchButton.addEventListener('click', render)

function resetDisplay() {
    DOMCache.name.innerText = 'Location Name'
    DOMCache.countryCode.innerText = 'Country'
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

function showDisplay() {
    DOMCache.weatherContent.style.opacity = 1;
    DOMCache.weatherInfoWrapper.style.opacity = 1;
    DOMCache.locationContent.style.opacity = 1;
}

function hideDisplay() {
    DOMCache.weatherContent.style.opacity = 0;
    DOMCache.weatherInfoWrapper.style.opacity = 0;
    DOMCache.locationContent.style.opacity = 0;
}

// Global 'Enter' key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        render();
    }
})

// GLOW EFFECT FOLLOWING CURSOR
DOMCache.mainWrapper.addEventListener("mousemove", (e) => {
    let { x, y } = DOMCache.mainWrapper.getBoundingClientRect();
    DOMCache.mainWrapper.style.setProperty("--x", e.clientX - x);
    DOMCache.mainWrapper.style.setProperty("--y", e.clientY - y);
});
