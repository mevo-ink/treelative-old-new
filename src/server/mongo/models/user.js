import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    isAdmin: Boolean,
    isPublic: Boolean,
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    shortName: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      sparse: true
    },
    phoneNumber: String,
    birthLocation: Map,
    currentLocation: Map,
    marriageLocation: Map,
    dateOfBirth: Date,
    dateOfMarriage: Date,
    dateOfDeath: Date,
    social: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String,
      website: String
    },
    partner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    parents: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    children: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    collection: 'users',
    timestamps: true
  }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
