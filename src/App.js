import { 
  BrowserRouter as Router, 
  Switch, 
  Route,
  useHistory
} from "react-router-dom"
import Home from './screens/Home/Home'
import Signin from './screens/Signin/Signin'
import Signup from './screens/Signup/Signup'
import Dashboard from './screens/Dashboard/Dashboard'
import NotFound from './screens/NotFound/NotFound'
import EventEmitter from 'events';
import './App.css'

export const event = new EventEmitter();

function App() {
  const history = useHistory()
  window.flash = (message, type="success") => event.emit(
    'flash', 
    ({message, type})
  );
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Signin} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/logout" component={() => {
          localStorage.clear();
          setTimeout(() => {
            window.flash('Signed out successfully', 'success')
          }, 100)
          history.push('/')
          // return <Redirect to="/" />
        }} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
