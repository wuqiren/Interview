function sum(a, b) {
  let args = Array.from(arguments);
  console.log(arguments,'arguments')
  console.log(args,'argss')
  const vb=arguments.reduce((a,b)=>{
    a.push(arguments[b]);return a},[])
  console.log(vb)
  console.log(args.reduce((sum, cur) => sum + cur));
}
sum(1,2)