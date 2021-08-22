import admin from 'server/utils/firebase'

export default async (parent, args, context, info) => {
  const { userID, email, token } = args

  // verify firebase session id
  await admin.auth().verifyIdToken(token)

  if (!userID) {
    // create new user
    await context.db.create('users', {
      isAdmin: false,
      isPublic: false,
      fullName: null,
      shortName: null,
      isEmailVerified: false,
      phoneNumber: null,
      birthLocation: null,
      currentLocation: null,
      marriageLocation: null,
      dateOfBirth: null,
      dateOfMarriage: null,
      dateOfDeath: null,
      social: {
        facebook: null,
        twitter: null,
        instagram: null,
        linkedin: null,
        website: null
      },
      partner: null,
      parents: [],
      children: [],
      email
    })
  } else {
    await context.db.findOneByIdAndUpdate('users', userID, { email })
  }

  return true
}
