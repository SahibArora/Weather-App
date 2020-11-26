const request = require('request');

module.exports.forecast = (geoCode,callback) => {
    const urlWeather = 'http://api.weatherstack.com/current?access_key=aaefec8428ba6b06dd5c15791c49ecba&query='+geoCode.lat+','+geoCode.long;

    request({url: urlWeather, json: true}, (error, response) => {
        if(error){
            callback({error: "Unable to reach weather service"}, undefined);
        }else if(response.body.error){
            callback({error: "Try weather for another location"}, undefined);
        }else{
            callback(undefined,{
                "Temperature":response.body.current.temperature,
                "FeelsLike": response.body.current.feelslike,
                "place": geoCode.place,
                "title": "Weather",
                "name": "Sahib Arora",
                "humidity": response.body.current.humidity
            });
        }
    })
}