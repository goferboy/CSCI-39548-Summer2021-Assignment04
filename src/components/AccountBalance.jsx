import react, { Component } from 'react';
import "./AccountBalance.css";

class AccountBalance extends Component {
    render() {
        return (
            <div>
                <h3 id="balance-amount">Balance: 
                    <span style={
                        this.props.accountBalance >= 0
                            ? {color: "green"}
                            : {color: "red"}}>
                        {
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
