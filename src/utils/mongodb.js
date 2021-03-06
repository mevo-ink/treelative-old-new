import { MongoClient, ObjectId } from 'mongodb'

const { DATABASE_URL } = process.env

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

let client
let clientPromise

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default async function mongoConnect () {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(DATABASE_URL, options)
      global._mongoClientPromise = await client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(DATABASE_URL, options)
    clientPromise = client.connect()
  }
  const connection = await clientPromise
  const db = connection.db()
  // create indexes on collections
  db.collection('users').createIndex({ email: 1 }, { unique: true, sparse: true })
  db.collection('cache').createIndex({ name: 1 }, { unique: true })
  db.collection('fcm').createIndex({ token: 1, fingerprint: 1 }, { unique: true })
  db.ObjectId = ObjectId
  return db
}
