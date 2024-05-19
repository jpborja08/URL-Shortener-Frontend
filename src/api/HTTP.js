import axios from 'axios';
import applyConverters from 'axios-case-converter';

const HTTP = applyConverters(axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: 'application/JSON',
  },
}));

export default HTTP;
