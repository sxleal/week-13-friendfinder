//Denpendencies:  Need to include the path package to get the correct file path for our html

var path = require('path');

//Routing:

module.exports = function(app){

	app.get('/', function(request,response){
		response.sendFile(path.join(__dirname,'/../public/home.html'));
	});

	app.get('/survey',function(request,response){
		response.sendFile(path.join(__dirname,'/../public/survey.html'));
	});
};