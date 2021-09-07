import { ObjectId } from 'mongodb'
import dbConnect from 'utils/mongodb'

import jwt from 'jsonwebtoken'

const {
  JWT_SECRET = 'shuuush',
  JWT_EXPIRY = '2h'
} = process.env

export const generateToken = user => jwt.sign(
  user, JWT_SECRET, { expiresIn: JWT_EXPIRY }
)

export const authenticateToken = async (token) => {
  try {
    if (!token) return null
    const { id } = jwt.verify(token, JWT_SECRET)
    if (!id) return null
    const db = await dbConnect()
    const user = db.collection('authorized_users').findOne({ _id: ObjectId(id) }, { projection: { isAdmin: 1 } })
    return { user }
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

export const isAdmin = async (token) => {
  const { user } = await authenticateToken(token) || {}
  return user && user?.isAdmin ? { user } : { error: 'You are not authorized to perform this action' }
}

export const isOwner = async (token, userID) => {
  const { user } = await authenticateToken(token) || {}
  return user && (user?.isAdmin || user?._id === userID) ? { user } : { error: 'You are not authorized to perform this action' }
}
