import fs from 'fs'

import { isAdmin } from 'server/utils/authorization'

import fetch from 'node-fetch'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const users = await context.db.findAll('users')

  // get avatar from ui-avatars.com/api using fullName and upload to storage avatar bucket
  for (const user of users) {
    const url = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
    const response = await fetch(url)
    const data = await response.arrayBuffer()
    const buffer = Buffer.from(data)

    fs.writeFileSync('deleteMe.png', buffer)

    await context.storage.upload('deleteMe.png', {
      public: true,
      destination: `avatars/${user.id}.png`
    })

    fs.unlinkSync('deleteMe.png')
  }

  return true
}
