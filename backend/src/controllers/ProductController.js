const connection = require('../database/connection')

module.exports = {
    async create(request, response) {
        const { name, description, price } = request.body
        const user_id = request.headers.authorization

        try {
            const image_url = request.file.filename

            const [id] = await connection('products').insert({
                name,
                description,
                price,
                image_url,
                user_id

            })

            return response.json({ id })

        }catch (error) {
            return response.json('Error on create.')
        }

    },

    async index(request, response) {
        const products = await connection('products').select('*')

        return response.json(products)
    },

    async delete(request, response) {
        const user_id = request.headers.authorization
        const { id } = request.params

        try {
            await connection('products').where('id', id).delete()

            return response.status(204).send()
            
        } catch (error) {
            return response.status(401).json({ error: 'Operation not permitted.' })
        }

    },

    async update(request, response) {
        const { name, description, price } = request.body
        const { id } = request.params
        var url = ''

        const product = await connection('products').where('id', id).first()
        
        if(request.file == undefined) {
            url = product.image_url

        }else {
            url = request.file.filename
        }
        
        try {            
            await connection('products').where('id', id).update({
                name,
                description,
                price,
                image_url: url,
            })

            return response.json({ id })

        }catch (error) {
            return response.json('Error on update.')
        }
    },
}