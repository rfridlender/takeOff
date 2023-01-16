import { Lock } from '../models/lock.js'

function create(req, res) {
  console.log(req.body);
  Lock.create(req.body)
  .then(() => {
    res.redirect('/portal/assets')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/portal/assets')
  })
}

export {
  create
}