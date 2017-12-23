import React, { PureComponent } from 'react';


class Analytics extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      utm_source:'',
      utm_medium:'',
      utm_campaign:'',
      utm_term:'',
      utm_content:''
    };
  }

  render() {
    return (
      <div className="analytics">
        <div className="inputs">
          <div className="col">
            <label htmlFor="utm_source">Campaign Source</label>
            <input name="utm_source" type="text"
            onChange={this.handleInput.bind(this)}/>
          </div>
          <div className="col">
            <label htmlFor="utm_medium">Campaign Medium</label>
            <input name="utm_medium" type="text"
            onChange={this.handleInput.bind(this)}/>
          </div>
          <div className="col">
            <label htmlFor="utm_campaign">Campaign Name</label>
            <input name="utm_campaign" type="text"
            onChange={this.handleInput.bind(this)}/>
          </div>
          <div className="col">
            <label htmlFor="utm_term">Campaign Term</label>
            <input name="utm_term" type="text"
            onChange={this.handleInput.bind(this)}/>
          </div>
          <div className="col">
            <label htmlFor="utm_content">Campaign Content</label>
            <input name="utm_content" type="text"
            onChange={this.handleInput.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }

  handleInput(e) {
    this.setState({ [e.target.name]:e.target.value }, () => {
      this.props.setAnalyticsURL(this.buildURL());
    });
  }

  buildURL() {
    let url = {};
    Object.keys(this.state).forEach((key,index) => {
      let value = (this.state[key].length < 1) ? '' : `${encodeURIComponent(this.state[key])}`;
      url[key] = (value);
    });
    return url;
  }

}

export default Analytics;