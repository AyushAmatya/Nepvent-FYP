import './App.css';
import Nav from './Components/nav.js';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Components/home.js';
import Login from './Components/login.js';
import CreateEvent from './Components/createEvent.js';
import Register from './Components/Register.jsx';
import Activate from './Components/Activate.jsx';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
      <Router>
        
        <Switch>
          
          <Route path = "/register" exact render = {props =><Register {...props}/>}/>
          <Route path = "/users/activate/:token" exact render = {props =><Activate {...props}/>}/>
          <Route path = "/login" exact component={Login}/>
          <Route path = "/:userName?/viewProfile" component={Login}/>
          <Route path = "/:userName?/createEvent" component={CreateEvent}/>
          <Route path = "/" exact component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
