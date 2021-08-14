export default async (parent, args, context, info) => {
  const users = await context.models.User.find({ currentLocation: { $ne: null } }, 'currentLocation').lean()
  const unknownCount = await context.models.User.countDocuments({ currentLocation: { $eq: null } })

  const groupByCountry = {}

  const countryCodeMap = {}

  for (const user of users) {
    const country = user.currentLocation.suggested.terms.pop().value

    if (user.currentLocation) {
      const countryInfo = user.currentLocation.parsed.address_components.find(({ types }) => types.includes('country'))
      if (countryInfo) {
        countryCodeMap[country] = countryInfo.short_name
      }
    }

    groupByCountry[country] = (groupByCountry[country] || 0) + 1
  }

  const orderedResult = Object.keys(groupByCountry).sort((a, b) => {
    if (groupByCountry[a] > groupByCountry[b]) {
      return -1
    } else if (groupByCountry[a] < groupByCountry[b]) {
      return 1
    } else {
      return 0
    }
  }).reduce(
    (obj, key) => {
      if (groupByCountry[key] > 2) {
        obj[key] = groupByCountry[key]
      } else {
        obj.others = (obj.others || 0) + groupByCountry[key]
      }
      return obj
    },
    {}
  )

  const data = Object.entries(orderedResult).map(([key, value]) => ({ country: key, count: value, code: countryCodeMap[key] }))

  return {
    data,
    unknownCount
  }
}
