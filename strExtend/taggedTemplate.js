var a = 5;
var b =10;
// 以上函数相当于调用tag函数 tag函数扽定义如下
function tag(s, v1, v2) {
	console.log(JSON.stringify(s));
	console.log(v1);
	console.log(v2);
}
// tag 除了第一个参数 都是大括号之间的值 而 第一个参数是大括号之间的内容组成的数组
tag`Hello ${ a + b } world ${ a * b}`;

// 如何将各个参数拼回去
var total = 30;
// 第一个参数的长度会比后面所有参数的长度多一个
function passthru(literals, ...values) {
	var output = '';
	for (var index = 0; index < values.length; index++) {
		output = output + literals[index] + values[index];
	}
	output = output + literals[index];
	return output;
}
var msg = passthru`The total is ${total} (${total*1.05} with tax)`;

// safeHTNL
var arg = '<script>alert("abc")</script>';
arg.replace(/&/g, "&amp;")
   .replace(/</g, "&lt;")
   .replace(/>/g, "&gt;");
