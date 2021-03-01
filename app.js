const { syncAndSeed } = require('./db/data');
const express = require('express');
const app = express();
const path = require('path');

//html main page
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

//front end index.js
app.use('/dist', express.static(path.join(__dirname, 'dist')));

//CSS page
app.use('/assets', express.static(path.join(__dirname, 'assets')));

//API routes
app.use('/api', require('./api'));

const init = async() => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch(err) {
    console.log(err);
  }
};
init();
