const http = require("http");

const app = http.createServer((req, res) => {
  res.write("Hello World!");
  res.end();
});

const port = 8081;

app.listen(port, function() {
  console.log("Server started at: " + port);
});
