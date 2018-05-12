import React, { Component } from 'react';
import { TabList, Tab } from './components/Tabs';
import Checkout from './components/Checkout';
import Payments from './components/Payments';
import { publicKey, secretKey } from './keys/stripekeys';
import { withStripe } from './components/Stripe';
import './App.css';

const SuperCheckout = withStripe(Checkout, publicKey, secretKey);
const SuperPayments = withStripe(Payments, publicKey, secretKey);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: ["payment", "checkout"]
    }
  }

  render() {
    return (
      <TabList tabs={this.state.tabs}>
        <SuperCheckout name="checkout" />
        <SuperPayments name="payments" />
      </TabList>
    );
  }
}

export default App;
