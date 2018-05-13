import React, { Component } from 'react';
import { currencyTypes } from '../keys/currencyTypes';

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
        chargeStatus: 'none',
        charge: 200,
        currency: 'USD',
    }
    this.createCharge = this.createCharge.bind(this);
  }

  changeValue(value) {
    this.setState({
      charge: value
    })
  }

  changeCurrency(value) {
    this.setState({
      currency: value
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
      'currency': this.state.currency,
      'description': 'test_charges',
      'source': tokenData.id
    }

    const chargeResponse = await this.props.postSecret('charges', chargeDetails);
    this.setState({
      chargeStatus: 'Charge Complete: ' + chargeResponse.id,
    })
  }

  render() {
    const currencyChoice = currencyTypes.map(cur => {
      return <option 
        value={cur}  
        key={cur}
        >
        {cur}
        </option>
    })
    return (
      <div>
        <h1>{this.props.name}</h1>
        <div>
          Create a charge for:
          <input type="text" defaultValue={this.state.charge + '.00'} onChange={(e) => this.changeValue(e.target.value)}></input>
          <select onChange={(e => this.changeCurrency(e.target.value))}>
            {currencyChoice}
          </select>
        </div>
        <div>
        <button onClick={this.createCharge} >Submit {this.state.charge} payment in {this.state.currency}</button>
        </div>
        <h2>Current charge status: {this.state.chargeStatus}</h2>
      </div>
    )
  }
};
