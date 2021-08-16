import { hash } from 'bcryptjs'

import fs from 'fs'

import { isAdmin } from 'server/utils/authorization'

import fetch from 'node-fetch'

import { v4 as uuidv4 } from 'uuid'

export default async (parent, args, context, info) => {
  isAdmin(context)

  args.input.username = args.input.fullName.trim().replace(' ', '_')
  args.input.password = await hash('123', 10)

  const user = await context.db.create('users', args.input)

  // download user avatar from ui-avatars and upload to google storage
  const url = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
  const response = await fetch(url)
  const data = await response.arrayBuffer()
  const buffer = Buffer.from(data, 'base64')

  fs.writeFileSync('deleteMe.png', buffer)

  await context.storage.upload('deleteMe.png', {
    public: true,
    destination: `avatars/${user.id}.png`,
    metadata: { metadata: { firebaseStorageDownloadTokens: uuidv4() } }
  })

  fs.unlinkSync('deleteMe.png')

  return user
}
