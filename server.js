{/*use express module*/}
const express = require('express');
{/*use morgan module*/}
const morgan = require('morgan');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(morgan('tiny'));
{/*enable cors*/}
var cors = require('cors')
app.use(cors())
{/*use ytpl library*/}
var ytpl = require('ytpl');

//Download 8 random songs from youtube playlist
function downloadByPlaylist(input, callback) {
  var count = 0;
  //get playlist details
  ytpl(input).then(playlist => {
      var response = playlist.items
      console.log(playlist.items[0].title);
      //add song to downloaded songs array
      //if 8 songs have been downloaded callback that download is complet
        callback(response);  
  }).catch(err => {
    console.error(err);
  });
}

//recieves playlist request using express
app.post('/api/choosePlaylist', async function (req, res) {
  results = [];
  var input = req.body.genre;
  //sends back response once it is recieved
  downloadByPlaylist(input, function(response) {
    res.json(response); 
    res.end();
  })
});

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
const PORT = process.env.PORT || 5000; // Step 1
app.listen(PORT, console.log(`Server is starting at ${PORT}`));