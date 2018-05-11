import React, { Component } from 'react';
import { TabList, Tab } from './components/Tabs';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import './App.css';

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
        <Checkout name="checkout" />
        <Payment name="payment" />
      </TabList>
    );
  }
}

export default App;
