import React, { PureComponent } from 'react';


class DataInput extends PureComponent {

  render() {
    return (
      <div className="input-data">
        <textarea name="data-in" id="data-in" cols="30" rows="10"
          placeholder="Paste the content of a Google Sheet with the first line titles as placeholders"
          onChange={this.parseData.bind(this)}>
        </textarea>
      </div>
    );
  }

  parseData(e) {
    let lines,keys,datas;
    lines = e.target.value.split(/\r?\n/);

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

    this.props.setDatas(datas);
  }
}

export default DataInput;