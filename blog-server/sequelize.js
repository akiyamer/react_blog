const Sequelize = require("sequelize")

const sequelize = new Sequelize('blog_dev', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

sequelize.authenticate().then(() => {
    console.log('MYSQL 连接成功...')
}).catch(err => {
    console.error('MYSQL 连接失败...', err)
})

sequelize.sync()

module.exports = sequelize