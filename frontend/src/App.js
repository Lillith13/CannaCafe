import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import { authenticate } from "./store/session";

// Import routes here
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import HomePage from "./components/HomePage";
import UserProfile from "./components/UserProfile";
import EmployeeProfile from "./components/EmpProfile";
import { Cart, Takeout } from "./components/Cart";
import CheckoutCart from "./components/AllModals/CheckoutCart";
import CheckoutBag from "./components/AllModals/CheckoutBag";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import PayStubs from "./components/PayStubs";
import Footer from "./components/Footer";
import OopsyMessage from "./components/OopseyDaiseys";
import ErrorFourOHFour from "./components/Error404Page";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));

    // * set default theme if no theme saved to client
    const themeCheck = localStorage.getItem("clientTheme");
    if (!themeCheck) {
      localStorage.setItem("clientTheme", "GL");
    }
  }, [dispatch]);

  return (
    <>
      {location.pathname === "/" ? null : <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/category/:name">
            <Products />
          </Route>
          <Route exact path="/allProducts">
            <Products />
          </Route>
          <Route exact path="/product/:id">
            <ProductDetails />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/menu/:id">
            <ProductDetails />
          </Route>
          <Route exact path="/menu">
            <Products />
          </Route>
          <Route exact path="/takeout">
            <Takeout />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/checkout/bag">
            <CheckoutBag />
          </Route>
          <Route exact path="/checkout/cart">
            <CheckoutCart />
          </Route>
          <Route exact path="/profile/:empId">
            {user ? <EmployeeProfile /> : <OopsyMessage />}
          </Route>
          <Route exact path="/profile">
            {user ? <UserProfile /> : <OopsyMessage />}
          </Route>
          <Route exact path="/paystubs/:empId">
            {user ? <PayStubs /> : <OopsyMessage />}
          </Route>
          <Route>
            <ErrorFourOHFour />
          </Route>
        </Switch>
      )}
      {location.pathname === "/" ? null : <Footer />}
    </>
  );
}

export default App;
