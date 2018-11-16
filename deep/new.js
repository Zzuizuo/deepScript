function objFactory(){
    var obj = new Object()
    Constructor = [].shift.call(arguments)
    obj.__proto__ = Constructor.prototype
    var ret = Constructor.apply(obj, arguments);

    return typeof ret === 'object' ? ret || obj : obj;
}
/*用new Object() 的方式新建了一个对象 obj
取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，
所以 arguments 会被去除第一个参数
将 obj 的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性
使用 apply，改变构造函数 this 的指向到新建的对象，
这样 obj 就可以访问到构造函数中的属性返回 obj*/

var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }
let arr = Array.prototype.map.call(arrayLike, function(item){
    item.toUpperCase();
}); 
console.log(arr)