const judge = (value) => {
    console.log(Object.prototype.toString.call(value) )
}
judge(1) // [object Number]
judge('1')// [object String]
judge(null)// [object Null]
judge(undefined) // [object Undefined]
judge(console.log)// [object Function]
judge(Symbol()) // [object Symbol]
judge(47n)//[object BigInt]
judge({})//[object Object]
judge([1,2,3])//[object Array]