const Tag = require('../model/tag')
const Op = require('sequelize').Op

const list  = async (ctx) => {
    const query = ctx.query
    const where = {
        name: {
            [Op.like]: `%${query.name}%`
        }
    }
    const {rows: data, count: total} = await Tag.findAndCountAll({
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

const listAll = async (ctx) => {
    const data = await Tag.findAll()
    ctx.body = {
        data,
        code: 1000
    }
}

const create = async (ctx) => {
    const params = ctx.request.body
    if (!params.name) {
        ctx.body = {
            code: 1003,
            desc: 'tag name can not be null'
        }
        return false
    }
    try {
        await Tag.create(params)
        ctx.body = {
            code: 1000,
            data: 'create suc'
        }
    } catch (err) {
        const msg = err.errors[0]
        ctx.body = {
            code: 1003,
            data: msg.value + msg.message
        }
    }
}

const destroy = async (ctx) => {
    await Tag.destroy({
        where: ctx.request.body
    })
    ctx.body = {
        code: 1000,
        desc: 'destroy suc'
    }
}

module.exports = {
    list,
    listAll,
    create,
    destroy
}