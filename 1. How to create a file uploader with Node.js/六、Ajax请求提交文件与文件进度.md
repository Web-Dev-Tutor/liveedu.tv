<!--
$theme: gaia
template: gaia
-->

Ajax请求提交文件与文件进度<p style="text-align:right;font-size:28px;margin-right:50px;color:#cFc;">:star: by calidion</p>
===
---
Ajax提交
===
---
需要掌握的技术：
1. jQuery
2. FormData对象
3. 对form的submit事件的截获, 即阻止冒泡，e.preventDefault();
---
创建FormData
===
FormData的使用有两种方式：
1. 直接将整个form表单直接传入到FormData里
2. 不断的通过append添加字符信息

---
通过jQuery提交
===
1. 引入jQuery
```
<script src="https://code.jquery.com/jquery-3.3.1.min.js">
</script>
```
2. 提交表单
```
$("form#file").submit(function(e) {
    e.preventDefault();
});
```
---
通过jQuery提交
===
3. 表单内处理
```
var form = e.target;
var data = new FormData(form);
$.ajax({
    url: form.action,
    method: form.method,
    processData: false,
    contentType: false,
    data: data,
    processData: false,
    success: function (data) {
        alert("uploaded!");
        alert(data)
    }
});
```
---
提交进度处理
===
方法是将ajax参数里的xhr进行hack如下：
```
$.ajax({
xhr: progressXHR
...
});
```
其中 progressXHR函数是这样的：


---


```
function progressXHR() {
var xhr = new window.XMLHttpRequest();
xhr.upload.addEventListener("progress", function (e) {
  if (evt.lengthComputable) {
    var percentComplete = e.loaded / e.total;
    percentComplete = parseInt(percentComplete * 100);
    // updateProgress(percentComplete);
  }
}, false);
return xhr;
}
```

其中updateProgress用于处理进度的展示部分。所以我们需要制作进度的展示。

---
进度的展示
===
只需要根据转入的进度条的比例显示即可。

1. 最简单的就是制作一个数字显示
添加一个HTML元素用于表示百分比
2. 也可以添加一个图形化的展示条
比如使用一个bootstrap的进度条



        
        









