import { lazy, Suspense, useEffect, useState } from "react";
import { importRemote } from "@module-federation/utilities";

const CounterComponent = {
  id: "remote/Counter",
  props: {
    startCount: 10,
  },
};

const LoadingComponent = {
  id: "remote/Loading",
  props: {},
};

const App = () => {
  const [value, setValue] = useState(false);

  const [customComponents, setCustomComponents] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        setCustomComponents((prev) => [
          ...prev,
          CounterComponent,
          LoadingComponent,
        ]),
      5000
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [setCustomComponents]);

  return (
    <div>
      <div>REACT HOST</div>
      {customComponents.map((component) => {
        const [scope, module] = component.id.split("/");
        const CustomComponent = lazy(() =>
          importRemote({
            url: "http://localhost:3001",
            scope,
            module,
          })
        );

        return (
          <section key={component.id}>
            <Suspense fallback={null}>
              <CustomComponent {...component.props} />
            </Suspense>
          </section>
        );
      })}
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
