import React,{Component} from "react"
import Axios from "axios"




export default class Users extends Component {
    state = {
      persons: []
    }
  
    componentDidMount() {
      Axios.get(`/Users`)
        .then(res => {
          const persons = res.data;
          console.log("data",res.data);
          this.setState({ persons });
        })
    }
  
    render() {
      return (
          <div>
            <ul>
              { this.state.persons.map(person => <li>{person.name}</li>)}
           </ul>
          </div>
        
      )
    }
  }