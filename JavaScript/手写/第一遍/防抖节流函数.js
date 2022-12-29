function debounce(fn, delay) {
      // 缓存一个定时器id
  let timer = 0
  return function(...args) {
    if(timer){ 
        clearTimeout(timer)
    }else{
        timer = setTimeout(()=>{
            fn.apply(this,args)
        },delay)
    }
  }
}
function throttle(fn,delay) {
    let timer = 0
    return function(){
        if(timer){
            return 
        }
        timer = setTimeout(()=>{
            fn.apply(this,arguments);
        },delay);
    }
}