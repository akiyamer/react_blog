const Admin = require('../model/admin')
const Op = require('sequelize').Op

const login = async (ctx) => {
    const data = await Admin.findOne({
        name: {
            [Op.eq]: `${ctx.request.body.username}`
        },
        password: ctx.request.body.password
    })
    ctx.body = {
        code: data ? 1000 : 1003,
        data,
        desc: data ? '登录成功' : '登录失败'
    }
}

const createAdmin = async (ctx) => {
    const data = ctx.request.body
    await Admin.create({
        name: data.username,
        password: data.password
    })
    ctx.body = {
        code: 1000,
        desc: 'suc'
    }
}

module.exports = {
    login,
    createAdmin
}