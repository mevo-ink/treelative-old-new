const adjustLocation = (count, { lat, lng }) => {
  return {
    lat: lat + 0.00007 * count,
    lng: lng + 0.00007 * count
  }
}

export default async (parent, args, context, info) => {
  const users = await context.models.User.find({ currentLocation: { $ne: null } }).lean()
  const unknownCount = await context.models.User.countDocuments({ currentLocation: { $eq: null } })

  const seenLocations = {}

  const usersMap = users.map(user => {
    const locationKey = Object.values(user.currentLocation.parsed.geometry.location).join('-')
    const result = {
      id: user._id,
      shortName: user.shortName,
      fullName: user.fullName,
      image: `https://${process.env.MINIO_ENDPOINT}/avatar/${user._id}.jpg`,
      brokenImage: `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`,
      position: seenLocations[locationKey] ? adjustLocation(seenLocations[locationKey], user.currentLocation.parsed.geometry.location) : user.currentLocation.parsed.geometry.location
    }
    seenLocations[locationKey] = (seenLocations[locationKey] || 0) + 1
    return result
  })

  return {
    data: usersMap,
    unknownCount
  }
}
