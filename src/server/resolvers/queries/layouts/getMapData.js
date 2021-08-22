const adjustLocation = (count, { lat, lng }) => {
  return {
    lat: lat + 0.00007 * count,
    lng: lng + 0.00007 * count
  }
}

export default async (parent, args, context, info) => {
  const cacheId = 'map-layout'

  if (await context.db.checkCache(cacheId)) return context.db.readCache(cacheId)

  const users = await context.db.findAll('users', { currentLocation: { '!=': null } })
  const unknownCount = (await context.db.collection('users').where('currentLocation', '==', null).get()).docs.length

  const seenLocations = {}

  const usersMap = users.map(user => {
    const locationKey = Object.values(user.currentLocation.parsed.geometry.location).join('-')
    const result = {
      id: user.id,
      shortName: user.shortName,
      fullName: user.fullName,
      image: `${process.env.STORAGE_ENDPOINT}/avatars/${user.id}.png`,
      brokenImage: `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`,
      position: seenLocations[locationKey] ? adjustLocation(seenLocations[locationKey], user.currentLocation.parsed.geometry.location) : user.currentLocation.parsed.geometry.location
    }
    seenLocations[locationKey] = (seenLocations[locationKey] || 0) + 1
    return result
  })

  const response = { data: usersMap, unknownCount }

  context.db.writeCache(cacheId, response)

  return response
}
