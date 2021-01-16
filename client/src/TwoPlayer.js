import React, { Component } from "react";
import Pizzicato from 'pizzicato';
import { Link } from "react-router-dom";
import Navbar from "./NavBar";
import { pop } from "./files.json";
import { rock } from "./files.json";
import { electro } from "./files.json";
import { hiphop } from "./files.json";

class Game extends Component {
  constructor(props) {
    //default prop state variables
    super(props);
    this.state = {
      searchTerm: "",
      random: "",
      correct1: 0,
      correct2: 0,
      rounds: 0,
      play: false,
      ready: false,
      canClick: true,
      right: "red",
      guessed: true,
      lastSong: "",
      Songs: "",
      used: [],
    };
    this.onGuessChange = this.onGuessChange.bind(this);
    this.start = this.start.bind(this);
    this.begin = this.begin.bind(this);
    this.clear = this.clear.bind(this);
  }
  //set genre array of songs
  componentDidMount() {
    var _this = this;
    window.setTimeout(myFunction, 3000);
      //delay start of game to allow pizzicato to load
      function myFunction() {
        _this.setState({ ready: true });
      }
      //set Songs as passed in genre array
      var genre=this.props.location.genre;
      if(genre==="pop"){this.setState({Songs: pop});}
      else if(genre==="rock"){this.setState({Songs: rock});}
      else if(genre==="electro"){this.setState({Songs:electro});}
      else {this.setState({Songs:hiphop});}
  }
  //handles form input change
  onGuessChange(event) {
    let random = this.state.random.toLowerCase();
    let round = this.state.rounds;
    //if song name is correct increment correct and start new round
    if ((event.target.value.length >= 9 &&(random.includes(event.target.value.toLowerCase()))) || (random.toLowerCase() === event.target.value.toLowerCase())) {
      this.setState({ guessed: true });
      //if correct and player2's go increment correct2
      if(round%2===0)
      {
        let correct2 = this.state.correct2;
        correct2 = correct2 + 1;
        this.setState({ correct2: correct2 });
      }
      //if correct and player1's go increment correct1
      else{
        let correct1 = this.state.correct1;
        correct1 = correct1 + 1;
        this.setState({ correct1: correct1 });
      }
      if (round < 9) {
        this.start();
      }
      //if rounds equals 9 end game
      else {
        audio.stop();
        this.setState({ rounds: 9 });
      }
    }
    //update text-area input
    else{
    this.setState({ searchTerm: event.target.value });
    }
  }
  //reset game and call start
  begin() {
    this.setState({ rounds: 0 });
    this.setState({ correct1: 0 });
    this.start();
    audio.stop();
  }
  //stop sounds before leaving page
  clear() {
    audio.stop();
    noise.stop();
    this.props.history.push("/");
  }
  //plays new song
  start() {
    //resets text-area input
    this.setState({ searchTerm: "" });
    //temporarily disable next button
    this.setState({ canClick: false});
    //stop all songs playing
    noise.stop();
    audio.stop();
    var ran=this.state.random;
    //store previous song before changing
    this.setState({ lastSong: ran });
    let round = this.state.rounds;
    round = round + 1;
    //increment rounds
    this.setState({ rounds: round });
    //remove all effects
    audio.removeEffect(fastFlang);
    audio.removeEffect(slowFlang);
    audio.removeEffect(pitchRingMod);
    audio.removeEffect(regHighPass);
    audio.removeEffect(distortionRingMod);
    audio.removeEffect(regHighPass);
    audio.removeEffect(dubDelay);
    audio.removeEffect(reverseVerb);
    audio.removeEffect(telephoneHighPass);
    audio.removeEffect(telephoneLowPass);
    audio.removeEffect(slowTremolo);
    audio.removeEffect(shortVerb);
    audio.removeEffect(longVerb);
    audio.removeEffect(reverseVerb);
    audio.removeEffect(elvis);
    audio.removeEffect(distortion);
    audio.removeEffect(extremeDelay);
    audio.removeEffect(quadraFuzz);
    audio.removeEffect(fastTremolo);
    audio.removeEffect(slowFlang);
    audio.removeEffect(telephoneLowPass);
    audio.removeEffect(extremeLowPass);
    audio.removeEffect(elvis);
    audio.removeEffect(reverseVerb);
    //if game in play play new song
    if (round < 9) {
      let num = Math.floor(Math.random() * 15);
      this.setState({ play: false });
      var _this = this;
    //fetch next song details randomly from Songs array
    var used=this.state.used;
    var Songs=this.state.Songs;
    var song = Math.floor(Math.random() * Songs.length);
    //if used generate new song
    while(used.includes(song))
      {
        song=Math.floor(Math.random() * Songs.length);
      }
      used.push(song);
      this.setState({ used: used });
    let id = Songs[song].id; 
    let name = Songs[song].title; 
    this.setState({random: name});
          //set song and apply pizzicato effects
          audio = new Pizzicato.Sound({ 
            source: 'file',
            options: { path: '/songs/'+id +".mp3"}
        }, function() {
        if (audio !== undefined) {
        num = Math.floor(Math.random() * 15);
        if (num === 0) { //Fast Flanger
          audio.addEffect(fastFlang);
        }
        else if (num === 1) { //Slow Flanger
          audio.addEffect(slowFlang);
        }
        else if (num === 3) { //Ring Modulator + High-Pass
          audio.addEffect(pitchRingMod);
          audio.addEffect(regHighPass);
        }
        else if (num === 4) { //Ring Modulator + High-Pass
          audio.addEffect(distortionRingMod);
          audio.addEffect(regHighPass);
        }
        else if (num === 5) { //Dub Delay + Reversed Reverb
          audio.addEffect(dubDelay);
          audio.addEffect(reverseVerb);
        }
        else if (num === 6) { //Telephone Effect
          audio.addEffect(telephoneHighPass);
          audio.addEffect(telephoneLowPass);
        }
        else if (num === 7) { //Tremolo + White Noise
          audio.addEffect(slowTremolo);
          noise.play();
        }
        else if (num === 8) { //All 3 Reverbs
          audio.addEffect(shortVerb);
          audio.addEffect(longVerb);
          audio.addEffect(reverseVerb);
        }
        else if (num === 9) { //Distortion + Slap Delay
          audio.addEffect(elvis);
          audio.addEffect(distortion);
        }
        else if (num === 10) { //High Feedback Delay
          audio.addEffect(extremeDelay);
        }
        else if (num === 11) { //Quadrafuzz + Fast Tremelo
          audio.addEffect(quadraFuzz);
          audio.addEffect(fastTremolo);
        }
        else if (num === 12) { //Slow Flanger + Telephone Low Pass
          audio.addEffect(slowFlang);
          audio.addEffect(telephoneLowPass);
        }
        else if (num === 13) { //Extreme Low-Pass Filter
          audio.addEffect(extremeLowPass);
        }
        else if (num === 14) { //Slap Delay + Reversed Reverb
          audio.addEffect(elvis);
          audio.addEffect(reverseVerb);
        }
        //set colour depending on whether guessed right or wrong
        if(_this.state.guessed===true){
          _this.setState({ right: "green" });
        }
        else
        {
          _this.setState({ right: "red" });          
        }
        _this.setState({ guessed: false });
      } else {
          console.log("this was undefined");
      }
      audio.play();
    });
      window.setTimeout(myFunction, 5000);
    }
    function myFunction() {
     //re-enable next button
      _this.setState({ canClick: true });
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        {/*Display scoring information */}
        <div className="wrapper correct">
          <span className="dot">Player1 <br/>{this.state.correct1}</span>
          <img className="record" src="./record2.png" alt="record"/>
        </div>
        <h1 className="title">Melodify</h1>
        <div className="wrapper round">
          <span className="dot">Player2 <br/>{this.state.correct2}</span>
          <img className="record" src="./record2.png" alt="record"/>
        </div>
         <br />
        {/* If rounds odd player 1's go, even player 2's go */}
        {(this.state.rounds % 2!==0 && this.state.rounds < 9) && (<h3>Player 1's go</h3>)}
        {(this.state.rounds % 2===0 && this.state.rounds !== 0 && this.state.rounds < 9) && (<h3>Player 2's go</h3>)}
        {/* If there was a last song display this */}
        {( this.state.rounds > 1) && ( <p className={(this.state.right)}>The last song was <b>{this.state.lastSong}</b></p> )}
        <Play random={this.state.random} audio={this.state.audio} clear={this.clear} start={this.start} begin={this.begin} rounds={this.state.rounds} correct1={this.state.correct1} correct2={this.state.correct2} ready={this.state.ready} canClick={this.state.canClick} />
        {/*If game in play display input form*/}
        {(this.state.rounds < 9 && this.state.rounds>0) && (
          <div>
          <textarea 
            className="form"
            placeholder="Type your guess here"
            value={this.state.searchTerm}
            onChange={this.onGuessChange}
            type="text"
            cols="80"
            rows="1"
            />
        </div>
        )}
      </div>
    );
  }
}

class Play extends Component {
  render() {
    const start = this.props.start;
    const clear = this.props.clear;
    const begin = this.props.begin;
    const rounds = this.props.rounds;
    const correct1 = this.props.correct1;
    const correct2 = this.props.correct2;
    const ready = this.props.ready;
    const canClick = this.props.canClick;

    return (
      <div className="PlayDisplay">
        {/*If game is ready to be played show options*/}
        {(rounds < 9 && ready===true) && (
          <div>
            {/*Start game if not started yet*/}
            {(rounds === 0) &&
              (<button className="b1" onClick={begin}>Start</button>)}
            {/*Next round if already in play*/}
            {(rounds !== 0 && rounds < 9 && canClick === true) &&
              (<button className="b1" onClick={start}>Next</button>)}
            {/*Next is disabled here temoporaily*/}
            {(rounds !== 0 && rounds < 9 && canClick === false) &&
              (<button className="b1">Next</button>)}
            <button className="b1" onClick={clear}>New Genre</button>
            <p>The song will play with random effects applied to it</p>
          </div>
        )}

        {/*If game over show link back to genre page*/}
        {(rounds === 9 || ready===false) && (
          <div>
            {/*If game over display who won*/}
            {(rounds === 9) && (
              <div>
            <b>Game Over</b><br/>
            {(correct1 > correct2) && (
            <b>Player 1 won</b>
            )}
            {(correct1 < correct2) && (
            <b>Player 2 won</b>
            )}
            {(correct1 === correct2) && (
            <b>It's a draw</b>
            )}
            </div>)}
            <Link to="/effects"><button className="b1" onClick={clear}> New Genre</button></Link>
          </div>
        )}

      </div>
    );
  }
}

export default Game;


{/*default pizzicato global sound variable*/}
var audio = new Pizzicato.Sound('./noise.mp3');

//REVERBS REVERBS REVERBS REVERBS REVERBS REVERBS REVERBS REVERBS REVERBS REVERBS//
var shortVerb = new Pizzicato.Effects.Reverb({
  time: 1.32,
  decay: 1.3,
  reverse: false,
  mix: 0.6
});

var longVerb = new Pizzicato.Effects.Reverb({
  time: 3,
  decay: 3,
  reverse: false,
  mix: 0.7
});

var reverseVerb = new Pizzicato.Effects.Reverb({
  time: 2,
  decay: 2,
  reverse: true,
  mix: 0.8
});

//DELAYS DELAYS DELAYS DELAYS DELAYS DELAYS DELAYS DELAYS DELAYS DELAYS DELAYS//
var dubDelay = new Pizzicato.Effects.DubDelay({
  feedback: 0.75,
  time: 3.5,
  cutoff: 2700,
  mix: 0.5
});

var elvis = new Pizzicato.Effects.Delay({
  feedback: 0.1,
  time: 0.1,
  mix: 0.5,
})

var extremeDelay = new Pizzicato.Effects.Delay({
  feedback: 0.5,
  time: 0.3,
  mix: 0.5
});

var pingPong = new Pizzicato.Effects.PingPongDelay({
  feedback: 0.6,
  time: 1,
  mix: 0.7
});

//FILTERS FILTERS FILTERS FILTERS FILTERS FILTERS FILTERS FILTERS FILTERS FILTERS//
var telephoneLowPass = new Pizzicato.Effects.LowPassFilter({
  //Combine with telephoneHighPass for telephone effect
  frequency: 2000,
  peak: 10
});

var telephoneHighPass = new Pizzicato.Effects.HighPassFilter({
  //Combine with telephoneLowPass for telephone effect
  frequency: 700,
  peak: 10
});

var regLowPass = new Pizzicato.Effects.LowPassFilter({
  frequency: 12000,
  peak: 10
});

var regHighPass = new Pizzicato.Effects.HighPassFilter({
  frequency: 200,
  peak: 10
});

var extremeLowPass = new Pizzicato.Effects.LowPassFilter({
  frequency: 100,
  peak: 10
});

//DISTORTION DISTORTION DISTORTION DISTORTION DISTORTION DISTORTION DISTORTION//
var distortion = new Pizzicato.Effects.Distortion({
  gain: 0.95
});

var distortionRingMod = new Pizzicato.Effects.RingModulator({
  speed: 125,
  distortion: 6,
  mix: 0.1
});

var pitchRingMod = new Pizzicato.Effects.RingModulator({
  speed: 2000,
  distortion: 2.6,
  mix: 0.3
});

var quadraFuzz = new Pizzicato.Effects.Quadrafuzz({
  lowGain: 1,
  midLowGain: 1,
  midHighGain: 1,
  highGain: 0.2,
  mix: 0.9
});

//OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER//
var noise = new Pizzicato.Sound('./noise.mp3');
noise.volume = 0.3;

var slowFlang = new Pizzicato.Effects.Flanger({
  time: 1,
  speed: 0.2,
  depth: 1,
  feedback: 0.45,
  mix: 1
});

var fastFlang = new Pizzicato.Effects.Flanger({
  time: 1,
  speed: 0.8,
  depth: 1,
  feedback: 0.6,
  mix: 1
});

var slowTremolo = new Pizzicato.Effects.Tremolo({
  speed: 1.2,
  depth: 1,
  mix: 1
});

var fastTremolo = new Pizzicato.Effects.Tremolo({
  speed: 20,
  depth: 1,
  mix: 1
});
