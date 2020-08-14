import React, { Component } from 'react';

export default class ReadOnlyInput extends Component {

  handleChange = event => {
    const { onMyChange } = this.props;
    onMyChange(event);
  }

  render() {
    const {color = 'black',value} = this.props;
    return (
      <input
        type="text"
        value = {value}
        style= {{backgroundColor: color}}
        readOnly
      />
    );
  }
}
