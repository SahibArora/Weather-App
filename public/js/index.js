console.log('client side javascript file is loaded');

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})  

var weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    var location = document.getElementById('location').value;

    var url = '/weather?address='+location;
    
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log("Error")
                document.getElementById('weather').innerHTML = "Error!"
            }else{
                document.getElementById('weather').innerHTML = "Weather in "+data.place+" is "+data.Temperature+" ,it feels like "+data.FeelsLike+" with humidity "+data.humidity+" and wind speed of "+wind_speed+"."
            }
        })
    })
});