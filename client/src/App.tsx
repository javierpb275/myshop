import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutComponent from "./components/layout/layout.component";
import HomePage from "./pages/home/home.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
