// 字符串解构
var str = 'dz';
var [first, last] = str;

// 优雅的取得长度
var {length: len} = str;

// 正确的字符对应正确的标号
var s = '𠮷a';
for (let ch of s) {
	console.log(ch.codePointAt(0).toString(16))
}