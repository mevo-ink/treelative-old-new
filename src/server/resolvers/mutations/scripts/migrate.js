import fs from 'fs'

import fetch from 'node-fetch'

import getParsedLocations from 'server/utils/getParsedLocations'

export default async (parent, args, context, info) => {
  const rawUsers = fs.readFileSync('allData.json')
  const users = JSON.parse(rawUsers)

  for (const user of users) {
    const newUserRef = context.db.collection('users').doc()
    const parsedLocations = await getParsedLocations({
      birthLocation: user.birthLocation?.suggested,
      currentLocation: user.currentLocation?.suggested,
      marriageLocation: user.marriageLocation?.suggested
    })

    await newUserRef.set({
      id: newUserRef.id,
      isAdmin: false,
      isPublic: false,
      fullName: user.fullName || null,
      shortName: user.shortName || null,
      email: user.email || null,
      isEmailVerified: false,
      phoneNumber: user.phoneNumber || null,
      birthLocation: parsedLocations.birthLocation || null,
      currentLocation: parsedLocations.currentLocation || null,
      marriageLocation: parsedLocations.marriageLocation || null,
      dateOfBirth: user.dateOfBirth || null,
      dateOfMarriage: user.dateOfMarriage || null,
      dateOfDeath: user.dateOfDeath || null,
      social: {
        facebook: user.social?.facebook || null,
        twitter: user.social?.twitter || null,
        instagram: user.social?.instagram || null,
        linkedin: user.social?.linkedin || null,
        website: user.social?.website || null
      },
      partner: null,
      parents: [],
      children: []
    })

    // get avatar from ui-avatars.com/api using fullName and upload to storage avatar bucket
    const url = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
    const response = await fetch(url)
    const data = await response.arrayBuffer()
    const buffer = Buffer.from(data)

    fs.writeFileSync('deleteMe.png', buffer)

    await context.storage.upload('deleteMe.png', {
      public: true,
      destination: `avatars/${newUserRef.id}.png`
    })

    fs.unlinkSync('deleteMe.png')
  }

  return true
}
