import { useSelector,useDispatch } from "react-redux";
import {decrement,increment} from './counterSlice'
function App() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  console.log(decrement(),'decrementdecrement')
  return (
    <div className="App" style={{height:'2000px'}}>
       <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default App;
