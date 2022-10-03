export function entityTurn(entityObj, targetPosition) {

    for (let i in entityObj) {
    
        let xDiff = entityObj[i].x - targetPosition.x
        let yDiff = entityObj[i].y - targetPosition.y
        // true reduces X; false reduces Y
        let randChoice = Math.random() > 0.5 ? true : false

        if (xDiff === 0) {randChoice = false}
        if (yDiff === 0) {randChoice = true}

        if (randChoice === false) {
            yDiff > 0 ? this.setState({entityContainer: {...entityContainer, [i]: {y: entityObj[i] + 1}}}) : this.setState({entityContainer: {...entityContainer, [i]: {y: entityObj[i] - 1}}}) 
        }
        if (randChoice === true) {
            yDiff > 0 ? this.setState({entityContainer: {...entityContainer, [i]: {x: entityObj[i] + 1}}})  : this.setState({entityContainer: {...entityContainer, [i]: {x: entityObj[i] - 1}}}) 
        }

    }
}