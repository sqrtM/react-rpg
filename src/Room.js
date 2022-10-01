import React from 'react';
// import Entity from './Entity';

class Room extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalColumns: 32,
      totalRows: 16,

      playerPosition: {
        x: 2,
        y: 6,
      },
    }
  }

  handleKeyDown = window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (this.state.playerPosition.y > 0) {
        this.setState({
          playerPosition: {
            y: this.state.playerPosition.y - 1,
            x: this.state.playerPosition.x,
          }
        });
        break;
      } else { break; }
      case "ArrowDown":
        if (this.state.playerPosition.y < this.state.totalRows - 1) {
        this.setState({
          playerPosition: {
            y: this.state.playerPosition.y + 1,
            x: this.state.playerPosition.x,
          }
        });
        break;
      } else { break; }
      case "ArrowLeft":
        if (this.state.playerPosition.x > 0) {
        this.setState({
          playerPosition: {
            x: this.state.playerPosition.x - 1,
            y: this.state.playerPosition.y,
          }
        });
        break;
      } else { break; }
      case "ArrowRight":
        if (this.state.playerPosition.x < this.state.totalColumns - 1) {
        this.setState({
          playerPosition: {
            x: this.state.playerPosition.x + 1,
            y: this.state.playerPosition.y,
          }
        });
        break;
      } else { break; }
      default:
        break;
    }
  })

  render() {
    return (
      <div className="room">
        {/* Top Wall; +2 because of the 
        addtional walls in the mapping function */}
        {Array(this.state.totalColumns + 2).fill("#")}

        {/* the hashes at the front and back 
        create a wall on each side of array.
        the map function fills out the array 
        depending upon how 
        large we want the room to be */}
        {
          Array(this.state.totalRows).fill(".").map(
          (i, index) => index === this.state.playerPosition.y
          ? <div key={index}>{"#"}
            {Array(this.state.totalColumns).fill(".").map(
              (i, index) => index === this.state.playerPosition.x ? "@" : "."
            )}
            {"#"}</div>  
          : <div key={index}>{"#"}
            {Array(this.state.totalColumns).fill(".")}
            {"#"}</div>          
          )}

        {/* Bottom Wall; +2 because of the 
        addtional walls in the mapping function */}
        {Array(this.state.totalColumns + 2).fill("#")}
      </div>
    );
  }
}

export default Room;