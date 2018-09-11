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
基于HTTP协议的文件上传的原理
===

HTTP文件上传所基于的通用协议是：rfc1867
https://tools.ietf.org/html/rfc1867

这个协议里主要有两个方面的修改
1. 对HTML元素的增强
2. 对表单媒体类型的支持

---
HTML元素的增强
===
主要体现在两点：
1. 添加FILE选项到INPUT元素

```
<input type="file"/>
```

3. 添加了ACCEPT属性到INPUT元素

```
<input type="file" accept="*.txt"/>

```

---
定义了新的媒体类型
===
1. 表单提交的默认的媒体类型是：`multipart/form-data`
2. 定义的一个新的MIME媒体类型：`multipart/form-data`
---


选择HTTP服务器
===
1. 基于原生的http包

```
const http = require('http');
```

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
curl -X GET http://localhost:8080
```



