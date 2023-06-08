const { nanoid } = require('nanoid')
const user = require('./user')
const history = require('./history')
// const Firestore = require('@google-cloud/firestore')

// const db = new Firestore({
//   projectId: 'capstone-project-c23pc717',
//   keyFilename: 'keyfile.json'
// })

const addUser = (request, h) => {
  const {
    username,
    password
  } = request.payload

  const userID = 'user' + nanoid(10)

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

  // async function addData (database) {
  //   let naming = 'user' + nanoid(10)
  //   const temp = []
  //   const tempValidate = await database.collection('users').get()
  //   tempValidate.forEach((doc) => {
  //     temp.push(doc.data())
  //   })
  //   // condition for checking duplicate user id
  //   if (temp.includes(naming)) {
  //     naming = 'user' + nanoid(10)
  //   }
  //   const docRef = database.collection('users').doc(naming)
  //   await docRef.set({
  //     username: newUser.username,
  //     password: newUser.password,
  //     userID: newUser.userID
  //   })
  // }
  user.push(newUser)

  const isSuccess = user.filter((user) => user.userID === userID).length > 0
  if (isSuccess) {
    // addData(db)
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

const getAllUser = (request, h) => {
  // async function getUserFirestore(database) {
  //   const tester = await database.collection('users').get()
  //   const temp = []
  //   tester.forEach((doc) => {
  //     console.log(doc.id, '=>', doc.data())
  //     temp.push
  //   });
  // }
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
