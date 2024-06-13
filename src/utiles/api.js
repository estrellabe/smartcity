import axios from 'axios';
import config from '../Config.js';

export default axios.create({
  baseURL: config.baseURL_API
  //baseURL: 'http://localhost:5000'
});