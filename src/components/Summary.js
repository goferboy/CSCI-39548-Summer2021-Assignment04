import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import AccountBalance from './AccountBalance';

class Summary extends Component {
    render() {
        return (
            <div>
                <p>{this.props.sumType} Page</p>
                <Table>
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
                                        <td>{entry.amount}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
                <AccountBalance accountBalance={this.props.accountBalance}/>
                <Link to="/">Return to Home</Link>
            </div>
        );
    }
}

export default Summary;
