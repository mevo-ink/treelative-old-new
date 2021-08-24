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
  const cacheId = 'birthday-layout'
  if (await context.db.checkCache(cacheId)) {
    const data = await context.db.readCache(cacheId)
    if (data.generatedAt === new Date().getDay()) {
      return data
    }
  }

  const users = await context.db.findAll('users', { dateOfBirth: { '!=': null } })
  const unknownCount = (await context.db.collection('users').where('dateOfBirth', '==', null).get()).docs.length

  const data = {}

  for (const user of users) {
    const birthMonthDay = user.dateOfBirth.slice(5, 10)

    const shortUser = {}
    shortUser.id = user.id
    shortUser.shortName = user.shortName
    shortUser.fullName = user.fullName
    shortUser.avatar = `${process.env.STORAGE_ENDPOINT}/avatars/${user.id}.png`
    shortUser.brokenAvatar = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
    shortUser.age = calculateAge(user.dateOfBirth, user.dateOfDeath ? new Date(user.dateOfDeath) : new Date())

    if (data[birthMonthDay]) {
      data[birthMonthDay] = [...data[birthMonthDay], shortUser]
    } else {
      data[birthMonthDay] = [shortUser]
    }
  }

  const orderedResult = Object.keys(data).sort((a, b) => {
    a = new Date(a)
    b = new Date(b)
    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    } else {
      return 0
    }
  }).reduce(
    (obj, key) => {
      obj[parseInt(key.replace('-', ''))] = data[key]
      return obj
    },
    {}
  )

  const response = { data: orderedResult, unknownCount, generatedAt: new Date().getDay() }

  context.db.writeCache(cacheId, response)

  return response
}
