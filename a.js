
function executor(resolve, reject) {
  let rand = Math.random();
  console.log(1)
  console.log(rand)
  if (rand > 0.5)
      resolve()
  else
      reject()
}
var p0 = new Promise(executor); // 1 rand 

var p1 = p0.then((value) => {
  console.log("succeed-1") // rand>0.5 
  return new Promise(executor) //1 rand
})


var p3 = p1.then((value) => {
  console.log("succeed-2") // // rand>0.5 
  return new Promise(executor)
})

var p4 = p3.then((value) => {
  console.log("succeed-3") // rand>0.5 
  return new Promise(executor)
})


p4.catch((error) => {
  console.log("error") //// rand<0.5 
})
console.log(2)
