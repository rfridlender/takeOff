import { Router } from 'express'
import * as takeoffsCtrl from '../controllers/takeoffs.js'

const router = Router()

router.get('/', takeoffsCtrl.index)
router.get('/new', takeoffsCtrl.new)

router.post('/', takeoffsCtrl.create)

export {
  router
}
