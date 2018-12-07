export default {
  // 设置地址, 默认端口, student: 数据库名称
  dbs: 'mongodb://127.0.0.1:27017/student',
  redis: {
    get host() {
      // 默认主机
      return '127.0.0.1'
    },
    get port() {
      // 默认端口
      return 6379
    }
  },
  smtp: {
    get host() {
      // 默认腾讯邮箱
      return 'smtp.qq.com'
    },
    get user() {
      // 自己接受验证码的腾讯邮箱
      return '583520052@qq.com'
    },
    get pass() {
      // 自己腾讯邮箱授权码
      // return 'mifmzufuevxubaic'
      return 'vjalqgcbjqdhbbfb'
    },
    // 验证码生成
    get code() {
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase()
      }
    },
    // 验证码过期时间
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
}
