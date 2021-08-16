import { hash } from 'bcryptjs'

import fs from 'fs'

import { isAdmin } from 'server/utils/authorization'

import { updateAndReturn } from 'server/utils/helperFunctions'

import fetch from 'node-fetch'

import { uuid } from 'uuidv4'

export default async (parent, args, context, info) => {
  isAdmin(context)

  args.input.username = args.input.fullName.trim().replace(' ', '_')
  args.input.password = await hash('123', 10)
  const userID = uuid()

  // const user = await context.models.User.create({
  //   ...args.input,
  //   username,
  //   password
  // })

  // download user avatar from ui-avatars and upload to google storage
  const url = `https://ui-avatars.com/api/?name=${args.input.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
  const response = await fetch(url)
  const data = await response.arrayBuffer()
  const buffer = Buffer.from(data, 'base64')

  fs.writeFileSync('deleteMe.png', buffer)

  await context.storage.upload('deleteMe.png', {
    public: true,
    destination: `avatars/${userID}.png`,
    metadata: { metadata: { firebaseStorageDownloadTokens: uuid() } }
  })

  fs.unlinkSync('deleteMe.png')

  return updateAndReturn(context, userID, args.input)
}
