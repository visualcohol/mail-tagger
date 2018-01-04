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
            // axios.get('/user?ID=12345')
            // .then(function (response) {
            //   console.log(response);
            // })
            // .catch(function (error) {
            //   console.log(error);
            // });
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