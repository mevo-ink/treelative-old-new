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
