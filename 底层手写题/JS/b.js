const arr = [1, 2, 3]
Object.freeze(arr)
arr.push(3)// TypeError: Cannot add property 3, object is not extensible