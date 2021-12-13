const userInput = document.getElementById('userInput');
const searchHistory = document.getElementById('searchHistory');
const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const temp = document.getElementById('temp');
const wind = document.getElementById('wind');
const uvIndex = document.getElementById('uvIndex');
const fiveDayBox = document.getElementById('fiveDayBox');

//api call to get lat and long of city state code.
function location () {fetch ('http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit={limit}&appid=baf101e951769e2c9c3821497b8308f2')
    .then(function(response){
    return(response.json())
    })
    .then(function(data){
        console.log(data);
    });};

//api call for weather based on lat and lon
function weather() {fetch ('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude={part}&appid=baf101e951769e2c9c3821497b8308f2')
    .then(function(response){
    return(response.json())
    })
    .then(function(data){
        console.log(data);
    });};
    
userInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log (userInput.value);
        let city = userInput.value;
    }
});