let Person = {
    name: 'poetry',
    age: 18,
    address: {
        home: 'home',
        office: 'office',
    },
    sclools: ['x','z'],
}

function qiancopy(obj1,obj2){
    obj2= obj2|| {};
    for(let i in obj1) {
        obj2[i] = obj1[i];
    }
}