const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// Detect environment
const dev = process.env.NODE_ENV !== "production";

// Initialize Next.js
const app = next({ dev });
const handle = app.getRequestHandler();

// Get the port from cPanel or default to 3000
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
