const websites=[
    {name: 'Github', url:'https://github.com'},
    {name: 'Youtube', url:'https://youtube.com'},
    {name: 'Gmail', url:'https://mail.google.com'},
    {name: 'Reddit-unix', url: 'https://www.reddit.com/r/unixporn/'},
    {name: 'ChatGpt', url:'https://chat.openai.com'}
];

const link = document.getElementById('website-link');

function updateLink(){
    link.href = websites[currentIndex].url;
    link.textContent = websites[currentIndex].name;
}
let currentIndex = 0;

updateLink();

document.addEventListener('keydown', function(event){
    //left
    if (event.keyCode === 37){
        currentIndex--;
        if (currentIndex<0){
            currentIndex = websites.length - 1;
        }
    } 
    //right
    else if (event.keyCode === 39) {
        currentIndex++;
        if (currentIndex>= websites.length){
            currentIndex=0;
        }
    }
    //enter
    else if (event.keyCode === 13){
        link.click();
        return;
    }
    else {
        return;
    }

    event.preventDefault();
    updateLink();
});



const weather = {
    apiKey: "api_key",
    fetchWeather: function(city){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
        .then((response) => {
            if (!response.ok){
                throw new Error(`No weather data found for ${city}`);
            }
            return response.json(); 

        })
        .then((data)=> this.displayWeather(data))
        .catch((error)=>{
            console.error(error);
            alert(error.message);
        });
    },
    displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;

        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector('.city').innerText = `Weather in ${name}`;
        document.querySelector('.icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = `${temp}°C`;
        document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
        document.querySelector('.wind').innerText = `Wind Speed: ${speed} km/hr`;
        document.querySelector(".weather-container").classList.remove("loading");
        document.body.style.backgroundImage=
         `url('https://source.unsplash.com/1600x900/?${description}')`;

    },
    search: function(){
        const city = document.querySelector(".search-bar").value;
        if (!city){
            alert("Please enter a city name")
            return;
        }
        this.fetchWeather(city);
    }
};

function init(){
    weather.fetchWeather("hyderabad");
    document.querySelector('.search-input-container button').addEventListener('click', () => {
        weather.search();
    });

    // document.querySelector('.search-bar').addEventListener('keyup', function(event){
    //     if (event.keyCode === 13){
    //         weather.search();
    //     }
    // })
}
init();

