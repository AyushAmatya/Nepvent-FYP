import './App.css';
import Nav from './Components/nav.js';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Components/home.js';
import Register from './Components/register.js';
import Login from './Components/login.js';
import CreateEvent from './Components/createEvent.js';
import Register1 from './Components/Register.jsx';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Router>
        
        <Switch>
          
          <Route path = "/register" exact render = {props =><Register1 {...props}/>}/>
          <Route path = "/login" exact component={Login}/>
          <Route path = "/:userName?/viewProfile" component={Login}/>
          <Route path = "/:userName?/createEvent" component={CreateEvent}/>
          <Route path = "/:userName?" component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
