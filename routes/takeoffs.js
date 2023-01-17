import { Router } from 'express'
import * as takeoffsCtrl from '../controllers/takeoffs.js'
import { isManager } from '../middleware/middleware.js'

const router = Router()

router.get('/', takeoffsCtrl.index)
router.get('/new', takeoffsCtrl.new)
router.get('/:id', takeoffsCtrl.show)
router.get('/:id/edit', isManager, takeoffsCtrl.edit)

router.post('/', takeoffsCtrl.create)
router.put('/:id', takeoffsCtrl.update)

router.delete('/:id', takeoffsCtrl.delete)

export {
  router
}
