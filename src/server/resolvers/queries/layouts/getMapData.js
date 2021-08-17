const adjustLocation = (count, { lat, lng }) => {
  return {
    lat: lat + 0.00007 * count,
    lng: lng + 0.00007 * count
  }
}

export default async (parent, args, context, info) => {
  let data = []
  let unknownCount = 0
  const users = await context.db.findAll('users')
  const seenLocations = {}

  for (const user of users) {
    if (user.currentLocation) {
      const locationKey = Object.values(user.currentLocation.parsed.geometry.location).join('-')
      data = [
        ...data,
        {
          id: user.id,
          shortName: user.shortName,
          fullName: user.fullName,
          image: `${process.env.STORAGE_ENDPOINT}/avatars/${user.id}.png`,
          brokenImage: `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`,
          position: seenLocations[locationKey] ? adjustLocation(seenLocations[locationKey], user.currentLocation.parsed.geometry.location) : user.currentLocation.parsed.geometry.location
        }
      ]
      seenLocations[locationKey] = (seenLocations[locationKey] || 0) + 1
    } else unknownCount = unknownCount + 1
  }

  return {
    data,
    unknownCount
  }
}
