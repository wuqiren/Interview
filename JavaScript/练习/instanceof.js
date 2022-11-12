function myinstanceof (left, right){
    if(typeof left !== 'object' || left===null) return false;
    let prototype = right.prototype;
    left = left.__proto__;
    while(true){
        if(left===null) return false;
        if(prototype === left) return true;
        left = left.__proto__;
    }
}


