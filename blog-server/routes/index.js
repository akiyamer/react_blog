const router = require('koa-router')()

const Admin = require('../controller/admin')
const Tag = require('../controller/tag')
const Star = require('../controller/star')
const Category = require('../controller/category')
const Article = require('../controller/article')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// blog router
router.post('/login', Admin.login)
router.post('/register', Admin.createAdmin)

// blog tag
router.get('/tag/list', Tag.list)
router.get('/tag/listAll', Tag.listAll)

router.post('/tag/create', Tag.create)
router.post('/tag/destroy', Tag.destroy)

// blog star
router.get('/star/list', Star.list)

router.post('/star/create', Star.create)
router.post('/star/destroy', Star.destroy)

// blog category
router.get('/category/list', Category.list)
router.get('/category/listAll', Category.listAll)

router.post('/category/create', Category.create)
router.post('/category/destroy', Category.destroy)

// blog article
router.get('/article/list', Article.list)
router.get('/article/list/all', Article.listAll)
router.get('/article/item', Article.item)
router.get('/article/detail', Article.detail)

router.post('/article/create', Article.create)
router.post('/article/update', Article.update)
router.post('/article/destroy', Article.destroy)

module.exports = router
