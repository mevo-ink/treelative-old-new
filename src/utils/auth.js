import { ObjectId } from 'mongodb'
import dbConnect from 'utils/mongodb'
import { projectUserProfile } from 'utils/dbProjections'

import nookies from 'nookies'

import jwt from 'jsonwebtoken'

const {
  JWT_SECRET = 'shuuush',
  JWT_EXPIRY = '2h'
} = process.env

export const generateToken = user => jwt.sign(
  user, JWT_SECRET, { expiresIn: JWT_EXPIRY }
)

export const authenticateToken = async (token) => {
  // return { user: { id: 'adas', name: 'asdasd' } } // REMOVE
  try {
    if (!token) return { error: 'No valid session token provided' }
    const { id } = jwt.verify(token, JWT_SECRET)
    if (!id) return { error: 'The session token is invalid. Please login again' }
    const db = await dbConnect()
    const user = await db.collection('users').findOne({ _id: ObjectId(id) }, { projection: { ...projectUserProfile, isAdmin: 1 } })
    return { user }
  } catch (error) {
    if (['TokenExpiredError', 'JsonWebTokenError'].includes(error.name)) {
      return {
        error: 'The session token is invalid. Please login again'
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

export const getSession = async (ctx) => {
  // get payload from cookie and set auth user in ctx.req.user
  const cookies = nookies.get(ctx)
  const payload = cookies.AUTH_SESSION_ID
  const session = await authenticateToken(payload)
  if (session.error) {
    // clear cookies if authentication fails
    nookies.destroy(ctx, 'AUTH_SESSION_ID')
    nookies.destroy(ctx, 'AUTH_USER_ID')
  }
  return session
}
