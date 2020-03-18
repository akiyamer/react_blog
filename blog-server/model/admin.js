const sequelize = require("../sequelize.js")
const Sequelize = require("sequelize")

const admin = sequelize.define('admin', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: {
            msg: 'already used'
        }
    },
    password: {
        type: Sequelize.INTEGER(10)
    }
}, {freezeTableName: true})

module.exports = admin