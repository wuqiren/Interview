import { useState,useEffect,useRef } from "react"
function Demo(){
    const domRef = useRef(null);
    const [a,n]=useState(1)
  useEffect(() => {
    domRef.current?.focus();
    console.log(domRef,'domRef')
  });

  return (
    <div>
      <input ref={domRef} type="text" />
      <button>增加</button>
    </div>
  );

}
export default Demo