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