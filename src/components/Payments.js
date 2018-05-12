import React, { Component } from 'react';

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    }
    this.getPayments = this.getPayments.bind(this);
  }

  componentDidMount() {
    this.getPayments();
  }
  
  async getPayments() {
    this.setState({
      loading: true
    })
    const chargesData = await this.props.getSecret('payments');
    this.setState({
      data: chargesData,
      loading: false,
    })
  }

  render() {
    const payments = this.state.data.map(payment => <Payments payment={payment}/>);
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

class Payments extends React.Component {
  render() {
    console.log(this.props);
    return (<tr>
      <td>{this.props.payment.id}</td>
      <td>{this.props.payment.amount}</td>
      <td>{this.props.payment.refunded.toString()}</td>
      <td>{(this.props.payment.dispute != null).toString()}</td>
      <td>{this.props.payment.refundReason}</td>
      <td><button disabled={this.props.payment.refund || this.props.payment.dispute} /></td>
      </tr>)
  }
}
