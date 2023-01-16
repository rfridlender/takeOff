import { Builder } from '../models/builder.js'
import { Lock } from '../models/lock.js'

function index(req, res) {
  Builder.find({})
  .then(builders => {
    Lock.find({})
    .then(locks => {
      res.render('assets/index', {
          title: 'Assets',
          builders,
          locks
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/portal/assets')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/portal/assets')
  })
}

export {
  index,
}