import Users from "./Users.js"
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        hello world
        <Route path="/users" exact component={Users}/>
      </div>
    </Router>
      
    
    
  );
}

export default App;
