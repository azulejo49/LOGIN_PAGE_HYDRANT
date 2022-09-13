import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/views/Login.jsx";
/* import Register from "./components/views/Register.jsx"; */
import Forgot from "./components/views/Forgot.jsx";
import IconImg from "./assets/scss/favicon.png";
import Reset from "./components/views/Reset.jsx";
import Resetold from "./components/views/Resetold.jsx";
const Auth = () => {
  return (
    <>
     <img id="logo" src={IconImg} alt="icon"/> 
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
      {/*   <Route path='/register' component={Register} /> */}
        <Route path='/forgot-password' component={Forgot} />
        <Route path='/reset-password' component={Reset} />
        <Route path='/reset-old-password' component={Resetold} />
         <Route path='/' component={Login} /> 
      </Switch>
    </Router>
    </>
  );
}

export default Auth;
