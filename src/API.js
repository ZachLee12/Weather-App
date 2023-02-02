export default class API {
    #isFahrenheit = false;
    #locationIsValid = false;

    constructor() {
        console.log('A happy API is created.')
    }

    async getWeather(location) {
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

    setIsFahrenheit(boolean) {
        this.#isFahrenheit = boolean;
    }

    setLocationIsValid(boolean) {
        this.#locationIsValid = boolean
    }

    getIsFahrenheit() {
        return this.#isFahrenheit
    }

    getLocationIsValid() {
        return this.#locationIsValid
    }
}