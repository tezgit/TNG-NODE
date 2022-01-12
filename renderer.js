// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const p5 = require('p5');

// const sketch = require('./p5/sketch.js');
// const sketch = require('./p5/sketch3.js');
const sketch = require('./p5/sketch-tng.js');
// const sketch = require('./p5/test.js');

const app = new p5(sketch);



