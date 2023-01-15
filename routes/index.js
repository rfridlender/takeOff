import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  res.locals.user?.role >= 100 ? res.redirect('/portal') : res.render('index', { title: 'Home Page' })
})

export {
  router
}
