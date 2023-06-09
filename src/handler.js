const { nanoid } = require('nanoid')
// const user = require('./user')
const history = require('./history')
const Firestore = require('@google-cloud/firestore')

const db = new Firestore({
  projectId: 'capstone-project-c23pc717',
  keyFilename: 'keyfile.json'
})

const addUser = async (request, h, database = db) => {
  const {
    username,
    password
  } = request.payload

  let userID = 'user' + nanoid(10)

  const newUser = {
    userID,
    username,
    password
  }

  const temp = []
  const tempValidate = await database.collection('users').get()
  tempValidate.forEach((doc) => {
    temp.push(doc.data())
  })

  // condition for checking duplicate user id
  if (temp.includes(userID)) {
    userID = 'user' + nanoid(10)
  }

  const usernameCheck = temp.filter(user => user.username === username)[0]

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

  const docRef = database.collection('users').doc(userID)

  await docRef.set({
    username: newUser.username,
    password: newUser.password,
    userID: newUser.userID
  })

  temp.push({
    username: newUser.username,
    password: newUser.password,
    userID: newUser.userID
  })

  const isSuccess = temp.filter(user => user.userID === userID).length > 0
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

const connected = (request, h) => {
  const response = h
    .response({
      status: 'success',
      data: 'Hello World'
    })
    .code(200)
  return response
}

const getAllUser = async (request, h, database = db) => {
  const fireData = await database.collection('users').get()
  const temp = []
  fireData.forEach((doc) => {
    // push data from firestore to temp
    temp.push(doc.data())
  })
  const userData = temp.map(user => {
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

const getUserById = async (request, h, database = db) => {
  const { userID } = request.params

  const temp = []
  const tempFireData = await database.collection('users').get()
  tempFireData.forEach((doc) => {
    temp.push(doc.data())
  })
  const user = temp.filter(user => user.userID === userID)[0]
  if (user !== undefined) {
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
    postdesc
  } = request.payload

  const uploadDate = new Date()

  const userReference = 'abc'

  const newHistory = {
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

module.exports = {
  addUser,
  getAllUser,
  getUserById,
  addHistory,
  getAllHistory,
  connected
}
