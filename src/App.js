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
    this.char = "µ";
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
        // this is where all enemy information goes
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
          Atk: 5,
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
          this.entityTurn(this.state.entityContainer, this.state.playerPosition);
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
          this.entityTurn(this.state.entityContainer, this.state.playerPosition);
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
          this.entityTurn(this.state.entityContainer, this.state.playerPosition);
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
          this.entityTurn(this.state.entityContainer, this.state.playerPosition);
          break;
        } else { break; }
      default:
        break;
    }
  })

  initiateMeleeCombat(entityIndex) {
    this.setState({
      entityContainer: {
        ...this.state.entityContainer,
        [entityIndex]: {
          ...this.state.entityContainer[entityIndex],
          health: this.state.entityContainer[entityIndex].health - this.state.playerStatus.stats.Atk,
        }
      }
    })
    if (this.state.entityContainer[entityIndex].health - this.state.playerStatus.stats.Atk <= 0) {
      this.setState({
        entityContainer: {
          ...this.state.entityContainer,
          [entityIndex]: {
            ...this.state.entityContainer[entityIndex],
            alive: false,
            health: 0
          }
        }
      })
    }
  }

  entityTurn(entityObj, targetPosition) {

    let xDiff = null;
    let yDiff = null;
    let randChoice = null;

    for (const i in entityObj) {
      
      xDiff = entityObj[i].x - targetPosition.x
      yDiff = entityObj[i].y - targetPosition.y

      if (xDiff === 1) { 
        randChoice = false 
        } else if (yDiff === 1) { 
          randChoice = true 
        } else {                                                                 
          randChoice = Math.random() > 0.5 ? true : Math.random() > 0.1 ? false : null
        }

      if (randChoice === false) {
        yDiff > 1 ? this.setState({
          entityContainer: {
            ...this.state.entityContainer,
            [i]: { 
              ...entityObj[i],
              y: entityObj[i].y - 1 
            }
          }
        })
          : this.setState({ 
            entityContainer: { 
              ...this.state.entityContainer,
              [i]: { 
                ...entityObj[i],
                y: entityObj[i].y + 1 
              } 
            } 
          })
      }
      else if (randChoice === true) {
        xDiff > 1 ? this.setState({ 
          entityContainer: { 
            ...this.state.entityContainer,
            [i]: { 
              ...entityObj[i],
              x: entityObj[i].x - 1 
            } 
          } 
        }) 
        : this.setState({ 
          entityContainer: { 
            ...this.state.entityContainer,
            [i]: { 
              ...entityObj[i],
              x: entityObj[i].x + 1 
            } 
          } 
        })
      }
    }    
  }

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