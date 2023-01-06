function myInstanceof (left,right){
    if(typeof left!=='object'|| left===null){return false;}
    left = left.__proto__
    const prototype = right.prototype;
    while(true){
       if( left===null || left===undefined ){return false;}
       if(left===prototype){return true}
       left=left.__proto__
    }
}