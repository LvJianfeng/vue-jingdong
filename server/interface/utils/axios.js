// Promise based HTTP client for the browser and node.js
import axios from 'axios'

// craete axios instance
const instance = axios.create({
  // Environment variable host, environment variable port number
  baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
  timeout: 5000,
  headers: {}
})

export default instance
