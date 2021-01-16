import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spinner } from 'react-bootstrap';
import Navbar from "./NavBar";
import { pop } from "./files.json";
import { rock } from "./files.json";
import { electro } from "./files.json";
import { hiphop } from "./files.json";

class Genre extends Component {
  constructor(props) {
    //default prop state variables
    super(props);
    this.state = {
      genre: 'custom',
      downloaded: false,
      content:"",
      playlist:"",
      pos:0,
      downloading: false,
      list: [ 'custom','rock', 'pop', 'electro', 'hiphop']
    };
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.moveForward = this.moveForward.bind(this);
    this.moveBack = this.moveBack.bind(this);
    this.play = this.play.bind(this);
  }
  componentDidMount() {
    this.setState({ downloaded: false});;
  }
  //handle playlist form input change
  handleChangeContent(e) {
    this.setState({
      content: e.target.value
    });
  }
  //move forward in genre array to display next genre
  moveForward(e) {
    var pos=this.state.pos;
    var list=this.state.list;
    pos++;
    if(pos===5)
    {
      pos=0;
    }
    var genre=list[pos];
    this.setState({pos: pos });
    this.setState({genre: genre });
  }
  //move back in genre array to display previous genre
  moveBack(e) {
    var pos=this.state.pos;
    var list=this.state.list;
    pos--;
    if(pos===-1)
    {
      pos=4
    }
    var genre=list[pos];
    this.setState({pos: pos });
    this.setState({genre: genre });
  }
  //submit genre
  play(e) {
    //set downloading variable to in progress
    var _this = this;
    var genre=this.state.genre;
    //if playlist send url to server choosePlaylist end point
    if(genre==="custom")
    {
      this.setState({ downloaded: false});
      this.setState({ downloading: true});
      var content=this.state.content;
      fetch('/api/choosePlaylist' , {
      method: "POST",
      headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
        },
        body: JSON.stringify({genre: content})
    }).then(response => response.json())
    .then(function(data){
      //when response returned update playlist prop with data 
      _this.setState({ playlist: data});
     //update downloading and downloaded prop
      _this.setState({ downloaded: true});
      _this.setState({ downloading: false});
    })
    .catch((error) => {
      console.error('Error:', error);
      _this.setState({ downloading: false});
    });
    }
    //if not playlist set playlist prop to correct genre part of file.json
    else
    {
      this.setState({ downloaded: true});
      if(genre==="pop"){this.setState({playlist: pop});}
      else if(genre==="rock"){this.setState({playlist: rock});}
      else if(genre==="electro"){this.setState({playlist: electro});}
      else if(genre==="hiphop"){this.setState({playlist: hiphop});}
    }
  }

  render() {
      return(
        <div className="App">
          <Navbar/>
           <div>
          <h1>Choose Game</h1>
          {/*display whatever genre the uset is on*/}
          {(this.state.genre==='pop') &&
          (
          <img className='genre' src='./pop.jpg'  alt="pop"/>
          )}
          {(this.state.genre==='rock') &&
          (
          <img className='genre' src='./rock.jpg'  alt="rock"/>
          )}
          {(this.state.genre==='hiphop') &&
          (
          <img className='genre' src='./hiphop.jpg'  alt="hiphop"/>
          )}
          {(this.state.genre==='electro') &&
          (
          <img className='genre' src='./electro.jpg'  alt="electro"/>
          )}
          {(this.state.genre==='custom') &&
          (
          <img className='genre' src='./custom.jpg'  alt="custom"/>
          )}
          <h3>{this.state.genre}</h3>
          {/*if on custom display playlist form*/}
          {(this.state.genre==='custom') &&
          (
            <div >
            <textarea 
            className="form"
            placeholder="Enter Playlist url"
            onChange={this.handleChangeContent}
            value={this.state.content}
              type="text"
              cols="80"
              rows="1"
              />
          </div>
          )}
          <div>
          {/*icons to move, back forward or submit*/}
          <img className="controls" onClick={this.moveBack} src='rewind.svg' alt="back"/>
          {(this.state.downloading===false) && (
          <button className="b" onClick={this.play}>
            PLAY
          </button>
          )}
          {/*display react-bootstrap spinner if request is in progress*/}
          {(this.state.downloading===true) && (
          <Spinner className="loading" animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          )}
          <img className="controls right" onClick={this.moveForward} src='rewind.svg' alt="forward"/>
          </div>
          <br/>
          {/*when genre is chosen display links to pages*/}
          {(this.state.downloaded===true) &&
        (<div>
          {/*pass genre prop to new page*/}
          <Link to={{ pathname: "/simple", playlist: this.state.playlist, genre: this.state.genre}}>
           <button className="b1">Single Player</button></Link></div>)}
        </div>
        </div>
      );
  } 
}

export default Genre;
