import React, { Component } from 'react';
import { isEmpty, isURL } from 'validator';
import Axios from 'axios';

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
                  return (<span key={i}>{error}</span>);
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

    if (isEmpty(this.state.key)) errors.push('API key cant be empty');
    
    if(errors.length > 0) {
      this.setState({ errors:errors });
    } else {
      this.setState({ errors:[] });
      
      let datas = this.props.getStateValue('datas');

      if (datas.length) {
        let datasNew = []; 

        datas.forEach((data) => {
          if(data.url && ! isEmpty(data.url) && isURL(data.url)) {
            Axios.get('https://www.googleapis.com/urlshortener/v1/url',
            {
              params: {
                shortUrl: 'http://goo.gl/fbsS',
                key: 'key='
              }
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
            });
            data.googl = 'https://goo.gl/23424';
          } else {
            data.googl = '';
          }
          datasNew.push(data);
        });
        
        // Writing back the Short URL into the input
        let inputDataNew = [];
        let inputData = this.props.getStateValue('inputData');
        inputData = inputData.split('\n');

        // First line will be column name then we remove it
        inputDataNew.push(inputData[0] + '\t' + 'googl');
        inputData.shift()

        inputData.forEach((value, index) => {
          inputDataNew.push(value + '\t' + datasNew[index].googl);
        });

        this.props.setStateValue({
          inputData: inputDataNew.join('\n'),
          datas: datasNew
        });
      }
    }
  }



  handleInputKey(e) {
    this.setState({ key:e.target.value });
  }
}

export default Googl;