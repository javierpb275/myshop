import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayoutComponent from "./components/layout/layout.component";
import CheckoutPage from "./pages/checkout/checkout.page";
import ContactPage from "./pages/contact/contact.page";
import HomePage from "./pages/home/home.page";
import ProductsCategoryPage from "./pages/products-category/products-category.page";
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
          ) : (
            <Route path="/favourites" element={<Navigate to="/" />} />
          )}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/products/:sku" element={<ProductsCategoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
