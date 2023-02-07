import { useEffect, useState } from "react";

const Loading = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const upTick = () => setValue((v) => (v + 1) % 10);
    const interval = setInterval(upTick, 100);
    return () => clearInterval(interval);
  }, []);
  return <progress max={10} value={value} />;
};

export default Loading;
