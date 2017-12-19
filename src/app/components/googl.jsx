import React, { Component } from 'react';
import { isEmpty, isURL } from 'validator';

class Googl extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      url: '',
      errors: []
    };
  }

  componentDidUpdate() {
    console.log(this.state);
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
          <label htmlFor="url">URL to shorten:</label>
          <input type="text" name="url"
            onChange={this.handleInputURL.bind(this)}/>
          <button className="google-add" onClick={this.handleSubmit.bind(this)}>Create Goo.gl links</button>
      </div>
    );
  }

  handleSubmit(e) {
    let errors = [];

    if (isEmpty(this.state.key)) errors.push('API key')
    if (isEmpty(this.state.url) && ! isURL(this.state.url)) errors.push('URL')
    
    if(errors.length > 0) {
      this.setState({ errors:errors });
      return;
    }
  }

  handleInputKey(e) {
    this.setState({ key:e.target.value });
  }

  handleInputURL(e) {
    this.setState({ url:e.target.value });
  }
  
}

export default Googl;