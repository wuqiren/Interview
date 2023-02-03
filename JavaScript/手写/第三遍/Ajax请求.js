let xhr = new XMLHttpRequest()
xhr.onreadystatechange= function(){
    if(xhr.readyState===4){
        if(xhr.status===200){
            console.log()
        }else{}
    }
}
xhr.onerror=function(){}
xhr.open('GET',url,true)
xhr.send()


// axios

axios.get('/url',{
    params:{

    }
}).then().catch()