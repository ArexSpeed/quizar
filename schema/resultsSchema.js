import mongoose from 'mongoose'

const resultSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
)

const Result = mongoose.model('Result', resultSchema)

export default Result;