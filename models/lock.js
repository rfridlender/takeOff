// enum: ['US3', 'US5', 'US10B', 'US11P', 'US15', 'US15A', 'US19', 'US26', 'US26D', 'US32D']

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const lockSchema = new Schema({
  name: {type: String, required: true},
  handlesetName: {type: String, required: true},
  possibleFinishes: {type: [{type: String, required: true, enum: ['US3', 'US5', 'US10B', 'US11P', 'US15', 'US15A', 'US19', 'US26', 'US26D', 'US32D']}], required: true},
  price: [{type: Number, required: true, min: 0}]
}, {
  timestamps: true,
})

const Lock = mongoose.model('Lock', lockSchema)

export {
  Lock
}
