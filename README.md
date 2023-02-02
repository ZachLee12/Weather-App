# Weather-App
A simple Weather App that uses the free API provided by [OpenWeather](https://openweathermap.org/api). The main focus of this project is on Asynchronous JavaScript with `async/await`.  

Live Demo: https://zachlee12.github.io/Weather-App/

## API
An Application Programming Interface (API) is a mediator between an application and a database that enables communication between the two. An API defines the way in which external applications can access data or functionality of an operating system, library or software application. 

## Asynchronous JavaScript
Asynchronous JavaScript is a programming model in JavaScript that allows for code execution in a 'non-blocking event loop' style. This means that the program is able to continue executing other code while a long-running/time-confusing task is being performed in the background.  

This programming paradigm can be achieved with `Promises` or `Async/Await`. Note that some older versions of Webpack applications and browsers do not support `Async/Await`, you would then have to transpile your code with [Babel.js](https://babeljs.io/).


## Using `fetch()` and JavaScript's Fetch API
`fetch()` is JavaScript's built-in [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) that functions asynchronously across the network to fetch resources. An example usage of `fetch()` can be found in the code snippet of `API.js` below: 

```javascript
    async getWeather(location) {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${location}&id=524901&appid=11652fc51470764e7d0282d884bd3840`)
        let data = await response.json();
        return {
            //shortened to just return `data` for simplicity in this example
            data
        }
    }
```


