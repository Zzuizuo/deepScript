//数据劫持demo

class Dep { //消息订阅器
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => {
            sub.updata()
        })
    }
}

//全局属性，配置watcher
Dep.target = null

class Watcher { //观察者
    constructor(vm, exp, cb) {
        this.cb = cb
        this.exp = exp
        this.vm = vm
        this.val = this.get() //将自己添加到订阅器
    }
    updata() {
        this.run()
    }
    run() {
        let oldVal = this.val
        let val = this.vm[this.exp]
        if (val !== oldVal) {
            this.vm[this.exp] = val
            this.cb.call(this.vm, val, oldVal)
        }
    }
    get() {
        Dep.target = this
        let value = this.vm[this.exp]
        Dep.target = null
        return value
    }
}


//compile
class Compile {
    constructor(el, vm) {
        this.el = el
        this.vm = vm
        this.app = document.querySelector(el)
        this.frament = null
    }
    init() {
        this.frament = this.nodeToFragment()
        this.compileElement(this.frament)
        this.app.appendChild(this.frament)
    }
    nodeToFragment() {
        let frament = document.createDocumentFragment()
        let child = this.app.firstChild
        while (child) {
            frament.appendChild(child)
            child = this.app.firstChild
        }
        return frament
    }
    compileElement(el) {
        let self = this
        let childNodes = el.childNodes;
        [...childNodes].forEach(node => {
            let reg = /\{\{(.*)\}\}/
            let text = node.textContent
            console.log(node);

            if (self.isElementNode(node)) {
                self.compileAttr(node)
            }

            if (self.isTextNode(node) && reg.test(text)) { //判断指令
                self.compileText(node, reg.exec(text)[1])
            }
            if (node.childNodes && node.childNodes.length) { //继续递归子节点
                self.compileElement(node)
            }
        })
    }
    compileAttr(node) {
        let self = this
        console.log(node);

        let attrs = node.attributes;
        [...attrs].forEach(attr => {
            let name = attr.name
            if (self.isDirect(name)) {
                let val = attr.value
                if (name === 'v-model') {
                    self.compileModel(node, val)
                }
            }
        });
    }
    compileModel(node, val) {
        let dataVal = this.vm[val]
        this.updataModel(node, dataVal)

        new Watcher(this.vm, val, (value) => { //添加到订阅者里面
            this.updataModel(node, value);
        });

        node.addEventListener('input', (e) => {
            let newVal = e.target.value
            if (dataVal == newVal) {
                return
            }
            this.vm[val] = newVal
        })
    }

    compileText(node, exp) {
        let self = this
        let initText = this.vm[exp]
        node.textContent = initText
        this.updataText(node, initText) //初始化到视图
        new Watcher(this.vm, exp, (val) => { //生成订阅器
            self.updataText(node, val)
        })
    }
    isDirect(name) {
        return name.indexOf('v-') !== -1
    }
    updataModel(node, val) {
        node.value = typeof val == 'undefined' ? '' : val
    }
    updataText(node, val) {
        node.textContent = typeof val == 'undefined' ? '' : val
    }
    isElementNode(node) {
        return node.nodeType === 1
    }
    isTextNode(node) {
        return node.nodeType === 3
    }
}


class Mvvm {
    constructor(option) {
        this.data = option.data
        this.el = option.el
    }
    init() {
        let _self = this
        Object.keys(this.data).forEach(function(key) {
            _self.proxyKeys(key); // 绑定代理属性
        })
        observe(this.data)
        let compile = new Compile(this.el, this.data)
        compile.init()
        return this
    }
    proxyKeys(key) { //代理
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function proxyGetter() {
                return self.data[key];
            },
            set: function proxySetter(newVal) {
                self.data[key] = newVal;
            }
        });
    }
}


function defineReactive(obj, key, val) {
    observe(val) //递归对象

    let dep = new Dep()

    Object.defineProperty(obj, key, { //对象描述符，监听对象属性变化
        enumerable: true, //当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，
        configurable: true, //当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中
        get() {
            if (Dep.target) {
                dep.addSub(Dep.target)
            }
            return val
        },
        set(newVal) {
            if (val === newVal) {
                return
            }
            val = newVal
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