import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MailInput from './components/mailInput';
import LoadSample from './components/loadSample';
import DataInput from './components/dataInput';
import MailOutput from './components/mailOutput';
import Analytics from './components/analytics';
import Googl from './components/googl';

import './assets/scss/app.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      inputData: '',
      inputMail: '',
      analyticsURL: {
        utm_source:'',
        utm_medium:'',
        utm_campaign:'',
        utm_content:'',
        utm_term:''
      }
    }
  }

  componentDidUpdate() {
    // console.log('did', this.state);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('next', nextState);
    nextState.dataasd = 'asd';
    return true;
  }

  render() {
    return (
      <div id="app-index">
        <h1>Mail tagger</h1>
        <div className="sample">
          {/* <button className="sample-load" onClick={this.loadSample.bind(this)}>Load sample data</button> */}
          <LoadSample setStateValue={this.setStateValue.bind(this)}/>
        </div>
        <h2>Input</h2>
        
        <div className="input">
          <h3>Data:</h3>
          <DataInput inputData={this.state.inputData}
            setStateValue={this.setStateValue.bind(this)} />
          <h3>Mail Text:</h3>
          <MailInput inputMail={this.state.inputMail}
            setStateValue={this.setStateValue.bind(this)} />
          <h3>Analytics:</h3>
          <Analytics setStateValue={this.setStateValue.bind(this)}/>
          <h3>Goo.gl:</h3>
          <Googl />
        </div>
        <h2>Output</h2>
        <div className="output">
          {this.renderMail().map((mail, index) => {
            return <MailOutput key={index} value={mail} />
          })}
        </div>
      </div>
    );
  }

  renderMail() {
    let mails = [];
    if (this.state.inputMail.length < 1) return mails;

    // Iterate datas array
    this.state.datas.forEach((data) => {
      
      // Iterate data object
      let renderedMail = this.state.inputMail;

      Object.keys(data).forEach((key) => {
        
        // GA URL analytics tag
        if(key === 'url') {

          let countGATags = Object.values(this.state.analyticsURL).filter((value) => {
            return (value.length > 0) ? true : false;
          });

          if(countGATags.length) {
            let taggedURL = '';

            taggedURL += (this.state.analyticsURL.utm_source) ? '&utm_source=' + this.state.analyticsURL.utm_source : '';
            taggedURL += (this.state.analyticsURL.utm_medium) ? '&utm_medium=' + this.state.analyticsURL.utm_medium : '';
            taggedURL += (this.state.analyticsURL.utm_campaign) ? '&utm_campaign=' + this.state.analyticsURL.utm_campaign : '';
            taggedURL += (this.state.analyticsURL.utm_term) ? '&utm_term=' + this.state.analyticsURL.utm_term : '';
            taggedURL += (this.state.analyticsURL.utm_content) ? '&utm_content=' + this.state.analyticsURL.utm_content : '&utm_content=' + data.id;
            taggedURL = taggedURL.replace('&', '?');
            
            renderedMail = renderedMail.replace('{{url}}', data.url + taggedURL);
          }

        }

        let search = '{{' + key + '}}';
        renderedMail = renderedMail.replace(new RegExp(search, 'g'), data[key]);
      });

      mails.push(renderedMail)
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

  setStateValue(value) {
    this.setState(value);
  }

  // setStateValue(name, value) {
  //   this.setState({ [name]: value });
  // }

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