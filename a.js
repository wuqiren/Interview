// 输入是一个有序数组，如（1，3，8，9，2983，19203，20312，94888），给定一个数字K，请找到一个位置，当K插入数组后，数组仍然是有序的。


function fn(arr,k){
    let left=0;
    let right=arr.length-1;
    let middle =0;
    if(k<arr[0]){
        return 0;
    }
    if(k>arr[arr.length-1]){
        return arr.length
    }
    while(left<right){
        middle = Math.floor((right-left)/2)
        if(k>arr[middle]){
            left=middle+1;
        }else if(k<arr[middle]){
            right=middle-1
        }else{
            return middle
        }
    }
    return k>arr[middle]? middle+1:middle;
}
console.log(fn([1,3,8,9,2983,19203,20312,94888],4))