import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://countriesnow.space/api/v0.1/',
  headers: { 'accept': 'application/json' }
});
// TO DO: Manejar error en los services
// TO DO: Tipar params defaults

export const nominatimApi = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org/',
  headers: {
    'Accept': 'application/json',
    'User-Agent': 'Form Contact'
  }
})