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