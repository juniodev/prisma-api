const routers = require('express').Router()
const basicAuth = require('express-basic-auth');

const {
  createUser
} = require('../controllers/user/create')
const {
  findUsers
} = require('../controllers/user/findUsers')
const {
  findUser
} = require('../controllers/user/findUser')
const {
  dbBackup
} = require('../controllers/backup')

routers.post('/newuser', createUser)
routers.get('/users', findUsers)
routers.get('/user/:id', findUser)

const auth = basicAuth({
    users: { 'juniodev': '909090' },
    challenge: true 
});

routers.get('/backup', auth, dbBackup)

routers.get('/', (req, res) => {
  return res.send('ok')
})

module.exports = routers