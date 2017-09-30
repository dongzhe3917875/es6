var f = v => v
// 与下面的等价
var f = function(v) {
  return v;
};
// 无参数的
var f1 = () => 5
// 代码块多余一条 需要大括号
var sum = (num1, num2) => {
	if (num1 > 0) {
		return num1 + num2
	}
}
// 返回一个对象 需要加上小括号转换为表达式