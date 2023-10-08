Function.prototype.myCall = (context,...args)=>{
    const context = context || window;
    const fn = Symbol()
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
}
Function.prototype.myApply = (context,args)=>{
    const context = context || window;
    const fn = Symbol()
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
}

Function.prototype.myBind = (context,...args)=>{
    const self = this;
    return function fn(...args){
        if(this instanceof self){
            return new fn(...args)
        }
        return self.apply(context,args.concat(...arguments))
    }
}


function myNew(){
    const obj ={};
    let Con = [].shift.call(arguments)
    obj.__proto__=Con.prototype;
    let result = Con.apply(obj,arguments);
    return typeof result === 'object'?result:obj;
}

function myNew2(construct,...args){
    const obj= Object.create(construct.prototype);
    let result = construct.apply(obj,args);
    return typeof result === 'object'?result:obj;
}


function.prototype.myCall = (context,...args)=>{
    const context = context || window;
    const fn = Symbol()
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
}args1

Function.prototype.bind= (context,...args)=>{
    const self = this;
    return function fn(...args1){
        if(this instanceof self){
            return new self(...args)
        }
        return self.apply(context,args.concat(...args1))
    }
}


function m(construct,...args){
    const obj = Object.create(construct.prototype);
    let result = construct.apply(obj,args);
    return typeof result === 'object'?result:obj;
}

function curry(fn){
    return function curried(args){
        if(args.length<fn.length){
            return function(...args2){
                return curried.apply(this,args.concat(args2))
            }args
        }else{
            return fn.apply(this,args)
        }
    }
}



function deepClone(obj,map=new WeakMap()){
    if(typeof obj !=='object' || obj===null){
        return obj
    }
    if(map.has(obj)){
        return map.get(obj)
    }
    if(Array.isArray(obj)){
        let newArray=[]
        newArray=obj.map(item=>deepClone(item,map))
        map.set(obj,newArray)
        return newArray
    }
    const newObj = {}
    map.set(obj,newObj)
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key]=deepClone(obj[key],map)
        }
    }
    return newObj;
}

const a = {
    name:'s',
    aa:213123,
    dd:{a:1,v:2,d:3},
    arr:[1,2,3,4]
}

console.log(deepClone(a))