var regex = new RegExp('xyz', 'i');
var regexSame = /xyz/i;
var regexobj = new RegExp(/xyz/i);
/*
match()、replace()、search()和split()。
*/

// /u很关键
/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true

/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true

// \S 匹配所有不是空格的字符

function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

var s = '𠮷𠮷';

// s.length // 4
// codePointLength(s) // 2

// y修饰符 y修饰符号隐含了头部匹配的标志^
// y修饰符的设计本意，就是让头部匹配的标志^在全局匹配中都有效。

// split的用法
/*在split方法中使用y修饰符，
原字符串必须以分隔符开头。这也意味着，只要匹配成功，数组的第一个成员肯定是空字符串。
*/
'#x#'.split(/#/y) // '', 'x#'
'##'.split(/#/y) // '','',''
'a34a2567a35678'.match(/a\d+/gy)

// y修饰符的应用 y修饰符保证不会有匹配漏掉的字符出现
const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
const TOKEN_G = /\s*(\+|[0-9]+)\s*/g;

function tokenize(TOKEN, str) {
	let result = [];
	let match;
	while (match = TOKEN.exec(str)) {
		result.push(match[1])
	}
	return result;
}
tokenize(TOKEN_G, '3x + 6');
tokenize(TOKEN_Y, '3x + 6');


// 补充一下正则的属性

const REGEX = /a/g;
// REGEX有一个lastIndex属性 可读写 指定了下一次匹配的初始位置
// 指定从2号位置（y）开始匹配
REGEX.lastIndex = 2;

// 匹配成功
const match = REGEX.exec('xaya');
// match有三个属性 index input 匹配值
// index 是匹配的位置 input是输入的值 还有匹配的值 0是匹配值 依次往后是捕获组的值
// 在3号位置匹配成功
match.index // 3

// 下一次匹配从4号位开始
REGEX.lastIndex // 4

// 4号位开始匹配失败
REGEX.exec('xaxa') // null

REGEX.source // 返回正文
// 'a'
REGEX.flags // 返回修饰符
// 'g'

// 关于replace时$的一些应用、
// 匹配出来的样子 (left) + (pattern) + (right)
// $& 映射到当前模式所匹配的内容(pattern)
// $` 映射到当前模式匹配的左边的部分(left)
// $' 映射到当前模式匹配的右边的部分(right)

var value = "My number is 212-555-1234.";
var pattern = new RegExp("(\\d+)", "g");
var result = value.replace(
	pattern,
	"|-- [$&] [$`] [$'] --|"
);
console.log(result)

// 补充一个escape的实现
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
// 转义出来的可以直接使用正则模式

// 先行断言
/\d+(?=%)/.exec("100%") // 断言的部分不会加入匹配
// [ '100', index: 0, input: '100%' ]

// 先行否定断言 
/\d+(?!%)/g.exec('9 is 100% not a 8 ') // 断言的部分不会加入匹配
// [ '9', index: 0, input: '9 is 100% not a 8 ' ]

/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill');
/(?<!\$)\d+/.exec('it’s is worth about €90')
// 后行断言匹配方向是从右至左的
