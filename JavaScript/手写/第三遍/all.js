// 深拷贝


function deepClone(obj={}, map = new WeakMap()) {
    if (typeof obj !== 'object') {
        return obj
    }
    if (map.get(obj)) {
        return map.get(obj)
    }
    let result = {};
    if (obj instanceof Array || Object.prototype.toString(obj) === '[object Array]') {
        result =[]
    }

    map.set(obj, result);
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key]=deepClone(obj[key],map)
        }
    }
    return result
}


//call
Function.prototype.call = function (context, ...args) {
    context = context || window;
    context.fn = this;
    const result =  context.fn(...args)
    delete context.fn;
    return result
}
//apply

Function.prototype.myApply = function (context, args) {
    context = context || window;
    context.fn = this;
    console.log(args)
    console.log(...args)
    const result = context.fn(...args)
    console.log(result,'resultresult')
    delete context.fn;
    return result
}
// 示例用法
function greet(name1, name2) {
  console.log(`Hello, ${name1} and ${name2}! My name is ${this.name}.`);
}

const person = {
  name: "John",
};

greet.myApply(person, ["Alice", "Bob"]); 

Function.prototype.myBind = function (context, ...args) {
    let self = this;
    return function (...newArgs) {
    // 在新函数中调用原始函数，并传入指定的上下文和参数
    return self.apply(context, args.concat(newArgs));
  };
}


const myNew = function (context) {
    const obj = {}
    obj.__proto__ = context.prototype;
    const result = context.apply(obj, [...arguments].slice(1))
    return typeof result === 'object' ? result : obj;
    
}