import React,{Component} from "react"
import { Link } from 'react-router-dom';
import Axios from "axios"




export default class Users extends Component {
    state = {
      persons: []
    }
  
    componentDidMount() {
      Axios.get(`/User`)
        .then(res => {
          const persons = res.data;
          console.log("data",res.data);
          this.setState({ persons });
        })
    }

    List(props){
      return <div>
            <img className="userImg" src={props.image}></img>
            <p> {props.name}</p>
          </div>
       
      
    }
  
    render() {
      return (
          <div className ="container">
            <div className="row text-center">
              
                { this.state.persons.map(person => <div className="col-lg-3 col-md-4 col-6"><Link to ={"/"+person.id}> <this.List image={person.Image} name ={person.name}/> </Link></div>  )}
                         
            </div>
          </div>
        
      )
    }
  }