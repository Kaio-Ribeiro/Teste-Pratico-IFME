const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async create(request, response) {
        const { name, login, password } = request.body

        const id = crypto.randomBytes(4).toString('HEX')

        await connection('users').insert({
            id,
            name,
            login,
            password
        })

        return response.json({ id })
    },

    async index(request, response) {
        const users = await connection('users').select('*')

        return response.json(users)
    }

}