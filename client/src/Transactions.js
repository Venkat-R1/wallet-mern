import React,{Component} from "react";
import { Link } from 'react-router-dom';
import Axios from "axios";
import "./History.css"

export default class Transactions extends Component{
    constructor(props){
        super(props);
        this.state = {
            recipientName:'',
            recipientImg:''
        }
    }
    

    componentDidMount(){
        Axios.get('User/'+this.props.id)
        .then(res => {
         this.setState({
             recipientName:res.data.user.name,
             recipientImg:res.data.user.Image,
             
         })
         if(this.props.user !== this.props.recipient){
             this.setState({classname : "red"})
         }else{
            this.setState({classname : "green"})
         }
        
        })
        
    }

    render(){
        return <div class = "container">
            
            <img className="img" src={this.state.recipientImg}></img>
            <h4>{this.state.recipientName}</h4>
            <p className={this.state.classname+" amount"}>{this.state.classname === "green" ? "+":"-"}{this.props.amount}</p>
            <p className="date">{this.props.date}</p>
            <hr />
        </div>
    }
}

