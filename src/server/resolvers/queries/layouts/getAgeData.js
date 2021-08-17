export default async (parent, args, context, info) => {
  const users = await context.db.findAll('users', { dateOfBirth: { '!=': null } })
  const unknownCount = (await context.db.collection('users').where('dateOfBirth', '==', null).get()).docs.length

  const data = {}

  for (const user of users) {
    const birthYear = new Date(user.dateOfBirth).toISOString().slice(0, 4)

    user.avatar = `${process.env.STORAGE_ENDPOINT}/avatars/${user.id}.png`
    user.brokenAvatar = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`

    if (data[birthYear]) {
      data[birthYear] = [...data[birthYear], user]
    } else {
      data[birthYear] = [user]
    }
  }

  return {
    data,
    unknownCount
  }
}
