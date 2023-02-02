function jsonp(url,params,callback){
    const script = document.createElement('script');
    let finallUrl = url;
    for(let key in params){
        finallUrl+=`${key}=${params[key]}`
    }
    finallUrl+=`callbacl=${callback}`
    script.src = finallUrl;
    window[callback]=(data)=>{
        console.log(data,'111111')
        document.removeChild(scriptEle);
    }
    document.body.appendChild(script)
}

const params = {a:1}
for(let key of params){
        console.log(key)
}