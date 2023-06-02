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
// const Cloud = require('@google-cloud/storage');
// const bucketKey = 'bucketKey.json';

// const util = require('util')
// const gc = require('./config/')
// const bucket = gc.bucket('all-mighti')

// const { Storage } = Cloud
// const storage = new Storage({
//   keyFilename: bucketKey,
//   projectId: 'capstone-project-c23pc717',
// })

const db = new Firestore({
  projectId: 'capstone-project-c23pc717',
  keyFilename: 'keyfile.json',
});

// read data
async function readData(databases) {
  const tester = await databases.collection('history').get();
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

// addData(db)

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

const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Instantiate a storage client
const storage = new Storage({
  keyFilename: path.join(__dirname, '../bucketKey.json'), // Path to your service account JSON file
  projectId: 'capstone-project-c23pc717', // Your Google Cloud project ID
});

// Define your bucket name
const bucketName = 'bucket-c23pc717';

// Function to upload a file to Google Cloud Storage
async function uploadFile(filename) {
  try {
    // Upload options
    const options = {
      destination: filename, // Destination file path in the bucket
    };

    // Upload the file
    await storage.bucket(bucketName).upload(filename, options);

    console.log(`File ${filename} uploaded to ${bucketName}`);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

// Usage example
const filename = 'assets/dummy.txt'; // Path to the file you want to upload
uploadFile(filename);


// tester.get().then(doc => {
//   const data = doc.data();
//   console.log(data)
// });



