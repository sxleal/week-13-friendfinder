//Load data:  Link routes to data sources.
//These data sources hold arrays of information on all possible friends

var friendlist = require('../data/friends.js');
var path = require('path');

//Routing:
//API Get:  handles code when user visits a page
module.exports = function(app){
	app.get('/api/friends',function(request,response){
		response.json(friendlist);
	});

//API Post:  Handles when a user submits a form sending data to the server
//Results compared to every user in DB
//Difference between newUser and each user in DB compared
//It choses the user with the least difference as a 'match'
//When multiple users have same score, it choses the first result
//After running test, it pushes the newUser to DB

	app.post('/api/friends',function(request,response){
	
	//Creates object to hold the "best match".  It is updated as we loop through existing users
	var bestMatch = {
		name: "",
		photo: "",
		friendDifference:1000
	};

	//Take newFriend's survey result and parses it
	var userData = request.body;
	var userScores= userData.scores;
	console.log("this is userData"+userData);

	//Var to calculate the difference between the newUser and existing users
	var totalDifference = 0;

	//Loops through all the friend possibilities in the DB
	for (var i=0; i<friendlist.length; i++) {

		console.log(friendlist[i].name);
		totalDifference = 0;

		//Loop through all the scores of each friend
		for (var j=0; j<friendlist[i].scores[j]; j++){
			//Calcualte the difference between the scores and sum them into totalDifference var
			totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendlist[i].scores[j]));

			//Check if the sum is less then the difference of the current 'best match'
			if (totalDifference <= bestMatch.friendDifference){
				//Reset the bestMatch to the new result
				bestMatch.name = friendlist[i].name;
				bestMatch.photo = friendlist[i].photo;
				bestMatch.friendDifference =totalDifference;
			}
		}
	}

	//Save the user's data to the DB.  Has to occur AFTER the check, or the DB will always return that user as the bestMatch
	friendlist.push(userData);



	});
};