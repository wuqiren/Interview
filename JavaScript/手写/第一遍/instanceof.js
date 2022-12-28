// instanceof 的原理是内部机制通过判断对象的原型链中是不是能够找到类型的prototype

function _instanceof(left,right){
    if(typeof left!=='object'|| left===null){return false;}
    left = left.__proto__
    const prototype = right.prototype;
    while(true){
        if(left===null||left===undefined){return false;}
        if(left===prototype){return true;}
        left = left.__proto__
    }
}

function myInstanceof(left,right){
    if(typeof left!=='object'|| left===null){return false}
    let prototype = right.prototype
    let proto=left.__proto__
    while(true){
        if(proto===null||proto===undefined){return false;}
        if(proto===prototype){
            return true
        }
        proto=proto.__proto__
    }
}