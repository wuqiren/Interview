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

function add(...args) {
    // 在内部声明一个函数，利用闭包的特性保存并收集所有的参数值
    let fn = function(...newArgs) {
     return add.apply(null, args.concat(newArgs))
    }
    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    fn.toString = function() {
      return args.reduce((total,curr)=> total + curr)
    }
    return fn
  }

console.log(add(1,2,3,4)(1)(1).toString())