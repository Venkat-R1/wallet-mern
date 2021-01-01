import React,{Component} from "react";
import { Link } from 'react-router-dom';
import Axios from "axios";
import Transactions from "./Transactions.js"
import Requests from "./Requests.js"


export default class Trans extends Component{
    constructor(props){
        super(props);
        this.onTransChange = this.onTransChange.bind(this);
        this.onReqChange = this.onReqChange.bind(this)

        this.state = {
            userId : 0,
            balance : 0,
            trans :[],
            requests:[],
            tHidden:false,
            rHidden:true
            
        }
    }
    componentDidMount(){
        Axios.get('User/'+this.props.match.params.id)
            .then(res => {
              this.setState({
                userId : res.data.user.id,
                balance : res.data.user.balance,
                img:res.data.user.Image,
                trans:res.data.trans,
                requests:res.data.requests
              })
            })
            .catch(error =>{
                console.log(error)
            })
            
        
    }
    
    onTransChange(e){
        this.setState({
            tHidden:false,
            rHidden:true
        })
    }
    onReqChange(e){
        this.setState({
            rHidden:false,
            tHidden:true
        })
    }

    

    render() {
        return <div>
            <img className="img"src={this.state.img} alt="image here" />
            <h3 className = "balance">Balance:{this.state.balance}</h3>
            <div className="buttons">
                <Link to={this.state.userId+'/pay'}><button className="btn btn-dark" type = "submit">Pay</button></Link>
                <Link to={this.state.userId+'/request'}><button className="btn btn-dark" type = "submit">Request</button></Link>
            </div>
            <div className="history">
                <h2 className={`tabs ${this.state.tHidden ?" ":"active"}`}  onClick={this.onTransChange}>Transactions</h2>
                <h2 className={`tabs ${this.state.rHidden ?" ":"active"}`}  onClick={this.onReqChange}>Requests</h2>
                <hr className="hr"/>
                <div className={this.state.tHidden?"transHidden":"trans"} >
                    {this.state.trans.map(person => <Transactions id = {person.recipientID === this.state.userId ? person.senderID : person.recipientID} user = {this.state.userId} recipient={person.recipientID} amount = {person.transAmount} date={person.Date} />)}
                </div>
                
                <div  className={this.state.rHidden?"reqHidden":"req"} >
                    <p>{this.state.requests.map(req => <Requests to={req.to} amount = {req.amount} date={req.Date}/>)}</p>
                </div>
            </div>          
            
        </div>
    }
    
}
            