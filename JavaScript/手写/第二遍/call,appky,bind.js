
Function.prototype.call =function(context,...args){
    context = context||window;
    context.fn = this
    const result= context.fn(...args);
    delete context.fn;
    return result
}
Function.prototype.apply =function(context,args){
    context = context||window;
    context.fn = this
    const result= context.fn(...args);
    delete context.fn;
    return result
}
Function.prototype.bind =function(context,...args){
    context = context||window;
    const _this= this
    return function F(){
        if(this instanceof F){
            return _this.apply(...args,...arguments)
        }
        return this.apply(context,args.concat(...arguments))
    }
}