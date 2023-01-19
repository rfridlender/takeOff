import { Takeoff } from '../models/takeoff.js'
import { Builder } from '../models/builder.js'
import { Lock } from '../models/lock.js'
import { Profile } from '../models/profile.js'

function index(req, res) {
  if (req.query.search === '') delete req.query.search
  Takeoff.find({})
  .populate('createdBy')
  .populate('builder')
  .then(takeoffs => {
    if (req.query.search) {
      takeoffs = takeoffs.filter(takeoff => {
        return takeoff.address.toLowerCase().includes(req.query.search.toLowerCase()) ? true : false
      })
    }
    switch (req.query.sort) {
      case 'status-asc':
        takeoffs.sort((a, b) => {
          return a.jobStatus - b.jobStatus
        })
        break;
      case 'status-desc':
        takeoffs.sort((a, b) => {
          return b.jobStatus - a.jobStatus
        })
        break;
      case 'address-asc':
        takeoffs.sort((a, b) => {
          return a.address.toLowerCase().replace(/[0-9]/g, '').replace(' ', '') < b.address.toLowerCase().replace(/[0-9]/g, '').replace(' ', '') ? -1 : 1
        })
        break;
      case 'address-desc':
        takeoffs.sort((a, b) => {
          return a.address.toLowerCase().replace(/[0-9]/g, '').replace(' ', '') < b.address.toLowerCase().replace(/[0-9]/g, '').replace(' ', '') ? 1 : -1
        })
        break;
      case 'deadline-asc':
        let pastTakeoffs = takeoffs.filter(takeoff => {
          return takeoff.deadline < new Date() ? true : false
        })
        let currentTakeoffs = takeoffs.filter(takeoff => {
          return takeoff.deadline <= new Date() ? false : true
        })
        currentTakeoffs = currentTakeoffs.sort((a, b) => {
          return a.deadline - b.deadline
        })
        pastTakeoffs = pastTakeoffs.sort((a, b) => {
          return a.deadline - b.deadline
        })
        takeoffs = [...currentTakeoffs, ...pastTakeoffs]
        break;
      case 'deadline-desc':
        takeoffs.sort((a, b) => {
          return b.deadline - a.deadline
        })
        break;
      case 'builder-asc':
        takeoffs.sort((a, b) => {
          return a.builder.name.toLowerCase() < b.builder.name.toLowerCase() ? -1 : 1
        })
        break;
      case 'builder-desc':
        takeoffs.sort((a, b) => {
          return a.builder.name.toLowerCase() < b.builder.name.toLowerCase() ? 1 : -1
        })
        break;
      case 'created by-asc':
        takeoffs.sort((a, b) => {
          return a.createdBy.name.toLowerCase() < b.createdBy.name.toLowerCase() ? -1 : 1
        })
        break;
      case 'created by-desc':
        takeoffs.sort((a, b) => {
          return a.createdBy.name.toLowerCase() < b.createdBy.name.toLowerCase() ? 1 : -1
        })
        break;
      default:
        takeoffs.sort((a, b) => {
          return a.jobStatus - b.jobStatus
        })
    }
    let overdueTakeoffs = takeoffs.filter(takeoff => {
      return takeoff.deadline < new Date() && takeoff.jobStatus !== 2 ? true : false
    })
    let currentTakeoffs = takeoffs.filter(takeoff => {
      return takeoff.deadline >= new Date() && takeoff.jobStatus !== 2 ? true : false
    })
    let completedTakeoffs = takeoffs.filter(takeoff => {
      return takeoff.jobStatus === 2 ? true : false
    })
    res.render('takeoffs/index', {
      title: 'Takeoffs',
      takeoffs,
      overdueTakeoffs,
      currentTakeoffs,
      completedTakeoffs,
      filters: ['Status', 'Address', 'Deadline', 'Builder', 'Created By'],
      query: req.query
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
  .then(() => {
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
        Profile.find({})
        .then(profiles => {
          res.render('takeoffs/edit', {
            title: `Takeoff for ${takeoff.address}`,
            takeoff,
            builders,
            locks,
            profiles,
            possibleFinishes: ['US3', 'US5', 'US10B', 'US11P', 'US15', 'US15A', 'US19', 'US26', 'US26D', 'US32D'],
            possibleLockTypes: ['Handleset', 'Interior Trim', 'Entry', 'Deadbolt', 'Passage', 'Privacy', 'Dummy', 'Pocket Passage', 'Pocket Privacy', 'Jumbo Springs', 'Door Saver', 'Door Saver II'],
            remainingStatuses: () => {return [0, 1, 2].filter(status => {return status !== takeoff.jobStatus ? true : false})},
            })
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
  req.body.installers = req.body.installers ? req.body.installers : []
  Takeoff.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((takeoff) => {
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