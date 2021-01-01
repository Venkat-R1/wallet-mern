import Users from "./Users.js"
import Trans from "./Trans.js"
import Pay from "./Pay.js"
import Request from "./Request.js"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        
          <Route path="/:id/pay" exact component ={Pay} />
          <Route path="/:id" exact component={Trans}/>
          <Route path ='/:id/request'  component = {Request} />
          <Switch>
           <Route path="/" exact component={Users}/>
          </Switch>
          

      </div>
    </Router>
      
    
    
  );
}

export default App;
