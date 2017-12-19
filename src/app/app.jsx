import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MailInput from './components/mailInput';
import DataInput from './components/dataInput';
import MailOutput from './components/mailOutput';
import Googl from './components/googl';

import 'normalize.css';
import './assets/scss/app.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sample: {
        data: '',
        mail: ''
      },
      datas: [],
      input: ''
    }
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    return (
      <div id="app-index">
        <h1>Mail tagger</h1>
        <div className="sample">
          {/* <button className="sample-load" onClick={this.loadSample.bind(this)}>Load sample data</button>  */}
          
        </div>
        <h2>Inputs:</h2>
        <div className="input">
          <DataInput sampleData={this.state.sample.data} setDatas={this.setDatas.bind(this)} />
          <MailInput sampleMail={this.state.sample.mail} setMail={this.setMail.bind(this)} />
          <Googl />
        </div>
        <h2>Outputs:</h2>
        <div className="output">
          {this.convertMail().map((mail, index) => {
            return <MailOutput key={index} value={mail} />
          })}
        </div>
      </div>
    );
  }

  convertMail() {
    let mails = [];
    if (this.state.input.length < 1) return mails;

    // Iterate datas array
    this.state.datas.forEach((data) => {
      // Iterate data object
      let replaceMail = this.state.input;
      Object.keys(data).forEach((key) => {
        replaceMail = replaceMail.replace('{{' + key + '}}', data[key]);
      });
      mails.push(replaceMail)
    });

    return mails;
  }

  loadSample(e) {
    this.setState({
      sample: {
        data: 'fistname\tlastname\temail\r\nClark\tKent\tnothingspecial@dailyplanet.com',
        mail: 'Dear {{firstname}}!\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien nibh, tempor at ullamcorper sed, eleifend eget odio. Etiam in bibendum ipsum. Proin feugiat vitae leo quis sagittis. Maecenas id iaculis neque.\r\n\r\nMailed to:\r\n{{fistname}}{{lastname}}\r\n{{email}}'
      }
    });
  }

  setDatas(datas) {
    this.setState({ datas: datas });
  }

  setMail(e) {
    this.setState({ input: e.target.value });
  }
  
}

ReactDOM.render(<App />, document.getElementById('app'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}