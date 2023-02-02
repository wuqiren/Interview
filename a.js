function add (){
    let a = 1;
    return ()=>{
        console.log(a)
    }
}

add()()
console.log(a)