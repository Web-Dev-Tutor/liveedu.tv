const http = require("http");
const fs = require("fs");

function getBoundary(contentType) {
  const boundaries = contentType.split("; ");

  for (let item of boundaries) {
    if (!item) {
      continue;
    }
    if (item.indexOf("boundary=") !== -1) {
      return item.split("=")[1];
    }
  }
}

function getParts(boundary, data) {
  const parts = String(data).split("--" + boundary);
  return parts.filter(item => {
    if (!item) {
      return false;
    }
    return true;
  });
}

function getHeaderName(header) {
  var headers = header.split("\r\n");
  for (var i = 0; i < headers.length; i++) {
    var subHead = headers[i];
    var subHeaders = subHead.split(": ");
    var names = subHeaders[1].split("; ");
    for (var j = 0; j < names.length; j++) {
      if (names[j].indexOf("name") !== -1) {
        var values = names[j].split("=");
        return values[1];
      }
    }
  }
  return "";
}

function processFormPart(header, body, req) {
  const name = getHeaderName(header);
  if (!name) {
    return;
  }
  if (!req.body) {
    req.body = {};
  }
  req.body[name] = body;
}

function processFilePart(header, body, req) {
  const name = getHeaderName(header);
  if (!name) {
    return;
  }
  if (!req.files) {
    req.files = {};
  }
  req.files[name] = body;
}

function processPart(header, body, req) {
  console.log(header);

  if (header.indexOf("filename") !== -1) {
    processFilePart(header, body, req);
    console.log("file processed!");
    return;
  }

  if (header.indexOf("form-data") !== -1) {
    processFormPart(header, body, req);
    console.log("form processed!");
  }
}

function separateParts(parts, req) {
  for (var i = 0; i < parts.length; i++) {
    var contents = parts[i].split("\r\n\r\n");
    for (var j = 0; j < contents.length; j++) {
      contents[j] = contents[j].replace(/\r\n$/, "");
      contents[j] = contents[j].replace(/^\r\n/, "");
    }
    console.log(contents);
    processPart(contents[0], contents[1], req);
  }
}

function processFile(req, res, data) {
  var contentType = req.headers["content-type"];
  var boundary = getBoundary(contentType);
  const parts = getParts(boundary, data);
  res.write(data);
  console.log(boundary);
  console.log(parts);
  separateParts(parts, req);
  res.write("\nFile processed!\n");
  res.end();
}

function processPOST(req, res) {
  var data = [];
  var length = 0;
  req.on("data", function(chunk) {
    length += chunk.length;
    data.push(chunk);
  });
  req.on("end", function() {
    data = Buffer.concat(data, length);

    var contentType = req.headers["content-type"];
    if (contentType.indexOf("multipart/form-data;") !== -1) {
      processFile(req, res, data);
      return;
      //
    }

    res.write(data);
    res.write("\nPOST processed!\n");
    res.end();
  });
}

const app = http.createServer((req, res) => {
  if (req.method === "POST") {
    processPOST(req, res);

    return;
  }
  res.setHeader("Content-Type", "text/html;charset=utf8");
  const html = fs.readFileSync("./uploader.html");
  res.write(html);
  res.end();
});

const port = 8081;

app.listen(port, function() {
  console.log("Server started at: " + port);
});
