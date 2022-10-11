import React from 'react';
import './App.scss';

class Room extends React.Component {

  render() {

    let viewport = (x, y) => {

      let pY = this.props.playerPosition.y;
      let pX = this.props.playerPosition.x;
      let yRange = Math.floor(y/2);
      let xRange = Math.floor(x/2);
      let leftHandSideView = 0;
      if (pX < xRange) { xRange = pX; leftHandSideView = x - (pX + Math.floor(x/2)) }
  
      let arr = [];
      for (let i = pY - yRange; i < pY + yRange + 1; i++) {
        if (i <= 0) { i = 0 }
        if (i > this.props.rows - 1) { i = this.props.rows - 1; break }
          arr.push(this.props.roomArrProp[i].slice(pX - xRange, pX + xRange + 1 + leftHandSideView))
      }
      return arr;
    }

    let refreshView = (vp) => {
      for (let i = 0; i < vp.length; i++) {
        for (let j = 0; j < vp[i].length; j++) {
          vp[i][j].contents = {
            char: vp[i][j].defaultChar,
          }
        }
      }
    }

    // every turn, we decide how big  
    // the view is, and we ONLY UPDATE
    // the squares in view. 

    let defaultView = viewport(50,18);
    refreshView(defaultView)

    // then, we add all the entities which should be on screen,
    // starting with entities, then the player

    // btw, y and x need to be flipped from what you would naturally think.

    if (Object.keys(this.props.entityStatus).length) {
      for (let i in this.props.entityStatus) {
        this.props.roomArrProp[this.props.entityStatus[i].y][this.props.entityStatus[i].x].contents = this.props.entityStatus[i];
      }
    }

    this.props.roomArrProp[this.props.playerPosition.y][this.props.playerPosition.x].contents = this.props.playerStatus;
    
    let lightLevel = Math.floor(this.props.playerStatus.time / 60) < 15 ? "medium" : Math.floor(this.props.playerStatus.time / 60) < 30 ? "heavy" : Math.floor(this.props.playerStatus.time / 60) < 45 ? "medium" : "light"

    return (
      <div className="room">
        {defaultView.map((i, index) => {return <div key={`key-${index}`} className={lightLevel}>{(defaultView[index].map((j, jndex) => <span key={`key-${jndex}`} className={`${j.style}`}>{j.contents.char}</span>))}</div>;})}
      </div>
    );
  }
}

export default Room;