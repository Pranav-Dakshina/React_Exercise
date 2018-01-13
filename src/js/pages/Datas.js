import React from "react";

import dataStore from "../stores/DataStore";

export default class Datas extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [{}],
      checked: false,
    };

    this.toggleCheck = this.toggleCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.item,
    });
  }

  toggleCheck(event) {
    this.setState({
      checked: !this.state.checked,
    });
    this.props.item.checked = !(this.props.item.checked);
    dataStore.setOne(this.props.item, this.props.id);
  }

  render() {
    const divStyle = {
      marginTop: 10,
      marginBottom: 10,
      height: 60,
    };

    const checkStyle = {
      height: '100%',
      width: 50,
      backgroundColor: 'Gray',
      float: 'left',
    };

    const inStyle = {
      marginTop: 20,
      marginLeft: 20,
    };

    const floatStyle = {
      float: 'left',
      width: 300,
    };

    const clearfix = {
      clear: 'both',
    };

    const nameStyle = {
      padding: '5px 20px 5px 20px',
      backgroundColor: 'LightGray',
    };

    const emailStyle = {
      padding: '5px 20px 5px 20px',
    };

    return (
        <div style={divStyle}>
          <div style={checkStyle}>
            <input type="checkbox" onChange={this.toggleCheck} checked={this.state.checked} style={inStyle}/>
          </div>
          <div style={floatStyle}>
            <div style={clearfix}></div>
            <div style={nameStyle}>{this.props.item.name}</div>
            <div style={emailStyle}>{this.props.item.email}</div>
          </div>
        </div>
    );
  }
}
