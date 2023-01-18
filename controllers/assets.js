import { Builder } from '../models/builder.js'
import { Lock } from '../models/lock.js'
import { User } from '../models/user.js'

function index(req, res) {
  Builder.find({})
  .then(builders => {
    Lock.find({})
    .then(locks => {
      User.find({})
      .populate('profile')
      .then(users => {
        res.render('assets/index', {
            title: 'Assets',
            builders,
            locks,
            users,
            possibleFinishes: ['US3', 'US5', 'US10B', 'US11P', 'US15', 'US15A', 'US19', 'US26', 'US26D', 'US32D'],
            possibleLockTypes: ['Handleset', 'Interior Trim', 'Entry', 'Deadbolt', 'Passage', 'Privacy', 'Dummy', 'Pocket Passage', 'Pocket Privacy', 'Jumbo Springs', 'Door Saver', 'Door Saver II'],
            possibleRoles: [0, 100, 200]
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
  })
  .catch(err => {
    console.log(err)
    res.redirect('/portal/assets')
  })
}

export {
  index,
}