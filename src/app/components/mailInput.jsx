import React, { PureComponent } from 'react';

class MailInput extends PureComponent {

  render() {
    return (
      <div className="input-mail">
        <textarea name="mail-text-in" id="mail-in" cols="30" rows="10"
          placeholder="Here you put the content of the mail you need to personalize. You can use tags like &#123;&#123;firstname&#125;&#125; to populate with data"
          value={this.props.inputMail}
          onChange={this.handleMail.bind(this)}>
        </textarea>
      </div>
    );
  }

  handleMail(e) {
    let mail = e.target.value;
    this.props.setStateValue({inputMail: mail});
  }
  
}

export default MailInput;