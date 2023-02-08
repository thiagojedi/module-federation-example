import {useState} from "react";

const Counter = ({ startCount }) => {
  const [count, setCount] = useState(startCount || 0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount((v) => v + 1)}>Click Me!</button>
    </div>
  );
};
export default Counter;
