import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TabList extends Component {
  constructor(props) {
    super(props);
    const defaultTab = React.Children
      .toArray(this.props.children)
      .map(child => child.props.name)[0];
    this.state = {
      selected: defaultTab
    };
  }

  select(clickedTab) {
    this.setState({
      selected: clickedTab
    });
  }

  render() {
    const tabs = React.Children.map(this.props.children, (child) => {
      const className = child.props.name === this.state.selected ? 'selected' : 'unselected';
      return (
        <h1
          className={className}
          onClick={() => this.select(child.props.name)}
          key={child.props.name}
        >
          {child.props.name}
        </h1>);
    });
    const body = React.Children
      .toArray(this.props.children)
      .find(e => e.props.name === this.state.selected);

    return (
      <div className="container">
        <div className="tabs">
          {tabs}
        </div>
        <div className="tab_content">
          {body}
        </div>
      </div>
    );
  }
}

TabList.propTypes = {
  children: PropTypes.array,
};
