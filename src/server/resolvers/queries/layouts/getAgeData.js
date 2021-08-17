export default async (parent, args, context, info) => {
  const data = {}
  let unknownCount = 0
  const users = await context.db.findAll('users')

  // get avatar from ui-avatars.com/api using fullName and upload to storage avatar bucket
  for (const user of users) {
    if (user.dateOfBirth) {
      const birthYear = new Date(user.dateOfBirth).toISOString().slice(0, 4)

      user.avatar = `${process.env.STORAGE_ENDPOINT}/avatars/${user.id}.png`
      user.brokenAvatar = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`

      if (data[birthYear]) {
        data[birthYear] = [...data[birthYear], user]
      } else {
        data[birthYear] = [user]
      }
    } else unknownCount = unknownCount + 1
  }

  return {
    data,
    unknownCount
  }
}
