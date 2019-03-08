//map 与 foreach的区别
let arr = [1, 2, 3]
let arr1 = arr.map(item => {
    return ++item
})
console.log(arr)
console.log(arr1);

arr.forEach((item, index) => {
    return arr[index] = item * 2
})
console.log(arr)
    //区别：map返回的是一个新数组，foreach返回的是undefined且可以改变原数组





//框架通识
/**
 * jq更新 ui时需要获取对应的dom再更新，数据和业务的逻辑与页面有强耦合
 * 
 * mvvm就是降低耦合性：通过数据来驱动ui改变,ui改变时数据也会改变，业务变更只需关心数据的流转，
 * 无需直接与dom打交道；view-model只关心数据和业务处理，不关心view如何处理数据，
 * 因此view与model可以相互独立，任何一方改变时另一方不一定需要改变；
 * 因此把一些可复用的逻辑放在一个view-model中，在多个view中复用view-model
 * e.g.  双向绑定，angluar的脏值检测，vue的数据劫持
 */

//数据劫持demo

function observe(obj) {
    if (!obj || typeof obj !== 'object') { //判断对象
        return
    }
    Object.keys(obj).forEach(key => { //遍历对象
        defineReactive(obj.key, obj[key])
    })
}

function defineReactive(obj, key, val) {
    observe(val) //递归对象

    Object.defineProperty(obj, key, { //对象描述符，监听对象属性变化
        enumerable: true, //当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，
        configurable: true, //当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中
        get: function reactiveGetter() {
            console.log('get value')
            return val
        },
        set: function reactiveSetter(newVal) {
            console.log('change value')
            val = newVal
        }
    })
}














//闭包
/**
 * 父函数被销毁的情况下，返回的子函数依然可以引用父函数中的变量
 */

function bar() {
    let a = 2
    return function bac() {
        let b = a + 2
        console.log(a)
    }
}

//q
// for (var i = 0; i < 10; i++) {
//     setTimeout(function() {
//         console.log(i)
//     }, 1000)
// }

// //a1
// for (var i = 0; i < 10; i++) {
//     setTimeout(function(i) {
//         console.log(i)
//     }, 1000, i)
// }
// //a2
// for (var i = 0; i < 10; i++) {
//     (function(j) {
//         setTimeout(function() {
//             console.log(i)
//         }, 1000)
//     }(i))
// }