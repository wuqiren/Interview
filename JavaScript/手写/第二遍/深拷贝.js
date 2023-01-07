const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

function deepClone (obj,hash=new WeakMap()){
    if(hash.get(obj)){
        return obj;
    }
    if(isObject(obj)){
        hash.set(obj,true)
        if (obj instanceof Function) {
            return  function() {
                return obj.apply(this, arguments)
              }
        }
        if (obj instanceof Date){
            return new Date(obj)       // 日期对象直接返回一个新的日期对象
        }
        if (obj instanceof RegExp){
            return new RegExp(obj.source, obj.flags)     //正则对象直接返回一个新的正则对象
        }
        const cloneTarget =Array.isArray(obj)?[]:{};
        for(const prop in obj){
            if (obj.hasOwnProperty(prop)) { 
                cloneTarget[prop] = deepClone(obj[prop],hash); 
            } 
        }
        return cloneTarget; 
    } else{
        return obj
    }
}

let a = {
    name:'fishfan',
    age:1,
    add:function(){
        console.log('fishfan','2222')
        return '222'
    },
    address:{
        bb:1,
        c:{
            objk:'222'
        }
    }
};

console.log(deepClone(a).add())

