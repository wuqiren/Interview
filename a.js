for(let i = 1; i <= 5; i ++){
    setTimeout(function() {
      console.log(i)
    }, 0)
  }

for(var i = 1; i <= 5; i ++){
    (function(j){
        setTimeout(function() {
            console.log(j)
        },0)
    })(i)
}

for(var i = 1; i <= 5; i ++){
    setTimeout(function(j) {
      console.log(j)
    }, 0,i)
  }
