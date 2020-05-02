const div1 = document.querySelector('.test')//DOM对象

const div2 = $('.test')//能够操作test的api

DOM对象只能使用DOM的API
jQuery对象只能使用jQuery的API

所以在命名的时候DOM对象应该这样命名
elDiv1 = document.querySelector('.test')
在命名jQuery对象的时候应该这样命名
$div2 = $('.test')