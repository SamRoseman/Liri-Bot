//VARIABLES =============================================================
var request = require("request");

var Twitter = require("twitter");

var Spotify = require("node-spotify-api");

var keys = require("./keys.js");

var fs = require("fs");

var twitter = new Twitter({
  consumer_key: keys.twitter.consumer_key,
  consumer_secret: keys.twitter.consumer_secret,
  access_token_key: keys.twitter.access_token_key,
  access_token_secret: keys.twitter.access_token_secret
});

var spotify = new Spotify({
	id: keys.spotify.client_id,
	secret: keys.spotify.client_secret
})

//SPOTIFY ===============================================================
	if (process.argv[2] === "spotify-this-song" && process.argv[3]) {
		var songName = "";
		songName = process.argv.slice(3);

		spotify.search({ type: 'track', query: songName }, function(err, data) {
	    	if ( err ) {
	    		console.log('Error occurred: ' + err);
	    		return;
	    	}
	 
	    	else {
	    		console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
	    		console.log("Song Name: " + data.tracks.items[0].name);
	    		console.log("Album: " + data.tracks.items[0].album.name);
	    		console.log("Preview: " + data.tracks.items[0].preivew_url);
	    	} 
		});

	}

	else if (process.argv[2] === "spotify-this-song" && !process.argv[3]) {
		spotify.search({ type: 'track', query: "the sign ace of base" }, function(err, data) {
	    	if ( err ) {
	    		console.log('Error occurred: ' + err);
	    		return;
	    	}
	 
	    	else {
	    		console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
	    		console.log("Song Name: " + data.tracks.items[0].name);
	    		console.log("Album: " + data.tracks.items[0].album.name);
	    		console.log("Preview: " + data.tracks.items[0].preivew_url);
	    	} 
		});
	}

//TWITTER ===============================================================
	if (process.argv[2] === "my-tweets") {

		twitter.get('statuses/user_timeline', {screen_name: 'PrincessSamCat', count: 20} , function(error, tweets, response) {
  			
  				for (var i = 0; i < tweets.length; i++) {
  					console.log(tweets[i].text + "\nCreated: " + tweets[i].created_at + "\n");
  				}
		});
	}

//OMDB    ===============================================================
	if (process.argv[2] === "movie-this" && process.argv[3]) {
		var movieName = "";
		movieName = process.argv.slice(3).join("+");

		var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&plot=short&apikey=40e9cece";

		request(queryUrl , function(error, response, body) {

	  		if (!error && response.statusCode === 200) {

				console.log("Title: " + JSON.parse(body).Title);
				console.log("Released: " + JSON.parse(body).Year);
				console.log("Rating: " + JSON.parse(body).Rated);
				console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
				console.log("Country: " + JSON.parse(body).Country);
				console.log("Language: " + JSON.parse(body).Language);
				console.log("Plot: " + JSON.parse(body).Plot);
				console.log("Actors: " + JSON.parse(body).Actors);
			}

		});		
	}

	else if (process.argv[2] === "movie-this" && !process.argv[3]) {
		var queryUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&plot=short&apikey=40e9cece";
		request(queryUrl , function(error, response, body) {

	  		if (!error && response.statusCode === 200) {

				console.log("Title: " + JSON.parse(body).Title);
				console.log("Released: " + JSON.parse(body).Year);
				console.log("Rating: " + JSON.parse(body).Rated);
				console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
				console.log("Country: " + JSON.parse(body).Country);
				console.log("Language: " + JSON.parse(body).Language);
				console.log("Plot: " + JSON.parse(body).Plot);
				console.log("Actors: " + JSON.parse(body).Actors);
			}
		});	
	}
//EXTRA    ==============================================================
	if (process.argv[2] === "do-what-it-says") {
		fs.readFile("random.txt", "utf8", function(err, data) {
			var randomTxt = data;
			console.log(randomTxt);
			spotify.search({type: "track", query: randomTxt} , function(err, data) {
				console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
	    		console.log("Song Name: " + data.tracks.items[0].name);
	    		console.log("Album: " + data.tracks.items[0].album.name);
	    		console.log("Preview: " + data.tracks.items[0].preivew_url);
			})
		})
	}



