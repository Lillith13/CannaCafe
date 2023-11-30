import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import { authenticate } from "./store/session";

// Import routes here
import SplashPage from "./components/SplashPage";

// Import any needed thunks here

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <h1>Coming Soon...</h1>
      {/* NavigationBar */}
      <Switch>
        <Route exact to="/">
          <SplashPage />
        </Route>
        <Route>"404: Page not Found"</Route>
      </Switch>
    </>
  );
}

export default App;
