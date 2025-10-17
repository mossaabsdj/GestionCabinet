const next = require("next");
const path = require("path");
const express = require("express");

const app = next({ dev: false, dir: path.join(__dirname, ".") });
const handle = app.getRequestHandler();

const port = 3000;

app.prepare().then(() => {
  const server = express();

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Next.js server running on http://localhost:${port}`);
  });
});
