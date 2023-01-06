Function.prototype.mycall=function(context,...args){
   context=context||window
  context.fn=this;
  let result=context.fn(...args);
  delete context.fn;
  return result;
}

Function.prototype.myapply=function(context,...args){
  let content =context||window;
  console.log(this,'thisthis')
  content.fn=this;
  let result=content.fn(args);
  delete content.fn;
  return result;
}
Function.prototype.mybind=function(context,...args){
  context=context||window;
  const _this=this;
  return function F(){
      if(this instanceof Function){
          return _this(...args,...arguments);
      }
      return _this.apply(context,args.concat(...arguments));
  }
}
let person={
  age:13,
  name:'fishfan'
}
function getAge(a,b,c){
  console.log(this.age)
  console.log(a,'aaaa')
  console.log(b,'bbbb')
  console.log(c,'cccc')
}
// getAge.mycall(person,33,44,55)
getAge.myapply(person,[33,44,55])
// getAge.mybind(person,22,33,44)()