//一  工厂模式
function createPerson(name) {
    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };

    return o;
}

var person1 = createPerson('kevin');
// 缺点：对象无法识别，因为所有的实例都指向一个原型



//二  构造函数模式
function Person(name) {
    this.name = name;
    this.getName = function () {
        console.log(this.name);
    };
}
/*优点：实例可以识别为一个特定的类型
缺点：每次创建实例时，每个方法都要被创建一次*/

//优化
function Person(name) {
    this.name = name;
    this.getName = getName;
}

function getName() {
    console.log(this.name);
}

var person1 = new Person('kevin');



//三  原型模式
function Person(name) {

}

Person.prototype.name = 'keivn';
Person.prototype.getName = function () {
    console.log(this.name);
};
/*优点：方法不会重新创建
缺点：1. 所有的属性和方法都共享 2. 不能初始化参数*/


//优化
Person.prototype = {
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};
/*优点：封装性好了一点
缺点：重写了原型，丢失了constructor属性*/

//优化
Person.prototype = {
    constructor: Person,
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
/*优点：实例可以通过constructor属性找到所属构造函数
缺点：原型模式该有的缺点还是有*/


//四  组合模式
function Person(name) {
    this.name = name;
}

Person.prototype = {
    constructor: Person,
    getName: function () {
        console.log(this.name);
    }
};

/*优点：该共享的共享，该私有的私有，使用最广泛的方式
缺点：有的人就是希望全部都写在一起，即更好的封装性*/

function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype.getName = function () {
            console.log(this.name);
        }
    }
}

// 注意：使用动态原型模式时，不能用对象字面量重写原型
//Person.prototype指向的是实例的原型，直接覆盖并不会更改实例的原型的值
//person1 依然是指向了以前的原型，而不是 Person.prototype
/*
e.g.：
当 new Person() 的时候，是先建立的原型关系，即 person .__proto__ = Person.prototype，
而后修改了 Person.prototype 的值，但是 person.__proto__ 还是指向以前的 Person.prototype
*/
//使用对象对面量
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype = {
            constructor: Person,
            getName: function () {
                console.log(this.name);
            }
        }
        return new Person(name);
    }
}
var person1 = new Person();



//五  寄生构造函数模式
function Person(name) {
    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };
    return o;
}

//其实所谓的寄生构造函数模式就是比工厂模式在创建对象的时候，
//多使用了一个new，实际上两者的结果是一样的。

let values = []
for (var i = 0, len = arguments.length; i < len; i++) {
    values.push(arguments[i]);
}

values.push.apply(values, arguments);

//稳妥构造函数模式
function person(name){
    var o = new Object();
    o.sayName = function(){
        console.log(name);
    };
    return o;
}

var person1 = person('kevin');
//所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。
/*
与寄生构造函数模式有两点不同：
新创建的实例方法不引用 this
不使用 new 操作符调用构造函数
*/
