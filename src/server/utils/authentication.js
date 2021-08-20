import { ApolloError } from 'apollo-server-micro'

import jwt from 'jsonwebtoken'

const {
  JWT_SECRET = 'shuuush',
  JWT_EXPIRY = '2h'
} = process.env

export const generateToken = user => jwt.sign(
  user, JWT_SECRET, { expiresIn: JWT_EXPIRY }
)

export const authenticateUserToken = async (req, db) => {
  try {
    const token = req?.headers.auth_session_id

    if (!token) return null

    const { id } = jwt.verify(token, JWT_SECRET)

    if (!id) return null

    return (await db.collection('users').doc(id).get()).data()
  } catch (error) {
    if (['TokenExpiredError', 'JsonWebTokenError'].includes(error.name)) {
      return null
    } else {
      throw new ApolloError(error.message, 500)
    }
  }
}
