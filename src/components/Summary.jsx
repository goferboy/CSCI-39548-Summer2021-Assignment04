import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AccountBalance from './AccountBalance.jsx';
import "./Summary.css";

class Summary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newEntry: {
                description: '',
                amount: 0.00
            },
            redirect: false
        }
    }

    handleChange = (event) => {
        const updatedEntry = {...this.state.newEntry};
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
        this.props.add(newEntryObj);
    }

    handleClick = () => {
        this.setState({
            redirect: true
        })
    }

    render() {
        if (this.state.redirect)
            return (<Redirect to="/CSCI-39548-Summer2021-Assignment04/"/>);
        return (
            <div className="summary-page">
                <h1>{this.props.sumType} Page</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th style={{textAlign: "right"}}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.summary.map((entry) => {
                                return (
                                    <tr key={entry.id} className={"row-shade-" + this.props.summary.indexOf(entry) % 2}>
                                        <td>{entry.date.substring(0, 10)}</td>
                                        <td className="desc-cell">{entry.description}</td>
                                        <td className="amount-cell">{"$" + Number(entry.amount).toFixed(2)}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <AccountBalance accountBalance={this.props.accountBalance}/>
                <form className="add-form" onSubmit={this.handleSubmit}>
                    <div className="form-entry">
                        <label>Description</label>
                        <input className="form-entry" type="text" onChange={this.handleChange} name="description" value={this.state.description}/>
                    </div>
                    <div className="form-entry">
                        <label>Amount</label>
                        <input type="number" onChange={this.handleChange} name="amount" value={this.state.amount} min="0" step="0.01"/>
                    </div>
                    <button id="submit" color="black">Submit</button>
                </form>
                <button onClick={this.handleClick}>Return Home</button>
            </div>
        );
    }
}

export default Summary;
