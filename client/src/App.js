import "materialize-css"
import React from "react"
import { BrowserRouter as Router } from "react-router-dom";
import useRoutes from "./routes";
import Context from "./context"
import useAuth from "./hooks/auth.hook";
import Loader from "./Loader/loader";


function App() {
    const { token, login, logout, userId, ready } = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)
    if (!ready) {
       return <Loader />
    }
    console.log(isAuth)
  return (
      <Context.Provider value={
          { token, login, logout, userId, isAuth }
      }>
          <Router>
              <div className="App">
                  {routes}
              </div>
          </Router>
      </Context.Provider>


  );
}

export default App;
