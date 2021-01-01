import React,{Component} from "react";
import Axios from "axios";

export default class Request extends Component{
    constructor(props){
        super(props);
        this.state={
            to:this.props.to,
            amount:this.props.amount
        }
    }

    componentDidMount(){
        Axios.get('User/'+this.props.to)
        .then(res => {
         this.setState({
             recipientName:res.data.user.name,
             recipientImg:res.data.user.Image,
             
         })
        })
    }

    render(){
        return <div class = "container">
            
            <img className="img" src={this.state.recipientImg}></img>
            <h4>{this.state.recipientName}</h4>
            <p className="amount">{this.props.amount}</p>
            <p className="date">{this.props.date}</p>
            <hr />
        </div>
    }

}