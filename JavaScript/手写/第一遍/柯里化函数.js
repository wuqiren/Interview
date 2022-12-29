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