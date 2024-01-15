let Container = document.querySelector(".container");
let Search = document.querySelector(".search-box button");
let WeatherBox = document.querySelector(".weather-box");
let WeatherDetails = document.querySelector(".weather-detalles");
let Error404 = document.querySelector(".not-found");

Search.addEventListener(`click`,() => {

    const APIKey = `KEY_API`;
    const ciudad = document.querySelector('.search-box input').value;

    if (ciudad === '' ) 
        return;


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {

        if(json.cod === '404'){
            Container.style.height = '400px';
            WeatherBox.style.display = 'none';
            WeatherBox.style.display = 'none';
            Error404.style.display = 'block';
            Error404.classList.add('fadeIn');
            return;
        }

        Error404.style.display = 'none';
        Error404.classList.remove('fadeIn');
        
        const image = document.querySelector('.weather-box img');
        const temperatura = document.querySelector('.weather-box .temperatura');
        const descripcion = document.querySelector('.weather-box .descripcion');
        const humedad = document.querySelector('.weather-detalles .humedad span')
        const viento = document.querySelector('.weather-detalles .viento span')

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/soleado.png';
                break;
            case 'Clouds':
                image.src = 'images/nublado.png';
                break;
            case 'Haze':
                image.src = 'images/niebla.png';
                break;
            case 'Rain':
                image.src = 'images/lluvia.png';
                break;
            case 'Snow':
                image.src = 'images/nieve.png';
                break;
        
            default:
                image.src = '';
                break;
        }

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        descripcion.innerHTML = `${json.weather[0].description}`;
        humedad.innerHTML = `${json.main.humidity}%`;
        viento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        WeatherBox.style.display = '';
        WeatherDetails.style.display = '';
        WeatherBox.classList.add('fadeIn');
        WeatherDetails.classList.add('fadeIn');
        Container.style.height = '590px';


    })


})