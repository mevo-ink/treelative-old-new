import fs from 'fs'

import dbConnect from 'utils/mongodb'

import getParsedLocations from 'utils/getParsedLocations'

export default async (parent, args, context, info) => {
  const db = await dbConnect()

  const rawUsers = fs.readFileSync('allData.json')
  const users = JSON.parse(rawUsers)

  await Promise.all(users.map(async user => {
    const parsedLocations = await getParsedLocations({
      birthLocation: user.birthLocation?.suggested,
      currentLocation: user.currentLocation?.suggested,
      marriageLocation: user.marriageLocation?.suggested
    })
    const userInput = {
      isAdmin: false,
      isPublic: false,
      isVerified: false
    }
    if (user.fullName) userInput.fullName = user.fullName
    if (user.shortName) userInput.shortName = user.shortName
    if (user.email) userInput.email = user.email
    if (user.phoneNumber) userInput.phoneNumber = user.phoneNumber
    if (parsedLocations.birthLocation) userInput.birthLocation = parsedLocations.birthLocation
    if (parsedLocations.currentLocation) userInput.currentLocation = parsedLocations.currentLocation
    if (parsedLocations.marriageLocation) userInput.marriageLocation = parsedLocations.marriageLocation
    if (user.dateOfBirth) userInput.dateOfBirth = new Date(user.dateOfBirth)
    if (user.dateOfMarriage) userInput.dateOfMarriage = new Date(user.dateOfMarriage)
    if (user.dateOfDeath) userInput.dateOfDeath = new Date(user.dateOfDeath)
    userInput.social = {}
    if (user.social?.facebook) userInput.social.facebook = user.social?.facebook
    if (user.social?.twitter) userInput.social.twitter = user.social?.twitter
    if (user.social?.instagram) userInput.social.instagram = user.social?.instagram
    if (user.social?.linkedin) userInput.social.linkedin = user.social?.linkedin
    if (user.social?.website) userInput.social.website = user.social?.website
    if (Object.keys(userInput.social).length === 0) delete userInput.social

    return db.collection('users').insertOne(userInput)
  }))

  return true
}
