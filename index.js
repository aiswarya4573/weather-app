/*const weatherForm = document.querySelector('#weather-form');
const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('#search-btn');





weatherForm.addEventListener('submit', event => {
    event.preventDefault();
    console.log("load");

    display();

});
function display(){
    const textBox = document.querySelector('#text-box');




    textBox.textContent="loading...";
    document.getElementById("text-box").style.backgroundColor="#D3DEDE";
}
    */


const locationName = document.getElementById('location-name');
const weatherImage = document.getElementById('weather-img');
const weatherName = document.getElementById('weather-name');
const mainTemp = document.getElementById('temperature');
const humidityPercentage = document.getElementById('humidity-percentage');
const feelsLike = document.getElementById('feels-like');


const weatherForm = document.querySelector('#weather-form');
const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('#search-btn');

const API_KEY='92abe3f1ff575ca463dcecc3edf8d1eb';




// Define the API URL

// Make a GET request

    weatherForm.addEventListener('submit', event =>{
    event.preventDefault();

    
    let cityName='';
    cityName = searchInput.value;
    console.log(cityName);
    
  
    searchInput.value = '';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    locationName.textContent=data.name;
    mainTemp.textContent=data.main.temp;
    weatherName.textContent=data.weather[0].description;
    humidityPercentage.textContent=data.main.humidity;
    feelsLike.textContent=data.main.feels_like;



  })
  .catch(error => {
    console.error('Error:', error);
  });




});



















  

 


