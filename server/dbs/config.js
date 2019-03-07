export default {
  // 设置地址, 默认端口, student: 数据库名称
  dbs: 'mongodb://127.0.0.1:27017/student',
  redis: {
    // 默认主机
    get host() {
      return '127.0.0.1'
    },
    // 默认端口
    get port() {
      return 6379
    }
  },
  smtp: {
    // 默认腾讯邮箱
    get host() {
      return 'smtp.qq.com'
    },
    // 自己接受验证码的腾讯邮箱
    get user() {
      return '583520052@qq.com'
    },
    // SMTP 腾讯邮箱授权码
    get pass() {
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
  },
  requestUrl: 'http://cp-tools.cn'
}
