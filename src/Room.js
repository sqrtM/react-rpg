import React from 'react';
// import Entity from './Entity';

class Room extends React.Component {

  render() {

    let arrayMap = Array.from({ length: this.props.rows }, () => 
    Array.from({ length: this.props.columns }, () => '.'));

    // y and x need to be flipped from what you would naturally think.
    arrayMap[this.props.playerPosition.y][this.props.playerPosition.x] = `${this.props.playerStatus.char}`;

    if (Object.keys(this.props.entityStatus).length > 1) {
      for (let i in this.props.entityStatus) {
        arrayMap[i.y][i.x] = `x`;
        console.log("hi")
      }
    }

    return (
      <div className="room">
        {/* Top Wall; +2 because of the 
        addtional walls in the mapping function */}
        {Array(this.props.columns + 2).fill("#")}

        {arrayMap.map((i, index) => <div key={`key-${index}`}>#{i}#</div>)}

        {/* Bottom Wall; +2 because of the 
        addtional walls in the mapping function */}
        {Array(this.props.columns + 2).fill("#")}
      </div>
    );
  }
}

export default Room;