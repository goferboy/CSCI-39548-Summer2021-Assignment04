import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Summary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newEntry: {
                description: '',
                amount: 0.00
            }
        }
    }

    handleChange = (event) => {
        const updatedEntry = {...this.state.newEntry};
        console.log(event.target.name, event.target.value);
        updatedEntry[event.target.name] = event.target.value;
        this.setState({newEntry: updatedEntry});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let now = new Date();
        let randomID = Math.floor((Math.random() * 2 ** 30) + 1);
        let amountFormat = parseFloat(this.state.newEntry.amount);
        let newEntryObj = {
            id: randomID,
            date: now.toISOString(),
            amount: amountFormat,
            description: this.state.newEntry.description
        };
        console.log(newEntryObj);
        this.props.add(newEntryObj);
    }

    render() {
        return (
            <div>
                <p>{this.props.sumType} Page</p>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.summary.map((entry) => {
                                return (
                                    <tr key={entry.id}>
                                        <td>{entry.date.substring(0, 10)}</td>
                                        <td>{entry.description}</td>
                                        <td>{Number(entry.amount).toFixed(2)}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <AccountBalance accountBalance={this.props.accountBalance}/>
                <form onSubmit={this.handleSubmit}>
                    <label>Description</label>
                    <input type="text" onChange={this.handleChange} name="description" value={this.state.description}/>
                    <label>Amount</label>
                    <input type="number" onChange={this.handleChange} name="amount" value={this.state.amount} min="0" step="0.01"/>
                    <button color="black">Submit</Button>
                </form>
                <Link to="/">Return to Home</Link>
            </div>
        );
    }
}

export default Summary;
