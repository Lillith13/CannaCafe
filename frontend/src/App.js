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
import Takeout from "./components/Takeout";
import Cart from "./components/Cart";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import PayStubs from "./components/PayStubs";

// Import any needed thunks here

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    if (user) {
      // ! dispatch for user role <- to lock some routes behind user role accessible only
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
          {user && (
            <>
              <Route exact path="/profile/:empId">
                <EmployeeProfile />
              </Route>
              <Route exact path="/profile">
                <UserProfile />
              </Route>
              <Route exact path="/paystubs/:empId">
                <PayStubs />
              </Route>
            </>
          )}
          <Route>"404: Page not Found"</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
