import React from 'react';

export function withStripeData(WrappedComponent, publicKey, secretKey, route) {
  const base = class extends React.Component {
    constructor(props) {
      super(props);
      this.refresh = this.refresh.bind(this);
      this.setSortBy = this.setSortBy.bind(this);
      this.sortList = this.sortList.bind(this);
      this.toggleSortOrder = this.toggleSortOrder.bind(this);
      this.state = {
        data: [],
        loading: false,
        sortCriteria: null,
        sortOrder: 'asc',
      };
    }

    componentDidMount() {
      this.refresh();
    }

    setSortBy(sortCriteria) {
      this.setState({
        sortCriteria,
      });
      this.state.data.sort(this.sortList(this.state.sortCriteria));
    }

    sortList(key, order = this.state.sortOrder) {
      return function (a, b) {
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        }
        
        const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
        
        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        );
      };
    }
    toggleSortOrder() {
      this.setState({
        sortOrder: (this.state.sortOrder === 'asc') ? 'desc' : 'asc'
      });
    }
    async refresh() {
      this.setState({
        loading: true,
      });
      const chargesData = await this.props.getSecret(route);
      this.setState({
        data: chargesData.data,
        loading: false,
      });
    }
    render() {
      return (<WrappedComponent
        data={this.state.data}
        loading={this.state.loading}
        setSortBy={this.setSortBy}
        toggleSortOrder={this.toggleSortOrder}
        {...this.props}
      />);
    }
  };
  return withStripe(base, publicKey, secretKey);
}

export function withStripe(WrappedComponent, publicKey, secretKey) {
  const request = async (route, method, key, postData) => {
    let postDataStr = null;
    if (postData) {
      postDataStr = Object.keys(postData).map(k =>
        (`${k}=${postData[k]}`))
        .join('&');
    }

    const response = await fetch('https://api.stripe.com/v1/' + route, {
      method,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: postDataStr
    });
    return response.json();
  };

  return class extends React.Component {
    postPublic(route, postData) {
      return request(route, 'POST', publicKey, postData);
    }

    postSecret(route, postData) {
      return request(route, 'POST', secretKey, postData);
    }

    getSecret(route) {
      return request(route, 'GET', secretKey, null);
    }

    render() {
    return <WrappedComponent 
              postPublic={this.postPublic}
              postSecret={this.postSecret}
              getSecret={this.getSecret}
              {...this.props}
            />
    }
  }
}