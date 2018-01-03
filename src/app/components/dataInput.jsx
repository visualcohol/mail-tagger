import React, { PureComponent } from 'react';


class DataInput extends PureComponent {

  componentWillReceiveProps(nextProps) {
    if (this.props.inputData !== nextProps.inputData) {
      this.props.setStateValue({
        datas: this.parseData(nextProps.inputData)
      });
    }
  }

  componentDidUpdate() {
    console.log('upd');
  }

  render() {
    return (
      <div className="input-data">
        <textarea name="data-in" id="data-in" cols="30" rows="10"
          placeholder="Paste the content of a Google Sheet with the first line titles as placeholders"
          value={this.props.inputData}
          onChange={this.handleData.bind(this)}>
        </textarea>
      </div>
    );
  }

  handleData(e) {
    let data = e.target.value;
    this.props.setStateValue({
      inputData: data
    });
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

export default DataInput;