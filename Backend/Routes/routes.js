const express = require('express')
const {HandledocSignup, HandledocLogin, HandlePatSignup, HandlePatLogin, HandleLogout, HandleUpdate} = require('../controller/controller')

const route = express.Router();

route.post('/doc-signup', HandledocSignup)
route.post('/doc-login', HandledocLogin)
route.post('/pat-signup', HandlePatSignup)
route.post('/pat-login', HandlePatLogin)
route.post('/logout', HandleLogout)
route.post('/doc-update', HandleUpdate)

module.exports = route;