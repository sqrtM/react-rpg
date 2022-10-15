// 1.) MAKE THIS MORE READABLE.
  // 2.) MAKE ENEMIES NOT STACK
  function entityTurn(entityObj, targetPosition) {

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
          if (Math.abs(entArr[j][1].yDiff + entArr[j][1].xDiff) !== 1) {
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
        }
        //after the dummyobject is settled, then we 
        //can add it to state and update all other objects on screen.
        this.setState({
          entityContainer: {
            ...this.state.entityContainer,
            ...DummyObj
          }
        }, console.log("after turn", this.state.entityContainer))
      }
    });
  }