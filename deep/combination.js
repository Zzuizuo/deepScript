// var scope = "global scope"

// function checkScope(){
//     var scope = "local scope"
//     function f(){
//         console.log(this)
//         return scope
//     }
//     return f
// }

// var foo = checkScope()
// foo()
  
//即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
//在代码中引用了自由变量
//闭包就是能够读取其他函数内部变量的函数，或者子函数在外调用，子函数所在的父函数的作用域不会被释放。


for(var i = 1; i <= 5;i++){
    (function(){
        setTimeout(function timer(){
            console.log(i)
        },i*1000)
    })()
}