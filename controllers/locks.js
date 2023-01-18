import { Lock } from '../models/lock.js'

function create(req, res) {
  Lock.create(req.body)
  .then(() => {
    res.redirect('/portal/assets')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/portal/assets')
  })
}

function update(req, res) {
  req.body.possibleFinishes = !req.body.possibleFinishes ? [] : req.body.possibleFinishes
  Lock.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.redirect('/portal/assets')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/portal/assets')
  })
}

function deleteLock(req, res) {
  Lock.findByIdAndDelete(req.params.id)
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
  deleteLock as delete,
}