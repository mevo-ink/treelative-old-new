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
  const data = {}
  let unknownCount = 0
  const users = await context.db.findAll('users')

  for (const user of users) {
    if (user.dateOfBirth) {
      const birthMonthDay = new Date(user.dateOfBirth).toISOString().slice(5, 10)

      user.avatar = `${process.env.STORAGE_ENDPOINT}/avatars/${user.id}.png`
      user.brokenAvatar = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
      user.age = calculateAge(user.dateOfBirth, user.dateOfDeath ? new Date(user.dateOfDeath) : new Date())

      if (data[birthMonthDay]) {
        data[birthMonthDay] = [...data[birthMonthDay], user]
      } else {
        data[birthMonthDay] = [user]
      }
    } else unknownCount = unknownCount + 1
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
      obj[key] = data[key]
      return obj
    },
    {}
  )

  return {
    data: orderedResult,
    unknownCount
  }
}
