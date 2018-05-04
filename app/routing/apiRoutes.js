var friendData = require('../data/friends.js');


module.exports = function (app) {

	app.get('/api/friends', function(req, res){
		res.json(friendData);
	})


	app.post('/api/friends', function(req, res){
		var newFriend = req.body;

		for(var i = 0; i < newFriend.scores.length; i++) {
			if(newFriend.scores[i] == "1 (Strongly Disagree)") {
				newFriend.scores[i] = 1;
			} else if(newFriend.scores[i] == "2 (Disagree)") {
				newFriend.scores[i] = 2;
			} else if(newFriend.scores[i] == "3 (Neutral)") {
				newFriend.scores[i] = 3;
			} else if(newFriend.scores[i] == "4 (Agree)") {
				newFriend.scores[i] = 4;
			} else (newFriend.scores[i] == "5 (Strongly Agree)") 
				newFriend.scores[i] = 5;
			}
		

		var differencesArray = [];

		for(var i = 0; i < friendData.length; i++) {

			var compFriend = friendData[i];
			var totalDifference = 0;
			
			for(var j = 0; j < compFriend.scores.length; j++) {
				var differenceOneScore = Math.abs(compFriend.scores[j] - newFriend.scores[j]);
				totalDifference += differenceOneScore;
			}

			differencesArray[i] = totalDifference;
		};

		var bestFriendNum = differencesArray[0];
		var bestFriendIndex = 0;

		for(var i = 1; i < differencesArray.length; i++) {
			if(differencesArray[i] < bestFriendNum) {
				bestFriendNum = differencesArray[i];
				bestFriendIndex = i;
			}
		};

		friendData.push(newFriend);

		res.json(friendData[bestFriendIndex]);
	});
};