import tiles from "./classes/tiles";

class Tile {

    type;
    properties;
    contents;

    constructor(i) {
        Object.assign(this, i);
    }
}

export default function decendStaircase(dim) {

    let dimensions = dim, maxTunnels = 999, maxLength = 10;
    let map = Array.from({ length: dimensions }, () =>
        Array.from({ length: dimensions }, () => new Tile(tiles.TileWall)));
    let currentRow = Math.floor(Math.random() * dimensions);
    let currentColumn = Math.floor(Math.random() * dimensions);
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let lastDirection = [];
    let randomDirection;

    console.log(map)

    while (maxTunnels && dimensions && maxLength) {
        do {
            randomDirection = directions[Math.floor(Math.random() * directions.length)];
        } while ((randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) ||
            (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1]));
        let randomLength = Math.ceil(Math.random() * maxLength), tunnelLength = 0;
        while (tunnelLength < randomLength) {
            if (((currentRow === 0) && (randomDirection[0] === -1)) ||
                ((currentColumn === 0) && (randomDirection[1] === -1)) ||
                ((currentRow === dimensions - 1) && (randomDirection[0] === 1)) ||
                ((currentColumn === dimensions - 1) && (randomDirection[1] === 1))) {
                break;
            } else {
                map[currentRow][currentColumn] = new Tile(tiles.TileEmpty);
                currentRow += randomDirection[0];
                currentColumn += randomDirection[1];
                tunnelLength++
            }
        }
        if (tunnelLength) {
            lastDirection = randomDirection;
            maxTunnels--;
        }
    }
    console.log(map)
    return map;
}