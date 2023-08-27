// 防抖节流
//防抖
function debounce(fn, delay) {
    // 缓存一个定时器
    let timer = 0;
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        } else {
            timer = setTimeout(() => {
                fn.apply(this,args)
            }, delay);
        }
    }
}
//节流
function throttle(fn, delay) {
    let timer = 0;
    return function () {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fn.apply(this,arguments)
        },delay)
    }
}
// 继承

// 原型链继承
/**
 * 两个实例使用的是同一个原型对象，他们的内存空间是共享的，当一个发生变化的时候，
 * 另一个也随之进行了变化，这就是使用原型链方式继承的一个缺点
 *
 */
function Person() {
    this.age = 10;
    this.name = 'fishfan';
    this.play=[1,2,3]
}
Person.prototype.getAge = function () {
    console.log(this.age)
}
function Child() {
    this.sex='1'
}
Child.prototype = new Person()
let a1 = new Child()
a1.getAge()


//构造函数继承

/**
 * 构造函数继承
 * 父原型上的方法，子类无法继承
 *
 */

function Person1() {
    this.age = 1;
    this.name='fishfan'
}
Person1.prototype.getAge = function () {
    console.log(this.age)
}

function Child1() {
    Person1.call(this)
    this.sex ='1'
}

//组合继承
/**
 * 这种继承的方式优点在于构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数
 * 但是也存在一个缺点就是在继承父类函数的时候调用了父类的构造函数
 * 导致子类的原型上多了不需要的父类属性，存在内存上的浪费
 * 
 */
function Person2() {
    this.age = 10;
    this.name='fishfan'
}
Person2.prototype.getAge = function () {
    console.log(this.age)
}

function Child2(){
    Person2.call(this)
    this.sex='1'
}

Child2.prototype = new Person2()

let b=new Child2()
b.getAge()


// 寄生组合

function Person(){
    this.age=10;
    this.name='fishfan'
}
Person.prototype.getAge=function(){
    console.log(this.age)
}
function Child(){
    Parent.call(this)
    this.sex='1'
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child;

// 柯里化函数


function add(...args) {
    // 在内部声明一个函数，利用闭包的特性保存并收集所有的参数值
    let fn = function (...newArgs) {
        return add.apply(null,args.concat(newArgs))
    }
    //利用toString隐式转换的特性
    fn.toString = function () {
        return args.reduce((total,curr)=>total+curr)
    }
    return fn
}
function currying(func) {
    const args = [];
    return function result(...rest) {
        if (rest.length === 0) {
            return func(...args)
        } else {
            args.push(...rest)
            return result
        }
    }
}
function currying2(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func(...args)
        } else {
            return function (...moreArgs) {
                return curried(...args, ...moreArgs)
            }
        }
    }
}
// 示例用法
function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = currying(multiply);
console.log(curriedMultiply(2)(3)(4)()); // 输出 24
console.log(curriedMultiply(2, 3)(4)()); // 输出 24
console.log(curriedMultiply(2)(3, 4)()); // 输出 24


//手写深拷贝

function deepClone(obj, hash = new WeakMap()) {
    if (obj === null || obj === undefined) {
        return obj
    }
    if (obj instanceof Date) {
        return new Date(ibj)
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj)
    }
    if (hash.has(obj)) {
        return hash.get(obj)
    }
    let cloneObj = Array.isArray(obj)?[]:{};
    hash.set(obj, cloneObj)
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key]=deepClone(obj[key],hash)
        }
    }
    return cloneObj
}

// call apply bind
Function.prototype.myCall = function (context, ...args) {
    context = context || window;
    context.fn = this;
    let result = context.fn(...args);
    delete context.fn;
    return result
}

Function.prototype.myApply = function (context = window, args) {
    let content = context || window;
    content.fn = this;
    let result = content.fn(...args)
    delete content.fn;
    return result
}
Function.prototype.myBind = function (context = window, ...args) {
    let self = this;// this表示调用bind的函数
    let fBound = function (...innerArgs) {
        //this instanceof fBound为true表示构造函数的情况 例如new func.bind(obj)
        // 当作为构造函数时，this 指向实例，此时 this instanceof fBound 结果为 true
        //可以让实例获得来自绑定函数的值
        return self.apply(this instanceof fBound?this:context,args.concat(innerArgs))
    }
    fBound.prototype = Object.create(this.prototype)
    return fBound;
}

// instanceof

function myInstanceof(left, right) {
    if (typeof left !== 'object' || left === null) {
        return false
    }
    let prototype = right.prototype;
    let proto = left.__proto__;
    while (true) {
        if (proto === null || proto === undefined) { return false }
        if (proto === prototype) {
            return true
        }
        proto=proto.__proto__
    }
}

// new
function myNew(Fn) {
    return function () {
        let obj = {
            __proto__:Fn.prototype
        }
        Fn.apply(obj, arguments)
        return obj
    }
}

function myNews(Con, ...args) {
    let obj = {};
    Object.setPrototypeOf(obj, Con.prototype)
    let result = Con.apply(obj, args)
    return result instanceof Object ? result : obj;
}