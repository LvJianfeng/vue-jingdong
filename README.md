# imooc-mt

> My bedazzling Nuxt.js project

## qq 授权码

vjalqgcbjqdhbbfb

npm install @vue/cli -g
npm i npx -g
npx create-nuxt-app projectName
koa
element-ui
Universal
yes
yes
ganyihuan
npm

nvm use 8.12.0

npm i scss-loader sass-loader passport-local nodemailer node-sass mongoose koa-router koa-redis koa-passport koa-json koa-generic-session koa-bodyparser babel-preset-es2015 babel-cli axios @nuxtjs/axios crypto-js -S

## b

```js
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
```

curl -d 'username=aaa&password=111&email=583520052@qq.com' http://localhost:3000/

npm install npx -g
npx create-nuxt-app project-name

// 如果用户名, 邮箱都通过
if (!namePass && !emailPass) {
  this.$axios
    .post('/users/verify', {
      // encodeURIComponent: 对中文进行编码
      username: encodeURIComponent(this.ruleForm.name),
      email: this.ruleForm.email
    })
    .then(({ status, data }) => {
      // 验证码有效倒计时
      if (status === 200 && data && data.code === 0) {
        let count = 60
        this.statusMsg = `验证码已发送，剩余${count--}秒`
        this.timerid = setInterval(() => {
          this.statusMsg = `验证码已发送，剩余${count--}秒`
          if (count === 0) {
            clearInterval(this.timerid)
            this.statusMsg = ''
          }
        }, 1000)
      } else {
        this.statusMsg = data.msg
      }
    })
