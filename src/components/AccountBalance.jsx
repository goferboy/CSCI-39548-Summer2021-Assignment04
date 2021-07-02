import react, { Component } from 'react';
import "./AccountBalance.css";

class AccountBalance extends Component {
    render() {
        return (
            <div>
                <h3 id="balance-amount">Balance: 
                    <span style={
                        //Changes the text color based is the account balance
                        //is positive (green) or negative (red)
                        this.props.accountBalance >= 0
                            ? {color: "green"}
                            : {color: "red"}}>
                        {
                            //Performs string manipulation if negative or
                            //positive to ensure dollar sign is in correct
                            //placement
                            this.props.accountBalance >= 0
                            ? " $" + this.props.accountBalance
                            : this.props.accountBalance.replace('-', " -$")  
                        }
                    </span>
                </h3>
            </div>
        );
    }
}

export default AccountBalance;
