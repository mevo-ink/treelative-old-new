// calculate the age in years given a date of birth
const calculateAge = (birthday, today) => {
  const birthDate = new Date(birthday)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export default async (parent, args, context, info) => {
  const users = await context.models.User.find({ dateOfBirth: { $ne: null } }, 'dateOfBirth').lean()
  const unknownCount = await context.models.User.countDocuments({ dateOfBirth: { $eq: null } })

  const groupByAge = {}

  for (const user of users) {
    const age = calculateAge(user.dateOfBirth, user.dateOfDeath ? new Date(user.dateOfDeath) : new Date())
    if (age >= 1 && age < 10) {
      groupByAge['0-10'] = (groupByAge['0-10'] || 0) + 1
    } else if (age >= 10 && age < 20) {
      groupByAge['10-20'] = (groupByAge['10-20'] || 0) + 1
    } else if (age >= 20 && age < 30) {
      groupByAge['20-30'] = (groupByAge['20-30'] || 0) + 1
    } else if (age >= 30 && age < 40) {
      groupByAge['30-40'] = (groupByAge['30-40'] || 0) + 1
    } else if (age >= 40 && age < 50) {
      groupByAge['40-50'] = (groupByAge['40-50'] || 0) + 1
    } else if (age >= 50 && age < 60) {
      groupByAge['50-60'] = (groupByAge['50-60'] || 0) + 1
    } else if (age >= 60 && age < 70) {
      groupByAge['60-70'] = (groupByAge['60-70'] || 0) + 1
    } else if (age >= 70 && age < 80) {
      groupByAge['70-80'] = (groupByAge['70-80'] || 0) + 1
    } else if (age >= 80) {
      groupByAge['80+'] = (groupByAge['80+'] || 0) + 1
    }
  }

  const orderedResult = Object.keys(groupByAge).sort((a, b) => {
    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    } else {
      return 0
    }
  }).reduce(
    (obj, key) => {
      obj[key] = groupByAge[key]
      return obj
    },
    {}
  )

  return {
    data: Object.entries(orderedResult).map(([key, value]) => ({ ages: key, count: value })),
    unknownCount
  }
}
