/**
 *
 *  原型链继承
    两个实例使用的是同一个原型对象。它们的内存空间是共享的，当一个发生变化的时候，
    另外一个也随之进行了变化，这就是使用原型链继承方式的一个缺点。
 */
function Person(){
    this.age=10;
    this.name='fishfan';
    this.play = [1, 2, 3]
}
Person.prototype.getAge=function(){
    console.log(this.age)
}
function Child(){
    this.sex='1'
}
Child.prototype = new Person();
let a=new Child()
a.getAge()
/**
 * 构造函数继承
 * 父原型上的方法，子类无法继承
 */
function Person1(){
    this.age=10;
    this.name='fishfan'
}
Person1.prototype.getAge = function(){
    console.log(this.age);
}
function Child1(){
    Person1.call(this)
    this.sex='1'
}

/**
 * 组合继承
 *这种继承的方式优点在于构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数，
 但是也存在一个缺点就是在继承父类函数的时候调用了父类构造函数，
 导致子类的原型上多了不需要的父类属性，存在内存上的浪费。
 */
function Person2(){
    this.age=10;
    this.name='fishfan'
}
Person2.prototype.getAge = function(){
    console.log(this.age);
}
function Child2(){
    Person2.call(this)
    this.sex='1'
}
Child2.prototype = new Person2()

let b=new Child2()
b.getAge()

/**
 * 原型式继承
 * 通过 Object.create 这个方法可以实现普通对象的继承
 * 多个实例的引用类型属性指向相同的内存，存在篡改的可能,修改了A实例的对象，B实例的对象也跟着修改了 
 */
let child = Object.create(parent)
function objectCopy(obj){
    function FC(){}
    FC.prototype = obj;
    return new FC()
}
/** 
 * 寄生式组合继承
 * 
*/
function Person(){
    this.age=10;
    this.name='fishfan'
}
Person.prototype.getAge=function(){
    console.log(this.age)
}
function Child(){
    Parent.call(this)
    this.sex='1'
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor=Child


/*
extends 继承
**/

class Person{
    constructor(name) {
        this.name = name
    }
    getName=function(){
        console.log(this.name);
    }
}
class Child extends Person{
    constructor(props){
        super(props)
        this.name= props.name
    }
}
let name1 = new Person('fish');
console.log(name1.name)




// 原型链

function Person(){
    this.age=1
}
function Child(){
    this.name='1'
}
Child.prototype = new Person();

// 构造函数
function Person(){
    this.age=1
}
function Child(){
    Person.call(this)
    this.name='1'
}
// 组合
function Person(){
    this.age=1
}
function Child(){
    Person.call(this)
    this.name='1'
}
Child.prototype = new Child();

// 原型

let children =  object.create(person)

//// 寄生
function clone(original) {
    let clone = Object.create(original);
    clone.getFriends = function() {
      return this.friends;
    };
    return clone;
  }

// 寄生组合

function Person(){
    this.age=10;
    this.name='fishfan'
}
Person.prototype.getAge=function(){
    console.log(this.age)
}
function Child(){
    Parent.call(this)
    this.sex='1'
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child;




