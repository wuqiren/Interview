module.exports =(source)=>{
    let code =`
        if(typeof window !== 'undefined'){
            let styleEl = document.createElement("style");
            styleEl.innerHTML =${JSON.stringify(source)};
            document.head.appendChild(styleEl);
        }
    `
    return code.replace(/\/n/,"")
}