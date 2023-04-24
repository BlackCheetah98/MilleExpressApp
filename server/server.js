// server/index.js
const path = require('path');
const express = require('express');

const app = express();

app.listen(8000, () => {
  console.log(`Server listening on 8000`);
});

app.use(express.static(path.resolve(__dirname, '../client/build')));


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});