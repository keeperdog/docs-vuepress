# 浏览器原理

## 你是怎么看待浏览器的同源策略？

同源策略限制了从同⼀个源加载的⽂档或脚本如何与来⾃另⼀个源的资源进⾏交互。这是⼀个⽤于隔离潜在恶意⽂件的 重要安全机制。

同源是指"协议+域名+端⼝"三者相同，即便两个不同的域名指向同⼀个ip地址，也⾮同源。

## 如何实现跨域？

**最流⾏的跨域⽅案cors**

简单请求

1、请求方法：GET、HEAD或者POST，

2、HTTP的头信息不超出以下几种字段：

- Accept

- Content-Language

- Content-type为以下几种：
application/x-www-form-urlencoded, multipart/form-data或着text/plain

- 无自定义头；

非简单请求：简单请求之外

**最⽅便的跨域⽅案Nginx**
