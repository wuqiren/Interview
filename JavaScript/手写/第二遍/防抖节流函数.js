function debounce(fn, delay) {
    let timer=0
    // 这里返回的函数是每次用户实际调用的防抖函数
    // 如果已经设定过定时器了就清空上一次的定时器
    // 开始一个新的定时器，延迟执行用户传入的方法
    return function(...args) {
        if(timer){
           clearTimeout(timer)
        }else{
            timer= setTimeout(()=>{
                fn.apply(this, args)
            },delay)
        }
    }
}

// 节流函数
function throttle(fn, delay = 200) {
    let timer = 0
    return function (...args) {
      if(timer){
        return
      }
      timer = setTimeout(() =>{
        fn.apply(this, args); // 透传 this和参数
        timer = 0
      },delay)
    }
}