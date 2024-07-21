import { Routes, Route, useLocation } from "react-router-dom";
import { routes } from "./routes";
import { ShopProvider } from "./Store/Context";
import Header from "./Components/Header/Header";
import BackBtn from "./Components/BackBtn/BackBtn";

export default function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="App">
      <ShopProvider>
        <Header />
        {!isHomePage && <BackBtn />}
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </ShopProvider>
    </div>
  );
}
