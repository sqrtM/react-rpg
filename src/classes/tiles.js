export const tiles = {
    TileStairDown: {
        type: "StairDown",
        properties: {
            defaultChar: ">",
            style: "stairDownStyle",
            speedMod: 1,
            walkable: true
        },
        contents: {
            lightLevel: 1
        }
    },
    TileWall: {
        type: "TileWall",
        properties: {
            defaultChar: "#",
            style: "wallStyle",
            speedMod: 3,
            walkable: false
        },
        contents: {
            lightLevel: 1
        }
    },
    TileMountain: {
        type: "TileMountain",
        properties: {
            defaultChar: "%",
            style: "mountainStyle",
            speedMod: 1.8,
            walkable: true
        },
        contents: {
            lightLevel: 1
        }
    },
    TileSlope: {
        type: "TileSlope",
        properties: {
            defaultChar: "/",
            style: "slopeStyle",
            speedMod: 1.2,
            walkable: true
        },
        contents: {
            lightLevel: 1
        }
    },
    TileEmpty: {
        type: "TileEmpty",
        properties: {
            defaultChar: ".",
            style: "emptyStyle",
            speedMod: 1,
            walkable: true
        },
        contents: {
            lightLevel: 1
        }
    },
    TileShore: {
        type: "TileShore",
        properties: {
            defaultChar: "°",
            style: "shoreStyle",
            speedMod: 1.1,
            walkable: true
        },
        contents: {
            lightLevel: 1
        }
    },
    TileWater: {
        type: "TileWater",
        properties: {
            defaultChar: "~",
            style: "waterStyle",
            speedMod: 2,
            walkable: true
        },
        contents: {
            lightLevel: 1
        }
    },
    TileDeepWater: {
        type: "TileDeepWater",
        properties: {
            defaultChar: "≈",
            style: "deepWaterStyle",
            speedMod: 4,
            walkable: false
        },
        contents: {
            lightLevel: 1
        }
    }
}; export default tiles;