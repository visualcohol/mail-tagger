import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MailInput from './components/mailInput';
import DataInput from './components/dataInput';
import MailOutput from './components/mailOutput';
import Googl from './components/googl';

import './assets/scss/app.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      inputData: '',
      inputMail: ''
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
          <button className="sample-load" onClick={this.loadSample.bind(this)}>Load sample data</button> 
        </div>
        <h2>Input</h2>
        
        <div className="input">
          <h3>Data:</h3>
          <DataInput inputData={this.state.inputData}
            setData={this.setData.bind(this)} />
          <h3>Mail Text:</h3>
          <MailInput inputMail={this.state.inputMail}
            setMail={this.setMail.bind(this)} />
          <h3>Analytics:</h3>
          <div className="analytics">
            <div className="inputs">
              <input type="text"/>
              <input type="text"/>
              <input type="text"/>
              <input type="text"/>
            </div>
            <button>Tag URLs</button>
          </div>
          <h3>Goo.gl:</h3>
          <Googl />
        </div>
        <h2>Output</h2>
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
    console.log(this.state.datas);
    if (this.state.inputMail.length < 1) return mails;

    // Iterate datas array
    this.state.datas.forEach((data) => {
      // Iterate data object
      let replaceMail = this.state.inputMail;
      Object.keys(data).forEach((key) => {
        let search = '{{' + key + '}}';
        replaceMail = replaceMail.replace(new RegExp(search, 'g'), data[key]);
      });
      mails.push(replaceMail)
    });

    return mails;
  }

  loadSample(e) {
    let data = 'id\tfirstname\tlastname\temail\turl\r\n'+
               '1\tClark\tKent\tnothingspecial@dailyplanet.com\thttp://example.com\r\n'+
               '2\tPeter\tParker\thavenouncle@webmail.com\thttp://example.com';
    let mail = 'Dear {{firstname}}!\r\n\r\n'+
               'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien nibh, tempor at ullamcorper sed, eleifend eget odio. Etiam in bibendum ipsum. Proin feugiat vitae leo quis sagittis. Maecenas id iaculis neque.\r\n\r\n'+
               '{{url}}\r\n\r\n' +
               'Mailed to:\r\n{{firstname}} {{lastname}}\r\n{{email}}';
    this.setState({
      inputData: data,
      inputMail: mail,
      datas: this.parseData(data)
    });
  }

  setData(data) {
    let datas = this.parseData(data)
    this.setState({ datas: datas, inputData: data });
  }

  setMail(mail) {
    this.setState({ inputMail: mail });
  }

  parseData(data) {
    let lines,keys,datas;
    lines = data.split(/\r?\n/);

    // First line will be the data object keys
    keys  = lines[0].split(/\t/);
    datas = [];

    // Removing the first line
    lines.shift();

    // Parsing the rest of the lines for data
    lines.forEach((line) => {
      let valueObj = {};
      line.split(/\t/).forEach((value,i) => {
        valueObj[keys[i]] = value;
      });
      datas.push(valueObj);
    });

    return datas;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}