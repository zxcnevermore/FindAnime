import axios from 'axios'

const token = window.localStorage.getItem('token')

const instanse = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "x-access-token": token
  }
});


export default instanse;
