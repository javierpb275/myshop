import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayoutComponent from "./components/layout/layout.component";
import ContactPage from "./pages/contact/contact.page";
import HomePage from "./pages/home/home.page";
import SignInPage from "./pages/signin/signin.page";
import SignUpPage from "./pages/signup/signup.page";
import { useAuthState } from "./store/contexts/authContext";

function App() {
  const { user } = useAuthState();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route index element={<HomePage />} />
          {user ? (
            <Route>
              <Route path="/signin" element={<Navigate to="/" />} />
              <Route path="/signup" element={<Navigate to="/" />} />
            </Route>
          ) : null}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
