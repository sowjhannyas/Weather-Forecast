const city = document.querySelector("#inpt");
const text = document.querySelector(".p");
const main = document.querySelector(".main");
const back = document.querySelector("#back");

//If enter key is pressed AND if the input field is not empty, then request api for the input
city.addEventListener("keyup", e =>{
    if(e.key == "Enter" && city.value != ""){
    requestApi(city.value);
}
});

//Request deets of the city name from the api and store esult in weatherDeets function
function requestApi(city_name){
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=e172d23cf3f9a1ec8f855391fe312294&units=metric`;
    fetch(api).then(response => response.json()).then(result => weatherDeets(result));
};

//Getting info for extra details
const d = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const a = new Date();
const day = days[a.getDay()];
const date = d.getDate();
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
const b = new Date();
const month = months[b.getMonth()];
const hour = d.getHours();
const min = d.getMinutes();


function weatherDeets(info){
    //Checks for invaid input
    if(info.cod == "404"){
        text.innerText = "Invalid City";
        text.classList.add("error");
    }
    else{
        text.innerText = "Please enter a valid city name:"
        text.classList.remove("error");
        main.classList.add("active");
    }

    //Getting info
    const city_name = info.name;
    const country = info.sys.country;
    const temp = info.main.temp;
    const des = info.weather[0].description;
    const id = info.weather[0].id;

    //pass in HTML
    document.querySelector(".name").innerText = `${city_name}, ${country}`;
    document.querySelector(".temp").innerText = Math.floor(temp);
    document.querySelector(".weather").innerText = des;
    document.querySelector(".deets").innerText = `${day} | ${month} ${date} | ${hour}:${min}`;

    //Passing Images based on weather details
    if (id >=200 && id <=232){
        document.querySelector(".img").src="icons/storm.png";
    }
    else if ((id ==800)&& (hour <= 12)){
        document.querySelector(".img").src="icons/clear.png";
    }
    else if ((id ==800)&& (hour >= 12)){
        document.querySelector(".img").src="icons/clearN.png";
    }
    else if ((id >=300 && id <= 321)||(id >=500 && id <=531)){
        document.querySelector(".img").src="icons/rain.png";
    }
    else if (id >=600 && id <=622){
        document.querySelector(".img").src="icons/snow.png";
    }
    else if ((id >=801 && id <=804)&& (hour <= 12)){
        document.querySelector(".img").src="icons/partlyCloudy.png";
    }
    else if ((id >=801 && id <=804)&& (hour >= 12)){
        document.querySelector(".img").src="icons/partlyCloudyN.png";
    }
    else if ((id >=701 && id <=781)&& (hour <= 12)){
        document.querySelector(".img").src="icons/haze.png";
    }
    else if ((id >=701 && id <=781)&& (hour >= 12)){
        document.querySelector(".img").src="icons/hazeN.png";
    }
};

//If back is clicked, then go to home screen
back.addEventListener("click", ()=>{
    main.classList.remove("active");
});