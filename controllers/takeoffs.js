import { Takeoff } from '../models/takeoff.js'
import { Builder } from '../models/builder.js'
import { Lock } from '../models/lock.js'

function index(req, res) {
  Takeoff.find({})
  .then(takeoffs => {
    res.render('takeoffs/index', {
      title: 'Takeoffs',
      takeoffs
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/portal')
  })
}

function newTakeoff(req, res) {
  Builder.find({})
  .then(builders => {
    Lock.find({})
    .then(locks => {
      res.render('takeoffs/new', {
        title: 'Create Takeoff',
        builders,
        locks
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/portal')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/portal')
  })
}

export {
  index,
  newTakeoff as new
}