export default async (parent, args, context, info) => {
  const users = await context.db.findAll('users', { currentLocation: { '!=': null } })
  const unknownCount = (await context.db.collection('users').where('currentLocation', '==', null).get()).docs.length

  const groupByCountry = {}

  const countryCodeMap = {}

  for (const user of users) {
    const country = user.currentLocation?.country

    if (country) {
      countryCodeMap[country] = user.currentLocation.code
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
