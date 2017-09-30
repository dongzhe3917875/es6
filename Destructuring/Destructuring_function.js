function add([x, y]) {
	return x + y;
}
add([2,3])

[[1, 2], [3, 4]].map(([a, b]) => a + b)

// 默认值要区分形参的默认值还是实参的默认值
// 形参的默认值
function move({x = 0, y = 0} = {}) {
	console.log('x: ' + x);
	console.log('y: ' + y);
}
move({
	x: 3,
	y: 8
}) 
move({
	x: 3
})
move()

// 实参的默认值

function move1({x, y} = {x: 0, y: 0}) {
	console.log('x: ' + x);
	console.log('y: ' + y);
}
move1({
	x: 3,
	y: 8
})
move1({
	x: 3
})
move1({})
move1()