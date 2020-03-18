const Category = require('../model/category')
const Op = require('sequelize').Op

const listAll = async (ctx) => {
    const data = await Category.findAll()
    ctx.body = {
        code: 1000,
        data
    }
}

const list = async (ctx) => {
    const query = ctx.query
    const where = {
        name: {
            [Op.like]: `%${query.name}%`
        }
    }
    const {rows:data, count: total } = await Category.findAndCountAll({
        where,
        offset: (+query.pageNo - 1) * +query.pageSize,
        limit: +query.pageSize,
        order: [
            ['createdAt', 'DESC']
        ]
    })
    ctx.body = {
        data,
        total,
        code: 1000,
        desc: 'suc'
    }
}

const create = async (ctx) => {
    const params = ctx.request.body
    if (!params.name) {
        ctx.body = {
            code: 1003,
            desc: 'name can not be null'
        }
        return false
    }
    try {
        await Category.create(params)
            ctx.body = {
            code: 1000,
            data: 'create suc'
        }
    }
    catch(err) {
        const msg = err.errors[0]
            ctx.body = {
            code: 300,
            data: msg + msg
        }
    }
}

const destroy = async ctx => {
    await Category.destroy({where: ctx.request.body})
    ctx.body = {
        code: 1000,
        desc: 'delete suc'
    }
}

module.exports = {
    list,
    create,
    listAll,
    destroy
}