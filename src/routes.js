const { addUser, getAllUser, getUserById, addHistory, getAllHistory } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/user',
    handler: addUser
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
