https://time.geekbang.org/column/article/136895
https://time.geekbang.org/column/article/137827
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

`

async function foo() {
    console.log('foo')
}
async function bar() {
    console.log('bar start')
    await foo()
    console.log('bar end')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout')
}, 0)
bar();
new Promise(function (resolve) {
    console.log('promise executor')
    resolve();
}).then(function () {
    console.log('promise then')
})
console.log('script end')

`

1.首先执行console.log('script start');打印出script start
2.接着遇到定时器，创建一个新任务，放在延迟队列中
3.紧接着执行bar函数，由于bar函数被async标记的，所以进入该函数时，JS引擎会保存当前调用栈等信息，然后执行bar函数中的console.log('bar start');语句，打印bar start。
4.接下来执行到bar函数中的await foo();语句，执行foo函数，也由于foo函数被async标记的，所以进入该函数时，JS引擎会保存当前调用栈等信息，然后执行foo函数中的console.log('foo');语句，打印foo。
5.执行到await foo()时，会默认创建一个Promise对象
6.在创建Promise对象过程中，调用了resolve()函数，且JS引擎将该任务交给微任务队列
7.然后JS引擎会暂停当前协程的执行，将主线程的控制权交给父协程，同时将创建的Promise对象返回给父协程
8.主线程的控制权交给父协程后，父协程就调用该Promise对象的then()方法监控该Promise对象的状态改变
9.接下来继续父协程的流程，执行new Promise()，打印输出promise executor，其中调用了 resolve 函数，JS引擎将该任务添加到微任务队列队尾
10.继续执行父协程上的流程，执行console.log('script end');，打印出来script end
11.随后父协程将执行结束，在结束前，会进入微任务检查点，然后执行微任务队列，微任务队列中有两个微任务等待执行，先执行第一个微任务，触发第一个promise.then()中的回调函数，将主线程的控制权交给bar函数的协程，bar函数的协程激活后，继续执行后续语句，执行 console.log('bar end');，打印输出bar end
12.bar函数协程执行完成后，执行微任务队列中的第二个微任务，触发第二个promise.then()中的回调函数，该回调函数被激活后，执行console.log('promise then');，打印输出promise then
13.执行完之后，将控制权归还给主线程，当前任务执行完毕，取出延迟队列中的任务，执行console.log('setTimeout');，打印输出setTimeout。

故：最终输出顺序是：script start => bar start => foo => promise executor => script end => bar end => promise then => setTimeout


`
async function async1() {
  console.log('async1 start') // 2
  await async2()
  console.log('async1 end')//9
}
async function async2() {
  console.log('async2 start') //3
  return new Promise((resolve, reject) => { 
    resolve()
    console.log('async2 end') //4
  })
}
console.log('script start')// 1
setTimeout(()=>{
  console.log('setTimeout');//10
}, 0)
async1();
new Promise(function(resolve) {
  console.log('promise1');//5
  resolve();
}).then(function() {
  console.log('promise2');//7
}).then(function() {
  console.log('promise3');//8
});
console.log('script end');//6
`