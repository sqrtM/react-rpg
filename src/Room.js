import React from 'react';
// import Entity from './Entity';

/*
const playerStyle = {

}
*/


class Wall {
  constructor() {
    this.char = "#"
  }
}


class Room extends React.Component {

  render() {





    if (Object.keys(this.props.entityStatus).length) {
      for (let i in this.props.entityStatus) {
        this.props.roomArrProp[this.props.entityStatus[i].y][this.props.entityStatus[i].x] = this.props.entityStatus[i];
      }
    }

    // y and x need to be flipped from what you would naturally think.
    this.props.roomArrProp[this.props.playerPosition.y][this.props.playerPosition.x] = this.props.playerStatus;


    let arrayMap = (
      this.props.roomArrProp.map((i, index) => {
        switch (index) {
          case (index === 0 || index === this.props.roomArrProp.length - 1):
            return <div>{(this.props.roomArrProp[index].map((j) => new Wall()))}</div>;
          default:
            return <div>{(this.props.roomArrProp[index].map((j) => j.char))}</div>;
        }
      })
    )

    console.log(arrayMap, this.props.roomArrProp)

    return (
      <div className="room">
        {/* Top Wall; +2 because of the 
          addtional walls in the mapping function 
        {Array(this.props.columns + 2).fill("#")}
        */}

        {arrayMap}

        {/* Bottom Wall; +2 because of the 
          addtional walls in the mapping function
        {Array(this.props.columns + 2).fill("#")}
        */}


      </div>
    );
  }
}

export default Room;