import dbConnect from 'utils/mongodb'

import jwt from 'jsonwebtoken'

const {
  JWT_SECRET = 'shuuush',
  JWT_EXPIRY = '2h'
} = process.env

export const generateToken = user => jwt.sign(
  user, JWT_SECRET, { expiresIn: JWT_EXPIRY }
)

export const authenticate = async (token) => {
  try {
    if (!token) return null
    const { id } = jwt.verify(token, JWT_SECRET)
    if (!id) return null
    const db = await dbConnect()
    return db.collection('authorized_users').findOne({ _id: id })
  } catch (error) {
    if (['TokenExpiredError', 'JsonWebTokenError'].includes(error.name)) {
      return {
        error: 'The session payload is invalid. Please login again'
      }
    } else {
      return {
        error: error.message
      }
    }
  }
}

export const isAdmin = (user) => {
  return user.isAdmin
}

export const isOwner = (user, userID) => {
  return isAdmin(user) || user._id === userID
}
