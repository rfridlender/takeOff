import { Builder } from '../models/builder.js'

function create(req, res) {
  Builder.create(req.body)
  .then(() => {
    res.redirect('/portal/assets')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/portal/assets')
  })
}

function update(req, res) {
  Builder.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.redirect('/portal/assets')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/portal/assets')
  })
}

function deleteBuilder(req, res) {
  Builder.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect('/portal/assets')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/portal/assets')
  })
}

export {
  create,
  update,
  deleteBuilder as delete,
}