var data = {
    name: 'Zzzuizuo'
}

function observe(data){
    if(!data || typeof data !== 'object'){
        return
    }
    Object.keys(data).forEach(function(key) {
        defineReactive(data,key,data[key])
    })
}

function defineReactive(data,key,val) {
    var  dep = new Dep();
    observe(val)
    Object.defineProperty(data,key,{
        enumerable: true,
        configurable: false,
        get: function(){
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set: function(newVal){
            if(val === newVal) return
            console.log('监听到值变化'+val+'=>'+newVal)
            val = newVal
            dep.notify()
        }

    })
}

function Dep(){
    this.subs = []
}
Dep.ptototype = {
    addSub: function(sub){
        this.subs.push(sub)
    },
    notify: function(){
        this.subs.forEach(function(sub){
            sub.update()
        })
    }
}
Watcher.prototype = {
    get: function(key){
        Dep.target = this
        this.value = data[key]
        Dep.target = null
    }
}
observe(data)

//Compile
function Compile(el){
    this.$el = this.isElementNode(el) ? el : document.querySelector(el)
    if(this.$el){
        this.$fragment = this.node2Fragment(this.$el)
        this.init()
        this.$el.appendChild(this.$fragment)
    }
}
Compile.prototype = {
    init: function(){
        this.compileElement(this.$fragment)
    },
    node2Fragment: function(el){
        var fragment = document.createDocumentFragment(),child;
        
    }
}