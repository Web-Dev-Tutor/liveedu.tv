<!--
$theme: gaia
template: gaia
-->

确定页面展示方式及API<p style="text-align:right;font-size:28px;margin-right:50px;color:#cFc;">:star: by calidion</p>
===

---
确定页面展示方式
===
目前的Web页面展示的方式有两种：
1. 后端渲染
2. 前端渲染

后端渲染的好处：易被搜索引擎识别，适合做内容为主的网站。
前端渲染的好处：不必刷新页面，有更好的体验，适合做功能为主的网站或者应用。通常称为SPA（Single Page Application)

---
API
===
如果选择前端渲染，通常需要后端提供API。
后端提供API的好处是，即可以提供给Web页面，也可以提供给客户端应用使用。
目前常用的API方式是RESTful API。
同时也有更加复杂的GraphQL。
以及对RESTful API进行裁剪的VIG API。
