import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spinner } from 'react-bootstrap';
import Navbar from "./NavBar";


class Effects extends Component {
  constructor(props) {
    //default prop state variables
    super(props);
    this.state = {
      genre: 'rock',
      downloaded: false,
      content:"",
      playlist:"",
      pos:0,
      list: ['rock', 'pop', 'electro', 'hiphop'],
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
    if(pos===4)
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
      pos=3
    }
    var genre=list[pos];
    this.setState({pos: pos });
    this.setState({genre: genre });
  }
  //submit genre
  play(e) {
    //set genre prop and downloaded prop
    var genre=this.state.genre;
    this.setState({ downloaded: true});
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
          <h3>{this.state.genre}</h3>
          <div>
          {/*icons to move, back forward or submit*/}
          <img className="controls" onClick={this.moveBack} src='rewind.svg' alt="back"/>
          <button className="b" onClick={this.play}>
            PLAY
          </button>
          <img className="controls right" onClick={this.moveForward} src='rewind.svg' alt="forward"/>
          </div>
          <br/>
          {/*when genre is chosen display links to pages*/}
          {(this.state.downloaded===true) &&
        (<div>
            {/*pass genre prop to new page*/}
          <Link to={{ pathname: "/oneplayer", genre: this.state.genre }}>
           <button className="b1">Single Player</button></Link>
        <Link to={{ pathname: "/twoplayer", genre: this.state.genre }}><button className="b1">Two Player</button></Link></div>)}
        </div>
        </div>
      );
  } 
}

export default Effects;
