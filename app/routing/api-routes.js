var friendlist = require('../data/friends.js');
var path = require('path');

module.exports = function(app){
	app.get('/api/friends',function(request,response){
		response.json(friendlist);
	});

	app.post('/api/friends',function(request,response){
		friendlist.push(request.body);
	});
};