const sequelize = require("../sequelize.js")
const Sequelize = require("sequelize")

const example = sequelize.define('example', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: {
            msg: 'already used'
        }
    },
    age: {
        type: Sequelize.INTEGER
    }
}, {freezeTableName: true})

module.exports = example