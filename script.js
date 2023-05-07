const websites=[
    {name: 'Github', url:'https://github.com'},
    {name: 'Youtube', url:'https://youtube.com'},
    {name: 'Gmail', url:'https://mail.google.com'},
    {name: 'Reddit-unix', url: 'https://www.reddit.com/r/unixporn/'},
    {name: 'ChatGpt', url:'https://chat.openai.com'}
];

const link = document.getElementById('website-link');
const searchBar = document.querySelector('.search-bar');

function updateLink(){
    link.href = websites[currentIndex].url;
    link.textContent = websites[currentIndex].name;
}

let currentIndex = 0;

updateLink();

document.addEventListener('keydown', function(event){
    
    if(event.key === 'ArrowRight'){
        if(document.activeElement === searchBar){
            const selectionStart = searchBar.selectionStart;
            searchBar.setSelectionRange(selectionStart +1, selectionStart +1);
        } else {
            currentIndex++;
            if(currentIndex>=websites.length){
                currentIndex = 0;
            }
        }
    }
    else if(event.key === 'ArrowLeft'){
        if(document.activeElement === searchBar){
            const selectionStart = searchBar.selectionStart;
            searchBar.setSelectionRange(selectionStart -1, selectionStart -1);
        } else {
            currentIndex--;
            if(currentIndex<0){
                currentIndex = websites.length -1;
            }
        }
    }
    else if(event.key === 'Enter'){
        if(document.activeElement === searchBar){
            weather.search();
        } else { link.click(); return;}
    }

    else if(event.key === 'Escape'){
        if(document.activeElement === searchBar){
            searchBar.blur();
        }
    }
    else{ return; }

    event.preventDefault();
    updateLink();
});



const weather = {
    apiKey: "7ae7e0961142ca49bd9e7a7ac9145257",
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
        
        document.getElementById('wallpaper').style.backgroundImage=
         `url('https://source.unsplash.com/1600x900/?${description.toLowerCase()}')`;
    },
    search: function(){
        const searchBar = document.querySelector(".search-bar");
        if (!searchBar.value){
            alert("Please enter a city name");
            return;
        }
        
        this.fetchWeather(searchBar.value);
    }
};

function init(){
    weather.fetchWeather("hyderabad");
    document.querySelector('.search-input-container button').addEventListener('click', () => {
        weather.search();
    });
}
init();

