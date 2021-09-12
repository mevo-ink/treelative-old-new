import dbConnect from 'utils/mongodb'

export const projectUserProfile = {
  _id: 0,
  id: { $toString: '$_id' },
  shortName: 1,
  fullName: 1,
  avatar: {
    $concat: [`${process.env.STORAGE_ENDPOINT}/avatars/`, { $toString: '$_id' }, '.png']
  },
  brokenAvatar: {
    $concat: ['https://ui-avatars.com/api/?name=', '$fullName', '&background=random&rounded=true&font-size=0.5&bold=true']
  }
}

export const projectUserRelations = {
  _id: 0,
  id: { $toString: '$_id' },
  parents: 1,
  children: 1,
  partner: 1
}

export const projectUserAge = {
  $cond: {
    if: '$dateOfDeath',
    then: {
      $subtract: [{ $year: '$dateOfDeath' }, { $year: '$dateOfBirth' }]
    },
    else: {
      $cond: {
        if: {
          // check if current date is before the birthday
          $lt: [{ $dayOfYear: '$$NOW' }, { $dayOfYear: '$dateOfBirth' }]
        },
        then: {
          // subtract 1 from the age if current date is before the birthday
          $subtract: [{ $subtract: [{ $year: '$$NOW' }, { $year: '$dateOfBirth' }] }, 1]
        },
        else: {
          $subtract: [{ $year: '$$NOW' }, { $year: '$dateOfBirth' }]
        }
      }
    }
  }
}

export const expandUserRelations = async (user) => {
  const db = await dbConnect()

  user.id = user._id
  delete user._id

  // get user documents from user.children, user.parents and user.partner refs
  user.children = user.children ? await db.collection('users').find({ _id: { $in: user.children } }).project(projectUserProfile).toArray() : []
  user.parents = user.parents ? await db.collection('users').find({ _id: { $in: user.parents } }).project(projectUserProfile).toArray() : []
  user.partner = user.partner ? await db.collection('users').findOne({ _id: user.partner }, { projection: projectUserProfile }) : null
}
