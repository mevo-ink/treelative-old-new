import { hash } from 'bcryptjs'

import { isAdmin } from 'server/utils/authorization'

import fetch from 'node-fetch'

import minioClient from 'server/utils/minioClient'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const username = args.input.fullName.trim().replace(' ', '_')
  const password = await hash('123', 10)

  const user = await context.models.User.create({
    ...args.input,
    username,
    password
  })

  // upload user avatar
  const url = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
  const response = await fetch(url)
  const data = await response.arrayBuffer()
  const buffer = Buffer.from(data)
  // upload hash to minio avatar bucket
  await minioClient.putObject('avatar', `${user._id.toString()}.jpg`, buffer)

  return user
}
