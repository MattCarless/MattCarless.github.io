const locationField = document.getElementById("js-locationinput");
const locationInput = document.getElementById("js-locationsubmit");
const weatherCondition = document.getElementById("js-weathercondition");
const temperature = document.getElementById("js-temperature");
const weatherIcon = document.getElementById("js-weathericon");
const errorDiv = document.getElementById("js-error");
const body = document.body;
let errorMessage = "";

// document.body.style.backgroundColor = "red";


const getUserLocation = (event) => {
    event.preventDefault();
    const inputValue = locationField.value;
    getWeatherData(inputValue);

}


const getWeatherData = (userLocation) => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + userLocation + ",UK&units=metric&APPID=7c5e998268ad415c134ff54444a16be9")
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw (response);
            }
        })
        .then(data => {
            onApiSuccess(data);
        })
        .catch(error => {
            onApiError(error);
        })
};

const onApiSuccess = (data) => {
    weatherCondition.innerHTML = data.weather[0].main + ",";
    temperature.innerHTML = Math.floor(data.main.temp) + " degrees celcius " ;

    const imageSrc = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    weatherIcon.innerHTML = "<img src='" + imageSrc + "'>";
    body.style.backgroundColor = getBackgroundColour(data.weather[0].id);
    errorDiv.innerHTML = "";
    console.log(data);
};

const onApiError = (error) => {
    console.log(error);
    weatherCondition.innerHTML = "";
    temperature.innerHTML = "";
    weatherIcon.innerHTML = "";
    body.style.backgroundColor = getBackgroundColour(0);
    if (error.status === 404) {
        errorMessage = "Location not found";
    }
    errorDiv.innerHTML = errorMessage;

};

const getBackgroundColour = (weatherCode) => {
    let backgroundColour = "";
    if (weatherCode === 0) {
        backgroundColour = "#EFEFEF";
    } else if (weatherCode >= 200 && weatherCode <= 232) {
        //thunderstorm  
        backgroundColour = "#c9c9c9";

    } else if (weatherCode >= 300 && weatherCode <= 321) {
        //drizzle
        backgroundColour = "#79acd1";
        
    } else if (weatherCode >= 500 && weatherCode <= 531) {
        //rain
        backgroundColour = "#6c8ca3";

    } else if (weatherCode >= 600 && weatherCode <= 622) {
        //snow  
        backgroundColour = "#f2f4f5";

    } else if (weatherCode >= 701 && weatherCode <= 781) {
        //atmosphere 
        backgroundColour = "#d9d8ba";

    } else if (weatherCode === 801 || weatherCode === 802) {
        // light Cloud
        backgroundColour = "#a8d9e3";
    } else if (weatherCode === 803 || weatherCode === 804) {
        // dark cloud
        backgroundColour = "#ced5d6";
    } else {
        // clear
        backgroundColour = "#a5cafa";
    }


     return backgroundColour
}

locationInput.addEventListener("click", getUserLocation);