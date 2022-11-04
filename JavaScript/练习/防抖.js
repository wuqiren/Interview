function debounce(fn,delay=300) {
    let time;
    return function(){
        const args = augment;
        if(time){
            clearTimeout(time);
        }
        time = setTimeout(()=>{
            fn.apply(this,args);
        },delay);
    }
}