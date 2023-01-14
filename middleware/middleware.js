function passDataToView(req, res, next) {
  res.locals.user = req.user ? req.user : null
  res.locals.googleClientID = process.env.GOOGLE_CLIENT_ID
  next()
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

function isEmployee(req, res, next) {
  res.locals.user?.role >= 100 ? next() : res.redirect('/')
}

function isManager(req, res, next) {
  res.locals.user?.role >= 200 ? next() : res.redirect('/')
}

export {
  passDataToView,
  isLoggedIn,
  isEmployee,
  isManager,
}
