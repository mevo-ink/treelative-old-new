import fs from 'fs'

import { isAdmin } from 'server/utils/authorization'

import fetch from 'node-fetch'

import { v4 as uuidv4 } from 'uuid'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const users = (await context.models.User.find({}, 'id fullName').lean())

  // get avatar from ui-avatars.com/api using fullName and upload to storage avatar bucket
  for (const user of users) {
    const url = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
    const response = await fetch(url)
    const data = await response.arrayBuffer()
    const buffer = Buffer.from(data)

    fs.writeFileSync('deleteMe.png', buffer)

    await context.storage.upload('deleteMe.png', {
      public: true,
      destination: `avatars/${user._id.toString()}.png`,
      metadata: { metadata: { firebaseStorageDownloadTokens: uuidv4() } }
    })

    fs.unlinkSync('deleteMe.png')
  }

  return true
}
