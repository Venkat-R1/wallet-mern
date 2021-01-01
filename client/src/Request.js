import React, {Component} from "react"
import Axios from 'axios'
export default class Request extends Component{
    constructor(props){
        super(props);
        this.state={
            persons:[],
            from:1001,
            to:this.props.match.params.id,
            date: new Date().toString(),
            dateOnly:new Date().getDate()
        }
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeRecipient = this.onChangeRecipient.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
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

    onChangeRecipient(e){
        this.setState({
            from:e.target.value
        })
    }

    onChangeAmount(e){
        this.setState({
            amount:e.target.value
        })
    }

    onSubmit(e){
        const req_ = {
            from:this.state.from,
            to:this.state.to,
            amount:this.state.amount,
            Date: this.state.date,
            dateOnly:this.state.dateOnly
        }
        Axios.post('/User/request',req_)
        window.location.assign('http://localhost:3000/'+this.state.userId);
    }
    render(){
        return <div>
            <form onSubmit={this.onSubmit}>
            <label style ={{margin:"10% 10px"}} for = "from">From</label>
                <select value={this.state.from} onChange={this.onChangeRecipient}>
                { this.state.persons.map(person =><option value ={person.id}> {person.name} </option> )}
                </select>
                <label style ={{margin:"10% 10px"}} for="amount">Amount </label>
                <input value= {this.state.amount} type="number" id="amount" name="amount" onChange={this.onChangeAmount} />
                <button className="btn btn-primary" type="submit">REQUEST</button>
            </form>
        </div>
    }
}
    
