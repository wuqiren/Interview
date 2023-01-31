class Sub{
        constructor(){
            this.pend=[]
        }
        add(func){
            if(!this.pend.includes(func)){
                this.pend.push(func)
            }
        }
        remove(func){
            //remove的时候不直接删除，为了防止数组塌陷，例如出现这种情况，
            // 注册事件为A ， B ，C，在B事件执行的时候，将A事件给remove，这时候数组的长度会减少1，导致监听数组最后一项无法执行
            this.pend.splice(this.pend.indexOf(func),1,null) 
        }
        fire(...args){
            for(let i =0;i<this.pend.length;i++){
                if(this.pend[i]){
                    this.pend[i].call(this,...args)
                }else{
                    this.pend.splice(i,1)
                    i--
                }
            }
        }
    }

    let subscribe = new Sub();
    let fun1 = (args)=>{
        console.log(1)
        subscribe.remove(fun2)
    }
    let fun2 = ()=>{
        console.log(2)
        subscribe.remove(fun3)
    }
    let fun3 = ()=>{
        console.log(3)
    }
    subscribe.add(fun1)
    subscribe.add(fun2)
    subscribe.add(fun3)
    subscribe.fire()