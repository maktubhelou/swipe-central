import React from 'react';

export function withStripe(WrappedComponent, publicKey, secretKey) {
  const request = async (route, method, key, postData) => {
    let postDataStr = null;
    if (postData) {
    const postDataStr = Object.keys(postData).map(key => {
      return `${key}=${postData[key]}`
    }).join('&')
    }

    const response = await fetch('https://api.stripe.com/v1/' + route, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: postDataStr
    });

    return await response.json();
  }

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