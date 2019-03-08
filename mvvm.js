//数据劫持demo

//解耦
class Dep { //消息订阅器
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => {
            console.log(sub);
            sub.updata()
        })
    }
}

//全局属性，配置watcher
Dep.target = null

class Watcher {
    constructor(vm, exp, cb) {
        this.cb = cb
        this.exp = exp
        this.vm = vm
        this.val = this.get() //将自己添加到订阅器
    }
    updata() {
        console.log(123);
        this.run()
    }
    run() {
        let oldVal = this.val
        let val = this.vm[expexp]
        if (old !== oldVal) {
            this.vm[exp] = val
            this.cb.call(this.vm, val, oldVal)
        }
    }
    get() {
        Dep.target = this
        let value = this.vm[this.exp]
        Dep.target = null
        return
    }
}

//compile
class Mvvm {
    constructor(vm, el, exp) {
        this.vm = vm
        this.el = el
        this.exp = exp
    }
    init() {
        let _self = this
        _self.el.innerHTML = _self.vm[_self.exp]
        observe(_self.vm)
        new Watcher(this, _self.exp, val => {
            _self.el.innerHTML = val
        })
        return _self
    }
}

function defineReactive(obj, key, val) {
    observe(val) //递归对象

    let dep = new Dep()

    console.log(obj);


    Object.defineProperty(obj, key, { //对象描述符，监听对象属性变化
        enumerable: true, //当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，
        configurable: true, //当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中
        get: () => {
            // if (Dep.target) {
            //     dep.addSub(Dep.target)
            // }
            // console.log(dep);
            console.log(val);

            return val
        },
        set: (newVal) => {
            if (val === newVal) {
                return
            }
            console.log('change value')
            val = newVal
            console.log(dep);

            dep.notify() //通知订阅者
        }
    })
}

function observe(obj) { //监听者
    if (!obj || typeof obj !== 'object') { //判断对象
        return
    }
    Object.keys(obj).forEach(key => { //遍历对象
        defineReactive(obj, key, obj[key])
    })
}