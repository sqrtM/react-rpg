import React from 'react';
import './App.scss';

// import Entity from './Entity';

/*
const playerStyle = {

}
*/




class Room extends React.Component {

  render() {

    if (Object.keys(this.props.entityStatus).length) {
      for (let i in this.props.entityStatus) {
        this.props.roomArrProp[this.props.entityStatus[i].y][this.props.entityStatus[i].x] = this.props.entityStatus[i];
      }
    }

    // y and x need to be flipped from what you would naturally think.
    this.props.roomArrProp[this.props.playerPosition.y][this.props.playerPosition.x] = this.props.playerStatus;

    let viewport = (x, y) => {
      let pY = this.props.playerPosition.y;
      let pX = this.props.playerPosition.x;
      let yRange = Math.floor(y/2);
      let xRange = Math.floor(x/2);
      let leftHandSideView = 0;
      if (pX < xRange) { xRange = pX; leftHandSideView = x - (pX + Math.floor(x/2)) }
  
      let arr = [];
      for (let i = pY - yRange; i < pY + yRange + 1; i++) {
        if (i <= 0) {i = 0}
        if (i > this.props.rows - 1) { i = this.props.rows - 1; break }
          arr.push(this.props.roomArrProp[i].slice(pX - xRange, pX + xRange + 1 + leftHandSideView))
      }
    
      return arr;
    }
    
    let defaultView = viewport(35,17)







    //let arrayMap = (this.props.roomArrProp.map((i, index) => {return <div>{(this.props.roomArrProp[index].map((j) => j.char))}</div>;}))
    console.log(defaultView)



    return (
      <div className="room">

        {defaultView.map((i, index) => {return <div key={`key-${index}`}>{(defaultView[index].map((j) => <span className={`${j.style}`}>{j.char}</span>))}</div>;})}

      </div>
    );
  }
}

export default Room;