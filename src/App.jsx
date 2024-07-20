import React from "react";
import { ShopProvider } from "./Store/Context";

function App() {
  return (
    <ShopProvider>
      <h1>Hello, World!</h1>
    </ShopProvider>
  );
}

export default App;
