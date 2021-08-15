import { hash } from 'bcryptjs'

import fs from 'fs'

import { isAdmin } from 'server/utils/authorization'

import fetch from 'node-fetch'

import { uuid } from 'uuidv4'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const username = args.input.fullName.trim().replace(' ', '_')
  const password = await hash('123', 10)

  const user = await context.models.User.create({
    ...args.input,
    username,
    password
  })

  // download user avatar from ui-avatars and upload to google storage
  const url = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
  const response = await fetch(url)
  const data = await response.arrayBuffer()
  const buffer = Buffer.from(data, 'base64')

  fs.writeFileSync('deleteMe.png', buffer)

  await context.storage.upload('deleteMe.png', {
    public: true,
    destination: `avatars/${user._id.toString()}.png`,
    metadata: { metadata: { firebaseStorageDownloadTokens: uuid() } }
  })

  fs.unlinkSync('deleteMe.png')

  return user
}
