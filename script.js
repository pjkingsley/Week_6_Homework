const userInput = document.getElementById('userInput');
const searchHistory = document.getElementById('searchHistory');
const resultBox = document.getElementById('resultBox');
const fiveDayBox = document.getElementById('fiveDayBox');
let city = '';
let history = [];

//api call to get search result lat and lon and store in localStorage.
const userCity = function () {
    city = userInput.value;
    displayHistory();
    if (city) {fetch ('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=baf101e951769e2c9c3821497b8308f2')
    .then(function(response){
        return(response.json())
    })
    .then(function(data){
        history.push(city);
        let coords = {
            latitude: data.coord.lat,
            longitude: data.coord.lon
        };
        localStorage.setItem(city, JSON.stringify(coords));
    });
};};

const displayHistory = () => {
    let searchedCity = document.createElement('li');
    searchedCity.setAttribute('id', userInput.value);
    searchedCity.innerHTML = userInput.value;
    searchedCity.addEventListener('click', function (event) {
        event.preventDefault();
        let selection = event.target.id;
        let savedCity = localStorage.getItem(selection);
        let citySearch = JSON.parse(savedCity);
        console.log(citySearch);
        let lon = citySearch.longitude;
        let lat = citySearch.latitude;
        fetch ('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=hourly,minutely&appid=baf101e951769e2c9c3821497b8308f2')
        .then(function(response){
            return(response.json())
        })
        .then(function(data) {
            console.log(data);
            resultBox.innerHTML = '';
            fiveDayBox.innerHTML = '';
            let date = document.createElement('div');
            date.innerHTML = 'Current Conditions';
            let icon = document.createElement('img');
            let weatherIcon = data.current.weather[0].icon;
            icon.setAttribute('src', 'http://openweathermap.org/img/wn/'+weatherIcon+'@2x.png');
            let currentTemp = document.createElement('div');
            currentTemp.innerHTML = `Temp: ${data.current.temp}`;
            let windSpeed = document.createElement('div');
            windSpeed.innerHTML = `Wind Speed: ${data.current.wind_speed}`;
            let uvIndex = document.createElement('div');
            uvIndex.innerHTML = `UV Index: ${data.current.uvi}`;
            resultBox.append(date, icon, currentTemp, windSpeed, uvIndex);
            for (i = 1; i < 6; i++) {
                let date = document.createElement('div');
                date.innerHTML = data.daily[i].dt;
                let icon = document.createElement('img');
                let weatherIcon = data.daily[i].weather[0].icon;
                icon.setAttribute('src', 'http://openweathermap.org/img/wn/'+weatherIcon+'@2x.png');
                let temp = document.createElement('div');
                temp.innerHTML = data.daily[i].temp.day;
                let windSpeed = document.createElement('div');
                windSpeed.innerHTML = `Wind Speed: ${data.daily[i].wind_speed}`;
                let fiveDayCard = document.createElement('div');
                fiveDayCard.setAttribute('class', 'card');
                fiveDayCard.append(date, icon, temp, windSpeed);
                fiveDayBox.append(fiveDayCard);
            };
        });
    });
    searchHistory.append(searchedCity);
};

//fetch 5 day forcast
const renderForcast = () => {
    let savedCity = localStorage.getItem(userInput.value);
    let citySearch = JSON.parse(savedCity);
    console.log(citySearch);
    let lon = citySearch.longitude;
    let lat = citySearch.latitude;
    fetch ('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=hourly,minutely&appid=baf101e951769e2c9c3821497b8308f2')
    .then(function(response){
        return(response.json())
    })
    .then(function(data) {
        console.log(data);
        resultBox.innerHTML = '';
        fiveDayBox.innerHTML = '';
        let date = document.createElement('div');
        date.innerHTML = 'Current Conditions';
        let icon = document.createElement('img');
        let weatherIcon = data.current.weather[0].icon;
        icon.setAttribute('src', 'http://openweathermap.org/img/wn/'+weatherIcon+'@2x.png');
        let currentTemp = document.createElement('div');
        currentTemp.innerHTML = `Temp: ${data.current.temp}`;
        let windSpeed = document.createElement('div');
        windSpeed.innerHTML = `Wind Speed: ${data.current.wind_speed}`;
        let uvIndex = document.createElement('div');
        uvIndex.innerHTML = `UV Index: ${data.current.uvi}`;
        resultBox.append(date, icon, currentTemp, windSpeed, uvIndex);
        for (i = 1; i < 6; i++) {
            let date = document.createElement('div');
            date.innerHTML = data.daily[i].dt;
            let icon = document.createElement('img');
            let weatherIcon = data.daily[i].weather[0].icon;
            icon.setAttribute('src', 'http://openweathermap.org/img/wn/'+weatherIcon+'@2x.png');
            let temp = document.createElement('div');
            temp.innerHTML = data.daily[i].temp.day;
            let windSpeed = document.createElement('div');
            windSpeed.innerHTML = `Wind Speed: ${data.daily[i].wind_speed}`;
            let fiveDayCard = document.createElement('div');
            fiveDayCard.setAttribute('class', 'card');
            fiveDayCard.append(date, icon, temp, windSpeed);
            fiveDayBox.append(fiveDayCard);
        };
    })};

//event handler for user input
userInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        userCity();
        renderForcast();  
        userInput.value = '';
}});