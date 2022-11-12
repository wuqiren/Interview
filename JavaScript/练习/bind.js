Function.prototype.mycall = function (context1){
    let context = context1 || window;
    console.log(this,'thisthisthis')
    context.fn = this;
    // 将context后面的参数取出来
    let args = [...arguments].slice(1);
    let result = context.fn(...args);
    delete context.fn;
    return result;
}
Function.prototype.myapply = function (context,...args) {
    let key = Symbol('key')
    context[key] = this;
    let result =  context[key](...args);
    delete context[key];
    return result;
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