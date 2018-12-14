# imooc-mt

> My bedazzling Nuxt.js project

## 启动

```console
<!-- node: 10.0.0 -->
sudo mongod
<!-- open other iTerm -->
mongo
<!-- open other iTerm -->
redis-server
<!-- open other iTerm -->
redis-cli
<!-- open other iTerm -->
<!-- 进入根目录 -->
npm run dev
```

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

## 导入数据到 mongodb

> 进入 dbs 目录

mongoimport -d student -c areas areas.dat
mongoimport -d student -c category category.dat
mongoimport -d student -c cities cities.dat
mongoimport -d student -c maps maps.dat
mongoimport -d student -c menus menus.dat
mongoimport -d student -c pois pois.dat
mongoimport -d student -c provinces provinces.dat
mongoimport -d student -c regions regions.dat
mongoimport -d student -c topsearches topsearches.dat

慕课网 uid: 3225903
[接口签名](http://cp-tools.cn/sign)

## postman

http://localhost:3000/geo/getPosition
http://localhost:3000/geo/menu
http://localhost:3000/geo/province
http://localhost:3000/search/top?input=火锅&city=天津&sign=a3c9fe0782107295ee9f1709edd15218
http://localhost:3000/search/hotPlace?city=天津&sign=a3c9fe0782107295ee9f1709edd15218
http://localhost:3000/category/crumbs?city=北京
http://localhost:3000/search/resultsByKeywords?city=广州&keyword=广州流溪河国家森林公园

async mounted() {
  const self = this
  const blocks = []
  const {
    status,
    data: {
      city
    }
  } = await self.$axios.get('/geo/city')
  if (status === 200) {
    let p
    let c
    const d = {}
    city.forEach(item => {
      // pyjs.getFullChars() 字母拼音
      p = pyjs
        .getFullChars(item.name)
        .toLocaleLowerCase()
        .slice(0, 1)
      // 序号
      c = p.charCodeAt(0)
      // a-z
      if (c > 96 && c < 123) {
        if (!d[p]) {
          d[p] = []
        }
        d[p].push(item.name)
      }
    })
    for (const [k, v] of Object.entries(d)) {
      blocks.push({
        title: k.toUpperCase(),
        city: v
      })
    }
    blocks.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
    self.block = blocks
  }
}
