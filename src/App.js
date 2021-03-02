import './App.css';
import Nav from './Components/nav.js';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Components/home.js';
import Register from './Components/register.js';
import Login from './Components/login.js';

function App() {
  return (
    <div>
      <Router>
        
        <Switch>
          
          <Route path = "/register" exact component={Register}/>
          <Route path = "/login" exact component={Login}/>
          <Route path = "/:userName?" component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
