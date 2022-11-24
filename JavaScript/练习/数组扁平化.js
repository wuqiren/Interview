let a = [1,[2,3,[4,5,[6]]]]

function flatten(arr){
    let result = [];
    for(let i = 0; i < arr.length; i++){
        if(Array.isArray(arr[i])){
            result =result.concat(flatten(arr[i]));
        }else{
            result.push(arr[i]);
        }
    }
    return result;
}

function flatten1(arr){
    return arr.reduce((a,b)=>{
       return a.concat(Array.isArray(b)?flatten1(b):b)
    },[])
}

function flatten2(arr){
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

console.log(flatten2(a))

console.log(...[1,2,[3]])