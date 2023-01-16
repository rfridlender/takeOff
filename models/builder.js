import mongoose from 'mongoose'

const Schema = mongoose.Schema

//add regex to ensure its in phone number format
//add regex to ensure its in email format

const builderSchema = new Schema({
  name: {type: String, required: true},
  phoneNumber: {type: String,},
  email: {type: String,}
}, {
  timestamps: true
})

const Builder = mongoose.model('Builder', builderSchema)

export {
  Builder
}
