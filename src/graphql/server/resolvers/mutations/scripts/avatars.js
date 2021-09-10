import dbConnect from 'utils/mongodb'

import { storage } from 'utils/firebaseAdmin'

import fs from 'fs'

import fetch from 'node-fetch'

export default async (parent, args, context, info) => {
  const db = await dbConnect()

  const users = await db.collection('users').find({}, { fullName: 1 }).toArray()

  await Promise.all(users.map(async user => {
    // get avatar from ui-avatars.com/api using fullName and upload to storage avatar bucket
    const url = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
    const response = await fetch(url)
    const data = await response.arrayBuffer()
    const buffer = Buffer.from(data)

    const userID = user._id.toString()

    fs.writeFileSync(userID, buffer)

    await storage.upload(userID, {
      public: true,
      destination: `avatars/${userID}.png`
    })

    fs.unlinkSync(userID)
  }))

  return true
}
