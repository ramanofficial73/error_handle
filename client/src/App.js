import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import './main.scss'
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from './components/Home';
import Navbar from "./components/Navbar";
import Store from "./store";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./private/PrivateRoutes";


import { Fragment } from "react";
import RouteLinks from "./private/RouteLinks";
import NotFound from "./components/auth/NotFound";
import Create from "./components/Create";
import Edit from "./components/Edit";
import EditImage from "./components/EditImage";
import UpdateName from "./components/UpdateName";
import ChangePassword from "./components/ChangePassword";
import Deatils from "./components/Deatils";

function App() {

  return (
    <Provider store={Store}>

      <div className="App">

        <Router>
          <Navbar />
          <Switch>


            <Route path="/" exact component={Home} />
            <Route path="/home/:page" exact component={Home} />
            <Route path="/details/:id" exact component={Deatils} />
            <RouteLinks path="/register" exact component={Register} />
            <RouteLinks path="/login" exact component={Login} />
            <PrivateRoute path="/dashboard/:page?" exact component={Dashboard} />
            <PrivateRoute path="/create" exact component={Create} />
            <PrivateRoute path="/edit/:id" exact component={Edit} />
            <PrivateRoute path="/updateImage/:id" exact component={EditImage} />
            <PrivateRoute path="/updateName" exact component={UpdateName} />
            <PrivateRoute path="/updatePassword" exact component={ChangePassword} />










            <Route path="*" exact component={NotFound} />
          </Switch>
        </Router>

      </div>
    </Provider>
  );
}

export default App;
