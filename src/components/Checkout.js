import React, { Component } from 'react';
import { publicKey, secretKey } from '../keys/stripekeys';

export default class Checkout extends Component {
  constructor(props) {
  super(props);
  this.state = {
      chargeStatus: 'none',
      charge: 200,
    }
    this.createCharge = this.createCharge.bind(this);
  }

  changeValue(value) {
    this.setState({
      charge: value
    })
  }

  async createCharge() {
    this.setState({
      chargeStatus: 'Getting token'
    })

    const response = await fetch('https://api.stripe.com/v1/tokens', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${publicKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'card[number]=4242424242424242&card[exp_month]=02&card[exp_year]=2019'
    })
    const tokenData = await response.json();

    this.setState({
      chargeStatus: 'Charging card...'
    });

    const chargeResponse = await fetch('https://api.stripe.com/v1/charges', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `amount=${this.state.charge * 100}&currency=usd&description=text_charges&source=${tokenData.id}`
    })
    const chargeData = await chargeResponse.json();
    console.log(chargeData);
    this.setState({
      chargeStatus: chargeData.id
    })
  }

  render() {
    console.log(publicKey);
    console.log(secretKey);
    return (
      <div>
        <h1>{this.props.name}</h1>
        <div>
        <input type="text" defaultValue={this.state.charge} onChange={(e) => this.changeValue(e.target.value)}></input>
        </div>
        <div>
        <button onClick={this.createCharge} >Submit {this.state.charge}$ payment</button>
        </div>
        <h2>Current charge status: {this.state.chargeStatus}</h2>
      </div>
    )
  }
};
