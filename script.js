function getWeather(){
    const apiKey = '79cf4906830775e264983ba363180d40';
    const city = document.getElementById('city').value;
    if(!city){
        alert("Please enter a city");
        return;
    }
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response=>response.json())
        .then(data=>weatherDetails(data))
        .catch(err=>{
            console.log("Error in fetching data",err);
            alert("Error in fetching data");
        });
    fetch(forecastUrl)
        .then(response=>response.json())
        .then(data=>hourlyWeatherForecast(data.list))
        .catch(err=>{
            console.log("Error in fetching hourly weather forecast",err);
            alert("Error in fetching hourly weather forecast");
        })
}
function weatherDetails(data){
    console.log(data);

    const weatherIcon = document.getElementById("weather-icon");
    const tempDiv = document.getElementById("temp-div");
    const weatherDescription = document.getElementById("weather-description");
    const hourlyForecast = document.getElementById("hourly-forecast");

    tempDiv.innerHTML = '';
    weatherDescription.innerHTML = '';
    hourlyForecast.innerHTML = '';
   
    const iconCode = data.weather[0].icon;
    const temp = Math.round(data.main.temp-273.15);
    const country = data.name;
    const description =  data.weather[0].description;

    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;


    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    tempDiv.innerHTML = `<p>${temp}°C</p>`;
    
    weatherDescription.innerHTML = `
        <p>${country}</p>
        <p>${description}</p>
        `;
    

    displayIcon();
    displayDescription();
    
}

function hourlyWeatherForecast(data){
   

    const hourlyWeatherForecast = document.getElementById("hourly-forecast");
    data = data.slice(0,8);

    data.forEach(d=>{
        const temp = Math.round(d.main.temp-273.15);
        const iconCode = d.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const time = new Date(d.dt*1000);
        const hour = time.getHours();


        const hourlyForcastHtml = `
            <div id = "hourly-forecast-inner">
            <p>${hour}:00</p>
            <img src=${iconUrl} alt = "Hourly Weather Icon"/>
            <p>${temp}°C</p>
            
            </div>
            `;
        hourlyWeatherForecast.innerHTML += hourlyForcastHtml;
    })
}
function displayIcon(){
    const weatherIcon =  document.getElementById("weather-icon");
    weatherIcon.style.display = "block";
}
function displayDescription(){
    const weatherDescription = document.getElementById("weather-description");
    weatherDescription.style.display = "block";
}
