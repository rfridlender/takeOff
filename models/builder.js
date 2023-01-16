import mongoose from 'mongoose'

const Schema = mongoose.Schema

//add regex to ensure its in email format

const builderSchema = new Schema({
  name: {type: String, required: true},
  phoneNumber: {type: String, match: /[0-9]{3}-[0-9]{3}-[0-9]{4}/},
  email: {type: String,}
}, {
  timestamps: true
})

const Builder = mongoose.model('Builder', builderSchema)

export {
  Builder
}
