import {importRemote} from "@module-federation/utilities";
import React, {lazy, Suspense} from "react";

const CustomComponent = ({ componentId, componentProps }) => {
  const [remoteScope, remoteModule] = componentId.split("/");

  const Component = lazy(() =>
    importRemote({
      url: "http://localhost:3001",
      scope: remoteScope,
      module: remoteModule,
    })
  );


  return (
    <Suspense fallback={null}>
      <Component {...componentProps} />
    </Suspense>
  );
};

export default CustomComponent;
