import { useState, createElement } from "react";

const Counter = ({ startCount }) => {
  const [count, setCount] = useState(startCount || 0);

  return createElement(
    "div",
    null,
    createElement("p", null, `You clicked ${count} times`),
    createElement(
      "button",
      {
        onClick: () => setCount(count + 1),
      },
      "Click Me!"
    )
  );
};
export default Counter;
