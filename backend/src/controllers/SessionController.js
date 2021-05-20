const connection = require('../database/connection')

module.exports = {
    async create(request, response) {
        const { login, password } = request.body

        const user = await connection('users')
        .where('login', login)
        .select('*')
        .first()

        if(!user) {
            return response.status(400).json({ error: 'Invalid login' })
        }

        if(user.password !== password) {
            return response.status(400).json({ error: 'Invalid password' })
        }

        return response.json(user)
    }
}