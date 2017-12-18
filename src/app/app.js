import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './assets/scss/app.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      output: []
    }
  }

  componentDidMount() {
    this.setState((prevState) => {
      return {
        output: ['']
      };
    });
  }

  render() {
    return (
      <div id="app-index">
        <div id="input">
          <textarea name="mail-text-in" id="mail-text-in" cols="30" rows="10"
            placeholder="Here you put the content of the mail you need to personalize. You can use tags like &#123;&#123;firstname&#125;&#125; to populate with data"
            onChange={this.parseData.bind(this)}>
          </textarea>
          <textarea name="data-in" id="data-in" cols="30" rows="10"
            placeholder="Paste the content of a Google Sheet with the first line titles as placeholders"
            onChange={this.convert.bind(this)}>
          </textarea>
        </div>
        <hr/>
        <div id="output">
          {this.state.output.map((value, index) => {
            return <textarea name="mail-text-out-1" id="mail-text-out-1" cols="30" rows="10" key={index} defaultValue={value}></textarea>
          })}
        </div>
      </div>
    );
  }

  convert(e) {
    console.log('Ill handle this');
    // Iterate datas array
    this.state.datas.forEach((data) => {
      // Iterate data object
      Object.keys(data).forEach((key) => {
        // this.text = this.text.replace('{{' + key + '}}', data[key]);
      });
    });
  }

  parseData(e) {
    let lines,keys,values;
    lines = e.target.value.split(/\r?\n/);
    keys  = lines[0].split(/\t/);
    values = [];

    lines.shift();

    lines.forEach((line) => {
      let valueObj = {};
      line.split(/\t/).forEach((value,i) => {
        valueObj[keys[i]] = value;
      });
      values.push(valueObj);
    });

    this.setState((prevState) => {
      return {
        datas: values
      };
    });

    console.log(this.state);
  }
  
}

ReactDOM.render(<App />, document.getElementById('app'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}