const { nanoid } = require('nanoid')
const user = require('./user')
const history = require('./history')

const addUser = (request, h) => {
  const {
    username,
    password
  } = request.payload

  const userID = nanoid(16)

  const newUser = {
    userID,
    username,
    password
  }

  const usernameCheck = user.filter((user) => user.username === username)[0]

  if (usernameCheck !== undefined) {
    const response = h
      .response({
        status: 'fail',
        message: 'Username sudah digunakan.'
      })
      .code(400)
    return response
  }
  if (newUser.username === undefined) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan User.'
      })
      .code(400)
    return response
  }
  if (newUser.password === undefined) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan User.'
      })
      .code(400)
    return response
  }
  if (newUser.password.length < 8) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan User.'
      })
      .code(400)
    return response
  }

  user.push(newUser)

  const isSuccess = user.filter((user) => user.userID === userID).length > 0
  if (isSuccess) {
    const response = h
      .response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId: userID,
          username
        }
      })
      .code(201)
    return response
  }
}

const connected = (request,h) => {
  const response = h
    .response({
      status: 'success',
      data: "Hello World"
    })
    .code(200)
  return response    
}

const getAllUser = (request, h) => {
  const userData = user.map((user) => {
    return {
      userID: user.userID,
      username: user.username
    }
  })

  const response = h
    .response({
      status: 'success',
      data: {
        user: userData
      }
    })
    .code(200)
  return response
}

const getUserById = (request, h) => {
  const { userID } = request.params
  const users = user.filter((b) => b.userID === userID)[0]
  if (users !== undefined) {
    const response = h
      .response({
        status: 'success',
        data: {
          user
        }
      })
      .code(200)
    return response
  }
  const response = h
    .response({
      status: 'fail',
      message: 'User tidak ditemukan'
    })
    .code(404)
  return response
}

const addHistory = (request, h) => {
  const {
    imageLink,
    postdesc,
    userReference
  } = request.payload

  const uploadDate = new Date()

  const id = nanoid(16)

  const newHistory = {
    id,
    imageLink,
    postdesc,
    userReference,
    uploadDate
  }

  if (newHistory.imageLink < 1) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan gambar.'
      })
      .code(400)
    return response
  }

  history.push(newHistory)

  const response = h
    .response({
      status: 'success',
      message: 'Data berhasil ditambahkan',
      data: {
        id,
        imageLink,
        postdesc,
        uploadDate,
        userReference
      }
    })
    .code(201)
  return response
}

const getAllHistory = (request, h) => {
  const historyData = history.map((history) => {
    return {
      imageLink: history.imageLink,
      postdesc: history.postdesc,
      userReference: history.userReference,
      uploadDate: history.uploadDate
    }
  })

  const response = h
    .response({
      status: 'success',
      data: {
        history: historyData
      }
    })
    .code(200)
  return response
}

const getHistoryById = (request, h) => {
  const { id } = request.params
  const historyData = history.filter((b) => b.id === id)[0]
  if (historyData !== undefined) {
    const response = h
      .response({
        status: 'success',
        data: {
          historyData
        }
      })
      .code(200)
    return response
  }
  const response = h
    .response({
      status: 'fail',
      message: 'History tidak ditemukan'
    })
    .code(404)
  return response
}

module.exports = {
  addUser,
  getAllUser,
  getUserById,
  addHistory,
  getAllHistory,
<<<<<<< HEAD
  getHistoryById
=======
  connected
>>>>>>> b0329ec033fbc553fd2572ea7632c59191683a93
}
