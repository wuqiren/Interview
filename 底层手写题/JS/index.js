/**
 * 
 * 取整的时候你会用 parseInt 还是 Math.floor ?
 */


// 获取min到max之间的随机数

console.log(parseInt("11",8)) //3 


function randomRange(min, max) { //11 20
    return Math.floor(Math.random()*(max-min+1)+min)
 }

var arr = [0]
if (arr) {
    console.log(arr==true) //false
} else {
    console.log(a)
}