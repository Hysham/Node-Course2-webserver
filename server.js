const express = require('express');
const hbs = require('hbs');  
const fs = require('fs');

var app = express();

//enable partialing
hbs.registerPartials(__dirname + '/Views/partials');
app.set('view engine', 'hbs');

//app.use() is register middleware
//create a middleware for trace the server
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log =`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err)=>{
        if(err){
            console.log('unable to append to server.log');
        }
    });
    next();
});

//middleware for maintenance page
/* app.use((req, res, next)=>{
    res.render('maintainance.hbs',{
        pageTitle: 'Maintainance Page'
    });
}); */

//middleware for access static files
app.use(express.static(__dirname + '/public'));

//register common functions
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();  
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

//get request
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        wellcomemessage: 'Wellcome to Home Page!',
    });
});

app.get('/about',(req,res)=>{
   res.render('about.hbs',{
       pageTitle: 'About Page',
   });
});

app.get('/bad',(req,res)=>{
    res.send({
        errormessage: 'Something went wrong!'
    });
});

//bind the server with a port
app.listen(3000,()=>{
    console.log('server is up on port 3000');
});