import React from 'react';
import './App.scss';
import Room from './Room'
import UI from './UI'
import TextLog from './textLog'
import tiles from './classes/tiles'
import decendStaircase from './decendStaircase'

/* 
NOTES : 
Obviously, dungeon generation is at a total stand-still 
until I can figure out what I want to do with that. consider
that on pause.

We fixed combat, but now we need to add all the other things 
that make combat worth doing. loot tables, XP, defense calculations,
the whole 9 yards. be thinking about that. 
*/

let perlin = {
  // many many thanks to Joe Iddon's exceptionally concise
  // and useful perlin generation algorithm here. 
  // https://github.com/joeiddon/perlin
  rand_vect: function () {
    let theta = Math.random() * 2 * Math.PI;
    return { x: Math.cos(theta), y: Math.sin(theta) };
  },
  dot_prod_grid: function (x, y, vx, vy) {
    let g_vect;
    let d_vect = { x: x - vx, y: y - vy };
    if (this.gradients[[vx, vy]]) {
      g_vect = this.gradients[[vx, vy]];
    } else {
      g_vect = this.rand_vect();
      this.gradients[[vx, vy]] = g_vect;
    }
    return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
  },
  smootherstep: function (x) {
    return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
  },
  interp: function (x, a, b) {
    return a + this.smootherstep(x) * (b - a);
  },
  seed: function () {
    this.gradients = {};
    this.memory = {};
  },
  get: function (x, y) {
    if (this.memory.hasOwnProperty([x, y]))
      return this.memory[[x, y]];
    let xf = Math.floor(x);
    let yf = Math.floor(y);
    //interpolate
    let tl = this.dot_prod_grid(x, y, xf, yf);
    let tr = this.dot_prod_grid(x, y, xf + 1, yf);
    let bl = this.dot_prod_grid(x, y, xf, yf + 1);
    let br = this.dot_prod_grid(x, y, xf + 1, yf + 1);
    let xt = this.interp(x - xf, tl, tr);
    let xb = this.interp(x - xf, bl, br);
    let v = this.interp(y - yf, xt, xb);
    this.memory[[x, y]] = v;
    return v;
  }
}; perlin.seed();

let globalID = 0;

class Entity {
  constructor(xPos, yPos, health) {
    this.position = {
      x: xPos,
      y: yPos
    };
    this.health = health;
    this.char = "m";
  }
}

class Tile {

  type;
  properties;
  visuals;

  constructor(i) {
    Object.assign(this, i);
  }
}

let newArr = [];
let col = 250;
let row = 250;

// initalize the overworld
(function (r = row, c = col) {
  let arr = Array.from({ length: r }, () =>
    Array.from({ length: c }, () => 0));

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      let v = perlin.get(i / c * (c >>> 4), j / r * (r >>> 4));
      if (v >= 0.4) {
        arr[i][j] = new Tile(tiles.TileWall)
      } else if (v > 0.25) {
        arr[i][j] = new Tile(tiles.TileMountain)
      } else if (v >= 0.2) {
        arr[i][j] = new Tile(tiles.TileSlope)
      } else if (v >= 0) {
        arr[i][j] = new Tile(tiles.TileEmpty)
      } else if (v >= -0.1) {
        arr[i][j] = new Tile(tiles.TileShore)
      } else if (v >= -0.4) {
        arr[i][j] = new Tile(tiles.TileWater)
      } else { arr[i][j] = new Tile(tiles.TileDeepWater) }
    }
  }
  arr[5][5] = new Tile(tiles.TileStairDown)
  newArr = [...arr];
})()

class App extends React.Component {
  constructor(props) {
    super(props);

    this.spawnerFunction = this.spawnerFunction.bind(this);
    this.mapHover = this.mapHover.bind(this);


    this.state = {
      totalColumns: col,
      totalRows: row,

      roomArray: [...newArr],

      mapMemory: {
        overworld: [...newArr],
      },

      playerPosition: {
        x: 200,
        y: 200,
      },

      entityContainer: {
        // this is where all enemy information goes
      },


      playerStatus: {
        name: "Largo",
        title: "Draeneï",
        race: "Draeneï",
        cult: "Lordran",

        bars: {
          health: {
            maxHealth: 43,
            currentHealth: 43,
          },
          mana: {
            maxMana: 8,
            currentMana: 8,
          },
          hunger: {
            maxHunger: 100,
            currentHunger: 100,
          },
          sanity: {
            maxSanity: 10,
            currentSanity: 10,
          },
          rage: {
            maxRage: 25,
            currentRage: 0,
          },
        },

        stats: {
          AC: 3,
          EV: 9,
          Atk: 5,
          Int: 4,
          Dex: 2,
          //      speed may be paradoxical
          // the higher it is, the slower you go
          Spd: 1,
        },
        type: "player",
        char: "@",
        style: "playerStyle",
        lightLevel: 1,
      },

      globals: {
        time: 0,
        gold: 0,
      },

      tileDisplay: null

    }
  }

  handleTurnActions = window.addEventListener("keydown", (e) => {
    // movement and collision checking when player moves
    let timeVar = +((this.state.globals.time + this.state.playerStatus.stats.Spd * this.state.roomArray[this.state.playerPosition.y][this.state.playerPosition.x].properties.speedMod).toFixed(2));
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
            playerPosition: {
              ...this.state.playerPosition, y: this.state.playerPosition.y - 1
            },
            globals: {
              ...this.state.globals, time: timeVar,
            }

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
            playerPosition: {
              ...this.state.playerPosition, y: this.state.playerPosition.y + 1
            },
            globals: {
              ...this.state.globals, time: timeVar,
            }
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
            playerPosition: {
              ...this.state.playerPosition, x: this.state.playerPosition.x - 1
            },
            globals: {
              ...this.state.globals, time: timeVar,
            }
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
            playerPosition: {
              ...this.state.playerPosition, x: this.state.playerPosition.x + 1
            },
            globals: {
              ...this.state.globals, time: timeVar,
            }
          });
          this.entityTurn(this.state.entityContainer, this.state.playerPosition);
          break;
        } else { break; }
      case " ": // spacebar
        // this spacebar op is causing the "no-op" error. 
        // no idea why, but not super important. 
        // try to fix that.
        this.setState({
          globals: { ...this.state.globals, time: +(this.state.globals.time + 1).toFixed(2) },
        });
        this.entityTurn(this.state.entityContainer, this.state.playerPosition);
        break;
      case ">":
        if (this.state.roomArray[this.state.playerPosition.y][this.state.playerPosition.x].type === "StairDown") {
          console.log("spaires!!! ")
          this.setState({
            ...this.state,
            totalColumns: 100,
            totalRows: 100,
            roomArray: decendStaircase(100)
          });
        }
        break;
      default:
        break;
    }
  })

  initiateMeleeCombat(entityIndex) {
    let DummyContainer;
    if ((this.state.entityContainer[entityIndex].health - 5) <= 0) {
      DummyContainer = {
        entityContainer: {
          ...this.state.entityContainer,
          [entityIndex]: {
            ...this.state.entityContainer[entityIndex],
            alive: false,
            health: 0,
          }
        }
      };
    } else {
      DummyContainer = {
        entityContainer: {
          ...this.state.entityContainer,
          [entityIndex]: {
            ...this.state.entityContainer[entityIndex],
            health: this.state.entityContainer[entityIndex].health - this.state.playerStatus.stats.Atk,
          }
        }
      };
    }
    this.entityTurn(DummyContainer.entityContainer, this.state.playerPosition);
  }

  // 1.) MAKE THIS MORE READABLE.
  // 2.) MAKE ENEMIES NOT STACK
  entityTurn(entityObj, targetPosition) {
    /*
    this function takes an object container and 
    the position of the "target". sometimes the 
    entityObj will be the "real" state of the game
    board, but other times, it will be a modified
    version of it. This is usually because, multiple
    operations need to be enacted upon the array before
    it is set to the React state.
    */


    /*
    this.setState({
      playerStatus: {
        ...this.state.playerStatus,
        bars: {
          health: {
            ...this.state.playerStatus.bars.health,
            currentHealth: this.state.playerStatus.bars.health.currentHealth + (this.state.playerStatus.bars.health.currentHealth / 100)
          },
          mana: {
            ...this.state.playerStatus.bars.mana,
            currentMana: this.state.playerStatus.bars.mana.currentMana + (this.state.playerStatus.bars.mana.currentMana / 100)
          },
          rage: {
            ...this.state.playerStatus.bars.rage,
            currentRage: this.state.playerStatus.bars.rage.currentRage - (this.state.playerStatus.bars.rage.currentRage / 20)
          },
          hunger: {
            ...this.state.playerStatus.bars.hunger,
            currentHunger: this.state.playerStatus.bars.hunger.currentHunger - (this.state.playerStatus.bars.hunger.currentHunger / 200)
          }
        }
      }
    }, console.log(this.state.playerStatus))
    */

    if (Object.keys(entityObj).length === 0) {
      return;
    }

    let entArr = [];

    //Grabs all (active) entities and assigns them an 
    //x and y distance from the target (player)
    //we then take all objects and push them
    //into a new array for easy iteration
    for (let i of Object.entries(entityObj)) {
      if (i[1].alive) {

        i[1].xDiff = i[1].x - targetPosition.x
        i[1].yDiff = i[1].y - targetPosition.y

        entArr.push(i);
      }
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
        if (Math.abs(entArr[j][1].yDiff + entArr[j][1].xDiff) !== 1) {
          if (entArr[j][1].randChoice === false) {
            //get the "jth" index of the entity array we made earlier
            //then take the first index of that (because the 0th index
            //is the NAME of the entity).
            entArr[j][1].yDiff >= 0 ? entityObj = {
              ...entityObj,
              [entArr[j][0]]: {
                ...entArr[j][1],
                y: entArr[j][1].y - 1
              }
            }
              : entityObj = {
                ...entityObj,
                [entArr[j][0]]: {
                  ...entArr[j][1],
                  y: entArr[j][1].y + 1
                }
              }
          }
          else if (entArr[j][1].randChoice === true) {
            entArr[j][1].xDiff >= 0 ? entityObj = {
              ...entityObj,
              [entArr[j][0]]: {
                ...entArr[j][1],
                x: entArr[j][1].x - 1
              }
            }
              : entityObj = {
                ...entityObj,
                [entArr[j][0]]: {
                  ...entArr[j][1],
                  x: entArr[j][1].x + 1
                }
              }
          }
        }
      }
    });
    //after the dummyobject is settled, then we 
    //can add it to state and update all other objects on screen.
    this.setState({
      entityContainer: {
        ...this.state.entityContainer,
        ...entityObj,
      }
    })
  }



  spawnerFunction = () => {

    let thisEntity = new Entity(Math.floor(Math.random() * this.state.totalColumns), Math.floor(Math.random() * this.state.totalRows), Math.trunc(Math.random() * 100))

    this.setState({
      entityContainer: {
        ...this.state.entityContainer,
        ["entity" + globalID++]: {
          type: "entity",
          name: "Dire Pangolin",
          health: thisEntity.health,
          x: thisEntity.position.x,
          y: thisEntity.position.y,
          alive: true,
          style: "entityStyle",
          char: thisEntity.char,
          lightLevel: 1,
        }
      }
    })
  }

  mapHover = (j) => {
    this.setState({
      ...this.state,
      tileDisplay: j,
    })
  }

  render() {

    return (
      <div id="appContainer">
        <div id="container1">

          {this.state.roomArray !== null &&
            <Room columns={this.state.totalColumns} rows={this.state.totalRows}
              playerPosition={this.state.playerPosition} playerStatus={this.state.playerStatus}
              entityStatus={this.state.entityContainer} globalID={globalID}
              roomArrProp={this.state.roomArray} time={this.state.globals.time}
              mapHover={this.mapHover}
            />}

          <UI status={this.state.playerStatus} spawnMonster={this.spawnerFunction}
            entityStatus={this.state.entityContainer} time={this.state.globals.time}
            tileDisplay={this.state.tileDisplay}
          />


        </div>
        <div className="textLog">
          <TextLog status={this.state.playerStatus} time={this.state.globals.time} />
        </div>
      </div>
    );
  }
}


export default App;