import { MongoClient, ObjectId } from 'mongodb'

const { DATABASE_URL } = process.env

if (!DATABASE_URL) {
  throw new Error('Please add your Mongo URI to .env.local')
}

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(DATABASE_URL, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(DATABASE_URL, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default async function mongoConnect () {
  const client = await clientPromise
  const db = client.db()
  db.ObjectId = ObjectId
  return db
}
