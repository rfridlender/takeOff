import { Router } from 'express'
import * as assetsCtrl from '../controllers/assets.js'
import * as locksCtrl from '../controllers/locks.js'
import * as buildersCtrl from '../controllers/builders.js'

const router = Router()

// Asset Controllers
router.get('/', assetsCtrl.index)

// Builder Controllers
router.post('/builders', buildersCtrl.create)

// Lock Controllers
router.post('/locks', locksCtrl.create)

export {
  router
}
