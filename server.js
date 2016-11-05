//-----------------------
//DEPENDENCIES
//Series of NPM packages that enable application

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//-----------------------

//Express configuration: setsup properties for express server
var app = express(); 
var PORT = process.env.PORT || 3000;

//Body parser makes it easier for our server to interpret data sent to it
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

//ROUTER:
//Points our server to a series of 'route' files.  This is a
//map of how to respond when users visit or request data from
//various URL's.
require('./app/routing/api-routes.js')(app);
require('./app/routing/html-routes.js')(app);

//LISTENER:
//This code starts our server
app.listen(PORT,function(){
	console.log("App listening on PORT: " + PORT);
});
