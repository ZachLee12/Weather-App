export default class DOMCache {
    constructor() {
        throw new Error('Cannot instantiate static class DOMCache')
    }

    static mainWrapper = document.querySelector('.main-wrapper')
    static name = document.querySelector('.name')
    static countryCode = document.querySelector('.country-code')
    static searchButton = document.querySelector('.search-image')
    static locationInput = document.querySelector('#location')
    static feelsLikeDesc = document.querySelector('.feels-like-description')
    static avgTempDesc = document.querySelector('.average-temp-description')
    static minTempDesc = document.querySelector('.min-temp-description')
    static maxTempDesc = document.querySelector('.max-temp-description')
    static humidityDesc = document.querySelector('.humidity-description')
    static convertUnitsButton = document.querySelector('#convert-units-button')
    static mainWeather = document.querySelector('.main-weather')
    static weatherContent = document.querySelector('.weather-content')
    static weatherInfoWrapper = document.querySelector('.weather-info-wrapper')
    static locationContent = document.querySelector('.location-content')
    static invalidLocation = document.querySelector('.invalid-location')
    static loading = document.querySelector('.loading')

}