import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { ShopProvider } from "./Store/Context";

export default function App() {
  return (
    <div className="App">
      <ShopProvider>
        <header />
        <Routes>
          {routes.map(({ path, element }) => (
            <Route path={path} element={element} />
          ))}
        </Routes>
      </ShopProvider>
    </div>
  );
}
