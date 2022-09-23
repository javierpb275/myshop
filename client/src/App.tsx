import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutComponent from "./components/layout/layout.component";
import ContactPage from "./pages/contact/contact.page";
import HomePage from "./pages/home/home.page";
import SignInPage from "./pages/signin/signin.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route index element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
