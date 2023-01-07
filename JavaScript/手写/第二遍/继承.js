// 原型链继承
function Parent(){
    this.age=11
    this.name='fishfan';
    this.play = [1, 2, 3]
}
Parent.prototype.getName = function(){
    console.log(this.name)
}
function Child(){
    this.name='张三'
}
Child.prototype = new Parent()
let p1 = new Child()
let p2 = new Child()
// p1.getName()//  张三
p2.play.push(4)
// console.log(p1.play,p2.play) // [ 1, 2, 3, 4 ] [ 1, 2, 3, 4 ]


// 构造函数继承
function Parent1(){
    this.age=11
    this.name='fishfan'
}
Parent1.prototype.getName = function(){
    console.log(this.name)
}
function Child1(){
    Parent1.call(this)
    this.name='张三'
}
let p3 = new Child1();
// p3.getName()//

// 组合继承
function Parent2(){
    this.age=11
    this.name='fishfan'
}
Parent2.prototype.getName=function(){
    console.log(this.name)
}
function Child2(){
    Parent2.call(this)
    this.name='张三'
}
Child2.prototype=new Parent2()
// 寄生继承

function cloneObj(obj){
    let clone=Object.create(obj);
    clone.getName=function(){
        console.log(this.name)
    }
    clone.name='222'
    return clone
}
let parent = new Parent()
let child=cloneObj(parent)
child.getName() //22
// 寄生组合继承
function Parent(){
    this.name='fishfan'
    this.play=[1,2,3]
}
Parent.prototype.getName =function(){
    console.log(this.name)
}
function Child(name){
    Parent.call(this)
    this.name=name
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

let p11 =new Child('哈哈');
let p22 = new Child('嘻嘻')
p11.play.push(3)
console.log(p22) //  { name: '张三', play: [ 1, 2, 3 ] }
console.log(p11) //     { name: '哈哈', play: [ 1, 2, 3, 3 ] }
p11.getName() // 哈哈
// class继承本质还是 寄生组合继承


class Parent {
    constructor(name){
        this.age=11
        this.name=name
    }
    getName(){
        console.log(this.name)
    }
}
class Child extends Parent{
    constructor(){
        super()
        this.name='张三'
    }
}
let p33= new Child()
console.log(p33.name) // 张三
p33.getName()// 张三

