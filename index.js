
const weatherImage = document.getElementById('weather-img');
const weatherName = document.getElementById('weather-name');
const mainTemp = document.getElementById('temperature');
const humidityPercentage = document.getElementById('humidity-percentage');
const feelsLike = document.getElementById('feels-like');
const locationName = document.getElementById('location-name');
const searchInput = document.getElementById('search');
const weatherForm = document.querySelector('#weather-form');
console.log(weatherForm);



async function weatherFn(cityName) {
    
    const API_KEY = '92abe3f1ff575ca463dcecc3edf8d1eb';
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        if (res.status === 404) {
            const error= document.querySelector('#error-box');
            error.style.display='block';
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
    const upperBox = document.querySelector('#text-box');
    console.log(upperBox);
    const loading= "Loading..."
    upperBox.textContent = loading;
    
    
    const data = await weatherFn(cityName);
    if (data){
        const loading= document.querySelector('#text-box');
        loading.style.display='block';
    }

    if (!data) {
        //upperBox.innerHTML = '<div>City not found or error fetching data</div>';
        const error= document.querySelector('#error-box');
        loading.style.display='block';

    } else {
        
        const queryString = new URLSearchParams({
            name: data.name,
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            description: data.weather[0].description,
            humidity: data.main.humidity,
        }).toString();

        var delayInMilliseconds = 5000; //1 second

        setTimeout(function() {
        //your code to be executed after 1 second

        window.location.href = `weather.html?${queryString}`;
        }, delayInMilliseconds);
        
    }
}

if(weatherForm){
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
        icon:  params.get('icon'),
    };
}


const dat = fetchData();
if (dat.name) {
    document.querySelector('#location-name').textContent = dat.name;
    document.querySelector('#temperature').textContent = dat.temp;
    document.querySelector('#feels-like').textContent = dat.feels_like;
    document.querySelector('#weather-name').textContent = dat.description;
    document.querySelector('#humidity-percentage').textContent = dat.humidity;
    
    

}

        const geoButton=document.querySelector("#location-button");
        geoButton.addEventListener("click", async () => {
            const loading= document.querySelector('#text-box');
            loading.style.display='block';
            const geolo= document.querySelector('#geolocation-box');
            geolo.style.display='none';

            
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
                  weatherData = data;
                  
        
                  if (!response.ok) {
                    Denied.style.display = "block";
                    throw new Error();
                  }
                  const queryString = new URLSearchParams({
                    name: data.name,
                    temp: data.main.temp,
                    feels_like: data.main.feels_like,
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    icon: data.weather[0].icon,
                  }).toString();
                 
                 
                  var delayInMilliseconds = 3000; //5 second
                    
                    setTimeout(function() {
                        //your code to be executed after 5 second
                        window.location.href = `weather.html?${queryString}`;
                
                        
                        }, delayInMilliseconds);



                });
                  
            }else {
                geolo.style.display = "block";
              }
            } catch (error) {
              geolo.style.display = "block";
            } finally {
              loading.style.display = "block";
            }
          });
        
    


















  

 


