import { User } from '../models/user.js'
import { Profile } from '../models/profile.js';

function update(req, res) {
  console.log(req.body);
  User.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.redirect('/portal/assets')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/portal/assets')
  })
}

function deleteUser(req, res) {
  User.findByIdAndDelete(req.params.id)
  .populate('profile')
  .then(user => {
    Profile.findByIdAndDelete(user.profile._id)
    .then(() => {
      res.redirect('/portal/assets')
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
  update,
  deleteUser as delete,
}