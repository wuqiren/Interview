let a = {
    value: 1,
 
}
function getValue(name, age) {
    console.log(this.name)
    console.log(age)
    console.log(this.value)
}
getValue.call(a, 'poe', '24')

console.log( Math.max(1,2))