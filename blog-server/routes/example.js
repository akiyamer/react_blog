const router = require("koa-router")()
const {
    create,
    testMethod
} = require('../controller/example')

router.prefix('/example')

router.get('/params', async (ctx) => {
    ctx.body = ctx.query
})
router.get('/create', create)
router.get('/getAll', testMethod)

module.exports = router