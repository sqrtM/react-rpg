import React from 'react';
// import Entity from './Entity';

class Room extends React.Component {
  constructor(props) {
    super(props);
    }

  render() {
    return (
      <div className="room">
        {/* Top Wall; +2 because of the 
        addtional walls in the mapping function */}
        {Array(this.props.columns + 2).fill("#")}

        {/* the hashes at the front and back 
        create a wall on each side of array.
        the map function fills out the array 
        depending upon how 
        large we want the room to be */}
        {
          Array(this.props.rows).fill(".").map(
          (i, index) => index === this.props.playerPosition.y
          ? <div key={index}>{"#"}
            {Array(this.props.columns).fill(".").map(
              (i, index) => index === this.props.playerPosition.x ? "@" : "."
            )}
            {"#"}</div>  
          : <div key={index}>{"#"}
            {Array(this.props.columns).fill(".")}
            {"#"}</div>          
          )}

        {/* Bottom Wall; +2 because of the 
        addtional walls in the mapping function */}
        {Array(this.props.columns + 2).fill("#")}
      </div>
    );
  }
}

export default Room;