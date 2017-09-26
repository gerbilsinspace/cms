var firebase = {}

for (var i = 0; i < process.argv.length; i++) {
  var item = process.argv[i]

  if (item.indexOf('FIREBASE_API_KEY') != -1) {
    firebase.apiKey = item.replace('FIREBASE_API_KEY=', '')
  }

  if (item.indexOf('FIREBASE_AUTH_DOMAIN') != -1) {
    firebase.authDomain = item.replace('FIREBASE_AUTH_DOMAIN=', '')
  }

  if (item.indexOf('FIREBASE_DATABASE_URL') != -1) {
    firebase.databaseUrl = item.replace('FIREBASE_DATABASE_URL=', '')
  }

  if (item.indexOf('FIREBASE_PROJECT_ID') != -1) {
    firebase.projectId = item.replace('FIREBASE_PROJECT_ID=', '')
  }

  if (item.indexOf('FIREBASE_STORAGE_BUCKET') != -1) {
    firebase.storageBucket = item.replace('FIREBASE_STORAGE_BUCKET=', '')
  }

  if (item.indexOf('FIREBASE_MESSAGING_SENDER_ID') != -1) {
    firebase.messagingSenderId = item.replace('FIREBASE_MESSAGING_SENDER_ID=', '')
  }
}

module.exports = {
  NODE_ENV: '"production"',
  FIREBASE_API_KEY: "'" + firebase.apiKey + "'",
  FIREBASE_AUTH_DOMAIN: "'" + firebase.authDomain + "'",
  FIREBASE_DATABASE_URL: "'" + firebase.databaseUrl + "'",
  FIREBASE_PROJECT_ID: "'" + firebase.projectId + "'",
  FIREBASE_STORAGE_BUCKET: "'" + firebase.storageBucket + "'",
  FIREBASE_MESSAGING_SENDER_ID: "'" + firebase.messagingSenderId + "'"
}
