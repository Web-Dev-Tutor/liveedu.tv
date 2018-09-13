<!--
$theme: gaia
template: gaia
-->

搭建Web服务器<p style="text-align:right;font-size:28px;margin-right:50px;color:#cFc;">:star: by calidion</p>
===

---
环境准备
===
1. linux控制台环境(本视频以linux环境为准，通常node.js程序是跑在linux环境的)
2. 基于nvm安装node.js
3. 使用nvm安装的好处
4. 程序的稳定性与版本管理的基本理念
5. 安装npm/yarn

---
选择HTTP服务器
===
1. 基于原生的http包

```
const http = require('http');
const app = http.createServer((req, res) => {
  res.write("Hello World!\n");
  res.end();
});

const port = 8081;
app.listen(port, function() {
  console.log("server started at: " + port);
});

```

---

2. 基于express构建

```
const express = require("express");
const app = express();
```

---
验证HTTP服务器
===
当服务器搭好后，验证一下服务器的可访问性。

```
curl http://localhost:8080
curl -X GET http://localhost:8080
```