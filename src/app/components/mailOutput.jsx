import React, { PureComponent } from 'react';


class MailOutput extends PureComponent {

  render() {
    return (
      <textarea name="mail-text-out-1" id="mail-text-out-1" cols="30" rows="10" value={this.props.value} readOnly></textarea>
    );
  }

}

export default MailOutput;