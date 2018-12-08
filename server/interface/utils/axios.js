import axios from 'axios'

// 创建新的 axios 实例
const instance = axios.create({
  // 环境变量主机, 环境变量端口号
  baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
  timeout: 5000,
  headers: {}
})

export default instance
