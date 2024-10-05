import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { customerNumber: '', customerUniqueId: '', accounts: [], accountId: '', transactions: [], accountFromId: '', accountToId: '', amount: '' };
  }

  fetchAccounts = () => {
    const url = `http://localhost:8080/tsb/banking/accounts?customerNumber=${this.state.customerNumber}&&customerUniqueId=${this.state.customerUniqueId}`;
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ accounts: responseData.accounts });
      })
      .catch(err => console.error(err));
  }

  fetchTransactions = () => {
    const url = `http://localhost:8080/tsb/banking/transactions?accountId=${this.state.accountId}`;
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ transactions: responseData.transactions });
      })
      .catch(err => console.error(err));
  }

  transfer = () => {
    const url = `http://localhost:8080/tsb/banking/transfer`;
    const transferRequest = {
      accountFromId: this.state.accountFromId,
      accountToId: this.state.accountToId,
      amount: this.state.amount
    };
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(transferRequest) })
      .then(response => window.alert(response.status))
      .catch(err => console.error(err));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const accountsTableRows = this.state.accounts.map((item, index) =>
      <tr key={index}>
        <td>{item.accountId}</td>
        <td>{item.accountNumber}</td>
        <td>{item.accountName}</td>
        <td>{item.amount}</td>
        <td>{item.status}</td>
        <td>{item.accountDescription}</td>
        <td>{item.createdDate}</td>
        <td>{item.customer.customerNumber}</td>
        <td>{item.customer.customerUniqueId}</td>
      </tr>);

    const transactionsTableRows = this.state.transactions.map((item, index) =>
      <tr key={index}>
        <td>{item.transactionId}</td>
        <td>{item.amount}</td>
        <td>{item.transactionStatus}</td>
        <td>{item.accountFrom}</td>
        <td>{item.accountTo}</td>
        <td>{item.description}</td>
        <td>{item.createdDate}</td>
      </tr>);

    return (
      <div className="App">
        <span>customerNumber</span>
        <input type="text" name="customerNumber" onChange={this.handleChange} value={this.state.customerNumber} />
        <span>customerUniqueId</span>
        <input type="text" name="customerUniqueId" onChange={this.handleChange} value={this.state.customerUniqueId} />
        <button onClick={this.fetchAccounts}>Get accounts</button>
        <table>
          <tbody>
            <tr>
              <td>accountId</td>
              <td>accountNumber</td>
              <td>accountName</td>
              <td>amount</td>
              <td>status</td>
              <td>accountDescription</td>
              <td>createdDate</td>
              <td>customerNumber</td>
              <td>customerUniqueId</td>
            </tr>
            {accountsTableRows}
          </tbody>
        </table>

        <span>accountId</span>
        <input type="text" name="accountId" onChange={this.handleChange} value={this.state.accountId} />
        <button onClick={this.fetchTransactions}>Get transactions</button>
        <table>
          <tbody>
            <tr>
              <td>transactionId</td>
              <td>amount</td>
              <td>transactionStatus</td>
              <td>accountFrom</td>
              <td>accountTo</td>
              <td>description</td>
              <td>createdDate</td>
            </tr>
            {transactionsTableRows}
          </tbody>
        </table>

        <span>accountFromId</span>
        <input type="text" name="accountFromId" onChange={this.handleChange} value={this.state.accountFromId} />
        <span>accountToId</span>
        <input type="text" name="accountToId" onChange={this.handleChange} value={this.state.accountToId} />
        <span>amount</span>
        <input type="text" name="amount" onChange={this.handleChange} value={this.state.amount} />
        <button onClick={this.transfer}>Transfer</button>

      </div>
    );
  }
}

export default App;