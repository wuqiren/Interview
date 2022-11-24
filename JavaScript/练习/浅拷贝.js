let obj1 = { a:{ b:1 }, sym:Symbol(1)}; 
Object.defineProperty(obj1, 'innumerable' ,{
    value:'不可枚举属性',
    enumerable:false
});
let obj2 = {};
Object.assign(obj2,obj1)
obj1.a.b = 2;
console.log('obj1',obj1);
console.log('obj2',obj2);


const shallowClone = (target)=>{
    if(typeof target === 'object' && target!==null){
        const cloneTarget = Array.isArray(target)?[]:{}
        for(let prop in target){
            if(target.hasOwnProperty(prop)){
            cloneTarget[prop] = target[prop]

            }
        }
        return cloneTarget;
    }else{
        return target 
    }
}

JSON.parse(JSON.stringify())