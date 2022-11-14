Function.prototype.mycall = function (context1){
    let context = context1 || window;
    context.fn = this;
    // 将context后面的参数取出来
    let args = [...arguments].slice(1);
    let result = context.fn(...args);
    delete context.fn;
    return result;
}
Function.prototype.myapply = function (context,...args) {
    if (typeof context === undefined || typeof context === null) {
        context = window
      }
    let key = Symbol('key')
    context[key] = this;
    let result;
    if (args[0]) {
        result = context[key](...args[0])
      } else {
        result = context[key]()
      }
    delete context[key];
    return result;
}
Function.prototype.myApply = function(context) {
    if (typeof context === undefined || typeof context === null) {
      context = window
    }
    const symbol = Symbol()
    context[symbol] = this
    let result
    // 处理参数和 call 有区别
    if (arguments[1]) {
      result = context[symbol](...arguments[1])
    } else {
      result = context[symbol]()
    }
    delete context[symbol]
    return result
  }
Function.prototype.mybind = function (context){
    if(typeof this !== 'function'){
        throw new TypeError('error')
    }
    let _this = this;
    let args=[...arguments].slice(1);
    return function F(){
        if(this instanceof F){
            return new _this(...args,...arguments)
        }
        return _this.apply(context,args.concat(...arguments))
    }
}
function f(a,b){
    console.log(a,b)
    console.log(this.name)
   }
   let obj={
    name:'张三'
   }
   f.myapply(obj,[1,2])  //arguments[1]
    