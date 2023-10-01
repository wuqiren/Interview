
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://example.com/api', true); // 配置一个 GET 请求，异步方式
xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText);
    }
}
xhr.send();