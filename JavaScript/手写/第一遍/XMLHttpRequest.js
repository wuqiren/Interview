let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if(xhr.readyState===4 && (xhr.status==200||xhr.status===304)){

    }
}
xhr.ontimeout=function(e) {}

xhr.onerror=function(e) {}

xhr.open('GET', url, true)// 第三个参数是是否使用异步

xhr.timeout=3000
xhr.responseType='text'
xhr.setRequestHeader('Content-Type', 'application/json')

xhr.send()