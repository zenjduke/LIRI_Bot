# LIRI Bot

### Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.


### What Each Command Does

1. `npm run tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window.
   
   <img width="815" alt="liritweets" src="https://user-images.githubusercontent.com/35474050/43597989-42544866-9649-11e8-8f82-15a1b2c7015f.png">

2. `npm run song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then the program will default to "The Sign" by Ace of Base.
  
  <img width="815" alt="lirisong" src="https://user-images.githubusercontent.com/35474050/43598032-5e8e60f2-9649-11e8-8662-8b993d57d54f.png">

3. `npm run movie '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     

4. `npm run do-it`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * Feel free to change the text in that document to test out the feature for other commands.

###

Results are also added to the log.txt file, which may be cleared using the command "clear-log".
