const request = require('request');

module.exports.geoCode = (address,callback) => {
    const urlGeocode = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)  +".json?access_token=pk.eyJ1Ijoic2FoaWItMTMxMCIsImEiOiJja2QwY2dyN2MwY2NoMnhtdHQ3cjB3dmtwIn0.UzsqMOs1VLOjZ1zlQ5zKXQ";

    request({url: urlGeocode, json: true},(error,response)=>{
        if(error){
            callback({error: "Unable to connect to location services"}, undefined);
        }else if(response.body.features.length === 0){
            callback({error: "Unable to find location, try another search"},undefined);
        }else{
            callback(undefined,{"lat": response.body.features[0].center[1],"long": response.body.features[0].center[0],"place": response.body.features[0].place_name});
        }
    })
}