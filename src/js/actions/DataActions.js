import dispatcher from "../dispatcher";
import axios from 'axios';

export function fetchEmail(data) {
  axios.get('https://jsonplaceholder.typicode.com/users').then((data) =>  {
    dispatcher.dispatch({
    type: "FETCH_EMAIL",
    data: data.data,
  });
}, (error) => { console.log(error); } );
}
