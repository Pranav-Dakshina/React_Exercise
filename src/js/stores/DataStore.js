import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class DataStore extends EventEmitter {
  constructor() {
    super()
    this.data = [];
  }

  fetchEmail(data) {
    data.sort(function(a, b) {
      if (a.name < b.name) {return -1;}
      if (a.name > b.name) {return 1;}
      return 0;
    } );

    data.map((item) => {
      let name = item.name;
      let email = item.email;
      let checked = false;

      this.data.push({
        name,
        email,
        checked,
      });
    });

    // console.log(this.data);

    this.emit("change");
  }

  getAll() {
    return this.data;
  }

  setOne(value, id) {
    this.data[id] = value;
    this.emit("change");
  }

  handleActions(action) {
    switch(action.type) {
      case "FETCH_EMAIL": {
        this.fetchEmail(action.data);
        this.emit("change");
        break;
      }
    }
  }

}

const dataStore = new DataStore;
dispatcher.register(dataStore.handleActions.bind(dataStore));

export default dataStore;
