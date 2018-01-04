import React, { Component } from 'react';
import { isEmpty } from 'validator';

class Googl extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      errors: []
    };
  }

  render() {
    return (
      <div className="googl">
          <div className="errors">
              {
                this.state.errors.map((error,i) => {
                  return (<span key={i}>The {error} is wrong.</span>);
                })
              }
          </div>
          <label htmlFor="key">API Key:</label>
          <input type="text" name="key"
            onChange={this.handleInputKey.bind(this)}/>
          <button className="google-add" onClick={this.handleSubmit.bind(this)}>Shorten URLs</button>
      </div>
    );
  }

  handleSubmit(e) {
    let errors = [];

    if (isEmpty(this.state.key)) errors.push('API key');
    
    if(errors.length > 0) {
      this.setState({ errors:errors });
    } else {
      this.setState({ errors:[] });
    }
  }

  handleInputKey(e) {
    this.setState({ key:e.target.value });
  }
}

export default Googl;