/**
 * 1、Promise 中为什么要引入微任务？

由于promise采用.then延时绑定回调机制，而new Promise时又需要直接执行promise中的方法，
即发生了先执行方法后添加回调的过程，此时需等待then方法绑定两个回调后才能继续执行方法回调，
便可将回调添加到当前js调用栈中执行结束后的任务队列中，由于宏任务较多容易堵塞，则采用了微任务

2、Promise 中是如何实现回调函数返回值穿透的？
首先Promise的执行结果保存在promise的data变量中，
然后是.then方法返回值为使用resolved或rejected回调方法新建的一个promise对象，
即例如成功则返回new Promise（resolved），
将前一个promise的data值赋给新建的promise

3、Promise 出错后，是怎么通过“冒泡”传递给最后那个捕获
promise内部有resolved_和rejected_变量保存成功和失败的回调，
进入.then（resolved，rejected）时会判断rejected参数是否为函数，
若是函数，错误时使用rejected处理错误；若不是，则错误时直接throw错误，
一直传递到最后的捕获，若最后没有被捕获，则会报错。
可通过监听unhandledrejection事件捕获未处理的promise错误
 * 
 */


class Promise1{
    static PENDING='pending';
    static FULFILLED='fulfilled'
    static REJECTED='rejected'
    constructor(func){
        this.status = Promise1.PENDING
        this.result=null;
        this.resolveCallback=[];
        this.rejectCallback=[];
        try{
            func(this.resolve.bind(this), this.reject.bind(this))
        }catch(e){
            this.reject(e)
        }
    }
    resolve(result){
        setTimeout(()=>{
            if(this.status===Promise1.PENDING){
                this.status=Promise1.FULFILLED
                this.result=result;
                this.resolveCallback.forEach(callback=>{
                    callback(result)
                })
            }
        })
    }
    reject(result){
        setTimeout(() => {
            if(this.status===Promise1.PENDING){
                this.status=Promise1.REJECTED
                this.result=result;
                this.rejectCallback.forEach(callback=>{
                    callback(result)
                })
            }
        });
    }
    then(onFulfilled,onRejected){
        let promise2= new Promise1((resolve, reject)=>{
            onFulfilled=typeof onFulfilled=='function'?onFulfilled:()=>{};
            onRejected=typeof onRejected=='function'?onRejected: err => { throw err };
            if(this.status===Promise1.PENDING){
                this.resolveCallback.push(()=>{
                    resolvePromise(promise2,onFulfilled(this.result), resolve, reject)
                })
                this.rejectCallback.push(()=>{
                    resolvePromise(promise2,onRejected(this.result), resolve, reject)
                })
            }
            if(this.status===Promise1.FULFILLED){
                setTimeout(()=>{
                    try {
                        resolvePromise(promise2,onFulfilled(this.result), resolve, reject);
                      } catch (e) {
                        reject(e);
                      }
                })
            }
            if(this.status===Promise1.REJECTED){
                setTimeout(()=>{
                    try {
                        resolvePromise(promise2, onRejected(this.result), resolve, reject);
                      } catch (e) {
                        reject(e);
                      }
                })
            }
        })
        return promise2
    }
}
function resolvePromise(promise2, x, resolve, reject){
    console.log(x,'xxxxxxxxxxxxxx')
    // 循环引用报错
    if(x === promise2){
      // reject报错
      return reject(new TypeError('Chaining cycle detected for promise'));
    }
    // 防止多次调用
    let called;
    // x不是null 且x是对象或者函数
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        // A+规定，声明then = x的then方法
        let then = x.then;
        // 如果then是函数，就默认是promise了
        if (typeof then === 'function') { 
          // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
          then.call(x, y => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            // resolve的结果依旧是promise 那就继续解析
            resolvePromise(promise2, y, resolve, reject);
          }, err => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            reject(err);// 失败了就失败了
          })
        } else {
            console.log('????????????')
          resolve(x); // 直接成功即可
        }
      } catch (e) {
        // 也属于失败
        if (called) return;
        called = true;
        // 取then出错了那就不要在继续执行了
        reject(e); 
      }
    } else {
        console.log('################')
      resolve(x);
    }
}
Promise1.resolve = function(val){
    return new Promise1((resolve,reject)=>{
      resolve(val)
    });
  }
Promise1.reject = function(val){
    return new Promise1((resolve,reject)=>{
        reject(val)
    });
}
Promise1.race=function(promises){
    return new Promise1((resolve,reject)=>{
        for(let i=0;i<promises.length;i++){
            promises[i].then(resolve,reject);
        }
    })
}
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise1.all = function(promises){
    let arr = [];
    let i = 0;
    function processData(index,data){
      arr[index] = data;
      i++;
      if(i == promises.length){
        resolve(arr);
      };
    };
    return new Promise((resolve,reject)=>{
      for(let i=0;i<promises.length;i++){
        promises[i].then(data=>{
          processData(i,data);
        },reject);
      };
    });
  }
console.log('第一步')
new Promise1((resolve, reject)=>{
    resolve('这次一定')
}).then((result)=>{
    console.log(result,'33333333333')
    return ()=>{console.log('vvvvv')}
}).then((a)=>{a()})
console.log('第三步')