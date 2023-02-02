import API from "./API";
import DOMCache from "./DOMCache";

export default class ViewHandler {
    #api;
    constructor() {
        this.#api = new API();
        this.initializeDOMEvents();
    }

    fahrenheitToCelsius(fahrenheit) {
        return (fahrenheit - 32) * (5 / 9);
    }

    initializeDOMEvents() {
        DOMCache.convertUnitsButton.addEventListener('click', () => {
            this.#api.setIsFahrenheit(!this.#api.getIsFahrenheit())
            this.#api.getIsFahrenheit()
                ? DOMCache.convertUnitsButton.innerText = 'Fahrenheit'
                : DOMCache.convertUnitsButton.innerText = 'Celcius'
            if (DOMCache.locationInput.value !== '' && this.#api.getLocationIsValid()) {
                this.render()
            }
        })

        DOMCache.searchButton.addEventListener('click', this.render.bind(this))

        // 'Enter' button to search
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.render.bind(this)();
            }
        })

        // GLOW EFFECT FOLLOWING CURSOR
        DOMCache.mainWrapper.addEventListener("mousemove", (e) => {
            let { x, y } = DOMCache.mainWrapper.getBoundingClientRect();
            DOMCache.mainWrapper.style.setProperty("--x", e.clientX - x);
            DOMCache.mainWrapper.style.setProperty("--y", e.clientY - y);
        });
    }

    async render() {
        if (DOMCache.locationInput.value.trim() === '') return;
        this.showDisplay();
        DOMCache.loading.style.display = 'block'
        try {
            let weatherObject = await this.#api.getWeather(DOMCache.locationInput.value).then(data => data)
            this.#api.setLocationIsValid(true)
            DOMCache.invalidLocation.style.display = 'none'
            DOMCache.loading.style.display = 'none'
            //others
            DOMCache.name.innerText = weatherObject.name
            DOMCache.countryCode.innerText = weatherObject.country
            DOMCache.humidityDesc.innerText = weatherObject.humidity
            DOMCache.mainWeather.innerText = weatherObject.mainWeather

            //temperatures
            if (this.#api.getIsFahrenheit()) {
                DOMCache.feelsLikeDesc.innerHTML = weatherObject.feelsLike + '&#8457;'
                DOMCache.avgTempDesc.innerHTML = weatherObject.avgTemp + '&#8457;'
                DOMCache.minTempDesc.innerHTML = weatherObject.minTemp + '&#8457;'
                DOMCache.maxTempDesc.innerHTML = weatherObject.maxTemp + '&#8457;'
            } else {
                DOMCache.feelsLikeDesc.innerHTML = this.fahrenheitToCelsius(weatherObject.feelsLike).toFixed(2) + '&#8451;';
                DOMCache.avgTempDesc.innerHTML = this.fahrenheitToCelsius(weatherObject.avgTemp).toFixed(2) + '&#8451;';
                DOMCache.minTempDesc.innerHTML = this.fahrenheitToCelsius(weatherObject.minTemp).toFixed(2) + '&#8451;';
                DOMCache.maxTempDesc.innerHTML = this.fahrenheitToCelsius(weatherObject.maxTemp).toFixed(2) + '&#8451;';
            }
        }
        catch (error) {
            this.hideDisplay();
            DOMCache.invalidLocation.style.display = 'block'
            this.#api.setLocationIsValid(false);
            throw new Error(error)
        }
    }

    resetDisplay() {
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

    showDisplay() {
        DOMCache.weatherContent.style.opacity = 1;
        DOMCache.weatherInfoWrapper.style.opacity = 1;
        DOMCache.locationContent.style.opacity = 1;
    }

    hideDisplay() {
        DOMCache.weatherContent.style.opacity = 0;
        DOMCache.weatherInfoWrapper.style.opacity = 0;
        DOMCache.locationContent.style.opacity = 0;
    }
}