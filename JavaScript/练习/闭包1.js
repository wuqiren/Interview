function outputNumbers(count){
    (function (){
        for(var i=0; i<count; i++){
            console.log(i)
        }
    })()
    console.log(i)
}
outputNumbers()


var aa =(function (){
    var a= 1;
    function bb(){
        a++;
        console.log(a)
    }
    function cc(){
        a++;
        console.log(a)
    }
    return {
        b:bb,
        c:cc
    }
})()

console.log()