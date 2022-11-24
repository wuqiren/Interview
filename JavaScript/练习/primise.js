function MyPromise (constructor){
    let self = this;
    self.status = "pending"//定义状态改变前的初始状态
    self.value = undefined;// resolved的状态
    self.reason = undefined;//reject的状态
    function resolve(value){
        if(self.status === "pending"){
            self.value = value;
            self.status="resolved"
        }
    }
    function reject(reason){
        if(self.status === "pending"){
            self.reason = reason;
            self.status="rejected"
        }
    }
    try{
        constructor(resolve,reject)
    }catch(e){
        reject(e);
    }
}
MyPromise.prototype.then = function(onFullfilled,onRejected){
    let self = this
    switch(self.status){
        case "resolved":
            onFullfilled(self.value)
            break;
        case "rejected":
            onRejected(self.reason);
            break;
        default:
    }
}