import React from 'react';
import './App.scss';
import Room from './Room'
import UI from './UI'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalColumns: 32,
      totalRows: 16,

      playerPosition: {
        x: 2,
        y: 6,
      },

      playerStatus: {
        name: "",
        title: "",
        race: "",

        health: {
          maxHealth: 100,
          currentHealth: 100,
        },
        mana: {
          maxMana: 20,
          currentMana: 20,
        },

        stats: {
          AC: 0,
          EV: 0,
          Int: 0,
          Dex: 0,
        },

        gold: 0,
      }
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
      <div id="container1">
        <UI status={this.state.playerStatus} />
        <Room columns={this.state.totalColumns} rows={this.state.totalRows} 
        playerPosition={this.state.playerPosition} />
      </div>
    );
  }
}

export default App;