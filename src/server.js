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
  keyFilename: '../keyfile.json',
});

// read data
const cityRef = db.collection('users').doc('GK6dXs5Qry0Jco74iCbV');
const doc = cityRef.get();
if (!doc.exists) {
  console.log('No such document!');
} else {
  console.log('Document data:', doc.data());
}
