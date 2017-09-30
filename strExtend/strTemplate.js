// use obj to show output
var basket = {
	count: 20,
	onSale: 10
}
var s = `
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`

// be used output we can split line to output
console.log(`string text line 1
string text line 2`);

// muti line all space and tab will be saved
var ul = `
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim() // trim will eliminate start and end empty line and space

// {} inner can be set any javascript expression
 var x = 1;
 var y =2;
 console.log(`${x} + ${y} = ${x + y}`)
 console.log(`${x} + ${y * 2} = ${x + y * 2}`);

 // of course the function call is can be allowed

 function fn() {
 	return 'hello world';
 }

 console.log(`foo ${fn()} bar`)

 // nesting(嵌套) to simulate string templat for recycle

const tml = addrs => `
	<table>
	${addrs.map(addr => `
		<tr><td>${addr.first}</td></tr>
    	<tr><td>${addr.last}</td></tr>
		`).join('')}
	</table>
 `
const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tml(data))

// dynamic create function

let str = 'return ' + '`hello ${name}!!`';
let func = new Function('name', str);
func('world')




