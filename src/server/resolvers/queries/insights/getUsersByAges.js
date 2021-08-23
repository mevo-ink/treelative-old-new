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
  const users = await context.db.findAll('users', { dateOfBirth: { '!=': null } })

  const usersMatching = []

  let [min, max] = args.ages.split('-')
  if (args.ages === '80+') {
    min = 80
    max = Number.MAX_SAFE_INTEGER
  }

  for (const user of users) {
    const age = calculateAge(user.dateOfBirth, user.dateOfDeath ? new Date(user.dateOfDeath) : new Date())
    if (age >= min && age <= max) {
      usersMatching.push({ ...user, age })
    }
  }

  // sort by age
  return usersMatching.sort((a, b) => a.age - b.age)
}
