function debounce(fn,delay){
    let timer;
    return function(){
        const args = arguments;
        if(timer){
            clearTimeout(time)
            timer=null
        }
        timer=setTimeout(()=>{
            fn.apply(this,args)
        },delay)
    }
}


// 节流函数
function throttle(fn, delay = 200) {
    let  timer = 0
    return function () {
      if(timer){
        return
      }
      timer = setTimeout(() =>{
        fn.apply(this, arguments); // 透传 this和参数
        timer = 0
      },delay)
    }
  }