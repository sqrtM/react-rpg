import React from 'react';
// import Entity from './Entity';

const playerStyle = {

}


class Room extends React.Component {

  render() {

    let arrayMap = Array.from({ length: this.props.rows }, () => 
    Array.from({ length: this.props.columns }, () => '.'));

    // y and x need to be flipped from what you would naturally think.
    arrayMap[this.props.playerPosition.y][this.props.playerPosition.x] = <span style={playerStyle} key={"player"}>{this.props.playerStatus.char}</span>;

    if (Object.keys(this.props.entityStatus).length) {
      for (let i in this.props.entityStatus) {
        arrayMap[this.props.entityStatus[i].y][this.props.entityStatus[i].x] = this.props.entityStatus[i].char;
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