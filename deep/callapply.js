//call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。
Function.prototype.callcopy = function(context){
    context = context || window
    context.fn = this

    var args = []
    var len = arguments.length
    for(var i = 1;i < len;i++){
        args.push('arguments['+ i +']')
    }
    var result = eval('context.fn(' + args +')');
    //这里 args 会自动调用 Array.toString() 这个方法。
    delete context.fn
    return result
}


Function.prototype.applycopy = function(context,arr){
    var result
    context = context || window
    context.fn = this
    if(!arr){
        result = context.fn()
    }else{
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args +')');
        //console.log('1' + [1, 2, 3]) // 11,2,3
    }
    delete context.fn
    return result
}


var foo = {
    value: 1
}

function bar(name,age){
    console.log(name)
    console.log(age)
    console.log(this.value)
}
bar.applycopy(foo,[1,2])