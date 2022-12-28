function add(){
    let args = [...arguments];
    let inner =function(){
        args.push(...arguments);
        return inner
    }
    inner.toString=function(){
        return args.reduce((prev,next)=>{
            return prev+next
        })
    }
    return inner
}

console.log(add(1,1,1)(2)(3).toString())


const sumFn=(...args)=>{
    return args.reduce((prev,next)=>{
        return prev+next
    })
}

var currying = function(func){
    const args=[];
    return function result(...rest){
        if(rest.length===0){
            return func(...args);
        }else{
            args.push(...rest);
            return result
        }
    }
}
console.log(currying(sumFn)(1)(2)(3)(4)())