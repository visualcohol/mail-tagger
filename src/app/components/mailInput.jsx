import React, { Component } from 'react';

class MailInput extends Component {

  render() {
    return (
      <div className="input-mail">
        <textarea name="mail-text-in" id="mail-in" cols="30" rows="10"
          placeholder="Here you put the content of the mail you need to personalize. You can use tags like &#123;&#123;firstname&#125;&#125; to populate with data"
          defaultValue={this.props.sampleMail}
          onChange={this.props.setMail}>
        </textarea>
      </div>
    );
  }

  
}

export default MailInput;