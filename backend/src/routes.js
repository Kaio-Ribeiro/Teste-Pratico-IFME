const express = require('express')
const multer = require('multer')

const uploadConfig = require('./config/upload')

const UserController = require('./controllers/UserController')
const ProductController = require('./controllers/ProductController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()
const upload = multer(uploadConfig)

routes.get('/users', UserController.index)
routes.post('/users', UserController.create)

routes.get('/products', ProductController.index)
routes.post('/products', upload.single('image'), ProductController.create)
routes.delete('/products/:id', ProductController.delete)
routes.put('/products/:id', upload.single('image'), ProductController.update)

routes.post('/sessions', SessionController.create)

module.exports = routes