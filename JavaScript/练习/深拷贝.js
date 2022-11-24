function deepclone(obj){
    let cloneObj= {};
    for(let key in obj){
        if(typeof obj[key]==='object'){
            cloneObj[key]=deepclone(obj[key]);
        }else{
            cloneObj[key]=obj[key];
        }
    }
    return cloneObj;
}

function deepclone1(obj){
    if(obj instanceof Object){
        if(Array.isArray(obj)){
            let result = [];
            obj.forEach(item=>{
                result.push(deepclone1(item))
            })
            return result;
        }else{
            let result = {};
            for(let key in obj){
                result[key]=deepclone1(obj[key])
            }
            return result;
        }
    }
    return obj;
}