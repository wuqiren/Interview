const myMap = new Map();
myMap.set('name', 'John');
myMap.set('age', 30);

// 将 Map 转换为对象数组
const mapArray = Array.from(myMap);

// 将对象数组转换为 JSON 字符串
const jsonString = JSON.stringify(myMap);

console.log(jsonString);
