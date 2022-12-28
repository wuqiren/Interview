Function.prototype.mycall=function(context,...args){
    let context=context||window
    context.fn=this;
    let result=context.fn(...args);
    delete context.fn;
    return result;
}

Function.prototype.myapply=function(context,args){
    let content =context||window;
    content.fn=this;
    let result=content.fn(...args);
    delete content.fn;
    return result;
}
Function.prototype.mybind=function(context,...args){
    context=context||window;
    const _this=this;
    return function F(){
        if(this instanceof Function){
            return _this(...args,...arguments);
        }
        return _this.apply(context,args.concat(...arguments));
    }
}
Function.prototype.myBind = function(context = window, ...args) {
    // this表示调用bind的函数
    let self = this;
    //返回了一个函数，...innerArgs为实际调用时传入的参数
    let fBound = function(...innerArgs) { 
        //this instanceof fBound为true表示构造函数的情况。如new func.bind(obj)
        // 当作为构造函数时，this 指向实例，此时 this instanceof fBound 结果为 true，可以让实例获得来自绑定函数的值
        // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(
          this instanceof fBound ? this : context, 
          args.concat(innerArgs)
        );
    }
    // 如果绑定的是构造函数，那么需要继承构造函数原型属性和方法：保证原函数的原型对象上的属性不丢失
    // 实现继承的方式: 使用Object.create
    fBound.prototype = Object.create(this.prototype);
    return fBound;
  }
  Function.prototype.bind = function (context, ...args) {
    if (typeof this !== "function") {
      throw new Error("this must be a function");
    }
    var self = this;
    var fbound = function () {
        self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
    }
    if(this.prototype) {
      fbound.prototype = Object.create(this.prototype);
    }
    return fbound;
}
Function.prototype.bind = function(){
	var fn = this;
	var args = Array.prototye.slice.call(arguments);
	var context = args.shift();

	return function(){
		return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
	};
};


