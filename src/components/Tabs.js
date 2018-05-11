import React, { Component } from 'react';

export class TabList extends Component {
  constructor(props) {
    super(props); {
      this.state = {
        selected: null
      }
    }
  }

  componentDidMount() {
    let defaultTab = React.Children.toArray(this.props.children).map((child) => child.props.name)[0];
    this.setState({
      selected: defaultTab
    })
  }

  select(clickedTab) {
    this.setState({
      selected: clickedTab
    });
  }

  render() {
    const tabs = React.Children.map(this.props.children, (child) => {
      const className = child.props.name === this.state.selected ? 'selected' : 'unselected';
      return <h1
        className={className}
        onClick={(event) => this.select(child.props.name)}
        key={child.props.name}
        >
        {child.props.name}
        </h1>;
    });
    let body;
    body = React.Children.toArray(this.props.children).find((e) => e.props.name === this.state.selected);

    return (
      <div className="container">
        <div className="tabs">
        {tabs}
        </div>
        <div className="tab_content">
        {body}
        </div>
      </div>
    )
  }
};

export class Tab extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
};

