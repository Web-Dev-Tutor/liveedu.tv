const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const dirname = "uploads/";
const upload = multer({ dest: dirname });

const port = 8081;

// app.use((req, res) => {
//   res.send("Hello World!\n");
// });

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html;charset=utf8");
  const html = fs.readFileSync("./index.html");
  res.write(html);
  res.end();
});

app.post("/", upload.single("one"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  fs.renameSync(req.file.path, dirname + req.file.originalname);
  res.setHeader("Content-Type", "text/html;charset=utf8");
  const html = fs.readFileSync("./index.html");
  res.write(html);
  res.end();
});

app.post("/multi", upload.array("multi", 10), (req, res) => {
  console.log(req.files);
  console.log(req.body);
  req.files.forEach(item => {
    fs.renameSync(item.path, dirname + item.originalname);
  });
  res.end();
});

app.listen(port, () => {
  console.log("Express Server started at " + port);
});
