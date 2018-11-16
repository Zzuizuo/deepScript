/*
    bind() 方法会创建一个新函数。当这个新函数被调用时，
    bind() 的第一个参数将作为它运行时的 this，
    之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )
*/

Function.prototype.bindcopy = function(context){
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var self = this;
    // 获取bind2函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1);
    var fNOP = function () {};
    var fBound = function () {
        // 这个时候的arguments是指bind返回的函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
    }
     // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}

var foo = {
    value: 1
};

function bar() {
	return this.value;
}

var bindFoo = bar.bindcopy(foo);
console.log(bindFoo()); // 1