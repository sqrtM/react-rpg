import React from 'react';
import './App.scss';

class Room extends React.Component {

  render() {

    // calculate how much of the map gets
    // rendered to the screen
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

    let timeOfDay = (turn) => {
      return (Math.abs((turn % 2400 / 2400) - (turn % 4800 / 4800))) * 15
    }

    let timeVar = timeOfDay(this.props.playerStatus.time)

    // refresh the map and calculate the light level 
    // of each tile based on player position

    // KNOWN ISSUE: WHEN YOU APPROACH THE EDGE OF THE MAP,
    // SINCE THE PLAYER IS NO LONGER IN THE MIDDLE OF THE SCREEN,
    // THE LIGHT LEVEL ISN'T RIGHT. FIND A WAY TO FIX THIS.
    let refreshView = (vp) => {
      for (let i = 0; i < vp.length; i++) {
        for (let j = 0; j < vp[i].length; j++) {
          let yDistFromPlayer = Math.abs(i - Math.floor(vp.length / 2)) / vp.length / 2;
          let xDistFromPlayer = Math.abs(j - Math.floor(vp[i].length / 2)) / vp[i].length / 2;
          vp[i][j].contents = {
            char: vp[i][j].defaultChar,
            lightLevel: 0.98 -((yDistFromPlayer > xDistFromPlayer ? yDistFromPlayer : xDistFromPlayer) * timeVar)
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
    //
    // btw, y and x need to be flipped from what you would naturally think
    // because we draw rows, then designate column
    if (Object.keys(this.props.entityStatus).length) {
      for (let i in this.props.entityStatus) {
        this.props.roomArrProp[this.props.entityStatus[i].y][this.props.entityStatus[i].x].contents = this.props.entityStatus[i];
      }
    }

    this.props.roomArrProp[this.props.playerPosition.y][this.props.playerPosition.x].contents = this.props.playerStatus;
    
    // is this readable? 
    // This is certainly more readable than it was...
    return (
      <div className="room">
        {defaultView.map((i, index) => 
        {return (
          <div key={`key-${index}`}>
            {(defaultView[index].map((j, jndex) => 
              <span key={`key-${jndex}`} 
                    className={`${j.style}`} 
                    style={{opacity: `${j.contents.lightLevel}`}}>
                {j.contents.char}
              </span>))}
          </div>
        );})}
      </div>
    );
  }
}

export default Room;