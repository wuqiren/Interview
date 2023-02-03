
const isObject = (target)=>(typeof target==='object'||typeof target==='function') && target!==null
let hash = new WeakMap()
function cloneDeep(obj){
    if(hash.get(obj)){
        return obj
    }
    if(isObject(obj)){
        hash.set(obj,true)
        if(obj instanceof Function){
            return function(){
                return obj.apply(this,arguments)
            }
        }else if(obj instanceof Date){
            return new Date(obj)
        }else if(obj instanceof RegExp){
            return new RegExp(obj.source,obj.flags)
        }
        const cloneTarget = Array.isArray(obj)?[]:{}
        for(const i in obj){
            if(obj.hasOwnProperty(i)){
                cloneTarget[i]=cloneDeep(obj[i])
            }
        }
        return cloneTarget
    }else{
        return obj
    }
}

const obj1 = {
    a:1,
    b:{
        c:2,
        d:[1,2,3,4,5]
    },
    age:[1,1,1,1,1]
}

console.log(cloneDeep(obj1))