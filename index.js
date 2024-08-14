
const weatherImage = document.getElementById('weather-img');
const weatherName = document.getElementById('weather-name');
const mainTemp = document.getElementById('temperature');
const humidityPercentage = document.getElementById('humidity-percentage');
const feelsLike = document.getElementById('feels-like');
const locationName = document.getElementById('location-name');
const searchInput = document.getElementById('search');
const weatherForm = document.querySelector('#weather-form');
const geoButton = document.querySelector("#location-button");
const loading = document.querySelector('#text-box');
const geolo = document.querySelector("#geolocation-box");

async function weatherFn(cityName) {
    const API_KEY = '92abe3f1ff575ca463dcecc3edf8d1eb';
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        if (res.status === 404) {
            const error = document.querySelector('#error-box');
            error.style.display = 'block';
            console.log("City not found");
            return null;
        }

        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

async function displayData() {
    const cityName = searchInput.value;
    loading.textContent = "Loading...";
    loading.style.display = 'block';

    const data = await weatherFn(cityName);
    if (data) {
        loading.style.display = 'none';

        const queryString = new URLSearchParams({
            name: data.name,
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            icon: data.weather[0].icon,
        }).toString();

        setTimeout(() => {
            window.location.href = `weather.html?${queryString}`;
        }, 3000);

    } else {
        loading.textContent = 'City not found or error fetching data';
    }
}

if (weatherForm) {
    weatherForm.addEventListener('submit', function(event) {
        event.preventDefault();
        displayData();
    });
}

function fetchData() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name'),
        temp: params.get('temp'),
        feels_like: params.get('feels_like'),
        description: params.get('description'),
        humidity: params.get('humidity'),
        icon: params.get('icon'),
    };
}

const dat = fetchData();
if (dat.name) {
    locationName.textContent = dat.name;
    mainTemp.textContent = dat.temp;
    feelsLike.textContent = dat.feels_like;
    weatherName.textContent = dat.description;
    humidityPercentage.textContent = dat.humidity;
}

geoButton.addEventListener("click", async () => {
    loading.style.display = 'none';
    geolo.style.display = 'none';

    try {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=da570a6b2276bc62ca7aaac5747e1544&units=metric`
                );
                const data = await response.json();
                console.log(data);
                loading.style.display = 'block';

                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }

                const queryString = new URLSearchParams({
                    name: data.name,
                    temp: data.main.temp,
                    feels_like: data.main.feels_like,
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    icon: data.weather[0].icon,
                }).toString();

                setTimeout(() => {
                    window.location.href = `weather.html?${queryString}`;
                }, 3000);
            }, (error) => {
                geolo.style.display = 'block';
                console.error('Geolocation error:', error);
            });
        } else {
            geolo.style.display = 'block';
        }
    } catch (error) {
        geolo.style.display = 'block';
        console.error('Error:', error);
    } finally {
        loading.style.display = 'none';
    }
});

function showCookies() {
    const output = document.getElementById("cookies");
    output.textContent = `> ${document.cookie}`;
}

function clearOutputCookies() {
    const output = document.getElementById("cookies");
    output.textContent = "";
}

    


















  

 


