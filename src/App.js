import React from 'react';
import './App.scss';
import Room from './Room'
import UI from './UI'

let globalID = 0;

class Entity {
  constructor(xPos, yPos, health) {
    this.position = {
      x: xPos,
      y: yPos
    };
    this.health = health;
    this.char = "R";
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalColumns: 32,
      totalRows: 18,

      playerPosition: {
        x: 2,
        y: 6,
      },

      entityContainer: {

      },


      playerStatus: {
        name: "",
        title: "",
        race: "",

        health: {
          maxHealth: 43,
          currentHealth: 16,
        },
        mana: {
          maxMana: 8,
          currentMana: 1,
        },

        stats: {
          AC: 0,
          EV: 0,
          Int: 0,
          Dex: 0,
          Spd: 1,
        },

        time: 0,
        gold: 0,

        char: "@",
      }
    }
  }

  initiateMeleeCombat(entityIndex) {
    this.setState({
      entityContainer: {
        ...this.state.entityContainer,
        [entityIndex]: {
          ...this.state.entityContainer[entityIndex],
          health: this.state.entityContainer[entityIndex].health - 5,
        }
      }
    })
    if (this.state.entityContainer[entityIndex].health <= 0) {
      this.setState({
        entityContainer: {
          ...this.state.entityContainer,
          [entityIndex]: {
            ...this.state.entityContainer[entityIndex],
            alive: false,
          }
        }
      })
    }
  }

  handleTurnActions = window.addEventListener("keydown", (e) => {
    // movement and collision checking when player moves
    switch (e.key) {
      case "ArrowUp":
        if (this.state.playerPosition.y > 0) {
          if (Object.keys(this.state.entityContainer).length > 0) {
            for (let i in this.state.entityContainer) {
              if ((this.state.entityContainer[i].x === this.state.playerPosition.x && this.state.entityContainer[i].y === this.state.playerPosition.y - 1) && this.state.entityContainer[i].alive) {
                this.initiateMeleeCombat(i);
                return;
              }
            }
          }
          this.setState({
            playerPosition: { ...this.state.playerPosition, y: this.state.playerPosition.y - 1 },
            playerStatus: { ...this.state.playerStatus, time: +(this.state.playerStatus.time + this.state.playerStatus.stats.Spd).toFixed(2) },
          });
          break;
        } else { break; }
      case "ArrowDown":
        if (this.state.playerPosition.y < this.state.totalRows - 1) {
          if (Object.keys(this.state.entityContainer).length > 0) {
            for (let i in this.state.entityContainer) {
              if ((this.state.entityContainer[i].x === this.state.playerPosition.x && this.state.entityContainer[i].y === this.state.playerPosition.y + 1) && this.state.entityContainer[i].alive) {
                this.initiateMeleeCombat(i);
                return;
              }
            }
          }
          this.setState({
            playerPosition: { ...this.state.playerPosition, y: this.state.playerPosition.y + 1 },
            playerStatus: { ...this.state.playerStatus, time: +(this.state.playerStatus.time + this.state.playerStatus.stats.Spd).toFixed(2) },
          });
          break;
        } else { break; }
      case "ArrowLeft":
        if (this.state.playerPosition.x > 0) {
          if (Object.keys(this.state.entityContainer).length > 0) {
            for (let i in this.state.entityContainer) {
              if ((this.state.entityContainer[i].x === this.state.playerPosition.x - 1 && this.state.entityContainer[i].y === this.state.playerPosition.y) && this.state.entityContainer[i].alive) {
                this.initiateMeleeCombat(i);
                return;
              }
            }
          }
          this.setState({
            playerPosition: { ...this.state.playerPosition, x: this.state.playerPosition.x - 1 },
            playerStatus: { ...this.state.playerStatus, time: +(this.state.playerStatus.time + this.state.playerStatus.stats.Spd).toFixed(2) },
          });
          break;
        } else { break; }
      case "ArrowRight":
        if (this.state.playerPosition.x < this.state.totalColumns - 1) {
          if (Object.keys(this.state.entityContainer).length > 0) {
            for (let i in this.state.entityContainer) {
              if ((this.state.entityContainer[i].x === this.state.playerPosition.x + 1 && this.state.entityContainer[i].y === this.state.playerPosition.y) && this.state.entityContainer[i].alive) {
                this.initiateMeleeCombat(i);
                return;
              }
            }
          }
          this.setState({
            playerPosition: { ...this.state.playerPosition, x: this.state.playerPosition.x + 1 },
            playerStatus: { ...this.state.playerStatus, time: +(this.state.playerStatus.time + this.state.playerStatus.stats.Spd).toFixed(2) },
          });
          break;
        } else { break; }
      default:
        break;
    }
  })

  spawnerFunction = () => {

    let thisEntity = new Entity(Math.floor(Math.random() * this.state.totalColumns), Math.floor(Math.random() * this.state.totalRows), Math.trunc(Math.random() * 100))

    this.setState({
      entityContainer: {
        ...this.state.entityContainer,
        ["entity" + globalID++]: {
          health: thisEntity.health,
          x: thisEntity.position.x,
          y: thisEntity.position.y,
          char: thisEntity.char,
          alive: true,
        }
      }
    })
    console.log(this.state.entityContainer)

  }



  render() {
    return (
      <div id="container1">
        <UI status={this.state.playerStatus} spawnMonster={this.spawnerFunction.bind(this)}
          entityStatus={this.state.entityContainer}
        />

        <Room columns={this.state.totalColumns} rows={this.state.totalRows}
          playerPosition={this.state.playerPosition} playerStatus={this.state.playerStatus}
          entityStatus={this.state.entityContainer} globalID={globalID}
        />
      </div>
    );
  }
}

export default App;