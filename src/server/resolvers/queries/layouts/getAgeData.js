export default async (parent, args, context, info) => {
  const users = await context.db.findAll('users', { dateOfBirth: { '!=': null } })
  const unknownCount = (await context.db.collection('users').where('dateOfBirth', '==', null).get()).docs.length

  const data = {}

  for (const user of users) {
    const birthYear = new Date(user.dateOfBirth).toISOString().slice(0, 4)

    const shortUser = {}
    shortUser.id = user.id
    shortUser.shortName = user.shortName
    shortUser.fullName = user.fullName
    shortUser.avatar = `${process.env.STORAGE_ENDPOINT}/avatars/${user.id}.png`
    shortUser.brokenAvatar = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`

    if (data[birthYear]) {
      data[birthYear] = [...data[birthYear], shortUser]
    } else {
      data[birthYear] = [shortUser]
    }
  }

  return {
    data,
    unknownCount
  }
}
