import './App.css';
import Nav from './Components/nav.js';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Components/home.js';
import Login from './Components/Login.jsx';
import CreateEvent from './Components/CreateEvent.jsx';
import Register from './Components/Register.jsx';
import Activate from './Components/Activate.jsx';
import Forget from './Components/ForgotPassword.jsx';
import Reset from './Components/ResetPassword.jsx';
import MyEvents from './Components/MyEvents.jsx';
import MyEventDetails from './Components/MyEventDetails.jsx';
import EventDetails from './Components/EventDetails.jsx';
import 'react-toastify/dist/ReactToastify.css';
import ViewProfile from './Components/ViewProfile.jsx';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <div>
      <ToastContainer/>
      <Router>
        
        <Switch>
          
          <Route path = "/register" exact render = {props =><Register {...props}/>}/>
          <Route path = "/users/password/forget" exact render = {props =><Forget {...props}/>}/>
          <Route path = "/users/activate/:token" exact render = {props =><Activate {...props}/>}/>
          <Route path = "/users/password/reset/:token" exact render = {props =><Reset {...props}/>}/>
          <Route path = "/login" exact render = {props =><Login {...props}/>}/>
          <Route path = "/createEvent" exact render = {props =><CreateEvent {...props}/>}/>
          <Route path = "/viewProfile" exact render = {props =><ViewProfile {...props}/>}/>
          <Route path = "/myEvents" exact render = {props =><MyEvents {...props}/>}/>
          <Route path = "/myEventDetails/:event_id?" exact render = {props =><MyEventDetails {...props}/>}/>
          <Route path = "/eventDetails/:event_id?" exact render = {props =><EventDetails {...props}/>}/>
          <Route path = "/" exact component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
