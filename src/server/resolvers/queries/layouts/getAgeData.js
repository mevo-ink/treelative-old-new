export default async (parent, args, context, info) => {
  const users = await context.models.User.find({ dateOfBirth: { $ne: null } }, 'dateOfBirth fullName').lean()
  const unknownCount = await context.models.User.countDocuments({ dateOfBirth: { $eq: null } })

  const data = {}

  for (const user of users) {
    const birthYear = new Date(user.dateOfBirth).toISOString().slice(0, 4)

    user.id = user._id
    user.avatar = `${process.env.STORAGE_ENDPOINT}/avatars/${user._id}.png`
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
