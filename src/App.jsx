import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { ShopProvider } from "./Store/Context";
import Header from "./Components/Header";

export default function App() {
  return (
    <div className="App">
      <ShopProvider>
        <Header />
        <Routes>
          {routes.map(({ path, element }) => (
            <Route path={path} element={element} />
          ))}
        </Routes>
      </ShopProvider>
    </div>
  );
}
