import { useEffect, useState } from "react";
import CustomComponent from "./custom-component";

const customComponentFromDatabase = [
  {
    id: "remote/Counter",
    props: {
      startCount: 10,
    },
  },
  { id: "remote/Loading" },
];

const App = () => {
  const [value, setValue] = useState(false);

  const [component, setComponent] = useState([]);
  useEffect(() => {
    const timeout = setTimeout(
      () => setComponent(customComponentFromDatabase),
      5000
    );
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <div>REACT HOST</div>
      <section>
        <header>This is the suspense:</header>
        {component.map((component) => (
          <CustomComponent
            key={component.id}
            componentId={component.id}
            componentProps={component.props}
          />
        ))}
      </section>
      <br />

      <section>
        <header>This is a diferent component changing current state</header>
        <button onClick={() => setValue((v) => !v)}>
          Toggle {value ? "on" : "off"}
        </button>
      </section>
    </div>
  );
};

export default App;
