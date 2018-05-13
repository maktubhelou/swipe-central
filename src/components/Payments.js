import React, { Component } from 'react';

export default class Payments extends Component {
  render() {
    const payments = this.props.data.map(payment => <Payment payment={payment} key={payment.id}/>);
    return (
      <div>
        <h1>See all your payments here.</h1>
        <div>
          <h2>Payments</h2>
          {this.props.loading ? <div>Loading...</div> : null}
          <table>
            <thead>
              <tr>
                <td>ID</td>
                <td>Amount</td>
                <td>Refunded</td>
                <td>Disputed</td>
                <td>Refund</td>
              </tr>
            </thead>
            <tbody>
              {payments}
            </tbody>
          </table> 
        </div>
      </div>
    )
  }
}

class Payment extends React.Component {
  render() {
    return (<tr>
      <td>{this.props.payment.id}</td>
      <td>{this.props.payment.currency.toUpperCase()}: {(this.props.payment.amount / 100).toFixed(2)}</td>
      <td>{this.props.payment.refunded.toString()}</td>
      <td>{(this.props.payment.dispute != null).toString()}</td>
      <td>{this.props.payment.refundReason}</td>
      <td><button disabled={this.props.payment.refund || this.props.payment.dispute} /></td>
      </tr>)
  }
}
