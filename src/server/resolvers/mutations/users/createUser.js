import fs from 'fs'

import { isAdmin } from 'server/utils/authorization'

import fetch from 'node-fetch'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const user = await context.db.create('users', {
    isAdmin: false,
    isPublic: false,
    fullName: null,
    shortName: null,
    email: null,
    isEmailVerified: false,
    phoneNumber: null,
    birthLocation: null,
    currentLocation: null,
    marriageLocation: null,
    dateOfBirth: null,
    dateOfMarriage: null,
    dateOfDeath: null,
    social: {
      facebook: null,
      twitter: null,
      instagram: null,
      linkedin: null,
      website: null
    },
    partner: null,
    parents: [],
    children: [],
    ...args.input
  })

  // download default user avatar from ui-avatars and upload to storage
  const url = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
  const response = await fetch(url)
  const data = await response.arrayBuffer()
  const buffer = Buffer.from(data)
  const tmpFile = 'avatar.png'

  fs.writeFileSync(tmpFile, buffer)

  await context.storage.upload(tmpFile, { destination: `avatars/${user.id}.png` })

  fs.unlinkSync(tmpFile)

  return user
}
