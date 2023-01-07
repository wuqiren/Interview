class Promise{
    static PENDING='pending';
    static FULFILLED='fulfilled';
    static REJECTED='rejected';
    constructor(executor){
        this.status = Promise.PENDING;
        this.result=null;
        this.reason=null;
        this.resolveCallback=[];
        this.rejectCallback=[];
        try{
            executor(this.resolve.bind(this),this.reject.bind(this))
        }catch{
            this.reject(e)
        }
    }
    resolve(result){
        setTimeout(() => {
            if(this.status===Promise.PENDING){
                this.status=Promise.FULFILLED;
                this.result=result;
                this.resolveCallback.forEach(callback => callback(result));
            }
        });
    }
    reject(reason){
        setTimeout(() => {
            if(this.status===Promise.PENDING){
                this.status=Promise.REJECTED;
                this.reason=reason;
                this.rejectCallback.forEach(callback=>callback(reason))
            }
        });
    }
    then(onFulfilled,onRejected){
        let promise2 = new Promise((resolve,reject)=>{
            onFulfilled = typeof onFulfilled==='function' ? onFulfilled :value=>value;
            onRejected = typeof onRejected==='function' ? onRejected :(err)=>{throw err }
            if(this.status===Promise.PENDING){
                this.resolveCallback.push((value)=>{
                    resolvePromise(promise2,onFulfilled(value),resolve,reject)
                });
                this.rejectCallback.push(value=>{
                    resolvePromise(promise2,onRejected(value),resolve,reject)
                })
            }
            if(this.status===Promise.FULFILLED){
                setTimeout(()=>{
                    try{
                        resolvePromise(promise2,onFulfilled(this.value),resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            }
            if(this.status===Promise.REJECTED){
                setTimeout(()=>{
                    try{
                        resolvePromise(promise2,onFulfilled(this.reason),resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            }
        })
        return promise2
    }
}
function resolvePromise(promise2,x,resolve,reject){
    if(x===promise2){
        return reject(new TypeError('Chaining cycle detected for promise'))
    }
    //防止多次调用
    let called;
    // X不是null 是对象或者函数
    if(x!==null && (typeof x ==='object'|| typeof x ==='function') ){
        try {
            // A+规定，声明then=x的then方法 x为promise 即then里面返回的是promise
            let then = x.then
             // 如果then是函数，就默认是promise了
             if(typeof then === 'function'){
                     // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
                then.call(x,y=>{
                    if(called)return;
                    called=true;
                    // resolve的结果依旧是promise 那就继续解析
                    resolvePromise(promise2, y, resolve, reject);
                },err=>{
                    if(called)return;
                    called=true;
                    reject(err)
                })
             }else{
                resolve(x) // 直接成功即可
             }
        } catch (error) {
            if(called) return;
            called=true;
            //取then出错，那就不要在继续执行了
            reject(then)
        }
    }else{
        resolve(x)
    }
}

Promise.resolve=function(value){
    return new Promise((resolve,reject)=>{
        if(value instanceof Promise){
            value.then(resolve,reject)
        }else{
            resolve(value)
        }
    })
}
Promise.reject=function(val){
    return new Promise((resolve,reject)=>{
        reject(val)
    })
}
Promise.race=function(promises){
    return new Promise((resolve,reject)=>{
        for(let i=0;i<arr.length;i++){
            promises[i].then(resolve,reject)
        }
    })
}
Promise.all=function(promises){
    let arr = [];
    return new Promise((resolve,reject)=>{
        promises.forEach(item=>{
            item.then((value)=>{
                arr.push(value)
                if(arr.length==promises.length){
                    resolve(arr)
                  }
            },reject)
        })
    })
}