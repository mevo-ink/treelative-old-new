import dbConnect from 'utils/mongodb'

const adjustLocation = (count, { lat, lng }) => {
  return {
    lat: lat + 0.00007 * count,
    lng: lng + 0.00007 * count
  }
}

export const getMapData = async () => {
  const db = await dbConnect()

  const cacheKey = 'map-layout'
  const cache = await db.collection('cache').findOne({ name: cacheKey })
  if (cache) return cache.data

  const unknownCount = await db.collection('users').count({ currentLocation: { $exists: false } })

  const seenLocations = {}

  const users = (await db
    .collection('users')
    .find({ currentLocation: { $exists: true } })
    .project({ shortName: 1, fullName: 1, currentLocation: 1 })
    .toArray())
    .map(user => {
      const { lat, lng } = user.currentLocation
      const locationKey = `${lat}-${lng}`
      const result = {
        id: user._id.toString(),
        shortName: user.shortName,
        fullName: user.fullName,
        avatar: `${process.env.STORAGE_ENDPOINT}/avatars/${user._id.toString()}.png`,
        brokenImage: `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`,
        position: seenLocations[locationKey] ? adjustLocation(seenLocations[locationKey], { lat, lng }) : { lat, lng }
      }
      seenLocations[locationKey] = (seenLocations[locationKey] || 0) + 1
      return result
    })

  const response = { users, unknownCount }

  await db.collection('cache').updateOne(
    { name: cacheKey },
    { $set: { data: response } },
    { upsert: true }
  )

  return response
}

export default async (parent, args, context, info) => {
  return await getMapData()
}
