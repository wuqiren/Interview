// 原型链继承
function Parent() {
    this.name = 'parent';
}
Parent.prototype.getName = function () { 
    return this.name;
}
function Child() { 
    this.name = 'child';
}

Child.prototype = new Parent();

var child1 = new Child();
console.log(child1.getName()); //child