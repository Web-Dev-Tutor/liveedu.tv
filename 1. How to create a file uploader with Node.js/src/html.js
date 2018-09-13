const http = require("http");
const fs = require("fs");

const app = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html;charset=utf8");
  const html = fs.readFileSync("./uploader.html");
  res.write(html);
  res.end();
});

const port = 8081;

app.listen(port, function() {
  console.log("Server started at: " + port);
});
