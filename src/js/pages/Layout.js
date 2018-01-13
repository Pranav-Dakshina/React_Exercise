import React from "react";

import { fetchEmail } from "../actions/DataActions";
import dataStore from "../stores/DataStore";
import Datas from "../pages/Datas";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      data: dataStore.getAll(),
      count: 0,
      display: false,
    };
  }

  componentWillMount() {
    fetchEmail();
    dataStore.on("change", this.getdata);
  }

  componentWillUnmount() {
    dataStore.removeListener("change", this.getdata);
  }

  getdata = () => {
    this.setState({
      data: dataStore.getAll(),
    });
    this.getCount();
  }

  getCount = () => {
    let cnt = 0;
    this.state.data.forEach((val) => {
       if (val.checked) {
         cnt++;
       }
    });
    this.setState({
      count: cnt,
    });
  }

  dispData = () => {
    this.setState({
      display: true,
    });
  }

  render() {
    const containerStyle = {
      marginTop: "60px"
    };

    const bottomStyle = {
      marginBottom: 60,
    }

    return (
      <div>
        <h1>React Exercise</h1>
        <div class="container" style={containerStyle}>
          <div class="row">
            <div class="col-lg-12">
              {(this.state.display == true)
                ? ''
                : this.state.count > 0 ? <div> {this.state.count} of {this.state.data.length} selected</div>
                                       : ''
              }
              { (this.state.display == true)
                ? this.state.data.map((val, idx) => {
                   if(val.checked) {
                     return (
                       <Datas item={val} key={idx} id={idx} />
                     );
                   }
                  })
                : this.state.data.map((val, idx) => {
                     return (
                       <Datas item={val} key={idx} id={idx} />
                     );
                   })
               }
            </div>
          </div>
          <button onClick={this.dispData} style={bottomStyle}>Confirm</button>
        </div>
      </div>
    );
  }
}
