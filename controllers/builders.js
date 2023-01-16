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

export {
  create
}