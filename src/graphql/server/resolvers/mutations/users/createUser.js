import { ApolloError } from 'apollo-server-micro'

import dbConnect from 'utils/mongodb'
import { storage } from 'utils/firebase'
import { isAdmin } from 'utils/auth'

import fs from 'fs'
import fetch from 'node-fetch'

export default async (parent, args, context, info) => {
  const session = await isAdmin(context.cookies.AUTH_SESSION_ID)
  if (session.error) {
    throw new ApolloError(session.error, 'UNAUTHORIZED')
  }

  const db = await dbConnect()

  const { insertedId: userID } = await db.collection('users').insertOne(args.input)

  // download default user avatar from ui-avatars and upload to storage
  const url = `https://ui-avatars.com/api/?name=${args.input.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
  const response = await fetch(url)
  const data = await response.arrayBuffer()
  const buffer = Buffer.from(data)
  const tmpFile = 'avatar.png'

  fs.writeFileSync(tmpFile, buffer)

  await storage.upload(tmpFile, { destination: `avatars/${userID}.png` })

  fs.unlinkSync(tmpFile)

  // clear cache
  await db.collection('cache').deleteMany({})

  return userID
}
