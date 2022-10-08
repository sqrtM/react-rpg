import React from 'react';
import './App.scss';
import Room from './Room'
import UI from './UI'

// many many thanks to Joe Iddon's exceptionally concise
// and useful perlin generation algorithm here. 
// https://github.com/joeiddon/perlin
let perlin = {
  rand_vect: function(){
      let theta = Math.random() * 2 * Math.PI;
      return {x: Math.cos(theta), y: Math.sin(theta)};
  },
  dot_prod_grid: function(x, y, vx, vy){
      let g_vect;
      let d_vect = {x: x - vx, y: y - vy};
      if (this.gradients[[vx,vy]]){
          g_vect = this.gradients[[vx,vy]];
      } else {
          g_vect = this.rand_vect();
          this.gradients[[vx, vy]] = g_vect;
      }
      return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
  },
  smootherstep: function(x){
      return 6*x**5 - 15*x**4 + 10*x**3;
  },
  interp: function(x, a, b){
      return a + this.smootherstep(x) * (b-a);
  },
  seed: function(){
      this.gradients = {};
      this.memory = {};
  },
  get: function(x, y) {
      if (this.memory.hasOwnProperty([x,y]))
          return this.memory[[x,y]];
      let xf = Math.floor(x);
      let yf = Math.floor(y);
      //interpolate
      let tl = this.dot_prod_grid(x, y, xf,   yf);
      let tr = this.dot_prod_grid(x, y, xf+1, yf);
      let bl = this.dot_prod_grid(x, y, xf,   yf+1);
      let br = this.dot_prod_grid(x, y, xf+1, yf+1);
      let xt = this.interp(x-xf, tl, tr);
      let xb = this.interp(x-xf, bl, br);
      let v = this.interp(y-yf, xt, xb);
      this.memory[[x,y]] = v;
      return v;
  }
}
perlin.seed();

let globalID = 0;

class TileEmpty {
  constructor() {
    this.char = "."
  }
}

class TileWall {
  constructor() {
    this.char = "#"
  }
}

class TileWater {
  constructor() {
    this.char = "~"
  }
}

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
      totalColumns: 200,
      totalRows: 200,

    roomArray: (r, c) => {
      let arr = Array.from({ length: r }, () => 
      Array.from({ length: c }, () => 0));

      for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
          let v = perlin.get(i/r,j/c)
          if (v >= 0.6) {
            arr[i][j] = new TileWater()
          } else if (v <= 0) {
            arr[i][j] = new TileWall()
          } else {
            arr[i][j] = new TileEmpty()
          }
        }
      }

      return arr;
    },

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
          currentHealth: 43,
        },
        mana: {
          maxMana: 8,
          currentMana: 8,
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
            health: 0,
            char: ".",
          }
        }
      })
    }
  }

  // 1.) MAKE THIS MORE READABLE.
  // 2.) MAKE ENEMIES NOT STACK
  entityTurn(entityObj, targetPosition) {

    let entArr = [];
    let DummyObj = {};

    //Grabs all objects and assigns them an 
    //x and y distance from the target (player)
    //we then take all objects and push them
    //into a new array for easy iteration
    for (let i of Object.entries(entityObj)) {

      i[1].xDiff = i[1].x - targetPosition.x
      i[1].yDiff = i[1].y - targetPosition.y

      entArr.push(i);

    }


    entArr.forEach(i => {
      //enemies decide randomly if they want to
      //shorten their x or y distance to the player,
      //meaning they take basically a straight line,
      //but with some unpredictablility

      //false means Y direction, true means X direction.
      // currently the odds are 50 X, 40 Y, 10 do nothing
      if (i[1].xDiff === 0) {
        i[1].randChoice = false;
      } else if (i[1].yDiff === 0) {
        i[1].randChoice = true;
      } else {
        i[1].randChoice = Math.random() > 0.5 ? true : Math.random() > 0.1 ? false : null;
      }


      //We then take a dummy object and start assigning values to it
      //the same way we would assign state directly.

      //we do this with a dummy object because of the asyncronicity
      //of the setState function; this lets us update everything 
      //simultaneously much more easily.
      for (let j = 0; j < entArr.length; j++) {
        // if entity is not alive, do not move it
        if (entArr[j][1].alive) {
          if (entArr[j][1].randChoice === false) {
            //get the "jth" index of the entity array we made earlier
            //then take the first index of that (because the 0th index
            //is the NAME of the entity).
            entArr[j][1].yDiff >= 0 ? DummyObj = {
              ...DummyObj,
              [entArr[j][0]]: {
                ...entArr[j][1],
                y: entArr[j][1].y - 1
              }
            }
              : DummyObj = {
                ...DummyObj,
                [entArr[j][0]]: {
                  ...entArr[j][1],
                  y: entArr[j][1].y + 1
                }
              }
          }
          else if (entArr[j][1].randChoice === true) {
            entArr[j][1].xDiff >= 0 ? DummyObj = {
              ...DummyObj,
              [entArr[j][0]]: {
                ...entArr[j][1],
                x: entArr[j][1].x - 1
              }
            }
              : DummyObj = {
                ...DummyObj,
                [entArr[j][0]]: {
                  ...entArr[j][1],
                  x: entArr[j][1].x + 1
                }
              }
          }
        }
        //after the dummyobject is settled, then we 
        //can add it to state and update all other objects on screen.
        this.setState({
          entityContainer: {
            ...this.state.entityContainer,
            ...DummyObj
          }
        }, console.log(entArr[j][1]))
      }
    });
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
          roomArrProp={this.state.roomArray(this.state.totalRows, this.state.totalColumns)}
        />
      </div>
    );
  }
}


export default App;