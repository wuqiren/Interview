Function.prototype.call =function(context,...args){
    context= context||window;
    context.fn=this;
    const result =context.fn(...args)
    delete context.fn;
    return result
}

Function.prototype.apply=function(context,args){
    context =context||window;
    context.fn=this;
    const result = context.fn(...args);
    delete context.fn;
    return result
}

Function.prototype.bind= function(context,...args){
    context =context||window
    const _this=this;
    return function F(){
        if(this instanceof F){
            return _this.apply(...args,...arguments)
        }
        return this.apply(context,args.concat(...arguments))
    }
}


function myinstallof(left,right){
    if(typeof left !=='object' || left === null){return false}
    left = left.__proto__;
    const prototype=right.prototype;
    while(true){
        if(left===null) return false;
        if(left===prototype)return true;
        left=left.__proto__
    }
}

function mynew(con,...args){
    return function(){
        var obj={
            __proto__:con.prototype
        }
        con.apply(obj,args)
        return obj
    }
}