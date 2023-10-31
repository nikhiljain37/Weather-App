const apiKey = "b2b70706f6b0ca00f00dfc505f43d09c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox =document.querySelector(".search input");
const searchBtn =document.querySelector(".search button");
const weatherIcon =document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status == 404){
        document.querySelector(".error").style.display ="block";
        document.querySelector(".weather").style.display ="none";
    }else {
    var data = await response.json();
    document.querySelector(".city").innerHTML= data.name;
    document.querySelector(".temp").innerHTML= Math.round(data.main.temp) +"°C";
    document.querySelector(".humidity").innerHTML= data.main.humidity +"%";
    document.querySelector(".wind").innerHTML= data.wind.speed +"km/h "+ getDirection(data.wind.deg) ;
    document.querySelector(".weather-type").innerHTML= data.weather[0].main;
    document.querySelector(".feels").innerHTML = "Feels like " + Math.round(data.main.feels_like) +"°C";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "/weather/images/clouds.png";
    }else if (data.weather[0].main == "Clear"){
        weatherIcon.src = "/weather/images/clear.png";
    
    }else if (data.weather[0].main == "Rain"){
        weatherIcon.src = "/weather/images/rain.png";
    
    }else if (data.weather[0].main == "Drizzle"){
        weatherIcon.src = "/weather/images/drizzle.png";
    
    }else if (data.weather[0].main == "Mist"){
        weatherIcon.src = "/weather/images/mist.png";
    }
    else if (data.weather[0].main == "Snow"){
        weatherIcon.src = "/weather/images/snow.png";
    }
    document.querySelector(".weather").style.display ="block";
    document.querySelector(".error").style.display ="none";

    console.log(data);
    console.log(data.weather[0].main);
   }
};

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value); 
});
searchBox.addEventListener("keydown",()=> {
    if(event.code === 'Enter'){
        checkWeather(searchBox.value); 
    }
})


function getDirection( angle ){
	// We divide it into 16 sections
	let directions = ["N","NNE","NE","ENE","E",
		"ESE", "SE", "SSE","S",
		"SSW","SW","WSW","W",
		"WNW","NW","NNW" ];
	let section = parseInt( angle/22.5 + 0.5 );
	section = section % 16;
	return directions[section];
}

var main =document.querySelector("#main");
var crsr = document.querySelector(".cursor");

main.addEventListener("mousemove",function(dets){
    // console.log(dets.x);
    // console.log(dets.y);

    crsr.style.left = dets.x+"px"
    crsr.style.top = dets.y+"px"
}) 