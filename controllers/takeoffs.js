import { Takeoff } from '../models/takeoff.js'

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
  res.render('takeoffs/new', {
    title: 'Create Takeoff'
  })
}

export {
  index,
  newTakeoff as new
}