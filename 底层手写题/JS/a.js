const obj = {
    a:1,
    b:2
}
Object.defineProperty(obj, 'a', {
    value: 3,
    writable: false,
    enumerable: true,
    configurable: true}
    )

    console.log(obj)