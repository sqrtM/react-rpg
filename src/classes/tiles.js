export const tiles = {
    TileStairDown: {
        type: "StairDown",
        properties: {
            defaultChar: ">",
            defaultStyle: "stairDownStyle",
            speedMod: 1,
            walkable: true,
            flavorText: "A strange, unsettling breeze rises from the shaft. You are not alone."
        },
        visuals: {
            style: "stairDownStyle",
            char: ">",
            lightLevel: 1,
        }
    },
    TileWall: {
        type: "Wall Tile",
        properties: {
            defaultChar: "#",
            defaultStyle: "wallStyle",
            speedMod: 3,
            walkable: false,
            flavorText: "Some creator seems to have made certain that such an thing should appear nigh intraversable, lest one should get any bright ideas...."
        },
        visuals: {
            style: "wallStyle",
            char: "#",
            lightLevel: 1,
        }
    },
    TileMountain: {
        type: "Mountain Tile",
        properties: {
            defaultChar: "%",
            defaultStyle: "mountainStyle",
            speedMod: 1.8,
            walkable: true,
            flavorText: "Melville once said that 'There's something ever egotistical in mountain tops and towers, in all things grand and lofty.' But what other refuge could man possess than his own ego?"
        },
        visuals: {
            style: "mountainStyle",
            char: "%",
            lightLevel: 1,
        }
    },
    TileSlope: {
        type: "Slope Tile",
        properties: {
            defaultChar: "/",
            defaultStyle: "slopeStyle",
            speedMod: 1.2,
            walkable: true,
            flavorText: "Such undulate terrain does not make for pleasant travels."
        },
        visuals: {
            style: "slopeStyle",
            char: "/",
            lightLevel: 1,
        }
    },
    TileEmpty: {
        type: "Grass Tile",
        properties: {
            defaultChar: ".",
            defaultStyle: "emptyStyle",
            speedMod: 1,
            walkable: true,
            flavorText: "The grass crunches like leaves under your foot. It seems weary even to the task of nourishing the wildlife. It is as though it is asking you to take up its cause."
        },
        visuals: {
            style: "emptyStyle",
            char: ".",
            lightLevel: 1,
        }
    },
    TileShore: {
        type: "Shore Tile",
        properties: {
            defaultChar: ":",
            defaultStyle: "shoreStyle",
            speedMod: 1.1,
            walkable: true,
            flavorText: "These sands feel more like dust or ash than beaches. Life may never take root here."
        },
        visuals: {
            style: "shoreStyle",
            char: ":",
            lightLevel: 1,
        }
    },
    TileWater: {
        type: "Water Tile",
        properties: {
            defaultChar: "~",
            defaultStyle: "waterStyle",
            speedMod: 2,
            walkable: true,
            flavorText: "Cold with an odd ozone smell. It doesn't feel particularly wise to partake of it."
        },
        visuals: {
            style: "waterStyle",
            char: "~",
            lightLevel: 1,
        }
    },
    TileDeepWater: {
        type: "Deep Water Tile",
        properties: {
            defaultChar: "*",
            defaultStyle: "deepWaterStyle",
            speedMod: 4,
            walkable: false,
            flavorText: "Water black as night. God knows what lies beneath...."
        },
        visuals: {
            style: "deepWaterStyle",
            char: "*",
            lightLevel: 1,
        }
    }
}; export default tiles;