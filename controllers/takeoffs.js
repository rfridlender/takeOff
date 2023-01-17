import { Takeoff } from '../models/takeoff.js'
import { Builder } from '../models/builder.js'
import { Lock } from '../models/lock.js'

function index(req, res) {
  Takeoff.find({})
  .populate('createdBy')
  .populate('builder')
  .then(takeoffs => {
    console.log(takeoffs);
    res.render('takeoffs/index', {
      title: 'Takeoffs',
      takeoffs,
      filters: ['Status', 'Address', 'Deadline', 'Builder', 'Created By']
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
        locks,
        possibleFinishes: ['US3', 'US5', 'US10B', 'US11P', 'US15', 'US15A', 'US19', 'US26', 'US26D', 'US32D'],
        possibleLockTypes: ['Handleset', 'Interior Trim', 'Entry', 'Deadbolt', 'Passage', 'Privacy', 'Dummy', 'Pocket Passage', 'Pocket Privacy', 'Jumbo Springs', 'Door Saver', 'Door Saver II'],
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

function show(req, res) {
  Takeoff.findById(req.params.id)
  .populate('builder')
  .populate('lock')
  .then(takeoff => {
    res.render('takeoffs/show', {
      title: `Takeoff for ${takeoff.address}`,
      takeoff,
      possibleLockTypes: ['Handleset', 'Interior Trim', 'Entry', 'Deadbolt', 'Passage', 'Privacy', 'Dummy', 'Pocket Passage', 'Pocket Privacy', 'Jumbo Springs', 'Door Saver', 'Door Saver II'],
      })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/portal/takeoffs')
  })
}

function create(req, res) {
  req.body.createdBy = req.user.profile._id
  Takeoff.create(req.body)
  .then(takeoff => {
    res.redirect('/portal/takeoffs')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/portal/takeoffs')
  })
}

function edit(req, res) {
  Takeoff.findById(req.params.id)
  .populate('builder')
  .populate('lock')
  .then(takeoff => {
    Builder.find({_id: {$nin: takeoff.builder}})
    .then(builders => {
      Lock.find({_id: {$nin: takeoff.lock}})
      .then(locks => {
        res.render('takeoffs/edit', {
          title: `Takeoff for ${takeoff.address}`,
          takeoff,
          builders,
          locks,
          possibleFinishes: ['US3', 'US5', 'US10B', 'US11P', 'US15', 'US15A', 'US19', 'US26', 'US26D', 'US32D'],
          possibleLockTypes: ['Handleset', 'Interior Trim', 'Entry', 'Deadbolt', 'Passage', 'Privacy', 'Dummy', 'Pocket Passage', 'Pocket Privacy', 'Jumbo Springs', 'Door Saver', 'Door Saver II'],
          remainingStatuses: () => {return [0, 1, 2].filter(status => {return status !== takeoff.jobStatus ? true : false})},
          })
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/portal/takeoffs')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/portal/takeoffs')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/portal/takeoffs')
  })
}

function update(req, res) {
  Takeoff.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.redirect('/portal/takeoffs')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/portal/takeoffs')
  })
}

function deleteTakeoff(req, res) {
  Takeoff.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect('/portal/takeoffs')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/portal/takeoffs')
  })
}

export {
  index,
  newTakeoff as new,
  show,
  create,
  edit,
  update,
  deleteTakeoff as delete,
}