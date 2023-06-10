<<<<<<< HEAD
const { addUser, getAllUser, getUserById, addHistory, getAllHistory, getHistoryById } = require('./handler')
=======
const { addUser, getAllUser, getUserById, addHistory, getAllHistory, connected } = require('./handler')
>>>>>>> b0329ec033fbc553fd2572ea7632c59191683a93

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
  },
  {
    method: 'GET',
    path: '/history/{id}',
    handler: getHistoryById
  }
]

module.exports = routes
