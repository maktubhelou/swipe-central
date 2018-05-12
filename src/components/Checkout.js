import React, { Component } from 'react';

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

    const creditCardDetails = {
      'card[number]': '4242424242424242',
      'card[exp_month]': '02',
      'card[exp_year]': '2019',
    }
    
    const tokenData = await this.props.postPublic('tokens', creditCardDetails);
    this.setState({
      chargeStatus: 'Charging card...'
    });

    const chargeDetails = {
      'amount': this.state.charge * 100,
      'currency': 'usd',
      'description': 'test_charges',
      'source': tokenData.id
    }

    const chargeResponse = await this.props.postSecret('charges', chargeDetails);
    this.setState({
      chargeStatus: chargeResponse.id,
    })
  }

  render() {
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
