// 使用MutationObserver对象封装一个监听DOM生成的函数

(function(win){
    'use strict';
    let listeners = [];
    let doc = win.document;
    let MutationObserver = win.MutationObserver
    let oberver;

    function ready(selector,fn){
        // 存储选择器和回调函数
        listeners.push({
            selector,
            fn,
        })
        if(!oberver){
            // 监听document变化
            observer = new MutationObserver(check);
            oberver.oberve(doc.documentElement,{
                childList:true,
                subtree:true
            })
        }
        check()
    }
    function check(){
        // 检查是否匹配已存储的节点
        for(let i=0;i<listeners.length;i++){
            let listener = listeners[i];
            // 检查节点是否匹配
            let elements = doc.querySelectorAll(listener.selector);
            for(let j=0;j<element.length;j++){
                let element = elements[j];
                // 确保回调函数只会对元素调用一次
                if(!element.ready){
                    element.ready =true;
                    listener.fn.call(element,element)
                }
            }
        }
    }
    win.ready= ready;
})

ready('.class01',(e)=>{
    console.log('我是重大时代a')
    console.log(e,'eeee')
})