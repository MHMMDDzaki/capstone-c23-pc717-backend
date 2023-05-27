// const Hapi = require('@hapi/hapi');


// const init = async () => {
//   const server = Hapi.server({
//     port: 5000,
//     host: 'localhost',
//   });


//   await server.start();
//   console.log(`Server berjalan pada ${server.info.uri}`);
// };


// init();
const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'capstone-project-c23pc717',
  keyFilename: 'keyfile.json',
});

// read data
async function readData(databases) {
  const tester = await databases.collection('users').get();
  tester.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });
}

// readData(db)

// add data
async function addData(database) {
  const docRef = database.collection('users').doc(makeid(8));
  await docRef.set({
    username: 'Ada',
    password: 'Lovelace',
    userID: '43A34'
  });
}

addData(db)

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

// console.log(makeid(8));

// tester.get().then(doc => {
//   const data = doc.data();
//   console.log(data)
// });



