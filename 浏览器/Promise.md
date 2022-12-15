https://time.geekbang.org/column/article/136895

### Promise解决了什么问题？

Promise解决的是异步编码风格的问题，而不是其他问题

### Promise 是怎么消灭嵌套回调的

产生嵌套函数的一个主要原因是在发起任务请求时会带上回调函数，这样当任务处理结束之后，下个任务就只能在回调函数中来处理了。

Promise 主要通过下面两步解决嵌套回调问题的。

##### 首先，Promise 实现了回调函数的延时绑定
##### 其次，需要将回调函数 onResolve 的返回值穿透到最外层
现在我们知道了 Promise 通过回调函数延迟绑定和回调函数返回值穿透的技术，解决了循环嵌套。

> 所谓“穿透”可以这样理解，前一个promise1的then方法会帮你调用回调onresolve，这里就可以拿到第一个异步操作的数据。如果有进一步的异步请求，就会生成一个新的promise2，并把它作为回调的返回值立即返回。这样promise1的then方法会帮你把这个返回的promise2再返回到外部，用于进一步调用then方法。 嵌套回调比起promise，其回调函数不返回值，没有好好利用起来。
### Promise如何处理异常
Promise对象的错误具有冒泡性质，会一直向后传递，直到被onReject函数处理或catch语句捕获位置，具备这样冒泡的特性，就不需要在每个Promise对象中单独捕获异常

`

function Bromise(executor) {
    var onResolve_ = null
    var onReject_ = null
     //模拟实现resolve和then，暂不支持rejcet
    this.then = function (onResolve, onReject) {
        onResolve_ = onResolve
    };
    function resolve(value) {
          setTimeout(()=>{
            onResolve_(value)
            },0)
    }
    executor(resolve, null);
}
`