import RefreshToken from '../models/RefreshToken.js'

export const refreshTokenRepository = {
  create: async ({ user, token }) => {
    return RefreshToken.create({ user, token })
  },

  findByToken: async (token) => {
    return RefreshToken.findOne({ token })
  },

  deleteByToken: async (token) => {
    return RefreshToken.deleteOne({ token })
  },

  deleteByUser: async (userId) => {
    return RefreshToken.deleteMany({ user: userId })
  }
}