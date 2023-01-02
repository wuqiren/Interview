import React from "react";
import {  observable, autorun } from "mobx";
let a = observable({
  name: "fishfan",
  age: 12
});
autorun(() => {
  console.log(a);
});
setTimeout(() => {
  a.name = 11;
}, 3000);

export default class App extends React.Component{
  state = {
    count: 0
  }
  render(){
    return <div>
      <button onClick={this.increment}>点我增加</button>
      <button onClick={this.triple}>点我增加三倍</button>
      <button onClick={this.reduce}>点我减少</button>
    </div>
  }
}
