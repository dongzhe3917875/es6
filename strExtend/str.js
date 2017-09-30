// charCodeAt <-> fromCharCode
// codePointAt <-> fromCodePoint

// right index right code
var s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}

// judge 2 bytes or 4 bytes
function is32Bit(c) {
	return c.codePointAt(0) > 0xFFFF;
}

// "\u{20BB7}"
String.fromCodePoint(0x20BB7)

// Iterator String use for...of
// can iterator 0xFFFF

var text = String.fromCodePoint(0x20BB7);
for (let i of text) {
	console.log(i); // "𠮷"
}

// charAt 'abc'[0] === 'abc'.charAt(0)
'𠮷'.at(0) // "𠮷"

// includes(bool) return if str can be finded
var s = 'hello world';
s.includes('o'); // true
// s.indexOf('0') !== -1

// startsWith endsWith
s.startsWith('h');
// s.charAt(0) === 'h'

s.endsWith('d');
// s.charAt(s.length-1) === 'd'

// repeat
'xxx'.repeat(3) // 'xxxxxxxxx'

// padStart use to pad head
// padEnd use to pad end

'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

// tip date format
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"