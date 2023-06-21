import express from 'express';

import path from 'path';

import { fileURLToPath } from 'url';

let rootCalls = 0;
const urlsCalled = [];
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

const port = 3000;

app.use((req, res, next) => {
  urlsCalled.push(req.url);
  next()
});

app.get('/console.js', (req, res) => {
  res.sendFile('console.js', { root: __dirname });
});

app.get('/', increateRootCalls, LogRootCalls, rootEndpointHandler);
app.get("/urls", (req, res) => {
  res.send(urlsCalled.toString());
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
function increateRootCalls(req, res, next) {
  rootCalls++;
  next();
}
function LogRootCalls(req, res, next) {
  console.log("2nd middlware running");
  console.log("Root calls are ", rootCalls);
  if (rootCalls === 5) {
    res.send("Root Calls are 5");
    return;
  }
  next();
}
function rootEndpointHandler(req, res, next) {
  res.send("Hello from root route");
}