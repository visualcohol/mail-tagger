import React, { Component } from 'react';
import { isEmpty, isURL } from 'validator';

class Googl extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "error":true,
      "api-key": '',
      "api-url": ''
    };
  }

  render() {
    return (
      <div className="googl">
        <form action="" type="post">
          <label htmlFor="googl-api-key">API Key:</label>
          <input type="text" name="api-key" value={this.state.apiKey} onChange={this.handleInputApi}/>
          <label htmlFor="googl-api-key">URL to shorten:</label>
          <input type="text" name="api-url" value={this.state.URL}  onChange={this.handleInputApi}/>
          <button className="google-add" onClick={this.handleSubmit}>Create Goo.gl links</button>
        </form>
      </div>
    );
  }

  handleSubmit(e) {

  }

  handleInputApi(e) {
    let value = e.target.value;

    if ( ! isEmpty(value)) {
      this.setState({ error:false, "api-key":value });
    }
  }

  handleInputURL(e) {
    let value = e.target.value;

    if ( ! isEmpty(value) || isURL(value)) {
      this.setState({ error:false, "api-key":value });
    }
  }
  
}

export default Googl;