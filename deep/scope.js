//作用域是指程序源代码中定义变量的区域。
//作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。
//JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。  

var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar(); //1


var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope(); // "local scope"


var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()(); // "local scope"