function Person(){ //构造函数

}

var person = new Person() //实例对象
person.name = 'dog'
console.log(person.name)

// prototype是函数才会有的属性
//函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型
Person.prototype.name = 'cat'

var person1 = new Person()
console.log(person.name)
console.log(person1.name)

//原型：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，
//这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。
console.log(person.__proto__ === Person.prototype)

//因为一个构造函数可以生成多个实例，但是原型指向构造函数倒是有的，
//这就要讲到第三个属性：constructor，每个原型都有一个 constructor 属性指向关联的构造函数。
console.log(Person === Person.prototype.constructor); // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true

delete person.name
console.log('删除：'+person.name)

console.log(person.constructor === Person)
//当获取 person.constructor 时，其实 person 中并没有 constructor 属性,
//当不能读取到constructor 属性时，会从 person 的原型也就是 Person.prototype 中读取，

//__proto__
//其次是 __proto__ ，绝大部分浏览器都支持这个非标准的方法访问原型，
//然而它并不存在于 Person.prototype 中，实际上，它是来自于 Object.prototype ，
//与其说是一个属性，不如说是一个 getter/setter，当使用 obj.__proto__ 时，
//可以理解成返回了 Object.getPrototypeOf(obj)。