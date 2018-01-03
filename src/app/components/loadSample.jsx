import React, { PureComponent } from 'react';

class LoadSample extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      data: 'id\tfirstname\tlastname\temail\turl\r\n'+
               '1\tClark\tKent\tnothingspecial@dailyplanet.com\thttp://example.com\r\n'+
               '2\tPeter\tParker\thavenouncle@webmail.com\thttp://example.com',
      mail: 'Dear {{firstname}}!\r\n\r\n'+
               'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien nibh, tempor at ullamcorper sed, eleifend eget odio. Etiam in bibendum ipsum. Proin feugiat vitae leo quis sagittis. Maecenas id iaculis neque.\r\n\r\n'+
               '{{url}}\r\n\r\n' +
               'Mailed to:\r\n{{firstname}} {{lastname}}\r\n{{email}}'
    }
  }

  render() {
    return (
      <button className="sample-load" onClick={this.handleLoad.bind(this)}>Load sample data</button>
    );
  }

  handleLoad(e) {
    this.props.setStateValue({
      inputData: this.state.data,
      inputMail: this.state.mail
    });
  }

}

export default LoadSample;