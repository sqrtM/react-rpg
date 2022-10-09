// archipelago
if (v >= 0.5) {
    arr[i][j] = new TileWall()
  } else if (v >= 0.3) {
    arr[i][j] = new TileSlope()
  } else if (v >= 0) {
    arr[i][j] = new TileEmpty()
  } else if (v >= -0.07) {
    arr[i][j] = new TileShore()
  } else if (v >= -0.8) {
    arr[i][j] = new TileWater()
  } else { arr[i][j] = new TileDeepWater() }

// mountainous
if (v >= 0.4) {
    arr[i][j] = new TileWall()
  } else if (v > 0.1) {
    arr[i][j] = new TileMountain()
  } else if (v >= 0) {
    arr[i][j] = new TileSlope()
  } else if (v >= -0.3) {
    arr[i][j] = new TileEmpty()
  } else if (v >= -0.35) {
    arr[i][j] = new TileShore()
  } else if (v >= -0.65) {
    arr[i][j] = new TileWater()
  } else { arr[i][j] = new TileDeepWater() }
