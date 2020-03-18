const Example = require('../model/example')

const create = async (ctx) => {
    console.log(ctx.query)
    await Example.create(ctx.query)
    // 一定要调用save
    await Example.save()
    ctx.body = {
        code: 1000,
        data: 'create success'
    }
}

const testMethod = async (ctx) => {
    const data = await Example.findAll()
    ctx.body = {
        data,
        code: '1000',
        desc: 'suc'
    }
}

module.exports = {
    create,
    testMethod
}