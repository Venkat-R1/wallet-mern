import React, {Component} from "react"
import Axios from "axios"


export default class Pay extends Component{
    constructor(props){
        super(props);
        this.state = {
            recipient:1001,
            amount: 0,
            persons:[],
            date: new Date().toString(),
            dateOnly:new Date().getDate()
        }
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeRecipient = this.onChangeRecipient.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        Axios.get('/User/'+this.props.match.params.id)
         .then(res =>{
             this.setState({
                userId : res.data.user.id,
                balance : res.data.user.balance})
         })
        Axios.get(`/User`)
        .then(res => {
          const persons = res.data;
          console.log("data",res.data);
          this.setState({ persons:persons });
        })
        
            .catch(error =>{
                console.log(error)
            })
    }
   

    onChangeAmount(e){
        this.setState({
            amount:e.target.value
        })
    }

    onChangeRecipient(e){
        this.setState({
            recipient:e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        const trans = {
            recipientID: this.state.recipient,
            senderID: this.state.userId,
            senderBalance:  this.state.balance,
            transAmount: this.state.amount,
            Date: this.state.date,
            dateOnly:this.state.dateOnly
        }
        console.log(trans)
        
        Axios.post('/User/pay',trans)
          
        
        window.location = '/'+this.state.userId;
        
    }

    render(){
        return(
        <div>
            <form onSubmit = {this.onSubmit}>
                <label style ={{margin:"10% 10px"}} for = "recipient">Recipient</label>
                <select value={this.state.recipient} onChange={this.onChangeRecipient}>
                { this.state.persons.map(person =><option value ={person.id}> {person.name} </option> )}
                </select>
                <label style ={{margin:"10% 10px"}} for="amount">Amount </label>
                <input value= {this.state.amount} type="number" id="amount" name="amount" onChange={this.onChangeAmount} />
                <button className="btn btn-primary" type="submit">PAY</button>
            </form>
        </div>
        )
    }
}
    
