import React, { Component } from 'react';
import TabList from './components/TabList';
import Checkout from './components/Checkout';
import Payments from './components/Payments';
import Disputes from './components/Disputes';
import { publicKey, secretKey } from './keys/stripekeys';
import { withStripe, withStripeData } from './components/Stripe';
import './App.css';

const SuperCheckout = withStripe(Checkout, publicKey, secretKey);
const SuperPayments = withStripeData(Payments, publicKey, secretKey, 'charges');
const SuperDisputes = withStripeData(Disputes, publicKey, secretKey, 'disputes');

const App = () => (
  <div>
    <h1 className="header">Stripe Central</h1>
    <TabList>
      <SuperCheckout name="checkout" />
      <SuperPayments name="charges" />
      <SuperDisputes name="disputes" />
    </TabList>
  </div>
);

export default App;
