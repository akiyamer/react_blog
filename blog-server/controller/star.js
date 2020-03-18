const Star = require('../model/star')
const Op = require('sequelize').Op

const list = async (ctx) => {
    const query = ctx.query
    const where = {
        title: {
            [Op.like]: `%${query.title}%`
        }
    }
    const {rows: data, count: total} = await Star.findAndCountAll({
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
    if (!params.title) {
        ctx.body = {
            code: 1003,
            desc: 'title can not be null'
        }
        return false
    }
    await Star.create(params)
    ctx.body = {
        code: 1000,
        data: 'create suc'
    }
}

const destroy = async (ctx) => {
    await Star.destroy({
        where: ctx.request.body
    })
    ctx.body = {
        code: 1000,
        desc: 'destroy suc'
    }
}

module.exports = {
    list,
    create,
    destroy
}