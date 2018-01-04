import React, { PureComponent } from 'react';

class LoadSample extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      data: 'id\tfirstname\tlastname\temail\turl\n'+
               '1\tClark\tKent\tnothingspecial@dailyplanet.com\thttp://example.com\n'+
               '2\tPeter\tParker\thavenouncle@webmail.com\thttp://example.com',
      mail: 'Dear {{firstname}}!\n\n'+
               'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien nibh, tempor at ullamcorper sed, eleifend eget odio. Etiam in bibendum ipsum. Proin feugiat vitae leo quis sagittis. Maecenas id iaculis neque.\n\n'+
               '{{url}}\n\n' +
               'Mailed to:\n{{firstname}} {{lastname}}\n{{email}}'
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