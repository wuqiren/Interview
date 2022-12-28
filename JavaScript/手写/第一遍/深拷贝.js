const deepClone = function (obj, hash = new WeakMap()) {
    if(value==null || value==undefined){
        return obj;
    }

    if (obj instanceof Date){
        return new Date(obj)       // 日期对象直接返回一个新的日期对象
    }
    if (obj instanceof RegExp){
        return new RegExp(obj)     //正则对象直接返回一个新的正则对象
    }
     // 说明是一个对象类型
    if (hash.has(obj)){
        return hash.get(obj)
    }
     // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
    let cloneObj = new value.constructor(); // [] {}
    hash.set(obj, cloneObj)
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            cloneObj[key]=deepClone(obj[key], hash)
        }
    }
    return cloneObj
  }


const a =new Map()
a.set('name','fishfan').set('age','11')
console.log(a,'aa')
console.log([...a])
const myMap = new Map()
let my = {
    name: "ljc",
    sex: "男"
}
myMap.set(my, 'info');
console.log(myMap);


const b = new Date()
console.log(b instanceof Date)