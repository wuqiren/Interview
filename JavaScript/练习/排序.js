let a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221];
function bubbleSort(arr){
    const len = arr.length;
    if(len<2){return arr}
    for(let i=0; i<len; i++){
        for(let j=0;j<i;j++){
            if(arr[j]>arr[i]){
            const temp = arr[j]
            arr[j]=arr[i]
            arr[i]=temp
            }

        }
    }
    return arr
}
function quickSort(array){
    var quick = function(arr) {
        if (arr.length <= 1) return arr
        const len = arr.length
        const index = Math.floor(len >> 1)
        const pivot = arr.splice(index, 1)[0]
        const left =[]
        const right =[]
        for(let i=0;i<len;i++){
            console.log(pivot,'pivotpivot')
            if(arr[i]<pivot){
                left.push(arr[i])
            }else if (arr[i] >= pivot) {
                console.log(arr[i],'arr[i]arr[i]')
                right.push(arr[i])
              }
        }
        return quick(left).concat([pivot], quick(right))
    }
    const result = quick(array)
    return result
}
function insertSort(array){
    const len = array.length;
    let current,prev;
    for(let i=0;i<len;i++){
        current = array[i]
        prev = i-1;
        while(prev>=0 && array[prev]>current){
            array[prev+1]=array[prev]
            prev--
        }
        array[prev+1] =current
    }
    return array
}
function selectSort(array){
    const len = array.length;
    let temp,minIndex;
    for(let i=0;i<len;i++){
        minIndex =i
        for(let j=i;j<len;j++){
            if(array[j]<=array[minIndex]){
                minIndex=j
            }

        }
        temp =array[i]
        array[i]=array[minIndex]
        array[minIndex] = temp
    }
    return array
}
console.log(selectSort(a))