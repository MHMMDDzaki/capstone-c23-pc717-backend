const { addUser, getAllUser, getUserById, addHistory, getAllHistory, connected } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/user',
    handler: addUser
  },
  {
    method: 'GET',
    path: '/',
    handler: connected
  },
  {
    method: 'GET',
    path: '/users',
    handler: getAllUser
  },
  {
    method: 'GET',
    path: '/users/{userID}',
    handler: getUserById
  },
  {
    method: 'POST',
    path: '/history',
    handler: addHistory
  },
  {
    method: 'GET',
    path: '/history',
    handler: getAllHistory
  }
]

module.exports = routes
