// Load the NPM Package dotenv
require("dotenv").config();

// Load the NPM Package twitter
var Twitter = require('twitter');

// Load the NPM Package node-spotify-api
var Spotify = require('node-spotify-api');

// Code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys.js");

// Load the NPM Package request
var request = require('request');

// Load the NPM Package request
var fs = require('fs');

// Saving keys into variables
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

// Takes in all of the command line arguments
var inputString = process.argv;
var command = inputString[2];

var liriBot = {

  songsearch: function() {

    if (songName === ""){
      songName = "The Sign Ace Of Base"
    };

      spotify
          .search({ type: 'track', query: songName, limit: 1 })
          .then(function(response) {
            var songInfo = response.tracks.items;
            console.log("-----------------SONG SEARCH--------------------------- ");
            console.log("Title: "+songInfo[0].name);
            console.log("Artist(s): "+songInfo[0].album.artists[0].name);
            console.log("Album: "+songInfo[0].album.name);
            console.log("Preview: "+songInfo[0].preview_url);
            liriBot.logOutput("Title: "+songInfo[0].name);
            liriBot.logOutput("Title: "+songInfo[0].name);
            liriBot.logOutput("Artist(s): "+songInfo[0].album.artists[0].name);
            liriBot.logOutput("Album: "+songInfo[0].album.name);
            liriBot.logOutput("Preview: "+songInfo[0].preview_url);

          })
          .catch(function(err) {
            console.log(err);
          });

  },

  movieSearch: function() {

    if (movieName === ""){
      movieName = "Mr. Nobody"
    };
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

      // If the request is successful
      if (!error && response.statusCode === 200) {
        
        console.log("----------------MOVIE SEARCH------------------ ")
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMBD Rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomato Score: " + JSON.parse(body).Ratings[1].Value);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Produced In: " + JSON.parse(body).Country);
        liriBot.logOutput("---------------------MOVIE SEARCH-------------------------- ")
        liriBot.logOutput("Title: " + JSON.parse(body).Title);
        liriBot.logOutput("Release Year: " + JSON.parse(body).Year);
        liriBot.logOutput("IMBD Rating: " + JSON.parse(body).Ratings[0].Value);
        liriBot.logOutput("Rotten Tomato Score: " + JSON.parse(body).Ratings[1].Value);
        liriBot.logOutput("Actors: " + JSON.parse(body).Actors);
        liriBot.logOutput("Plot: " + JSON.parse(body).Plot);
        liriBot.logOutput("Language: " + JSON.parse(body).Language);
        liriBot.logOutput("Produced In: " + JSON.parse(body).Country);
      }
    })
  },

  logOutput: function(update) {
    fs.appendFile('./log.txt', update+"\n", function (err) {
      if (err) throw err;
      console.log('Log File Updated!');
    });
  },

  clearLog: function() {
    fs.truncate('./log.txt', 0, function(){console.log('done')})
  },
};
// Shows last 20 tweets and when they were created at in your terminal/bash window.

if (command === "my-tweets") {

  console.log("-------------------Tweets from @zenjduke--------------------- ")
  
    var params = {zenjduke: 'nodejs'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (var i = 0; i<20; i++){
        console.log("Tweet: "+tweets[i].text)
        var date = tweets[i].created_at;
        var newDate = date.split(" ");
        var simpleDate = newDate[0]+ " " + newDate[1]+ " " + newDate[2]+ " " + newDate[5];
        console.log("Tweeted: "+simpleDate);
        }
      }
    });
}

else if (command === "spotify-this-song") {

  var songName = "";

  // Loop through all the words in the node input to create songName string for search

  for (var i = 3; i < inputString.length; i++) {

      if (i > 3 && i < inputString.length) {
        songName = songName + " " + inputString[i];
      }
      else {
        songName += inputString[i];}
      }
  // If no song is provided then your program will default to "The Sign" by Ace of Base.

    liriBot.songsearch();
    
}

else if (command === "movie-this") {
     // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    var movieName = "";
    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < inputString.length; i++) {

      if (i > 3 && i < inputString.length) {
        movieName = movieName + "+" + inputString[i];
      }
      else {
        movieName += inputString[i];
      }
    }
      liriBot.movieSearch();
}

else if (command === "do-what-it-says") {

  fs.readFile('./random.txt', function(err, data) {
    var data = " "+data;
    splitData = data.split(",");

    randomCommand = splitData[0].trim();
    songName = splitData[1].trim();
    movieName = splitData[1].trim();

    console.log(randomCommand);
    console.log(songName);

    if (randomCommand === "spotify-this-song") {
      liriBot.songsearch();
    }

    if (randomCommand === "movie-this") {
      liriBot.movieSearch();
    }
  });

}

else if (command === "clear-log") {
  liriBot.clearLog();
};

