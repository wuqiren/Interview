const fn=(urls,maxNum,callback)=>{
    return new Promise(reslove=>{
        if(urls.length===0){
            reslove([]);
            return
        }
        const result=[];
        let index=0;// 下一个请求的下标
        let count=0;// 当前请求完成的数量
        async function request(){
            if(inedx===urls.length) return; //请求到最后一个了
            const i =index;
            const url=urls[index];
            index++;
            try {
                const resp=await fetch(url)
                result[i]=resp
            } catch (error) {
                result[i]=error
            }finally{
                count++;
                if(count===urls.length){
                    reslove(result)
                }
                request()
            }
        }
        const times =Math.min(maxNum,urls.length)
        for(let i=0;i<times;i++){
            request()
        }
    })
}