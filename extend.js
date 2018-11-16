function extend() {
    let length = arguments.length
    let target = arguments[0]
    let i = 1
    let options,name,copy
    if(length >0){
        for(i; i < length; i++){
            options = arguments[i]
            if(options !== null){
                for(name in options){
                    copy = options[name]
                    if(copy !== undefined){
                        target[name] = copy
                    }
                }
            }
        }
    }
    return target
};
let obj = {1: 1, 2: 2, 3: 3}
let obj1 = {1: 2, 2: 4, 3: 6}
let target = extend({},obj,obj1)
console.log(target)