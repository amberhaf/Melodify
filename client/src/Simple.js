import React, { Component } from "react";
import Navbar from "./NavBar";
import ReactPlayer from 'react-player'

class Simple extends Component {
    constructor(props) {
        //default prop state variables
        super(props);
        this.state = {
            searchTerm: "",
            random: "",
            url: "",
            globalArray: "",
            correct: 0,
            rounds: 0,
            lastSong: "",
            used: [],
        };
        this.onGuessChange = this.onGuessChange.bind(this);
        this.start = this.start.bind(this);
        this.begin = this.begin.bind(this);
    }

    //sets global array as the genre prop passed in
    componentDidMount() {
        var _this = this;
        this.setState({globalArray: this.props.location.playlist});
        window.setTimeout(myFunction, 2000);
        //delay start of game to allow pizzicato to load
        function myFunction() {
            _this.setState({ ready: true });
        }
    }

    //handles form input change
    onGuessChange(event) {
        let random = this.state.random.toLowerCase();
        let correct = this.state.correct;
        let round = this.state.rounds;
        correct = correct + 1;
        //if song name is correct increment correct and start new round
        if ((event.target.value.length >= 8 && (random.includes(event.target.value.toLowerCase()))) || (random.toLowerCase() === event.target.value.toLowerCase())) {
            this.setState({ correct: correct });
            this.setState({ searchTerm: "" });
            if (round < 9) {
                this.start();
            }
            //if rounds equals 9 end game
            else {
                this.setState({ rounds: 9 });
            }
        }
        //update text-area input
        else {
            this.setState({ searchTerm: event.target.value });
        }
    }
    //reset game and call start
    begin() {
        this.setState({ rounds: 0 });
        this.setState({ correct: 0 });
        if(this.state.rounds===0)
        {
            this.start();
        }
    }
    //plays new song
    start() {
        //resets text-area input
        this.setState({ searchTerm: "" });
        var ran=this.state.random;
        //store previous song before changing
        this.setState({ lastSong: ran });
        var globalArray=this.state.globalArray;
        let num =  Math.floor(Math.random() * globalArray.length);
        var used=this.state.used;
        //check if song has been used already
        while(used.includes(num))
          {
            num= Math.floor(Math.random() * globalArray.length);
          }
          used.push(num);
          this.setState({ used: used });
        //set random to random name
        let random = globalArray[num].title;
        //set stream to random url
        let url = globalArray[num].id;
        console.log(url);
        this.setState({ url: "https://www.youtube.com/watch?v=" + url });
        this.setState({ random: random });
        let round = this.state.rounds;
        round = round + 1;
        this.setState({ rounds: round });
        //if game is over don't stream anything
        if(round===9){
            this.setState({ url: "" });
        }
    }

    render() {
        return (
            <div className="App">
                <Navbar />
                {/*Display scoring information */}
                <div className="wrapper correct">
                    <span className="dot">Correct<br/>{this.state.correct}</span>
                    <img className="record" src="./record2.png"  alt="record"/>
                </div>
                <h1 className="title">Melodify</h1>
                <div className="wrapper round">
                    <span className="dot">Round<br/>{this.state.rounds}</span>
                    <img className="record" src="./record2.png"  alt="record"/>
                </div>
                <br />
                {/* If there was a last song display this */}
                {( this.state.rounds > 1) && ( <p>The last song was <b>{this.state.lastSong}</b></p> )}
                <Play random={this.state.random} url={this.state.url} start={this.start} begin={this.begin} rounds={this.state.rounds} correct={this.state.correct} />
                {/*If game in play display input form*/}
                {(this.state.rounds < 9 && this.state.rounds > 0) && (
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
        const url = this.props.url;
        const begin = this.props.begin;
        const rounds = this.props.rounds;
        const correct = this.props.correct;

        return (
            <div className="PlayDisplay">
                {(
                    <div>
                        {/*If game in play click next round*/}
                        {(rounds < 9 && rounds !== 0) &&
                        (<button className="b1" onClick={start}>Next</button>)}
                        {/*Start new game*/}
                        <button className="b1" onClick={begin}>New Game</button>
                    </div>
                )}
              {/*If game over display score*/}
                {(rounds === 9) && (
                    <div>
                        <b>Game Over</b><br/>
                        <b>You got {correct} out of 8</b>
                    </div>
                )}
                {/*React player to stream youtube video*/}
                <ReactPlayer
                    url={url}
                    playing={true}
                    width="0"
                    height="0"
                />
            </div>
        );
    }
}

export default Simple;