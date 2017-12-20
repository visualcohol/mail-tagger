import React, { PureComponent } from 'react';


class DataInput extends PureComponent {

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
    let data = e.target.value
    this.props.setData(data);
  }
}

export default DataInput;