class Observer {
    constructor(name){
        this.name = name;
    }
    update(task){
        console.log(this.name+'我要去抢任务'+task)
    }
}

class Subject{
    constructor(){
        this.observerList = []
    }
    addObserver(observer){
        this.observerList.push(observer)
    }
    notify(task){
        this.observerList.forEach(observer=>{
            observer.update(task)
        })
    }
}



const subject = new Subject()
const observer01 = new Observer('fishfan')
const observer02 = new Observer('aaaaaaa')

subject.addObserver(observer01)
subject.addObserver(observer02)

subject.notify('超级无敌')