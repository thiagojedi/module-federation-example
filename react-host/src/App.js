import { lazy, Suspense, useState } from "react";
import { importRemote } from "@module-federation/utilities";

const customComponents = ["remote/Counter"];

const App = () => {
  const [value, setValue] = useState(false);

  return (
    <div>
      <div>REACT HOST</div>
      {customComponents
        .map((component) => component.split("/"))
        .map(([scope, module]) => {
          const CustomComponent = lazy(() =>
            importRemote({
              url: "https://module-federation-example-rho.vercel.app",
              scope,
              module,
              remoteEntryFileName: 'remoteEntry.js'
            })
          );
          return (
            <Suspense fallback={null}>
              <CustomComponent {...{startCount: 10}} />
            </Suspense>
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
