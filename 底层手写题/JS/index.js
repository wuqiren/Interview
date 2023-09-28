Function.prototype.myCall =function (ctx,...args){
    ctx = ctx || window;
    // 把函数赋值给对象ctx的一个属性  用这个对象ctx去调用函数  this就指向了这个对象
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol();
    ctx[key] = this;
    const result = ctx[key](...args);
    delete ctx.fn;
    return result;
}

Function.prototype.myApply = function (ctx, args) { 
    ctx = ctx || window;
    // 把函数赋值给对象ctx的一个属性  用这个对象ctx去调用函数  this就指向了这个对象
    const key = Symbol();
    ctx[key] = this;
    const result =ctx[key](...args);
    delete ctx.fn;
    return result;
}

Function.prototype.myBind = function (ctx, ...args1){
    const self = this;
    return function (...args2) { 
        return self.apply(ctx, args1.concat(args2));
    }
}


function myNew(){
 // 创建一个新对象
  const obj = {};
  // 将新对象的“__proto__”属性指向构造函数的原型对象上
  let Con = [].shift.call(arguments)
	obj.__proto__ = Con.prototype
  //将构造函数的this指向新对象
  //执行构造函数内部的代码
  let result = Con.apply(obj,arguments)
	// 返回新对象 如果构造函数有返回值且返回的是一个对象，则返回该对象，否则返回新对象
  return result instanceof Object ? result : obj

}
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const john = myNew(Person, 'John');
john.sayHello(); // 输出 "Hello, I'm John"




function a() {
    const obj = {};
    let Con = [].shift.call(arguments)
    obj.__proto__ = Con.prototype;
    let result = Con.apply(obj, arguments);
    return result instanceof Object ? result : obj;
}