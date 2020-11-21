const path = require('path');
const forecast = require('../utils/forecast.js');
const geoCode = require('../utils/geoCode.js');

var express = require('express');
var app = express();
var hbs = require('hbs');
var port = process.env.PORT || 8080;

//setting proper paths, so that express can find where is what...
const publicDirPath = path.join(__dirname,'../public');
const viewDir = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// setting the state of express...
app.set('views',viewDir);
app.set('view engine','hbs'); // needed to set-up to let express know which engine are we using!.. // also for hbs, all the content is supposed to go in views folder!
hbs.registerPartials(partialsPath); // register hbs partials  

app.use(express.static(publicDirPath)); // Static Files

app.get('/',(req,res)=>{
    
    if(!req.query.address){
        return res.render('index',{
            title: "Please provide address in the search bar"
        }); 
    }

    geoCode.geoCode(req.query.address,(error,geoData)=>{
        if(!(geoData===undefined)){
            forecast.forecast(geoData,(error,forecastData)=>{
                if(!(forecastData===undefined)){
                    res.render('index',forecastData);  // Use render for hbs...
                }else{
                    console.log(error);
                }
            })
        }else{
            console.log(error);
        }
    });

}) // Calling hbs file on a specific path....

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.render('index',{
            title: "Please provide address in the search bar"
        })
    }

    geoCode.geoCode(req.query.address,(error,geoData)=>{
        if(!(geoData===undefined)){
            forecast.forecast(geoData,(error,forecastData)=>{
                if(!(forecastData===undefined)){
                    res.send(forecastData);  // Use render for hbs...
                }else{
                    res.send(error);
                }
            })
        }else{
            res.send(error);
        }
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{title:'About',name:'Sahib Arora'});
});  

app.get('/help',(req,res)=>{
    res.render('help',{message:"Help message",
                        title:"Help Page",
                    name:"Sahib Arora"});
});

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error: "You need a search item"
        })
    }
    
    res.send({
        products: req.query
    })
});

app.get('/help/*',(req,res)=>{
    res.render('404',{title: "404 Page not found", message:'Help Document not found',visit:'/help', name: "Sahib Arora"});
});

app.get('*',(req,res)=>{
    res.render('404',{title:"404 Page not found", message:"Page Not Found...", name: "Sahib Arora"});
});

app.listen(port,()=>{
    console.log("Server is running at " + port)
})