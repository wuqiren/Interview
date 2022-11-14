// 原型链继承
function Person(){
    this.val = '222'
}
Person.prototype.getValue= function(){
    console.log(this.val)
}
function Child (){}
Child.prototype = new Person()
let child1 =  new Child()
child1.getValue()

// 构造函数继承

function Person(){
    this.age=1;
}
function Child(){
    Person.call(this)
}
let child2 = new Child()
console.log(child2)

// 组合继承
function Parent(value){
    this.val = value;
}
Parent.prototype.getValue = function(){
    console.log(this.val)
}

function Child(value){
    Parent.call(this,value)
}
Child.prototype = new Parent();

const child = new Child(1);

child.getValue()

// 原型式继承
function objectCopy(obj){
    function FC(){}
    FC.prototype = obj;
    return new FC()
}
let person = {
    name:'fish',
    age:12,
    friends:['1','2'],
    sayName:function() {
        console.log(this.name);
    }
}
let person1 = objectCopy(person)
person1.name = "wxb";
person1.friends.push("lily");
person1.sayName(); // wxb
console.log(person,'person')

// 寄生组合继承1


function Person(value){
    this.val = value;
}
Person.prototype.getValue = function(){
    console.log(this.val)
}
function Child(value){
    Person.call(this,value)
}
Child.prototype = Object.create(Person.prototype,{
    constructor:{
        value:Child,
        enumerable:false,
        writable:true,
        configurable:true
    }
});


// 寄生组合继承2
function Parent5 () {
    this.name = 'parent5';
    this.play = [1, 2, 3];
  }
  function Child5() {
    Parent5.call(this);
    this.type = 'child5';
  }
  Child5.prototype = Object.create(Parent5.prototype);
  Child5.prototype.constructor = Child5;
// 借助class

class Person {
    constructor(value){
        this.val = value;
    }
    getValue(){
        console.log(this.val)
    }
}
class Child extends Person {
    constructor(value){
        super(value)
        this.val = value
    }
}
