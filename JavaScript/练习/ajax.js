let xhr = window.XMLHttpRequest?new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
xhr.open("get",'index.html',true);
xhr.send(null);
xhr.onreadystatechange = function(){
    if(xhr.readyState==4 && xhr.status==200 || xhr.status==304){
        console.log(xhr.responseHTML)
    }
}

function getJSON(url){
    let promise = new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.open("get",url,true);
        xhr.onreadystatechange = function(){
            if(this.readyState !==4){
                return 
            }
            if(this.status===200){
                resolve(this.response)
            }else{
                reject(new Error(this.statusText))
            }
        }
        xhr.onerror = function(){
            reject(new Error(this.statusText))
        }
        xhr.responseType = "json"
        xhr.setRequestHeader("Accept","application/json")
        xhr.send(null)
    })
    return promise
}

console.log(Array(8,0))