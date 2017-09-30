// 增加	isFinity NaN
Number.isFinite(Infinity);
Number.isNaN(NaN);

// 这两个方法与传统的方法来比 传统的方法会先进行类型转换
// Number的方法不会 在内部会首先判断是否为Number
// Number.isFinite = value === 'number' && global_isFinite(value);

// Number.parseInt Number.parseFloat 
// Number.parseInt === parseInt // true
// Number.parseFloat === parseFloat // true

// Number.isInteger

(function (global) {
	var floor = Math.floor;
	var isFinite = global.isFinite;
	Object.defineProperty(Number, 'isInteger', {
		value: function isInteger(value) {
			return typeof value === 'number' && isFinite(value) && value > -9007199254740992
			&& value < 9007199254740992 && floor(value) === value;
		},
		configurable: true,
    enumerable: false,
    writable: true
	})
})(this);

// 增加极小数 Number.EPSILON 为了判断误差
// JavaScript能够准确表示的整数范围在-2^53到2^53之间
// （不含两个端点），超过这个范围，无法精确表示这个值
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
Number.MIN_SAFE_INTEGER === - Number.MAX_SAFE_INTEGER
Number.MIN_SAFE_INTEGER === - Math.pow(2, 53) + 1
// Number.isSafeInteger() 判断整数是否是安全的
// 超出计算精度会自动等于计算精度的上限 9007199254740993 === 9007199254740992
// 需要先验证是否安全 再去计算
function trusty (left, right, result) {
  if (
    Number.isSafeInteger(left) &&
    Number.isSafeInteger(right) &&
    Number.isSafeInteger(result)
  ) {
    return result;
  }
  throw new RangeError('Operation cannot be trusted!');
}

trusty(9007199254740993, 990, 9007199254740993 - 990)
// RangeError: Operation cannot be trusted!

trusty(1, 2, 3)
// 3